import type { JSX } from 'react';
import WidgetContainer from './WidgetContainer';
import type { DashboardLayout, GridConfig } from '../../../models/DashboardWidget';

type Props = {
  grid: GridConfig;
  widgets: DashboardLayout;
  onLayoutChange: (layout: DashboardLayout) => void;
  enableDrag?: boolean;
  enableResize?: boolean;
  showActions?: boolean;
  persistKey?: string;
};

export default function DashboardGrid({
  grid,
  widgets,
  onLayoutChange,
  enableDrag = true,
  enableResize = true,
  showActions = true,
  persistKey,
}: Props): JSX.Element {
  // Minimal grid rendering: each widget in a grid cell
  return (
    <div
      className={`grid gap-${grid.gap}`}
      style={{
        gridTemplateColumns: `repeat(${grid.cols}, minmax(0, 1fr))`,
      }}
    >
      {widgets.map((widget) => (
        <div
          key={widget.id}
          className={`col-span-${widget.position.w} row-span-${widget.position.h}`}
        >
          <WidgetContainer title={widget.title} draggable={enableDrag} resizable={enableResize}>
            {/* Render widget content based on type */}
            {widget.type === 'card' && <div>{String(widget.props?.content ?? '')}</div>}
            {widget.type === 'stat' && (
              <div>
                <div className="text-lg font-bold">{Number(widget.props?.value ?? 0)}</div>
                <div className="text-sm text-gray-500">{String(widget.props?.label ?? '')}</div>
              </div>
            )}
            {widget.type === 'progress' && (
              <div>
                <div className="mb-1">Progress</div>
                <div className="w-full bg-gray-200 rounded h-2">
                  <div
                    className="bg-blue-500 h-2 rounded"
                    style={{ width: `${Number(widget.props?.value ?? 0)}%` }}
                  />
                </div>
              </div>
            )}
            {widget.type === 'activity' && (
              <ul className="list-disc pl-4">
                {Array.isArray(widget.props?.items)
                  ? widget.props.items.map((item: string, idx: number) => (
                      <li key={idx}>{String(item)}</li>
                    ))
                  : null}
              </ul>
            )}
            {widget.type === 'chart' && (
              <div>
                <div className="mb-1">
                  {typeof widget.props?.kind === 'string' ? widget.props.kind.toUpperCase() : ''}{' '}
                  Chart
                </div>
                {/* Simple SVG bar chart */}
                {Array.isArray(widget.props?.data) && widget.props?.kind === 'bar' ? (
                  <svg width="100%" height="40">
                    {widget.props.data.map((val: number, idx: number) => (
                      <rect
                        key={idx}
                        x={idx * 16}
                        y={40 - val * 3}
                        width={12}
                        height={val * 3}
                        fill={
                          typeof widget.props?.color === 'string' ? widget.props.color : '#4f46e5'
                        }
                      />
                    ))}
                  </svg>
                ) : null}
              </div>
            )}
            {widget.type === 'custom' && <div>Custom widget</div>}
          </WidgetContainer>
        </div>
      ))}
    </div>
  );
}
