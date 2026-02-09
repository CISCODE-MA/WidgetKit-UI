import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import TableDataCustom from './TableDataCustom';
import type { ColumnConfigTable } from '../../models/ColumnConfigTable';

vi.mock('@ciscode/ui-translate-core', () => ({
  useT: () => (key: string, vars?: any) => {
    if (key === 'table.noData') return 'No data';
    if (key === 'table.pagination.previous') return 'Previous';
    if (key === 'table.pagination.next') return 'Next';
    if (key === 'table.pagination.showing')
      return `Showing ${vars?.from}-${vars?.to} of ${vars?.total}`;
    return String(key);
  },
  Trans: ({ children }: any) => children,
}));

// Mock Loader to avoid CSS reliance
vi.mock('../../common/Loader/TableLoader', () => ({
  TableLoader: () => <div data-testid="loader" />,
}));

// Basic data type
type Row = { id: number; name: string };

const columns: ColumnConfigTable<Row>[] = [
  { key: 'id', title: 'ID' },
  { key: 'name', title: 'Name' },
];

const data: Row[] = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];

describe('TableDataCustom', () => {
  it('renders loader when loading', () => {
    render(<TableDataCustom<Row> columns={columns} data={[]} loading />);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('renders error message when provided', () => {
    render(<TableDataCustom<Row> columns={columns} data={[]} errorMessage="Failed to load" />);
    expect(screen.getByText('Failed to load')).toBeInTheDocument();
  });

  it('renders no data state', () => {
    render(<TableDataCustom<Row> columns={columns} data={[]} />);
    expect(screen.getByText('No data')).toBeInTheDocument();
  });

  it('renders rows and cells for provided data', () => {
    render(<TableDataCustom<Row> columns={columns} data={data} />);
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });

  it('renders pagination summary when provided', () => {
    render(
      <TableDataCustom<Row>
        columns={columns}
        data={data}
        pagination={{ currentPage: 1, totalPages: 3, totalItems: 2, onPageChange: () => {} }}
      />,
    );
    expect(screen.getByText(/Showing 1-2 of 2/)).toBeInTheDocument();
  });
});
