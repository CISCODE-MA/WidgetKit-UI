import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useLocalStorage from '../../hooks/useLocalStorage';

describe('useLocalStorage', () => {
  it('initializes from provided default and persists updates', () => {
    // Ensure clean state
    window.localStorage.clear();

    const { result } = renderHook(() => useLocalStorage('key', 'default'));
    const [value, setValue] = result.current;
    expect(value).toBe('default');

    act(() => setValue('changed'));
    const [nextValue] = result.current;
    expect(nextValue).toBe('changed');
    expect(JSON.parse(window.localStorage.getItem('key') || 'null')).toBe('changed');
  });
});
