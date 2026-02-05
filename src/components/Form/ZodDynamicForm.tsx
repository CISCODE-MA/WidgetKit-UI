import React, { useState } from 'react';
import { ZodSchema, ZodError } from 'zod';
import { MultiValue } from 'react-select';
import Select from 'react-select';
import { FieldConfigDynamicForm } from '../../models/FieldConfigDynamicForm';

export interface ControlledZodDynamicFormProps {
  schema: ZodSchema<any>;
  fields: FieldConfigDynamicForm[];
  values: Record<string, any>;
  onChangeField: (fieldName: string, newValue: any) => void;
  onSubmit: (parsedValues: Record<string, any>) => void;
  submitLabel?: string;
  header?: React.ReactNode;
  /** Optional override for the ZodError class (for dependency injection) */
}

export default function ControlledZodDynamicForm({
  schema,
  fields,
  values,
  onChangeField,
  onSubmit,
  submitLabel = 'Submit',
  header,
}: ControlledZodDynamicFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  /**
   * Handler for standard text/textarea/select/checkbox inputs.
   * Uses a type guard so we can safely read e.target.checked if it's a checkbox.
   */
  function handleInputChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const { name, value, type } = e.target;
    let newValue: any = value;

    // type guard for checkbox
    if (type === 'checkbox' && e.target instanceof HTMLInputElement) {
      newValue = e.target.checked;
    } else if (type === 'number') {
      newValue = parseFloat(value) || 0;
    }
    onChangeField(name, newValue);
  }

  /**
   * On form submit => parse the entire `values` with Zod.
   * If it fails, store the error messages in local state to display.
   */
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      // Attempt to parse the entire form data with Zod
      const parsed = schema.parse(values);
      // If success, call parent
      onSubmit(parsed);
    } catch (err) {
      if (err instanceof ZodError) {
        // Build a record of errors for simpler fields
        const newErrors: Record<string, string> = {};

        // Check if any error is specifically for "details" path
        let detailsErrorFound = false;

        err.errors.forEach((issue) => {
          const pathKey = issue.path.join('.');
          newErrors[pathKey] = issue.message;

          // If the path starts with "details", we assume it's a problem with details
          if (issue.path[0] === 'details') {
            detailsErrorFound = true;
          }
        });

        // If there's an error in "details", show an alert
        if (detailsErrorFound) {
          alert('Please fill out all required fields in Details.');
        }

        setErrors(newErrors);
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* header */}
      {header && <div className="mb-4">{header}</div>}

      {/* form */}
      {fields.map((field) => {
        const fieldError = errors[field.name];
        const fieldValue = values[field.name] ?? '';

        return (
          <div key={field.name} className="mb-4">
            <label htmlFor={field.name} className="block mb-1 font-medium text-gray-700">
              {field.label}
            </label>

            {(() => {
              switch (field.type) {
                case 'textarea':
                  return (
                    <textarea
                      id={field.name}
                      name={field.name}
                      placeholder={field.placeholder}
                      value={fieldValue}
                      onChange={handleInputChange}
                      className="border border-gray-300 rounded-lg px-3 py-2 w-full ltr:text-left rtl:text-right"
                    />
                  );

                case 'select':
                  return (
                    <select
                      id={field.name}
                      name={field.name}
                      value={fieldValue}
                      onChange={handleInputChange}
                      className="border border-gray-300 rounded-lg px-3 py-2 w-full ltr:text-left rtl:text-right"
                    >
                      <option value="">-- Select an option --</option>
                      {field.options?.map((opt) => (
                        <option key={String(opt.value)} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  );

                case 'checkbox':
                  return (
                    <input
                      id={field.name}
                      name={field.name}
                      type="checkbox"
                      checked={!!fieldValue}
                      onChange={handleInputChange}
                      className="h-5 w-5 border-gray-300 rounded"
                    />
                  );

                case 'multiSelect': {
                  // We assume `field.options` is an array of { label: string, value: string }.
                  const multiOpts = field.options ?? [];
                  // The user’s current selection is an array of IDs => find the matching option or fallback
                  const selectedValues = Array.isArray(fieldValue)
                    ? fieldValue.map((id: string) => {
                        const found = multiOpts.find((o) => o.value === id);
                        if (found) return found;
                        // fallback => ensures a unique string value
                        return {
                          label: String(id) || '???',
                          value: String(id),
                        };
                      })
                    : [];

                  return (
                    <Select
                      isMulti
                      options={multiOpts}
                      value={selectedValues}
                      onChange={(selected) => {
                        // selected: array of { label, value }
                        const arrIds = (
                          selected as MultiValue<{
                            label: string;
                            value: string;
                          }>
                        ).map((opt) => opt.value);
                        onChangeField(field.name, arrIds);
                      }}
                      className="w-full"
                    />
                  );
                }
                case 'custom': {
                  const CustomComp = field.component; // e.g. DetailsManager
                  if (!CustomComp) {
                    return (
                      <p key={field.name} style={{ color: 'red' }}>
                        Missing component for custom field: {field.name}
                      </p>
                    );
                  }

                  // Get nested errors for field "details" or whatever the field's name is
                  const subErrors = findNestedErrors(errors, field.name);
                  // subErrors might look like { 0: { grams: "Error message" }, 1: { price: "Error" } }

                  return (
                    <CustomComp
                      key={field.name}
                      value={fieldValue}
                      onChange={(newVal: any) => onChangeField(field.name, newVal)}
                      errors={subErrors}
                      {...field.props}
                      // optionally pass more props if needed
                    />
                  );
                }

                default:
                  // text or number
                  return (
                    <input
                      id={field.name}
                      name={field.name}
                      type={field.type === 'number' ? 'number' : 'text'}
                      step={field.step || '1'} // fallback if no step is provided
                      placeholder={field.placeholder}
                      value={fieldValue}
                      onChange={handleInputChange}
                      className="border border-gray-300 rounded-lg px-3 py-2 w-full ltr:text-left rtl:text-right"
                    />
                  );
              }
            })()}

            {fieldError && <p className="mt-1 text-sm text-red-600">{fieldError}</p>}
          </div>
        );
      })}

      <div className="ltr:text-right rtl:text-left">
        <button
          type="submit"
          className="inline-block px-5 py-2 bg-indigo-600 text-white rounded-md"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}

//Show erros validation
export function findNestedErrors(
  allErrors: Record<string, string>,
  rootField: string,
): Record<number, Record<string, string>> {
  const nested: Record<number, Record<string, string>> = {};

  // For each key => e.g. "details.0.grams"
  for (const key in allErrors) {
    if (key.startsWith(`${rootField}.`)) {
      // remove "details." => "0.grams"
      const subPath = key.slice(rootField.length + 1); // e.g. "0.grams"
      const [indexStr, fieldName] = subPath.split('.');
      const index = parseInt(indexStr, 10);

      if (!isNaN(index)) {
        if (!nested[index]) {
          nested[index] = {};
        }
        nested[index][fieldName] = allErrors[key];
      }
    }
  }

  return nested;
}
