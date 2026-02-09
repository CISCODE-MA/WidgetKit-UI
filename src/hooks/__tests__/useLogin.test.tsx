import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useLogin } from '../../hooks/useLogin';
import { z } from 'zod';

describe('useLogin', () => {
  it('updates fields and performs submit with result', async () => {
    const login = async (credentials: { username: string; password: string }) => {
      return { user: { name: credentials.username }, token: 't123' };
    };
    const schema = z.object({
      username: z.string(),
      password: z.string(),
    });

    const { result } = renderHook(() => useLogin({ login, schema }));

    act(() => result.current.update('username', 'alice'));
    act(() => result.current.update('password', 'secret'));

    await act(async () => {
      const res = await result.current.submit();
      expect(res.user).toMatchObject({ name: 'alice' });
      expect(res.token).toBe('t123');
    });

    expect(result.current.error).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.result?.token).toBe('t123');
  });
});
