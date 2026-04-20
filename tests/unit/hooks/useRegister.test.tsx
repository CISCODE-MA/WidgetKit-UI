import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useRegister } from '../../../src';

describe('useRegister', () => {
  it('updates fields, submits, and returns user', async () => {
    const register = vi.fn(async (payload: Record<string, unknown>) => ({
      id: 1,
      name: payload['name'],
    }));

    const { result } = renderHook(() => useRegister({ register }));

    act(() => result.current.update('name', 'Alice'));
    act(() => result.current.update('email', 'alice@example.com'));

    expect(result.current.values).toMatchObject({ name: 'Alice', email: 'alice@example.com' });

    await act(async () => {
      const user = await result.current.submit();
      expect(user).toMatchObject({ id: 1, name: 'Alice' });
    });

    expect(result.current.user).toMatchObject({ id: 1 });
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('validates with schema before submitting', async () => {
    const { z } = await import('zod');
    const schema = z.object({ email: z.string().email() });
    const register = vi.fn(async () => ({ id: 2 }));

    const { result } = renderHook(() => useRegister({ register, schema }));

    act(() => result.current.update('email', 'not-an-email'));

    await act(async () => {
      await expect(result.current.submit()).rejects.toThrow();
    });

    expect(register).not.toHaveBeenCalled();
    expect(result.current.error).toBe('Registration failed. Please try again.');
    expect(result.current.loading).toBe(false);
  });

  it('sets error when register function throws', async () => {
    const register = vi.fn(async () => {
      throw new Error('Server error');
    });

    const { result } = renderHook(() => useRegister({ register }));

    await act(async () => {
      await expect(result.current.submit()).rejects.toThrow('Server error');
    });

    expect(result.current.error).toBe('Registration failed. Please try again.');
    expect(result.current.loading).toBe(false);
    expect(result.current.user).toBeNull();
  });

  it('starts with empty values and null state', () => {
    const register = vi.fn(async () => ({}));
    const { result } = renderHook(() => useRegister({ register }));

    expect(result.current.values).toEqual({});
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.user).toBeNull();
  });
});
