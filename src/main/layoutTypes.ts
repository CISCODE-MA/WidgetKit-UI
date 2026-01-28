import type { ReactNode } from 'react';

export type VisibilityRule = {
  /** Visible if user has at least one of these roles */
  roles?: string[];
  /** Visible if user has every permission listed here */
  permissions?: string[];
  /** Visible if user has at least one of these modules */
  modules?: string[];
};

type SidebarBase = {
  id: string;
  label: string;
  /** Iconify icon name string (e.g., "mdi:view-dashboard") */
  icon?: string;

  /** Nested menus (collapsible groups) */
  children?: SidebarItem[];

  /** If omitted, item is visible. If provided, item is hidden unless rule passes. */
  visibility?: VisibilityRule;
};

export type SidebarInternalLink = SidebarBase & {
  to: string;
  href?: never;
  action?: never;
};

export type SidebarExternalLink = SidebarBase & {
  href: string;
  to?: never;
  action?: never;
  newTab?: boolean;
};

export type SidebarActionItem = SidebarBase & {
  action: 'logout' | (string & {});
  to?: never;
  href?: never;
};

export type SidebarItem = SidebarInternalLink | SidebarExternalLink | SidebarActionItem;

export type TemplateSidebarConfig = {
  items: SidebarItem[];
  className?: string;
};

export type TemplateNavbarBrandConfig = {
  title?: string;
  href?: string;
  logoSrc?: string;
  logoAlt?: string;
};

export type TemplateNavbarConfig = {
  brand?: TemplateNavbarBrandConfig;
  /** Optional full override */
  brandSlot?: ReactNode;
  className?: string;
};

export type TemplateFooterLink = {
  label: string;
  href: string;
  /**
   * If omitted, default behavior is new tab (true).
   * Can be overridden per link.
   */
  newTab?: boolean;
};

export type TemplateFooterPresetConfig = {
  leftText: string;
  links?: TemplateFooterLink[];
  version?: string;
};

export type TemplateFooterConfig = {
  /**
   * Advanced: fully custom footer blocks (you control JSX).
   * Optional because preset-only is valid.
   */
  blocks?: ReactNode[];

  /**
   * Preset: data-driven styled footer rendered by the template.
   */
  preset?: TemplateFooterPresetConfig;

  /**
   * Optional className override on the footer wrapper.
   */
  className?: string;
};

export type TemplateLayoutConfig = {
  sidebar?: TemplateSidebarConfig;
  navbar?: TemplateNavbarConfig;
  footer?: TemplateFooterConfig;
};