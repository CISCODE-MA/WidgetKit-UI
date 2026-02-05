import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TableDataCustomBase from '../../../../src/components/Table/TableDataCustomBase';
import type { ColumnConfigTable } from '../../../../src/models/ColumnConfigTable';

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

type Row = { id: number };
const columns: ColumnConfigTable<Row>[] = [{ key: 'id', title: 'ID' }];

describe('TableDataCustomBase pagination', () => {
  it('disables Previous on first page and triggers Next', () => {
    const onPageChange = vi.fn();
    render(
      <TableDataCustomBase<Row>
        columns={columns}
        data={[{ id: 1 }]}
        pagination={{ currentPage: 1, totalPages: 3, totalItems: 1, onPageChange }}
      />,
    );

    const buttons = screen.getAllByRole('button');
    const prev = buttons[0];
    const next = buttons[buttons.length - 1];
    expect(prev).toBeDisabled();
    expect(next).not.toBeDisabled();

    fireEvent.click(next);
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('disables Next on last page and triggers Previous', () => {
    const onPageChange = vi.fn();
    const { container } = render(
      <TableDataCustomBase<Row>
        columns={columns}
        data={[{ id: 1 }]}
        pagination={{ currentPage: 3, totalPages: 3, totalItems: 1, onPageChange }}
      />,
    );
    const { getAllByRole } = require('@testing-library/dom').within(container);
    const buttons = getAllByRole('button');
    const prev = buttons[0];
    const next = buttons[buttons.length - 1];
    expect(next).toBeDisabled();
    expect(prev).not.toBeDisabled();

    fireEvent.click(prev);
    expect(onPageChange).toHaveBeenCalledWith(2);
  });
});
