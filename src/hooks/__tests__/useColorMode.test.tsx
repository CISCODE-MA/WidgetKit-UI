import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useColorMode from '../../hooks/useColorMode';

// JSDOM provides document.body; ensure classList manipulation is observed

describe('useColorMode', () => {
  it('toggles dark class on body when mode changes', () => {
    const { result } = renderHook(() => useColorMode());

    // default from useLocalStorage is 'light'
    expect(document.body.classList.contains('dark')).toBe(false);

    const [, setMode] = result.current as [string, (value: string) => void];

    act(() => setMode('dark'));
    expect(document.body.classList.contains('dark')).toBe(true);

    act(() => setMode('light'));
    expect(document.body.classList.contains('dark')).toBe(false);
  });
});
