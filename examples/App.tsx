import React, { useState } from 'react';
import {
  Breadcrumb,
  TableDataCustom,
  ControlledZodDynamicForm,
  type ColumnConfigTable,
  type FieldConfigDynamicForm,
  type ToolbarItem,
} from '@ciscode/template-fe';
import { z } from 'zod';

export default function App() {
  type Row = { id: number; name: string };
  // form schema and state must be declared at component scope for hooks compliance
  const schema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email'),
  });
  const fields: FieldConfigDynamicForm[] = [
    { key: 'name', label: 'Name', type: 'text' },
    { key: 'email', label: 'Email', type: 'email' },
  ];
  const [formValues, setFormValues] = useState<{ name: string; email: string }>({
    name: '',
    email: '',
  });
  const columns: ColumnConfigTable<Row>[] = [
    { key: 'id', title: 'ID' },
    { key: 'name', title: 'Name' },
    {
      key: 'id',
      title: 'Actions',
      render: (_val, row, setPopover) => (
        <button
          className="px-2 py-1 border rounded"
          onClick={(e) =>
            setPopover({
              anchor: e.currentTarget,
              content: (
                <div className="p-3">
                  <strong>Row details</strong>
                  <div>ID: {row.id}</div>
                  <div>Name: {row.name}</div>
                </div>
              ),
            })
          }
        >
          Info
        </button>
      ),
    },
  ];
  const data: Row[] = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
  ];
  const toolbarItems: ToolbarItem[] = [
    {
      position: 'left',
      visible: true,
      node: <button className="px-3 py-2 border rounded">Export</button>,
    },
    {
      position: 'right',
      visible: true,
      node: <button className="px-3 py-2 border rounded">Settings</button>,
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Breadcrumb pageName="Examples" />
      <div style={{ marginTop: 16 }}>
        <TableDataCustom<Row>
          columns={columns}
          data={data}
          toolbarItems={toolbarItems}
          pagination={{
            currentPage: 1,
            totalPages: 1,
            totalItems: data.length,
            onPageChange: (p) => console.log('page', p),
          }}
        />
      </div>

      <hr style={{ margin: '24px 0' }} />
      <h2>ControlledZodDynamicForm</h2>
      <p>Simple required-field form using Zod.</p>
      <div style={{ marginTop: 12 }}>
        <ControlledZodDynamicForm
          fields={fields}
          schema={schema}
          values={formValues}
          onChangeField={(field, val) => setFormValues((prev) => ({ ...prev, [field]: val }))}
          onSubmit={(values) => alert(JSON.stringify(values))}
        />
      </div>
    </div>
  );
}
