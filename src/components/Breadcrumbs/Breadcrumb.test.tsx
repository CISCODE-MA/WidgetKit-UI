import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Breadcrumb from './Breadcrumb';

vi.mock('@ciscode/ui-translate-core', () => ({
  useT: () => (key: string, vars?: any) => (typeof key === 'string' ? key : 't'),
}));

vi.mock('react-router', () => ({
  Link: ({ children }: any) => <a href="/">{children}</a>,
}));

describe('Breadcrumb', () => {
  it('renders page name and home link', () => {
    render(<Breadcrumb pageName="Dashboard" />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });
});
