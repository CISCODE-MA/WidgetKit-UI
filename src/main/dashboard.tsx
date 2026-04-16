import type { JSX, ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import Loader from '../common/Loader';
import DashboardLayout from '../layout/DashboardLayout';

// Existing (legacy) sidebar model used by current Template implementation
import { SidebarSection } from '../models/SidebarItemModel';

// New typed configs (non-breaking additions)
import type {
    TemplateFooterConfig,
    TemplateNavbarConfig,
    TemplateSidebarConfig,
    TemplateUserConfig,
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
   * Authenticated user data to display in the navbar (name + role).
   */
  user?: TemplateUserConfig;

  /**
   * Optional extra actions rendered inside the header action list
   * (e.g. a LanguageSwitcher component).
   */
  headerActions?: ReactNode;

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
function Template({
  children,
  sidebarContent = [],
  logo,
  onLogout,
  navbar,
  footer,
  user,
  headerActions,
}: DashboardProps): JSX.Element {
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
      user={user}
      headerActions={headerActions}
    >
      {children}
    </DashboardLayout>
  );
}

export default Template;
