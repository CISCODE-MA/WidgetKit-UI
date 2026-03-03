import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ControlledZodDynamicForm from '../../src/components/Form/ZodDynamicForm';
import TableDataCustom from '../../src/components/Table/TableDataCustom';
import { z } from 'zod';
import React, { useState } from 'react';
import type { FieldConfigDynamicForm } from '../../src/models/FieldConfigDynamicForm';

describe('Form + Table Workflow', () => {
  it('submits form data and displays it in the table', () => {
    const schema = z.object({
      name: z.string().min(1, 'Name is required'),
      age: z.number().min(0, 'Age must be positive'),
    });

    const fields: FieldConfigDynamicForm[] = [
      { name: 'name', label: 'Name', type: 'text' },
      { name: 'age', label: 'Age', type: 'number' },
    ];

    type InitialValues = { name: string; age: number };
    const initialValues: InitialValues = { name: '', age: 0 };
    const onSubmit = vi.fn();

    const TestComponent = () => {
      const [data, setData] = useState<Array<{ name: string; age: number }>>([]);

      return (
        <div>
          <ControlledZodDynamicForm
            schema={schema}
            fields={fields}
            values={initialValues}
            onChangeField={(fieldName: string, value: unknown) => {
              if (
                fieldName in initialValues &&
                (typeof value === 'string' || typeof value === 'number')
              ) {
                initialValues[fieldName as keyof InitialValues] = value as never;
              }
            }}
            onSubmit={(parsedValues: Record<string, unknown>) => {
              const values = parsedValues as { name: string; age: number };
              onSubmit(values);
              setData((prevData) => [...prevData, values]);
            }}
          />
          <TableDataCustom
            columns={[
              { key: 'name', title: 'Name' },
              { key: 'age', title: 'Age' },
            ]}
            data={data}
          />
        </div>
      );
    };

    render(<TestComponent />);

    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Alice' } });
    fireEvent.change(screen.getByLabelText('Age'), { target: { value: '25' } });
    fireEvent.click(screen.getByText('Submit'));

    expect(onSubmit).toHaveBeenCalledWith({ name: 'Alice', age: 25 });
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument();
  });
});
