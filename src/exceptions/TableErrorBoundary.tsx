import type { JSX } from 'react';
import React from 'react';
import { useT } from '@ciscode/ui-translate-core';

interface TableErrorBoundaryState {
  hasError: boolean;
}

class TableErrorBoundary extends React.Component<
  React.PropsWithChildren<unknown>,
  TableErrorBoundaryState
> {
  constructor(props: React.PropsWithChildren<unknown>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): TableErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: unknown, errorInfo: unknown): void {
    console.error('TableErrorBoundary caught an error:', error, errorInfo);
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      // You can't use hooks like useT inside a class component,
      // so we wrap it in a functional HOC instead.
      return <TranslatedErrorMessage />;
    }

    return this.props.children;
  }
}

const TranslatedErrorMessage = (): JSX.Element => {
  const t = useT('template-fe');
  return (
    <div className="p-4 text-red-600 bg-red-50 border border-red-300 rounded">
      {t('table.errorBoundary.fallbackMessage')}
    </div>
  );
};

export default TableErrorBoundary;
