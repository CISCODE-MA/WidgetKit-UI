import { describe, it, expect } from 'vitest';
import { generatePageNumbers } from '../../../src';

describe('generatePageNumbers', () => {
  it('shows all when total small', () => {
    expect(generatePageNumbers(1, 3)).toEqual([1, 2, 3]);
  });
  it('includes ellipses around current', () => {
    const pages = generatePageNumbers(5, 10);
    expect(pages[0]).toBe(1);
    expect(pages.includes('...')).toBe(true);
    expect(pages[pages.length - 1]).toBe(10);
  });
});
