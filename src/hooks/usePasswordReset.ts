import { useState } from 'react';
import type { ZodSchema } from 'zod';

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
  schema?: ZodSchema<PasswordResetInput>;
};

export type UsePasswordResetReturn = {
  values: PasswordResetInput;
  update: <K extends keyof PasswordResetInput>(key: K, value: PasswordResetInput[K]) => void;
  submit: () => Promise<void>;
  loading: boolean;
  error: string | null;
  success: boolean;
};

/**
 * A composable password reset hook: manages form state, validation, submit, and loading/errors.
 */
export function usePasswordReset({
  reset,
  schema,
}: UsePasswordResetOptions): UsePasswordResetReturn {
  const [values, setValues] = useState<PasswordResetInput>({ email: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  function update<K extends keyof PasswordResetInput>(key: K, value: PasswordResetInput[K]): void {
    setValues((v) => ({ ...v, [key]: value }));
  }

  async function submit(): Promise<void> {
    setError(null);
    setSuccess(false);
    setLoading(true);
    try {
      const input = schema ? schema.parse(values) : values;
      await reset(input);
      setSuccess(true);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Password reset failed';
      setError(message);
      throw e;
    } finally {
      setLoading(false);
    }
  }

  return { values, update, submit, loading, error, success };
}

export default usePasswordReset;
