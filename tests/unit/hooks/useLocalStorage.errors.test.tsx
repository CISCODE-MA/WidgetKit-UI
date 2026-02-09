import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from '../../../src';

describe('useLocalStorage error branches', () => {
  it('falls back to initialValue when getItem throws', () => {
    const spy = vi.spyOn(window.localStorage, 'getItem').mockImplementation(() => {
      throw new Error('getItem fail');
    });
    const { result } = renderHook(() => useLocalStorage('x', 'init'));
    expect(result.current[0]).toBe('init');
    spy.mockRestore();
  });

  it('logs when setItem throws but retains state', () => {
    const setSpy = vi.spyOn(window.localStorage, 'setItem').mockImplementation(() => {
      throw new Error('setItem fail');
    });
    const { result } = renderHook(() => useLocalStorage('y', 'start'));
    const [, setValue] = result.current;
    act(() => setValue('next'));
    expect(result.current[0]).toBe('next');
    setSpy.mockRestore();
  });
});
