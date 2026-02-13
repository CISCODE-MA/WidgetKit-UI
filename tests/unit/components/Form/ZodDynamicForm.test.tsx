import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ControlledZodDynamicForm from '../../../../src/components/Form/ZodDynamicForm';
import type { FieldConfigDynamicForm } from '../../../../src/models/FieldConfigDynamicForm';
import { z } from 'zod';

describe('ControlledZodDynamicForm', () => {
  function Harness({
    schema,
    fields,
    initialValues,
    onSubmit,
  }: {
    schema: any;
    fields: FieldConfigDynamicForm[];
    initialValues: Record<string, any>;
    onSubmit: (values: Record<string, any>) => void;
  }) {
    const [values, setValues] = React.useState(initialValues);
    return (
      <ControlledZodDynamicForm
        schema={schema}
        fields={fields}
        values={values}
        onChangeField={(name, val) => setValues((v) => ({ ...v, [name]: val }))}
        onSubmit={onSubmit}
        submitLabel="Save"
      />
    );
  }

  it('submits parsed values when valid', () => {
    const fields: FieldConfigDynamicForm[] = [
      { name: 'name', label: 'Name', type: 'text' },
      { name: 'age', label: 'Age', type: 'number' },
      { name: 'agree', label: 'Agree', type: 'checkbox' },
    ];

    const schema = z.object({
      name: z.string().min(1),
      age: z.number().min(0),
      agree: z.boolean(),
    });

    const onSubmit = vi.fn();

    render(
      <Harness
        schema={schema}
        fields={fields}
        initialValues={{ name: '', age: 0, agree: false }}
        onSubmit={onSubmit}
      />,
    );

    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Alice' } });
    fireEvent.change(screen.getByLabelText('Age'), { target: { value: '5' } });
    fireEvent.click(screen.getByLabelText('Agree'));

    fireEvent.click(screen.getByRole('button', { name: 'Save' }));

    expect(onSubmit).toHaveBeenCalledWith({ name: 'Alice', age: 5, agree: true });
  });

  it('alerts on details errors and passes nested errors to custom component', () => {
    // Accept all props as Record<string, unknown> to match FieldConfigDynamicForm.component type
    const DetailsStub = (props: Record<string, unknown>) => {
      const errors = props.errors as Record<number, Record<string, string>> | undefined;
      return <div data-testid="details-errors">{Object.keys(errors || {}).length}</div>;
    };

    const fields: FieldConfigDynamicForm[] = [
      { name: 'details', label: 'Details', type: 'custom', component: DetailsStub },
    ];

    const schema = z.object({
      details: z.array(z.object({ grams: z.number().positive() })),
    });

    const onSubmit = vi.fn();
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

    const { container } = render(
      <Harness
        schema={schema}
        fields={fields}
        initialValues={{ details: [{ grams: 0 }] }}
        onSubmit={onSubmit}
      />,
    );

    const { getByRole, getByTestId } = require('@testing-library/dom').within(container);
    fireEvent.click(getByRole('button', { name: 'Save' }));

    expect(alertSpy).toHaveBeenCalledWith('Please fill out all required fields in Details.');
    expect(getByTestId('details-errors').textContent).toBe('1');
    expect(onSubmit).not.toHaveBeenCalled();
  });
});
