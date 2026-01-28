import React, { useCallback, useState } from 'react';
import { generatePageNumbers } from '../../hooks/useGeneratePageNumbers';
import { TableLoader } from '../../common/Loader/TableLoader';
import { ToolbarItem } from '../../models/ToolbarItemModel';
import { ColumnConfigTable } from '../../models/ColumnConfigTable';
import { Trans, useT } from '@ciscode-template-model/translate-core';
import { TablePopover } from './TablePopover';

export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize?: number;
  onPageChange?: (page: number) => void;
};

export interface TableDataCustomProps<T> {
  columns: ColumnConfigTable<T>[];
  data: T[];
  loading?: boolean;
  pagination?: PaginationProps;
  errorMessage?: string | null;
  toolbarItems?: ToolbarItem[];
}

function TableDataCustomBase<T>({
  columns,
  data,
  errorMessage,
  pagination,
  loading,
  toolbarItems,
}: TableDataCustomProps<T>) {
  const t = useT('templateFe');

  // split toolbar items
  const leftItems = (toolbarItems ?? []).filter(
    (it) => it.visible !== false && (it.position ?? 'left') === 'left'
  );
  const rightItems = (toolbarItems ?? []).filter(
    (it) => it.visible !== false && it.position === 'right'
  );
  const [popover, setPopover] = useState<{ anchor: HTMLElement | null, content: React.ReactNode } | null>(null);
  const closePopover = useCallback(() => setPopover(null), []);

  return (
    <>
      <section>
        {popover && (
          <TablePopover anchor={popover.anchor} onClose={closePopover}>
            {popover.content}
          </TablePopover>
        )}
        <div className="mx-auto">
          <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">

            {/* Toolbar */}
            {(leftItems.length > 0 || rightItems.length > 0) && (
              <div className="flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 ltr:lg:space-x-4 rtl:lg:space-x-reverse">
                <div className="flex items-center flex-wrap gap-3">
                  {leftItems.map((it, i) => <React.Fragment key={i}>{it.node}</React.Fragment>)}
                </div>
                <div className="flex items-center flex-wrap gap-3">
                  {rightItems.map((it, i) => <React.Fragment key={i}>{it.node}</React.Fragment>)}
                </div>
              </div>
            )}

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-gray-500 dark:text-gray-400 ltr:text-left rtl:text-right">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    {columns.map(col => (
                      <th key={String(col.key)} className="px-4 py-3">{col.title}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={columns.length} className="py-4 text-center">
                        <TableLoader />
                      </td>
                    </tr>
                  ) : errorMessage ? (
                    <tr>
                      <td colSpan={columns.length} className="py-4 text-center text-red-600">
                        {errorMessage}
                      </td>
                    </tr>
                  ) : data.length === 0 ? (
                    <tr>
                      <td colSpan={columns.length} className="py-4 text-center">
                        {t('table.noData')}
                      </td>
                    </tr>
                  ) : (
                    data.map((row, r) => (
                      <tr key={r} className="border-b">
                        {columns.map((col, c) => {
                          let content: React.ReactNode;
                          if (Array.isArray(col.key)) {
                            const vals = col.key.map(k => row[k] ?? '');
                            content = col.render ? col.render(vals, row, setPopover) : vals.join(' - ');
                          } else {
                            const val = row[col.key];
                            content = col.render ? col.render(val, row, setPopover) : String(val ?? '');
                          }
                          return (
                            <td key={c} className="px-4 py-3 ltr:text-left rtl:text-right">
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
              <nav className="flex flex-col items-start justify-between p-4 space-y-3 md:flex-row md:items-center md:space-y-0" aria-label="Table navigation">
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  {t('table.pagination.showing', {
                    from: (pagination.currentPage - 1) * (pagination.pageSize ?? 10) + 1,
                    to: Math.min(pagination.currentPage * (pagination.pageSize ?? 10), pagination.totalItems),
                    total: pagination.totalItems
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
                        <path fillRule="evenodd" clipRule="evenodd"
                          d={document.dir === 'rtl'
                            ? 'M7.293 14.707a1 1 0 010-1.414L10.586 10l-3.293-3.293a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                            : 'M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
                          }
                        />
                      </svg>
                    </button>
                  </li>

                  {/* Pages */}
                  {generatePageNumbers(pagination.currentPage, pagination.totalPages).map((p, i) => (
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
                          className={`flex items-center justify-center px-3 py-2 text-sm border ${p === pagination.currentPage
                              ? 'z-10 text-primary-600 bg-primary-50 border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:bg-gray-700 dark:text-white dark:border-gray-700'
                              : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700 dark:hover:bg-gray-700'
                            }`}
                        >
                          {p}
                        </button>
                      </li>
                    )
                  ))}

                  {/* Next */}
                  <li>
                    <button
                      onClick={() => pagination.onPageChange?.(pagination.currentPage + 1)}
                      disabled={pagination.currentPage >= pagination.totalPages}
                      className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      <span className="sr-only">{t('table.pagination.next')}</span>
                      <svg className="w-5 h-5 rtl:rotate-180" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" clipRule="evenodd"
                          d={document.dir === 'rtl'
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
    </>
  );
}

export default TableDataCustomBase;
