import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { usePasswordReset } from '../../../src';

describe('usePasswordReset', () => {
  it('submits and marks success', async () => {
    const reset = async () => {};
    // Use a real zod schema to match expected ZodSchema type
    const schema = require('zod').z.object({
      email: require('zod').z.string().email(),
    });

    const { result } = renderHook(() => usePasswordReset({ reset, schema }));

    act(() => result.current.update('email', 'user@example.com'));

    await act(async () => {
      await result.current.submit();
    });

    expect(result.current.success).toBe(true);
    expect(result.current.error).toBeNull();
  });

  it('captures errors on failure', async () => {
    const reset = async () => {
      throw new Error('Network');
    };

    const { result } = renderHook(() => usePasswordReset({ reset }));

    await act(async () => {
      try {
        await result.current.submit();
      } catch {}
    });

    expect(result.current.success).toBe(false);
    expect(result.current.error).toBe('Network');
  });
});
