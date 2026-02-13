import { useState } from 'react';
import type { ZodSchema } from 'zod';

/**
 * Generic registration payload.
 */
export type RegisterPayload = Record<string, unknown>;

/**
 * Options for `useRegister`.
 */
export type UseRegisterOptions<TUser = unknown> = {
  register: (payload: RegisterPayload) => Promise<TUser>;
  schema?: ZodSchema<RegisterPayload>;
};

export type UseRegisterReturn<TUser = unknown> = {
  values: RegisterPayload;
  update: <K extends string>(key: K, value: unknown) => void;
  submit: () => Promise<TUser>;
  loading: boolean;
  error: string | null;
  user: TUser | null;
};

/**
 * A composable registration hook: manages form state, validation, submit, and loading/errors.
 */
export function useRegister<TUser = unknown>({
  register,
  schema,
}: UseRegisterOptions<TUser>): UseRegisterReturn<TUser> {
  const [values, setValues] = useState<RegisterPayload>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<TUser | null>(null);

  function update<K extends string>(key: K, value: unknown): void {
    setValues((v) => ({ ...v, [key]: value }));
  }

  async function submit(): Promise<TUser> {
    setError(null);
    setLoading(true);
    try {
      const payload = schema ? schema.parse(values) : values;
      const res = await register(payload);
      setUser(res);
      return res;
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Registration failed';
      setError(message);
      throw e;
    } finally {
      setLoading(false);
    }
  }

  return { values, update, submit, loading, error, user };
}

export default useRegister;
