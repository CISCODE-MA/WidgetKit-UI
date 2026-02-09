import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render } from '@testing-library/react';
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

const LTR_PREV =
  'M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z';
const RTL_PREV =
  'M7.293 14.707a1 1 0 010-1.414L10.586 10l-3.293-3.293a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z';
const LTR_NEXT =
  'M7.293 14.707a1 1 0 010-1.414L10.586 10l-3.293-3.293a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z';
const RTL_NEXT =
  'M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z';

describe('TableDataCustomBase RTL icons', () => {
  let originalDir: string;
  beforeEach(() => {
    originalDir = document.dir || '';
  });
  afterEach(() => {
    document.dir = originalDir;
  });

  it('uses LTR icon paths when document.dir is ltr', () => {
    document.dir = 'ltr';
    const { container } = render(
      <TableDataCustomBase<Row>
        columns={columns}
        data={[{ id: 1 }]}
        pagination={{ currentPage: 2, totalPages: 3, totalItems: 1 }}
      />,
    );
    const paths = Array.from(container.querySelectorAll('nav svg path')) as SVGPathElement[];
    // previous is first path, next is last path
    expect(paths[0].getAttribute('d')).toBe(LTR_PREV);
    expect(paths[paths.length - 1].getAttribute('d')).toBe(LTR_NEXT);
  });

  it('uses RTL icon paths when document.dir is rtl', () => {
    document.dir = 'rtl';
    const { container } = render(
      <TableDataCustomBase<Row>
        columns={columns}
        data={[{ id: 1 }]}
        pagination={{ currentPage: 2, totalPages: 3, totalItems: 1 }}
      />,
    );
    const paths = Array.from(container.querySelectorAll('nav svg path')) as SVGPathElement[];
    expect(paths[0].getAttribute('d')).toBe(RTL_PREV);
    expect(paths[paths.length - 1].getAttribute('d')).toBe(RTL_NEXT);
  });
});
