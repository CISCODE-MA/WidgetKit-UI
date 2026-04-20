import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TableDataCustomBase from '../../../../src/components/Table/TableDataCustomBase';
import type { ColumnConfigTable } from '../../../../src/models/ColumnConfigTable';

vi.mock('@ciscode/ui-translate-core', () => ({
  useT: () => (key: string, vars?: Record<string, unknown>) => {
    if (key === 'table.noData') return 'No data';
    if (key === 'table.filter') return 'Filter…';
    if (key === 'table.pagination.previous') return 'Previous';
    if (key === 'table.pagination.next') return 'Next';
    if (key === 'table.pagination.showing')
      return `Showing ${vars?.from}-${vars?.to} of ${vars?.total}`;
    return String(key);
  },
  Trans: ({ children }: { children: unknown }) => children,
}));

type Row = { id: number; name: string; age: number };
const columns: ColumnConfigTable<Row>[] = [
  { key: 'id', title: 'ID', sortable: true },
  { key: 'name', title: 'Name', sortable: true, filterable: true },
  { key: 'age', title: 'Age', sortable: true },
];
const data: Row[] = [
  { id: 1, name: 'Alice', age: 30 },
  { id: 2, name: 'Bob', age: 25 },
  { id: 3, name: 'Charlie', age: 35 },
];

