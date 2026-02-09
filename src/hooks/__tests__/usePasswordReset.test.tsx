import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { usePasswordReset } from '../../hooks/usePasswordReset';
import { z } from 'zod';

describe('usePasswordReset', () => {
  it('submits and marks success', async () => {
    const reset = async () => {};
    const schema = z.object({
      email: z.string().email().optional(),
      username: z.string().optional(),
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

    await expect(async () => {
      await act(async () => {
        await result.current.submit();
      });
    }).rejects.toThrow('Network');

    expect(result.current.success).toBe(false);
    expect(result.current.error).toBe('Network');
  });
});
