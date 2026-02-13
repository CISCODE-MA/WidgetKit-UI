import type { WidgetPosition } from '../../../models/DashboardWidget';

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function roundToCell(px: number, cell: number): number {
  return Math.round(px / cell);
}

export function positionToStyle(pos: WidgetPosition): {
  gridColumnStart: number;
  gridColumnEnd: number;
  gridRowStart: number;
  gridRowEnd: number;
} {
  return {
    gridColumnStart: pos.x + 1,
    gridColumnEnd: pos.x + 1 + pos.w,
    gridRowStart: pos.y + 1,
    gridRowEnd: pos.y + 1 + pos.h,
  };
}

export function intersects(a: WidgetPosition, b: WidgetPosition): boolean {
  const ax2 = a.x + a.w;
  const ay2 = a.y + a.h;
  const bx2 = b.x + b.w;
  const by2 = b.y + b.h;
  // no overlap if one rectangle is completely to one side of the other
  const noOverlap = ax2 <= b.x || bx2 <= a.x || ay2 <= b.y || by2 <= a.y;
  return !noOverlap;
}
