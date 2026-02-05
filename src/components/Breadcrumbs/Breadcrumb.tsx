import React from 'react';
import { Link } from 'react-router-dom';
import { useT } from '@ciscode/ui-translate-core';

/**
 * Props for `Breadcrumb` component.
 * - `pageName`: current page label displayed in the trail.
 */
export interface BreadcrumbProps {
  pageName: string;
}

/**
 * Accessible breadcrumb navigation.
 * Renders a current page label and a link to home.
 */
const Breadcrumb: React.FC<BreadcrumbProps> = ({ pageName }) => {
  const t = useT('templateFe');

  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-title-md2 font-semibold text-black dark:text-white">{pageName}</h2>
      <nav>
        <ol className="flex items-center gap-2">
          <li>
            <Link className="font-medium" to="/">
              {t('breadcrumb.title')} /
            </Link>
          </li>
          <li className="font-medium text-primary">{pageName}</li>
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