describe('TableDataCustomBase features', () => {
  // ─── Sorting ──────────────────────────────────────────────────────────────
  it('sorts rows ascending on header click', () => {
    render(<TableDataCustomBase<Row> columns={columns} data={data} enableSorting />);
    const nameHeader = screen.getByText('Name');
    fireEvent.click(nameHeader);
    const rows = screen.getAllByRole('row').slice(1); // skip thead
    expect(rows[0]).toHaveTextContent('Alice');
    expect(rows[1]).toHaveTextContent('Bob');
    expect(rows[2]).toHaveTextContent('Charlie');
  });

  it('sorts rows descending on second header click', () => {
    render(<TableDataCustomBase<Row> columns={columns} data={data} enableSorting />);
    const nameHeader = screen.getByText('Name');
    fireEvent.click(nameHeader);
    fireEvent.click(nameHeader);
    const rows = screen.getAllByRole('row').slice(1);
    expect(rows[0]).toHaveTextContent('Charlie');
    expect(rows[rows.length - 1]).toHaveTextContent('Alice');
  });

  it('does not sort when enableSorting is false', () => {
    render(<TableDataCustomBase<Row> columns={columns} data={data} />);
    const nameHeader = screen.getByText('Name');
    fireEvent.click(nameHeader); // should do nothing
    const rows = screen.getAllByRole('row').slice(1);
    expect(rows[0]).toHaveTextContent('Alice');
  });

  it('uses custom sortComparator', () => {
    const customColumns: ColumnConfigTable<Row>[] = [
      {
        key: 'age',
        title: 'Age',
        sortable: true,
        sortComparator: (a, b) => (a as number) - (b as number),
      },
    ];
    render(<TableDataCustomBase<Row> columns={customColumns} data={data} enableSorting />);
    fireEvent.click(screen.getByText('Age'));
    const rows = screen.getAllByRole('row').slice(1);
    expect(rows[0]).toHaveTextContent('25');
    expect(rows[2]).toHaveTextContent('35');
  });

  // ─── Filtering ────────────────────────────────────────────────────────────
  it('filters rows by internal query', () => {
    render(<TableDataCustomBase<Row> columns={columns} data={data} enableFilter />);
    const input = screen.getByPlaceholderText('Filter…');
    fireEvent.change(input, { target: { value: 'bob' } });
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.queryByText('Alice')).toBeNull();
  });

  it('filters with controlled filterQuery prop', () => {
    const onFilterQueryChange = vi.fn();
    const { rerender } = render(
      <TableDataCustomBase<Row>
        columns={columns}
        data={data}
        enableFilter
        filterQuery="alice"
        onFilterQueryChange={onFilterQueryChange}
      />,
    );
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.queryByText('Bob')).toBeNull();

    // typing triggers the callback, not internal state
    const input = screen.getByPlaceholderText('Filter…');
    fireEvent.change(input, { target: { value: 'bob' } });
    expect(onFilterQueryChange).toHaveBeenCalledWith('bob');

    // rerender with new prop
    rerender(
      <TableDataCustomBase<Row>
        columns={columns}
        data={data}
        enableFilter
        filterQuery="bob"
        onFilterQueryChange={onFilterQueryChange}
      />,
    );
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });

  it('uses custom filterPredicate', () => {
    const customCols: ColumnConfigTable<Row>[] = [
      {
        key: 'age',
        title: 'Age',
        filterable: true,
        filterPredicate: (_v, row, q) => row.age > Number(q),
      },
    ];
    render(<TableDataCustomBase<Row> columns={customCols} data={data} enableFilter />);
    const input = screen.getByPlaceholderText('Filter…');
    fireEvent.change(input, { target: { value: '30' } });
    expect(screen.queryByText('Alice')).toBeNull(); // age 30 not > 30
    expect(screen.getByText('35')).toBeInTheDocument();
  });

  // ─── Selection ────────────────────────────────────────────────────────────
  it('renders checkboxes when enableSelection is true', () => {
    render(<TableDataCustomBase<Row> columns={columns} data={data} enableSelection />);
    const checkboxes = screen.getAllByRole('checkbox');
    // 1 select-all + 3 row checkboxes
    expect(checkboxes).toHaveLength(4);
  });

  it('select-all checks all rows and triggers onSelectionChange', () => {
    const onSelectionChange = vi.fn();
    render(
      <TableDataCustomBase<Row>
        columns={columns}
        data={data}
        enableSelection
        onSelectionChange={onSelectionChange}
      />,
    );
    const [selectAll] = screen.getAllByRole('checkbox');
    fireEvent.click(selectAll);
    expect(onSelectionChange).toHaveBeenCalledWith(data, [0, 1, 2]);
  });

  it('individual row checkbox toggles selection', () => {
    const onSelectionChange = vi.fn();
    render(
      <TableDataCustomBase<Row>
        columns={columns}
        data={data}
        enableSelection
        onSelectionChange={onSelectionChange}
      />,
    );
    const [, row1Checkbox] = screen.getAllByRole('checkbox');
    fireEvent.click(row1Checkbox);
    expect(onSelectionChange).toHaveBeenCalledWith([data[0]], [0]);

    // uncheck
    fireEvent.click(row1Checkbox);
    expect(onSelectionChange).toHaveBeenCalledWith([], []);
  });

  // ─── Toolbar ──────────────────────────────────────────────────────────────
  it('renders toolbar items on left and right', () => {
    render(
      <TableDataCustomBase<Row>
        columns={columns}
        data={data}
        toolbarItems={[
          { node: <span>LeftBtn</span>, position: 'left' },
          { node: <span>RightBtn</span>, position: 'right' },
          { node: <span>HiddenBtn</span>, visible: false },
        ]}
      />,
    );
    expect(screen.getByText('LeftBtn')).toBeInTheDocument();
    expect(screen.getByText('RightBtn')).toBeInTheDocument();
    expect(screen.queryByText('HiddenBtn')).toBeNull();
  });

  // ─── Multi-key columns ────────────────────────────────────────────────────
  it('renders multi-key column values joined', () => {
    const multiCols: ColumnConfigTable<Row>[] = [{ key: ['name', 'age'], title: 'Info' }];
    render(<TableDataCustomBase<Row> columns={multiCols} data={[data[0]]} />);
    expect(screen.getByText('Alice - 30')).toBeInTheDocument();
  });

  it('renders multi-key column with custom render', () => {
    const multiCols: ColumnConfigTable<Row>[] = [
      { key: ['name', 'age'], title: 'Info', render: (vals) => <span>{String(vals)}</span> },
    ];
    render(<TableDataCustomBase<Row> columns={multiCols} data={[data[0]]} />);
    expect(screen.getByText('Alice,30')).toBeInTheDocument();
  });

  // ─── Inline editing ───────────────────────────────────────────────────────
  function renderInlineEdit(onCellEdit = vi.fn()) {
    const editCols: ColumnConfigTable<Row>[] = [{ key: 'name', title: 'Name', editable: true }];
    render(
      <TableDataCustomBase<Row>
        columns={editCols}
        data={[data[0]]}
        enableInlineEdit
        onCellEdit={onCellEdit}
      />,
    );
    fireEvent.dblClick(screen.getByText('Alice').closest('div')!);
    return { onCellEdit, input: screen.getByDisplayValue('Alice') };
  }

  it('enables inline edit on double-click and commits on blur', () => {
    const { onCellEdit, input } = renderInlineEdit();
    fireEvent.change(input, { target: { value: 'Alicia' } });
    fireEvent.blur(input);
    expect(onCellEdit).toHaveBeenCalledWith(0, 'name', 'Alicia', data[0]);
  });

  it('cancels inline edit on Escape', () => {
    const { onCellEdit, input } = renderInlineEdit();
    fireEvent.change(input, { target: { value: 'Changed' } });
    fireEvent.keyDown(input, { key: 'Escape' });
    expect(onCellEdit).not.toHaveBeenCalled();
    expect(screen.getByText('Alice')).toBeInTheDocument();
  });

  it('commits inline edit on Enter', () => {
    const { onCellEdit, input } = renderInlineEdit();
    fireEvent.change(input, { target: { value: 'Alicia' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onCellEdit).toHaveBeenCalledWith(0, 'name', 'Alicia', data[0]);
  });

  it('renders custom editor when provided', () => {
    const onCellEdit = vi.fn();
    const editCols: ColumnConfigTable<Row>[] = [
      {
        key: 'name',
        title: 'Name',
        editable: true,
        editor: ({ value, onCommit }) => (
          <button onClick={() => onCommit()}>Custom: {String(value)}</button>
        ),
      },
    ];
    render(
      <TableDataCustomBase<Row>
        columns={editCols}
        data={[data[0]]}
        enableInlineEdit
        onCellEdit={onCellEdit}
      />,
    );
    const cell = screen.getByText('Alice').closest('div')!;
    fireEvent.dblClick(cell);
    expect(screen.getByText('Custom: Alice')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Custom: Alice'));
    expect(onCellEdit).toHaveBeenCalled();
  });
});
