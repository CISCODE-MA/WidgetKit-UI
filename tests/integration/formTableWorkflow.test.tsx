import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ControlledZodDynamicForm from '../../src/components/Form/ZodDynamicForm';
import TableDataCustom from '../../src/components/Table/TableDataCustom';
import { z } from 'zod';

describe('Form + Table Workflow', () => {
  it('submits form data and displays it in the table', () => {
    const schema = z.object({
      name: z.string().min(1, 'Name is required'),
      age: z.number().min(0, 'Age must be positive'),
    });

    const fields = [
      { name: 'name', label: 'Name', type: 'text' },
      { name: 'age', label: 'Age', type: 'number' },
    ];

    const initialValues = { name: '', age: 0 };
    const onSubmit = vi.fn();

    render(
      <div>
        <ControlledZodDynamicForm
          schema={schema}
          fields={fields}
          values={initialValues}
          onChangeField={(name, value) => (initialValues[name] = value)}
          onSubmit={(values) => {
            onSubmit(values);
            data.push(values);
          }}
        />
        <TableDataCustom
          columns={[
            { key: 'name', title: 'Name' },
            { key: 'age', title: 'Age' },
          ]}
          data={data}
        />
      </div>,
    );

    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Alice' } });
    fireEvent.change(screen.getByLabelText('Age'), { target: { value: '25' } });
    fireEvent.click(screen.getByText('Submit'));

    expect(onSubmit).toHaveBeenCalledWith({ name: 'Alice', age: 25 });
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument();
  });
});
