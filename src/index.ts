import './assets/styles/style.css';

// Components (public)
export { default as Breadcrumb } from './components/Breadcrumbs/Breadcrumb';
export { default as DashboardGrid } from './components/Dashboard/Widgets/DashboardGrid';
export { default as ControlledZodDynamicForm } from './components/Form/ZodDynamicForm';
export { default as TableDataCustom } from './components/Table/TableDataCustom';
export { default as Template } from './main/dashboard';

// Hooks (public)
export { useFocusTrap, useLiveRegion } from './hooks/useA11y';
export { default as useColorMode } from './hooks/useColorMode';
export { generatePageNumbers } from './hooks/useGeneratePageNumbers';
export { useKeyboardNavigation } from './hooks/useKeyboardNavigation';
export { default as useLocalStorage } from './hooks/useLocalStorage';
export { default as useLogin } from './hooks/useLogin';
export { default as usePasswordReset } from './hooks/usePasswordReset';
export { default as useRegister } from './hooks/useRegister';

// Types (layout public)
export type {
  SidebarActionItem,
  SidebarExternalLink,
  SidebarInternalLink,
  TemplateFooterConfig,
  TemplateLayoutConfig,
  TemplateNavbarBrandConfig,
  TemplateNavbarConfig,
  TemplateSidebarConfig,
  SidebarItem as TemplateSidebarItem,
  TemplateUserConfig,
  VisibilityRule,
} from './main/layoutTypes';

// Types (models public)
export type { ColumnConfigTable } from './models/ColumnConfigTable';
export type {
  BaseWidgetConfig,
  ChartAdapter,
  ChartKind,
  DashboardLayout,
  GridConfig,
  WidgetPosition,
  WidgetType,
} from './models/DashboardWidget';
export type { FieldConfigDynamicForm } from './models/FieldConfigDynamicForm';
export type { SidebarItem, SidebarSection } from './models/SidebarItemModel';
export type { ToolbarItem } from './models/ToolbarItemModel';

// Types (component props)
export type { BreadcrumbProps } from './components/Breadcrumbs/Breadcrumb';
export type { ControlledZodDynamicFormProps } from './components/Form/ZodDynamicForm';
export type { PaginationProps, TableDataCustomProps } from './components/Table/TableDataCustomBase';
export type { DashboardProps } from './main/dashboard';
