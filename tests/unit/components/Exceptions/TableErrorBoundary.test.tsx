import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import TableErrorBoundary from '../../../../src/exceptions/TableErrorBoundary';

vi.mock('@ciscode/ui-translate-core', () => ({
  useT: () => (key: string) => {
    if (key === 'table.errorBoundary.fallbackMessage') return 'Something went wrong';
    return String(key);
  },
}));

function Thrower() {
  throw new Error('boom');
}

describe('TableErrorBoundary', () => {
  it('renders children when no error', () => {
    render(
      <TableErrorBoundary>
        <div>content</div>
      </TableErrorBoundary>,
    );
    expect(screen.getByText('content')).toBeInTheDocument();
  });

  it('shows fallback when child throws', () => {
    render(
      <TableErrorBoundary>
        {/* @ts-expect-error testing thrown render */}
        <Thrower />
      </TableErrorBoundary>,
    );
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });
});
