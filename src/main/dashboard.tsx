import React, { useState, useEffect, ReactNode } from 'react';
import { useLocation } from 'react-router';
import DashboardLayout from '../layout/DashboardLayout';
import Loader from '../common/Loader';

// Existing (legacy) sidebar model used by current Template implementation
import { SidebarSection } from '../models/SidebarItemModel';

// New typed configs (non-breaking additions)
import type {
  TemplateSidebarConfig,
  TemplateNavbarConfig,
  TemplateFooterConfig,
} from './layoutTypes';

/**
 * Props for the `Template` (Dashboard Shell) component.
 * Backward compatible with legacy sidebar/logo/onLogout while
 * supporting modern `sidebar`, `navbar`, and optional `footer` configs.
 */
export interface DashboardProps {
  children: ReactNode;

  /**
   * Legacy props (backward compatible)
   */
  sidebarContent?: SidebarSection[];
  logo?: ReactNode;
  onLogout?: () => void;

  /**
   * New config props (preferred)
   */
  sidebar?: TemplateSidebarConfig;
  navbar?: TemplateNavbarConfig;

  /**
   * Optional footer (rendered inside DashboardLayout when provided)
   */
  footer?: TemplateFooterConfig;
}

/**
 * Template (Dashboard Shell)
 *
 * Backward compatible:
 * - Existing apps can keep using: sidebarContent + logo + onLogout
 * Preferred:
 * - New apps should use: sidebar + navbar (+ footer when needed)
 */
const Template: React.FC<DashboardProps> = ({
  children,
  sidebarContent = [],
  logo,
  onLogout,
  sidebar,
  navbar,
  footer,
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  /**
   * Resolve "brand" area:
   * - Prefer navbar.brandSlot
   * - Else map legacy `logo` prop (deprecated) to brandSlot
   * - Else fall back to simple navbar.brand config if provided
   */
  const resolvedBrandNode: ReactNode | undefined =
    navbar?.brandSlot ??
    logo ??
    (navbar?.brand ? (
      <a href={navbar.brand.href ?? '/'}>
        {navbar.brand.logoSrc ? (
          <img
            src={navbar.brand.logoSrc}
            alt={navbar.brand.logoAlt ?? navbar.brand.title ?? 'Logo'}
            className="h-8"
          />
        ) : (
          <span className="font-semibold">{navbar.brand.title ?? ''}</span>
        )}
      </a>
    ) : undefined);

  /**
   * Resolve sidebar:
   * - For now, if `sidebar` is provided, we still pass legacy sidebarContent through,
   *   because DashboardLayout currently expects SidebarSection[].
   */
  const resolvedLegacySidebarContent: SidebarSection[] = sidebarContent;

  return loading ? (
    <Loader />
  ) : (
    <DashboardLayout
      sidebarContent={resolvedLegacySidebarContent}
      logo={resolvedBrandNode}
      onLogout={onLogout}
      footer={footer}
    >
      {children}
    </DashboardLayout>
  );
};

export default Template;
