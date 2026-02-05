import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import TableDataCustomBase from '../../../../src/components/Table/TableDataCustomBase';
import type { ColumnConfigTable } from '../../../../src/models/ColumnConfigTable';

vi.mock('@ciscode/ui-translate-core', () => ({
  useT: () => (key: string) => {
    if (key === 'templateFe:table.noData' || key === 'table.noData') return 'No data';
    return String(key);
  },
  Trans: ({ children }: any) => children,
}));

type Row = { id: number };
const columns: ColumnConfigTable<Row>[] = [{ key: 'id', title: 'ID' }];

describe('TableDataCustomBase states', () => {
  it('shows loader when loading', () => {
    const { container } = render(
      <TableDataCustomBase<Row> columns={columns} data={[]} loading={true} />,
    );
    // TableLoader renders dot-spinner structure
    const spinner = container.querySelector('.dot-spinner');
    const dots = container.querySelectorAll('.dot-spinner__dot');
    expect(spinner).toBeTruthy();
    expect(dots.length).toBeGreaterThan(0);
  });

  it('shows error message when errorMessage provided', () => {
    render(<TableDataCustomBase<Row> columns={columns} data={[]} errorMessage={'Oops!'} />);
    expect(screen.getByText('Oops!')).toBeInTheDocument();
  });

  it('shows no data message when data is empty and not loading', () => {
    render(<TableDataCustomBase<Row> columns={columns} data={[]} />);
    expect(screen.getByText('No data')).toBeInTheDocument();
  });
});
