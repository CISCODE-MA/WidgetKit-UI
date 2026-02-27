import type { JSX } from 'react';
import React, { useCallback, useMemo, useState } from 'react';
import { generatePageNumbers } from '../../hooks/useGeneratePageNumbers';
import { TableLoader } from '../../common/Loader/TableLoader';
import { ToolbarItem } from '../../models/ToolbarItemModel';
import { ColumnConfigTable } from '../../models/ColumnConfigTable';
import { useT } from '@ciscode/ui-translate-core';
import { TablePopover } from './TablePopover';

type InlineEditableCellProps<T> = {
  value: unknown;
  row: T;
  rowIndex: number;
  columnKey: keyof T;
  onCommit: (next: unknown) => void;
  editor?: (args: {
    value: unknown;
    row: T;
    rowIndex: number;
    onChange: (next: unknown) => void;
    onCommit: () => void;
    onCancel: () => void;
  }) => React.ReactNode;
  className?: string;
  children: React.ReactNode;
};

function InlineEditableCell<T>(props: InlineEditableCellProps<T>): JSX.Element {
  const { value, row, rowIndex, onCommit, editor, children } = props;
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<unknown>(value ?? '');

  const startEdit = useCallback(() => {
    setDraft(value ?? '');
    setEditing(true);
  }, [value]);

  const commit = useCallback(() => {
    setEditing(false);
    onCommit(draft);
  }, [draft, onCommit]);

  const cancel = useCallback(() => {
    setEditing(false);
    setDraft(value ?? '');
  }, [value]);

  if (!editing) {
    return (
      <div onDoubleClick={startEdit} className="cursor-text">
        {children}
      </div>
    );
  }

  if (editor) {
    return (
      <div className="flex items-center">
        {editor({
          value: draft,
          row,
          rowIndex,
          onChange: setDraft,
          onCommit: commit,
          onCancel: cancel,
        })}
      </div>
    );
  }

  return (
    <input
      autoFocus
      type="text"
      value={String(draft ?? '')}
      onChange={(e) => setDraft(e.target.value)}
      onBlur={commit}
      onKeyDown={(e) => {
        if (e.key === 'Enter') commit();
        if (e.key === 'Escape') cancel();
      }}
      className="px-2 py-1 text-sm border rounded-md dark:bg-gray-700 dark:text-white"
    />
  );
}

/**
 * Pagination configuration for table navigation.
 */
export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize?: number;
  onPageChange?: (page: number) => void;
};

/**
 * Props for `TableDataCustom` and base component.
 */
export interface TableDataCustomProps<T> {
  columns: ColumnConfigTable<T>[];
  data: T[];
  loading?: boolean;
  pagination?: PaginationProps;
  errorMessage?: string | null;
  toolbarItems?: ToolbarItem[];

  /** Feature toggles */
  enableSelection?: boolean;
  enableSorting?: boolean;
  enableFilter?: boolean;
  enableInlineEdit?: boolean;

  /** Filtering (controlled/uncontrolled) */
  filterQuery?: string;
  onFilterQueryChange?: (query: string) => void;

  /** Selection callback */
  onSelectionChange?: (selectedRows: T[], selectedIndices: number[]) => void;

  /** Inline cell edit callback */
  onCellEdit?: (rowIndex: number, columnKey: keyof T, nextValue: unknown, row: T) => void;
}

/**
 * Internal base table component that renders the table UI.
 * Consumers should use `TableDataCustom` which wraps this with an error boundary.
 */
