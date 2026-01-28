import React from 'react';
import TableErrorBoundary from '../../exceptions/TableErrorBoundary';
import TableDataCustomBase, { TableDataCustomProps } from './TableDataCustomBase';

/**
 * Wraps the TableDataCustomBase in the TableErrorBoundary.
 * The models only import this file, so they get error boundary by default.
 */
function TableDataCustom<T>(props: TableDataCustomProps<T>) {
    return (
        <TableErrorBoundary>
            <TableDataCustomBase {...props} />
        </TableErrorBoundary>
    );
}

export default TableDataCustom;
