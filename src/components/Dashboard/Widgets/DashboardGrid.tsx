import { useRef, useState } from 'react';
import type { PointerEvent } from 'react';
import type {
  BaseWidgetConfig,
  DashboardLayout,
  GridConfig,
  WidgetId,
  WidgetPosition,
  ChartAdapter,
  ChartKind,
} from '../../../models/DashboardWidget';
import WidgetContainer from './WidgetContainer';
import { positionToStyle, clamp, roundToCell, intersects } from './layoutUtils';
import { DefaultChartAdapter } from './ChartAdapters';

type Props = {
  grid: GridConfig;
  widgets: DashboardLayout;
  onLayoutChange?: (next: DashboardLayout) => void;
  renderWidget?: (w: BaseWidgetConfig) => JSX.Element; // host can fully render a custom widget
  chartAdapter?: ChartAdapter; // host can render charts using its preferred library
  enableDrag?: boolean; // allow moving widgets
  enableResize?: boolean; // allow resizing widgets
  showActions?: boolean; // show default remove/duplicate actions
};

type DragState = {
  id: WidgetId;
  startX: number; // px
  startY: number; // px
  origPos: WidgetPosition;
  mode: 'move' | 'resize';
  edge?: 'e' | 's' | 'se' | 'w' | 'n' | 'sw' | 'ne' | 'nw';
};

export default function DashboardGrid({
  grid,
  widgets,
  onLayoutChange,
  renderWidget,
  chartAdapter,
  enableDrag = true,
  enableResize = true,
  showActions = true,
}: Props): JSX.Element {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [layout, setLayout] = useState<DashboardLayout>(widgets);
  const [drag, setDrag] = useState<DragState | null>(null);

  function commitLayout(next: DashboardLayout): void {
    setLayout(next);
    onLayoutChange?.(next);
  }

  function removeWidget(id: WidgetId): void {
    const next = layout.filter((w) => w.id !== id);
    commitLayout(next);
  }

  function duplicateWidget(id: WidgetId): void {
    const idx = findById(id);
    if (idx === -1) return;
    const src = layout[idx];
    // new id
    let copyIndex = 2;
    let newId: WidgetId = `${src.id}-copy`;
    while (layout.some((w) => w.id === newId)) {
      newId = `${src.id}-copy-${copyIndex++}`;
    }
    // Attempt to place to the right, else below, else scan
    const rectPos = { ...src.position };
    let candidate = { ...rectPos, x: Math.min(rectPos.x + rectPos.w, grid.cols - rectPos.w) };
    if (layout.some((w, i) => i !== idx && intersects(candidate, w.position))) {
      candidate = { ...rectPos, y: rectPos.y + rectPos.h };
    }
    // If still collides, scan rows to find first free spot
    const isFree = (pos: WidgetPosition): boolean =>
      !layout.some((w) => intersects(pos, w.position));
    if (!isFree(candidate)) {
      let found = false;
      for (let y = 0; y < 100 && !found; y++) {
        for (let x = 0; x <= grid.cols - rectPos.w && !found; x++) {
          const pos = { x, y, w: rectPos.w, h: rectPos.h };
          if (isFree(pos)) {
            candidate = pos;
            found = true;
          }
        }
      }
    }
    const copy: BaseWidgetConfig = { ...src, id: newId, position: candidate } as BaseWidgetConfig;
    const next = [...layout, copy];
    commitLayout(next);
  }

  function findById(id: WidgetId): number {
    return layout.findIndex((w) => w.id === id);
  }

  function startDrag(id: WidgetId, mode: 'move' | 'resize', edge?: DragState['edge']) {
    return (e: PointerEvent<HTMLDivElement>): void => {
      // Respect feature toggles
      if (mode === 'move' && !enableDrag) return;
      if (mode === 'resize' && !enableResize) return;
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const idx = findById(id);
      if (idx === -1) return;
      const pos = layout[idx].position;
      // Capture pointer to the grid container so move/up handlers fire consistently
      containerRef.current?.setPointerCapture(e.pointerId);
      setDrag({
        id,
        startX: e.clientX - rect.left,
        startY: e.clientY - rect.top,
        origPos: { ...pos },
        mode,
        edge,
      });
    };
  }

  function onPointerMove(e: PointerEvent<HTMLDivElement>): void {
    if (!drag) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const dx = x - drag.startX;
    const dy = y - drag.startY;

    const colWidth = (rect.width - (grid.cols - 1) * grid.gap) / grid.cols;
    const deltaCols = roundToCell(dx, colWidth);
    const deltaRows = roundToCell(dy, grid.rowHeight);

    const idx = findById(drag.id);
    if (idx === -1) return;

    const current = layout[idx];
    const nextPos: WidgetPosition = { ...drag.origPos };
    if (drag.mode === 'move') {
      nextPos.x = clamp(drag.origPos.x + deltaCols, 0, grid.cols - drag.origPos.w);
      nextPos.y = Math.max(0, drag.origPos.y + deltaRows);
    } else {
      // directional resize
      const edge = drag.edge ?? 'se';
      if (edge.includes('e')) {
        nextPos.w = clamp(drag.origPos.w + deltaCols, 1, grid.cols - drag.origPos.x);
      }
      if (edge.includes('s')) {
        nextPos.h = Math.max(1, drag.origPos.h + deltaRows);
      }
      if (edge.includes('w')) {
        // moving west edge affects x and w
        const newX = clamp(drag.origPos.x + deltaCols, 0, drag.origPos.x + drag.origPos.w - 1);
        const deltaX = newX - drag.origPos.x;
        nextPos.x = newX;
        nextPos.w = Math.max(1, drag.origPos.w - deltaX);
      }
      if (edge.includes('n')) {
        // moving north edge affects y and h
        const newY = Math.max(0, drag.origPos.y + deltaRows);
        const deltaY = newY - drag.origPos.y;
        nextPos.y = newY;
        nextPos.h = Math.max(1, drag.origPos.h - deltaY);
      }
    }

    // prevent overlap: simple check, if collision then skip update
    const collides = layout.some((w, i) => i !== idx && intersects(nextPos, w.position));
    if (collides) return;

    const next = [...layout];
    next[idx] = { ...current, position: nextPos };
    setLayout(next);
  }

  function onPointerUp(e: PointerEvent<HTMLDivElement>): void {
    if (!drag) return;
    containerRef.current?.releasePointerCapture(e.pointerId);
    commitLayout(layout);
    setDrag(null);
  }

  return (
    <div
      ref={containerRef}
      className="grid"
      style={{
        gridTemplateColumns: `repeat(${grid.cols}, minmax(0, 1fr))`,
        gridAutoRows: `${grid.rowHeight}px`,
        gap: `${grid.gap}px`,
      }}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      {layout.map((w) => (
        <div key={w.id} style={positionToStyle(w.position)}>
          <WidgetContainer
            title={w.title}
            draggable={enableDrag}
            resizable={enableResize}
            onStartDrag={enableDrag ? startDrag(w.id, 'move') : undefined}
            onStartResize={enableResize ? startDrag(w.id, 'resize', 'se') : undefined}
            onStartResizeEast={enableResize ? startDrag(w.id, 'resize', 'e') : undefined}
            onStartResizeSouth={enableResize ? startDrag(w.id, 'resize', 's') : undefined}
            onStartResizeSouthEast={enableResize ? startDrag(w.id, 'resize', 'se') : undefined}
            onRemove={showActions ? () => removeWidget(w.id) : undefined}
            onDuplicate={showActions ? () => duplicateWidget(w.id) : undefined}
          >
            {renderWidget ? (
              renderWidget(w)
            ) : (
              <DefaultWidgetRenderer widget={w} chartAdapter={chartAdapter} />
            )}
          </WidgetContainer>
        </div>
      ))}
    </div>
  );
}

