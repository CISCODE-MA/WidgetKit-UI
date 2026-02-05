import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useColorMode } from '../../../src';

describe('useColorMode', () => {
  it('toggles dark class on body when mode changes', () => {
    const { result } = renderHook(() => useColorMode());

    expect(document.body.classList.contains('dark')).toBe(false);

    const [, setMode] = result.current as any;

    act(() => setMode('dark'));
    expect(document.body.classList.contains('dark')).toBe(true);

    act(() => setMode('light'));
    expect(document.body.classList.contains('dark')).toBe(false);
  });
});
