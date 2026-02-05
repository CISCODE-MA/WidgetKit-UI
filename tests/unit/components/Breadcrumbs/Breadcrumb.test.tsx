import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Breadcrumb from '../../../../src/components/Breadcrumbs/Breadcrumb';

vi.mock('@ciscode/ui-translate-core', () => ({
  useT: () => (key: string) => (typeof key === 'string' ? key : 't'),
}));

vi.mock('react-router-dom', () => ({
  Link: ({ children }: any) => <a href="/">{children}</a>,
}));

describe('Breadcrumb', () => {
  it('renders page name and home link', () => {
    render(<Breadcrumb pageName="Dashboard" />);
    expect(screen.getByRole('heading', { name: 'Dashboard' })).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
    // breadcrumb item also contains pageName
    expect(screen.getAllByText('Dashboard').length).toBeGreaterThanOrEqual(1);
  });
});