function TableDataCustomBase<T>({
  columns,
  data,
  errorMessage,
  pagination,
  loading,
  toolbarItems,
  enableSelection,
  enableSorting,
  enableFilter,
  enableInlineEdit,
  filterQuery,
  onFilterQueryChange,
  onSelectionChange,
  onCellEdit,
}: TableDataCustomProps<T>): JSX.Element {
  const t = useT('templateFe');

  // split toolbar items
  const leftItems = (toolbarItems ?? []).filter(
    (it) => it.visible !== false && (it.position ?? 'left') === 'left',
  );
  const rightItems = (toolbarItems ?? []).filter(
    (it) => it.visible !== false && it.position === 'right',
  );
  const [popover, setPopover] = useState<{
    anchor: HTMLElement | null;
    content: React.ReactNode;
  } | null>(null);
  const closePopover = useCallback(() => setPopover(null), []);

  // Selection state (indices within visible data)
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const toggleSelectAll = useCallback((checked: boolean, count: number) => {
    const next = new Set<number>();
    if (checked) {
      for (let i = 0; i < count; i++) next.add(i);
    }
    setSelected(next);
  }, []);

  const toggleRowSelection = useCallback((index: number) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }, []);

  // Sorting state
  const [sortBy, setSortBy] = useState<number | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const onHeaderClick = useCallback(
    (colIndex: number, col: ColumnConfigTable<T>) => {
      if (!enableSorting || col.sortable === false) return;
      setSortBy((prev) => (prev === colIndex ? colIndex : colIndex));
      setSortDir((prev) => (sortBy === colIndex ? (prev === 'asc' ? 'desc' : 'asc') : 'asc'));
    },
    [enableSorting, sortBy],
  );

  // Filtering state (uncontrolled fallback)
  const [internalQuery, setInternalQuery] = useState<string>('');
  const activeQuery = (filterQuery ?? internalQuery).trim();

  // Build visible rows: filter then sort
  const visibleData = useMemo(() => {
    let rows = [...data];
    if (enableFilter && activeQuery.length > 0) {
      const q = activeQuery.toLowerCase();
      rows = rows.filter((row) => {
        return columns.some((col) => {
          const keys = Array.isArray(col.key) ? col.key : [col.key];
          const val = keys
            .map((k) => String((row[k as keyof T] as unknown) ?? ''))
            .join(' ') // combine multi-key cells
            .toLowerCase();
          if (col.filterPredicate) {
            return col.filterPredicate(val, row, q);
          }
          return val.includes(q);
        });
      });
    }
    if (enableSorting && sortBy != null) {
      const col = columns[sortBy];
      rows.sort((a, b) => {
        const keys = Array.isArray(col.key) ? col.key : [col.key];
        const va = keys.map((k) => a[k as keyof T] as unknown);
        const vb = keys.map((k) => b[k as keyof T] as unknown);
        const left = va.length > 1 ? va.join(' ') : va[0];
        const right = vb.length > 1 ? vb.join(' ') : vb[0];
        let cmp = 0;
        if (typeof col.sortComparator === 'function') {
          cmp = col.sortComparator(left, right, a, b);
        } else {
          const la = left ?? '';
          const lb = right ?? '';
          const sa = String(la).toLowerCase();
          const sb = String(lb).toLowerCase();
          if (sa < sb) cmp = -1;
          else if (sa > sb) cmp = 1;
          else cmp = 0;
        }
        return sortDir === 'asc' ? cmp : -cmp;
      });
    }
    return rows;
  }, [data, columns, enableFilter, activeQuery, enableSorting, sortBy, sortDir]);

  // Notify selection changes
  React.useEffect(() => {
    if (!onSelectionChange) return;
    const indices = Array.from(selected.values()).sort((a, b) => a - b);
    const rows = indices.map((i) => visibleData[i]).filter(Boolean);
    onSelectionChange(rows, indices);
  }, [selected, visibleData, onSelectionChange]);

  return (
    <section>
      {popover && (
        <TablePopover anchor={popover.anchor} onClose={closePopover}>
          {popover.content}
        </TablePopover>
      )}
      <div className="mx-auto">
        <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
          {/* Toolbar */}
          {(leftItems.length > 0 || rightItems.length > 0 || enableFilter) && (
            <div className="flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 ltr:lg:space-x-4 rtl:lg:space-x-reverse">
              <div className="flex items-center flex-wrap gap-3">
                {leftItems.map((it, i) => (
                  <span key={i} className="contents">
                    {it.node}
                  </span>
                ))}
                {enableFilter && (
                  <input
                    type="text"
                    value={filterQuery ?? internalQuery}
                    onChange={(e) =>
                      onFilterQueryChange
                        ? onFilterQueryChange(e.target.value)
                        : setInternalQuery(e.target.value)
                    }
                    placeholder={t('table.filter') ?? 'Filter…'}
                    className="px-3 py-2 text-sm border rounded-md dark:bg-gray-700 dark:text-white"
                  />
                )}
              </div>
              <div className="flex items-center flex-wrap gap-3">
                {rightItems.map((it, i) => (
                  <span key={i} className="contents">
                    {it.node}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-gray-500 dark:text-gray-400 ltr:text-left rtl:text-right">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  {enableSelection && (
                    <th className="px-4 py-3">
                      <input
                        type="checkbox"
                        aria-label="Select all"
                        checked={selected.size > 0 && selected.size === visibleData.length}
                        onChange={(e) => toggleSelectAll(e.target.checked, visibleData.length)}
                      />
                    </th>
                  )}
                  {columns.map((col, i) => (
                    <th
                      key={i}
                      className="px-4 py-3 select-none cursor-pointer"
                      onClick={() => onHeaderClick(i, col)}
                      title={enableSorting && col.sortable !== false ? 'Sort' : undefined}
                    >
                      <span className="inline-flex items-center gap-1">
                        {col.title}
                        {enableSorting && sortBy === i && (
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            {sortDir === 'asc' ? (
                              <path d="M10 5l-5 6h10L10 5z" />
                            ) : (
                              <path d="M10 15l5-6H5l5 6z" />
                            )}
                          </svg>
                        )}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan={(enableSelection ? 1 : 0) + columns.length}
                      className="py-4 text-center"
                    >
                      <TableLoader />
                    </td>
                  </tr>
                ) : errorMessage ? (
                  <tr>
                    <td
                      colSpan={(enableSelection ? 1 : 0) + columns.length}
                      className="py-4 text-center text-red-600"
                    >
                      {errorMessage}
                    </td>
                  </tr>
                ) : visibleData.length === 0 ? (
                  <tr>
                    <td
                      colSpan={(enableSelection ? 1 : 0) + columns.length}
                      className="py-4 text-center"
                    >
                      {t('table.noData')}
                    </td>
                  </tr>
                ) : (
                  visibleData.map((row, r) => (
                    <tr key={r} className="border-b" role="row" aria-rowindex={r + 1}>
                      {enableSelection && (
                        <td className="px-4 py-3" role="gridcell">
                          <input
                            type="checkbox"
                            aria-label={`Select row ${r + 1}`}
                            checked={selected.has(r)}
                            onChange={() => toggleRowSelection(r)}
                          />
                        </td>
                      )}
                      {columns.map((col, c) => {
                        let content: React.ReactNode;
                        if (Array.isArray(col.key)) {
                          const vals = col.key.map((k) => row[k] ?? '');
                          const display = vals.join(' - ');
                          content = col.render ? col.render(vals, row, setPopover) : display;
                        } else {
                          const val = row[col.key];
                          const display = String(val ?? '');
                          // Inline editing: per-cell editing on double-click
                          if (enableInlineEdit && col.editable) {
                            content = (
                              <InlineEditableCell
                                value={val as unknown}
                                row={row}
                                rowIndex={r}
                                columnKey={col.key as keyof T}
                                onCommit={(next) => onCellEdit?.(r, col.key as keyof T, next, row)}
                                editor={col.editor}
                                className={col.cellClassName}
                              >
                                {col.render ? col.render(val, row, setPopover) : display}
                              </InlineEditableCell>
                            );
                          } else {
                            content = col.render ? col.render(val, row, setPopover) : display;
                          }
                        }
                        return (
                          <td
                            key={c}
                            role="gridcell"
                            className="px-4 py-3"
                            tabIndex={0} // Ensure focusable cells
                          >
                            {content}
                          </td>
                        );
                      })}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pagination && (
            <nav
              className="flex flex-col items-start justify-between p-4 space-y-3 md:flex-row md:items-center md:space-y-0"
              aria-label="Table navigation"
            >
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                {t('table.pagination.showing', {
                  from: (pagination.currentPage - 1) * (pagination.pageSize ?? 10) + 1,
                  to: Math.min(
                    pagination.currentPage * (pagination.pageSize ?? 10),
                    pagination.totalItems,
                  ),
                  total: pagination.totalItems,
                })}
              </span>

              <ul className="inline-flex items-stretch -space-x-px ltr:flex-row rtl:flex-row-reverse">
                {/* Previous */}
                <li>
                  <button
                    onClick={() => pagination.onPageChange?.(pagination.currentPage - 1)}
                    disabled={pagination.currentPage <= 1}
                    className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    <span className="sr-only">{t('table.pagination.previous')}</span>
                    <svg className="w-5 h-5 rtl:rotate-180" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d={
                          document.dir === 'rtl'
                            ? 'M7.293 14.707a1 1 0 010-1.414L10.586 10l-3.293-3.293a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                            : 'M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
                        }
                      />
                    </svg>
                  </button>
                </li>

                {/* Pages */}
                {generatePageNumbers(pagination.currentPage, pagination.totalPages).map((p, i) =>
                  typeof p === 'string' ? (
                    <li key={i}>
                      <span className="flex items-center justify-center px-3 py-2 text-sm text-gray-500 bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">
                        {p}
                      </span>
                    </li>
                  ) : (
                    <li key={p}>
                      <button
                        onClick={() => pagination.onPageChange?.(p)}
                        className={`flex items-center justify-center px-3 py-2 text-sm border ${
                          p === pagination.currentPage
                            ? 'z-10 text-primary-600 bg-primary-50 border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:bg-gray-700 dark:text-white dark:border-gray-700'
                            : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700 dark:hover:bg-gray-700'
                        }`}
                      >
                        {p}
                      </button>
                    </li>
                  ),
                )}

                {/* Next */}
                <li>
                  <button
                    onClick={() => pagination.onPageChange?.(pagination.currentPage + 1)}
                    disabled={pagination.currentPage >= pagination.totalPages}
                    className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    <span className="sr-only">{t('table.pagination.next')}</span>
                    <svg className="w-5 h-5 rtl:rotate-180" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d={
                          document.dir === 'rtl'
                            ? 'M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
                            : 'M7.293 14.707a1 1 0 010-1.414L10.586 10l-3.293-3.293a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                        }
                      />
                    </svg>
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>
    </section>
  );
}

export default TableDataCustomBase;
