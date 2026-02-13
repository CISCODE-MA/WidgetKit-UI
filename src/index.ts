import './assets/styles/style.css';

// Components (public)
export { default as Template } from './main/dashboard';
export { default as Breadcrumb } from './components/Breadcrumbs/Breadcrumb';
export { default as ControlledZodDynamicForm } from './components/Form/ZodDynamicForm';
export { default as TableDataCustom } from './components/Table/TableDataCustom';
export { default as DashboardGrid } from './components/Dashboard/Widgets/DashboardGrid';
export { DefaultChartAdapter } from './components/Dashboard/Widgets/ChartAdapters';

// Hooks (public)
export { default as useLocalStorage } from './hooks/useLocalStorage';
export { default as useColorMode } from './hooks/useColorMode';
export { generatePageNumbers } from './hooks/useGeneratePageNumbers';
export { default as useLogin } from './hooks/useLogin';
export { default as useRegister } from './hooks/useRegister';
export { default as usePasswordReset } from './hooks/usePasswordReset';
export { useLiveRegion, useFocusTrap } from './hooks/useA11y';
export { useKeyboardNavigation } from './hooks/useKeyboardNavigation';

// Types (layout public)
export type {
  VisibilityRule,
  SidebarItem as TemplateSidebarItem,
  SidebarInternalLink,
  SidebarExternalLink,
  SidebarActionItem,
  TemplateSidebarConfig,
  TemplateNavbarConfig,
  TemplateNavbarBrandConfig,
  TemplateFooterConfig,
  TemplateLayoutConfig,
} from './main/layoutTypes';

// Types (models public)
export type { ColumnConfigTable } from './models/ColumnConfigTable';
export type { FieldConfigDynamicForm } from './models/FieldConfigDynamicForm';
export type { ToolbarItem } from './models/ToolbarItemModel';
export type { SidebarItem, SidebarSection } from './models/SidebarItemModel';
export type {
  DashboardLayout,
  GridConfig,
  WidgetPosition,
  WidgetType,
  BaseWidgetConfig,
  ChartAdapter,
  ChartKind,
} from './models/DashboardWidget';

// Types (component props)
export type { BreadcrumbProps } from './components/Breadcrumbs/Breadcrumb';
export type { ControlledZodDynamicFormProps } from './components/Form/ZodDynamicForm';
export type { PaginationProps, TableDataCustomProps } from './components/Table/TableDataCustomBase';
export type { DashboardProps } from './main/dashboard';
// Types (hooks)
export type { LoginCredentials, LoginResult, UseLoginOptions } from './hooks/useLogin';
export type { RegisterPayload, UseRegisterOptions } from './hooks/useRegister';
export type { PasswordResetInput, UsePasswordResetOptions } from './hooks/usePasswordReset';
