import React from 'react';
import { Trans } from '@ciscode/ui-translate-core';

export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    pageSize?: number;
    onPageChange?: (page: number) => void;
}

function PaginationInfo({ pagination }: { pagination: PaginationProps }) {
    const from = (pagination.currentPage - 1) * (pagination.pageSize ?? 10) + 1;
    const to = Math.min(
        pagination.currentPage * (pagination.pageSize ?? 10),
        pagination.totalItems
    );
    const total = pagination.totalItems;

    return (
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            <Trans
                i18nKey="table.pagination.showing"
                values={{
                    from,
                    to,
                    total
                }}
                components={[
                    <span className="font-semibold text-gray-900 dark:text-white" />,
                    <span className="font-semibold text-gray-900 dark:text-white" />
                ]}
            />
        </span>
    );
}

export default PaginationInfo;
