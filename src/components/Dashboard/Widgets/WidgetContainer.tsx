import type { JSX } from 'react';
import { useRef } from 'react';
import type { ReactNode, PointerEvent } from 'react';

type Props = {
  title?: string;
  children: ReactNode;
  onStartDrag?: (e: PointerEvent<HTMLDivElement>) => void;
  onStartResize?: (e: PointerEvent<HTMLDivElement>) => void; // legacy: header square
  onStartResizeEast?: (e: PointerEvent<HTMLDivElement>) => void;
  onStartResizeSouth?: (e: PointerEvent<HTMLDivElement>) => void;
  onStartResizeSouthEast?: (e: PointerEvent<HTMLDivElement>) => void;
  draggable?: boolean;
  resizable?: boolean;
  onRemove?: () => void;
  onDuplicate?: () => void;
};

export default function WidgetContainer({
  title,
  children,
  onStartDrag,
  onStartResize,
  onStartResizeEast,
  onStartResizeSouth,
  onStartResizeSouthEast,
  draggable = true,
  resizable = true,
  onRemove,
  onDuplicate,
}: Props): JSX.Element {
  const headerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="relative rounded-lg border border-gray-200 bg-white dark:bg-gray-800 shadow-sm overflow-hidden">
      <div
        ref={headerRef}
        className={
          'flex items-center justify-between px-3 py-2 border-b border-gray-100 dark:border-gray-700 select-none ' +
          (draggable ? 'cursor-grab' : 'cursor-default')
        }
        style={{ touchAction: 'none' }}
        onPointerDown={(e) => {
          // Only attach interactions if enabled
          if (e.shiftKey && resizable && onStartResize) return onStartResize(e);
          if (draggable) onStartDrag?.(e);
        }}
      >
        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{title}</span>
        <div className="flex items-center gap-2">
          {typeof onDuplicate === 'function' ? (
            <button
              type="button"
              className="inline-flex items-center justify-center w-6 h-6 text-xs rounded bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200"
              onClick={onDuplicate}
              onPointerDown={(e) => e.stopPropagation()}
              aria-label="Duplicate widget"
              title="Duplicate"
            >
              ⧉
            </button>
          ) : null}
          {typeof onRemove === 'function' ? (
            <button
              type="button"
              className="inline-flex items-center justify-center w-6 h-6 text-xs rounded bg-red-100 hover:bg-red-200 dark:bg-red-800/40 dark:hover:bg-red-700/50 text-red-700 dark:text-red-200"
              onClick={onRemove}
              onPointerDown={(e) => e.stopPropagation()}
              aria-label="Remove widget"
              title="Remove"
            >
              ×
            </button>
          ) : null}
          {resizable ? (
            <div
              className="shrink-0 w-4 h-4 rounded bg-gray-300 dark:bg-gray-600 cursor-se-resize"
              style={{ touchAction: 'none' }}
              onPointerDown={onStartResize}
              aria-label="Resize"
              title="Resize"
            />
          ) : null}
        </div>
      </div>
      <div className="p-3">{children}</div>
      {resizable ? (
        <>
          {/* East (right) edge handle */}
          <div
            className="absolute top-0 right-0 h-full w-1 cursor-ew-resize"
            style={{ touchAction: 'none' }}
            onPointerDown={(e) => {
              e.stopPropagation();
              onStartResizeEast?.(e);
            }}
            aria-label="Resize east"
          />
          {/* South (bottom) edge handle */}
          <div
            className="absolute bottom-0 left-0 w-full h-1 cursor-ns-resize"
            style={{ touchAction: 'none' }}
            onPointerDown={(e) => {
              e.stopPropagation();
              onStartResizeSouth?.(e);
            }}
            aria-label="Resize south"
          />
          {/* South-East corner handle */}
          <div
            className="absolute bottom-0 right-0 w-3 h-3 cursor-se-resize"
            style={{ touchAction: 'none' }}
            onPointerDown={(e) => {
              e.stopPropagation();
              onStartResizeSouthEast?.(e);
            }}
            aria-label="Resize south-east"
          />
        </>
      ) : null}
    </div>
  );
}
