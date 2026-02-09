import React from 'react';
import TableErrorBoundary from '../../exceptions/TableErrorBoundary';
import TableDataCustomBase, { TableDataCustomProps } from './TableDataCustomBase';

/**
 * Public table component with built-in error boundary.
 * Wraps `TableDataCustomBase` in `TableErrorBoundary` to provide a safe fallback.
 * Consumers should import `TableDataCustom` from the package root.
 */
function TableDataCustom<T>(props: TableDataCustomProps<T>) {
  return (
    <TableErrorBoundary>
      <TableDataCustomBase {...props} />
    </TableErrorBoundary>
  );
}

export default TableDataCustom;
