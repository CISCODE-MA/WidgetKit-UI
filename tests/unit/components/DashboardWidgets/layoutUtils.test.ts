import { describe, it, expect } from 'vitest';
import {
  positionToStyle,
  intersects,
  roundToCell,
} from '../../../../src/components/Dashboard/Widgets/layoutUtils';

describe('layoutUtils', () => {
  it('positionToStyle converts widget position to grid styles', () => {
    const style = positionToStyle({ x: 1, y: 2, w: 3, h: 4 });
    expect(style.gridColumnStart).toBe(2);
    expect(style.gridColumnEnd).toBe(5);
    expect(style.gridRowStart).toBe(3);
    expect(style.gridRowEnd).toBe(7);
  });

  it('intersects detects overlapping positions', () => {
    const a = { x: 0, y: 0, w: 3, h: 2 };
    const b = { x: 2, y: 1, w: 2, h: 2 };
    const c = { x: 3, y: 2, w: 1, h: 1 };
    expect(intersects(a, b)).toBe(true);
    expect(intersects(a, c)).toBe(false);
  });

  it('roundToCell rounds pixel values to nearest cell count', () => {
    expect(roundToCell(50, 30)).toBe(2);
    expect(roundToCell(29, 30)).toBe(1);
    expect(roundToCell(-31, 30)).toBe(-1);
  });
});
