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
    // Integrate a logging service for production environments
    if (process.env.NODE_ENV === 'production') {
      // Replace with your logging service, e.g., Sentry
      // Sentry.captureException(error);
    }
  }

  handleReset = (): void => {
    this.setState({ hasError: false });
  };

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <div role="alert" className="p-4 text-red-600 bg-red-50 border border-red-300 rounded">
          <TranslatedErrorMessage />
          <button
            onClick={this.handleReset}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const TranslatedErrorMessage = (): JSX.Element => {
  const t = useT('template-fe');
  return <div>{t('table.errorBoundary.fallbackMessage')}</div>;
};

export default TableErrorBoundary;
