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

/**
 * A composable registration hook: manages form state, validation, submit, and loading/errors.
 */
export function useRegister<TUser = unknown>({ register, schema }: UseRegisterOptions<TUser>) {
  const [values, setValues] = useState<RegisterPayload>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<TUser | null>(null);

  function update<K extends string>(key: K, value: unknown) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  async function submit() {
    setError(null);
    setLoading(true);
    try {
      const payload = schema ? schema.parse(values) : values;
      const res = await register(payload);
      setUser(res);
      return res;
    } catch (e: any) {
      setError(e?.message ?? 'Registration failed');
      throw e;
    } finally {
      setLoading(false);
    }
  }

  return { values, update, submit, loading, error, user };
}

export default useRegister;
