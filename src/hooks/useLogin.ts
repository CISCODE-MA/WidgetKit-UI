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

export type UseLoginReturn<TUser = unknown> = {
  values: LoginCredentials;
  update: <K extends keyof LoginCredentials>(key: K, value: LoginCredentials[K]) => void;
  submit: () => Promise<LoginResult<TUser>>;
  loading: boolean;
  error: string | null;
  result: LoginResult<TUser> | null;
};

/**
 * A composable login hook: manages form state, validation, submit, and loading/errors.
 */
export function useLogin<TUser = unknown>({
  login,
  schema,
}: UseLoginOptions<TUser>): UseLoginReturn<TUser> {
  const [values, setValues] = useState<LoginCredentials>({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<LoginResult<TUser> | null>(null);

  function update<K extends keyof LoginCredentials>(key: K, value: LoginCredentials[K]): void {
    setValues((v) => ({ ...v, [key]: value }));
  }

  async function submit(): Promise<LoginResult<TUser>> {
    setError(null);
    setLoading(true);
    try {
      const input = schema ? schema.parse(values) : values;
      const res = await login(input);
      setResult(res);
      return res;
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Login failed';
      setError(message);
      throw e;
    } finally {
      setLoading(false);
    }
  }

  return { values, update, submit, loading, error, result };
}

export default useLogin;
