import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ControlledZodDynamicForm from '../../../../src/components/Form/ZodDynamicForm';
import type { FieldConfigDynamicForm } from '../../../../src/models/FieldConfigDynamicForm';
import { z } from 'zod';

vi.mock('react-select', () => ({
  default: ({ options, onChange, value }: any) => (
    <div data-testid="mock-select">
      {options.map((o: any) => (
        <button
          key={o.value}
          onClick={() => onChange([...(Array.isArray(value) ? value : []), o])}
        >
          {o.label}
        </button>
      ))}
    </div>
  ),
}));

function Harness({
  schema,
  fields,
  initialValues,
  onSubmit,
  header,
  submitLabel,
}: {
  schema: any;
  fields: FieldConfigDynamicForm[];
  initialValues: Record<string, any>;
  onSubmit: (values: Record<string, any>) => void;
  header?: React.ReactNode;
  submitLabel?: string;
}) {
  const [values, setValues] = React.useState(initialValues);
  return (
    <ControlledZodDynamicForm
      schema={schema}
      fields={fields}
      values={values}
      onChangeField={(name, val) => setValues((v) => ({ ...v, [name]: val }))}
      onSubmit={onSubmit}
      submitLabel={submitLabel ?? 'Save'}
      header={header}
    />
  );
}

const schema = z.object({ val: z.string().min(1) });

describe('ControlledZodDynamicForm field types', () => {
  it('renders and submits a textarea field', () => {
    const fields: FieldConfigDynamicForm[] = [
      { name: 'val', label: 'Notes', type: 'textarea', placeholder: 'Write here' },
    ];
    const onSubmit = vi.fn();
    render(<Harness schema={schema} fields={fields} initialValues={{ val: '' }} onSubmit={onSubmit} />);

    const textarea = screen.getByLabelText('Notes');
    fireEvent.change(textarea, { target: { value: 'hello' } });
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));
    expect(onSubmit).toHaveBeenCalledWith({ val: 'hello' });
  });

  it('renders and submits a select field', () => {
    const fields: FieldConfigDynamicForm[] = [
      {
        name: 'val',
        label: 'Color',
        type: 'select',
        options: [{ label: 'Red', value: 'red' }, { label: 'Blue', value: 'blue' }],
      },
    ];
    const onSubmit = vi.fn();
    render(<Harness schema={schema} fields={fields} initialValues={{ val: '' }} onSubmit={onSubmit} />);

    fireEvent.change(screen.getByLabelText('Color'), { target: { value: 'red' } });
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));
    expect(onSubmit).toHaveBeenCalledWith({ val: 'red' });
  });

  it('renders a multiSelect field and selects an option', () => {
    const fields: FieldConfigDynamicForm[] = [
      {
        name: 'tags',
        label: 'Tags',
        type: 'multiSelect',
        options: [{ label: 'JS', value: 'js' }, { label: 'TS', value: 'ts' }],
      },
    ];
    const multiSchema = z.object({ tags: z.array(z.string()) });
    const onSubmit = vi.fn();
    render(<Harness schema={multiSchema} fields={fields} initialValues={{ tags: [] }} onSubmit={onSubmit} />);

    fireEvent.click(screen.getByText('JS'));
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));
    expect(onSubmit).toHaveBeenCalledWith({ tags: ['js'] });
  });

  it('renders custom field — shows error when component is missing', () => {
    const fields: FieldConfigDynamicForm[] = [
      { name: 'val', label: 'Custom', type: 'custom' }, // no component
    ];
    const onSubmit = vi.fn();
    render(<Harness schema={schema} fields={fields} initialValues={{ val: 'x' }} onSubmit={onSubmit} />);
    expect(screen.getByText(/Missing component for custom field/)).toBeInTheDocument();
  });

  it('renders custom field with a component', () => {
    const CustomInput = ({ value, onChange }: any) => (
      <input data-testid="custom-input" value={value as string} onChange={(e) => onChange(e.target.value)} />
    );
    const fields: FieldConfigDynamicForm[] = [
      { name: 'val', label: 'Custom', type: 'custom', component: CustomInput },
    ];
    const onSubmit = vi.fn();
    render(<Harness schema={schema} fields={fields} initialValues={{ val: '' }} onSubmit={onSubmit} />);
    fireEvent.change(screen.getByTestId('custom-input'), { target: { value: 'test' } });
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));
    expect(onSubmit).toHaveBeenCalledWith({ val: 'test' });
  });

  it('renders header slot when provided', () => {
    const fields: FieldConfigDynamicForm[] = [{ name: 'val', label: 'Val', type: 'text' }];
    const onSubmit = vi.fn();
    render(
      <Harness
        schema={schema}
        fields={fields}
        initialValues={{ val: 'x' }}
        onSubmit={onSubmit}
        header={<h2>Form Header</h2>}
      />,
    );
    expect(screen.getByText('Form Header')).toBeInTheDocument();
  });

  it('shows validation errors on invalid submit', () => {
    const fields: FieldConfigDynamicForm[] = [{ name: 'val', label: 'Val', type: 'text' }];
    const onSubmit = vi.fn();
    render(<Harness schema={schema} fields={fields} initialValues={{ val: '' }} onSubmit={onSubmit} />);
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));
    expect(onSubmit).not.toHaveBeenCalled();
    // Error block should be visible in the DOM
    expect(document.getElementById('form-errors')).toBeTruthy();
  });

  it('renders a number field with step', () => {
    const numSchema = z.object({ qty: z.number().min(0) });
    const fields: FieldConfigDynamicForm[] = [
      { name: 'qty', label: 'Qty', type: 'number', step: '0.5' },
    ];
    const onSubmit = vi.fn();
    render(<Harness schema={numSchema} fields={fields} initialValues={{ qty: 0 }} onSubmit={onSubmit} />);
    const input = screen.getByLabelText('Qty') as HTMLInputElement;
    expect(input.step).toBe('0.5');
    fireEvent.change(input, { target: { value: '2.5' } });
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));
    expect(onSubmit).toHaveBeenCalledWith({ qty: 2.5 });
  });

  it('renders a multiSelect with pre-selected value that is not in options (fallback)', () => {
    const fields: FieldConfigDynamicForm[] = [
      {
        name: 'tags',
        label: 'Tags',
        type: 'multiSelect',
        options: [{ label: 'JS', value: 'js' }],
      },
    ];
    const multiSchema = z.object({ tags: z.array(z.string()) });
    const onSubmit = vi.fn();
    // 'unknown-tag' not in options → triggers fallback label logic
    render(<Harness schema={multiSchema} fields={fields} initialValues={{ tags: ['unknown-tag'] }} onSubmit={onSubmit} />);
    expect(screen.getByTestId('mock-select')).toBeInTheDocument();
  });
});