function DefaultWidgetRenderer({
  widget,
  chartAdapter,
}: {
  widget: BaseWidgetConfig;
  chartAdapter?: ChartAdapter;
}): JSX.Element {
  const { type, props } = widget;
  switch (type) {
    case 'card':
      return (
        <div className="text-sm text-gray-700 dark:text-gray-200">
          {String(props?.content ?? 'Card')}
        </div>
      );
    case 'stat':
      return (
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-semibold text-gray-900 dark:text-white">
            {String(props?.value ?? '0')}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {String(props?.label ?? 'Stat')}
          </span>
        </div>
      );
    case 'progress': {
      const v = typeof props?.value === 'number' ? props.value : 0;
      return (
        <div className="w-full">
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded">
            <div className="h-2 bg-indigo-600 rounded" style={{ width: `${clamp(v, 0, 100)}%` }} />
          </div>
          <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">{v}%</div>
        </div>
      );
    }
    case 'activity': {
      const items = Array.isArray(props?.items) ? (props!.items as unknown[]) : [];
      return (
        <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-200">
          {items.length === 0 ? (
            <li className="text-gray-500 dark:text-gray-400">No activity</li>
          ) : null}
          {items.map((it, i) => (
            <li key={i}>{String(it)}</li>
          ))}
        </ul>
      );
    }
    case 'chart': {
      const kind = (props?.kind as ChartKind) ?? 'line';
      const adapter = chartAdapter ?? DefaultChartAdapter;
      return adapter.render(kind, props ?? {});
    }
    case 'custom':
    default:
      return (
        <div className="text-sm text-gray-500 dark:text-gray-400">Provide a custom renderer.</div>
      );
  }
}
