import { useState } from 'react';
import type { ZodSchema } from 'zod';

/**
 * Credentials payload for login.
 */
export type LoginCredentials = {
  username: string;
  password: string;
};

/**
 * Result returned by a login service.
 */
export type LoginResult<TUser = unknown> = {
  user: TUser;
  token?: string;
};

/**
 * Options for `useLogin`.
 * Provide a `login` function to integrate with your auth backend, and an optional Zod schema for validation.
 */
export type UseLoginOptions<TUser = unknown> = {
  login: (credentials: LoginCredentials) => Promise<LoginResult<TUser>>;
  schema?: ZodSchema<LoginCredentials>;
};

/**
 * A composable login hook: manages form state, validation, submit, and loading/errors.
 */
export function useLogin<TUser = unknown>({ login, schema }: UseLoginOptions<TUser>) {
  const [values, setValues] = useState<LoginCredentials>({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<LoginResult<TUser> | null>(null);

  function update<K extends keyof LoginCredentials>(key: K, value: LoginCredentials[K]) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  async function submit() {
    setError(null);
    setLoading(true);
    try {
      const input = schema ? schema.parse(values) : values;
      const res = await login(input);
      setResult(res);
      return res;
    } catch (e: any) {
      setError(e?.message ?? 'Login failed');
      throw e;
    } finally {
      setLoading(false);
    }
  }

  return { values, update, submit, loading, error, result };
}

export default useLogin;
