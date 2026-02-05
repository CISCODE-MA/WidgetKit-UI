import { useState } from 'react';
// Optional schema interface to avoid hard dependency on zod
export type ParseSchema<T> = { parse: (input: T) => T };

/**
 * Password reset input: allow email or username.
 */
export type PasswordResetInput = {
  email?: string;
  username?: string;
};

/**
 * Options for `usePasswordReset`.
 */
export type UsePasswordResetOptions = {
  reset: (input: PasswordResetInput) => Promise<void>;
  schema?: ParseSchema<PasswordResetInput>;
};

/**
 * A composable password reset hook: manages form state, validation, submit, and loading/errors.
 */
export function usePasswordReset({ reset, schema }: UsePasswordResetOptions) {
  const [values, setValues] = useState<PasswordResetInput>({ email: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  function update<K extends keyof PasswordResetInput>(key: K, value: PasswordResetInput[K]) {
    setValues((v: PasswordResetInput) => ({ ...v, [key]: value }));
  }

  async function submit() {
    setError(null);
    setSuccess(false);
    setLoading(true);
    try {
      const input = schema ? schema.parse(values) : values;
      await reset(input);
      setSuccess(true);
    } catch (e: any) {
      setError(e?.message ?? 'Password reset failed');
      throw e;
    } finally {
      setLoading(false);
    }
  }

  return { values, update, submit, loading, error, success };
}

export default usePasswordReset;
