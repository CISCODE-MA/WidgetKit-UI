import type { ComponentType } from 'react';

/** The list of supported field types. */
type FieldType = 'text' | 'number' | 'textarea' | 'select' | 'checkbox' | 'multiSelect' | 'custom';

/** For select-type fields, each option has a label and a value. */
interface FieldOption {
  label: string;
  value: string | number;
}

/**
 * Describes each field in your dynamic form:
 * - name, label, type, (optionally) placeholder, options, etc.
 * - if "type" is "custom", you can supply a "component"
 *   that the form will render directly.
 */
export interface FieldConfigDynamicForm {
  /** Unique field name => used to store the value in state, reference in Zod schema, etc. */
  name: string;
  /** The label displayed above or next to the input. */
  label?: string;
  /** Type of input: text, number, textarea, select, checkbox, multiSelect, or custom. */
  type: FieldType;
  /** Optional placeholder text for text/textarea/number fields. */
  placeholder?: string;
  /** For select or multiSelect, an array of label/value pairs. */
  options?: FieldOption[];
  /** Default initial value (e.g. '', 0, [], etc.). */
  defaultValue?: unknown;
  /** For multiSelect or custom logic, an optional URL for searching. */
  /**
   * If `type` is 'custom', you can specify a React component
   * that the form will render. This component should accept
   * props like { value: unknown, onChange: (val: unknown) => void } at minimum.
   */
  component?: ComponentType<Record<string, unknown>>;
  // Add a `step` property for numeric fields
  step?: string;
  /**
   * Tailwind classes for the field wrapper (the <div>).
   * e.g. "w-1/2 px-2" or "col-span-2" or "flex-1"
   */
  wrapperClassName?: string;

  /**
   * If you want custom classes for the <label>, <input>, etc.
   */
  labelClassName?: string;
  inputClassName?: string;
  // add an optional props property:
  props?: Record<string, unknown>;
}
