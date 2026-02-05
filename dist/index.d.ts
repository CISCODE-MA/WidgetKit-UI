import * as React$1 from 'react';
import React__default, { ReactNode } from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';
import { ZodSchema } from 'zod';

/** Each item within a section */
interface SidebarItem$1 {
    label: string;
    path?: string;
    icon?: JSX.Element;
    order?: number;
    children?: SidebarItem$1[];
}
/** Each section has a name, an optional order, and an array of items */
interface SidebarSection {
    name: string;
    order?: number;
    items: SidebarItem$1[];
}

type VisibilityRule = {
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
type SidebarInternalLink = SidebarBase & {
    to: string;
    href?: never;
    action?: never;
};
type SidebarExternalLink = SidebarBase & {
    href: string;
    to?: never;
    action?: never;
    newTab?: boolean;
};
type SidebarActionItem = SidebarBase & {
    action: 'logout' | (string & {});
    to?: never;
    href?: never;
};
type SidebarItem = SidebarInternalLink | SidebarExternalLink | SidebarActionItem;
type TemplateSidebarConfig = {
    items: SidebarItem[];
    className?: string;
};
type TemplateNavbarBrandConfig = {
    title?: string;
    href?: string;
    logoSrc?: string;
    logoAlt?: string;
};
type TemplateNavbarConfig = {
    brand?: TemplateNavbarBrandConfig;
    /** Optional full override */
    brandSlot?: ReactNode;
    className?: string;
};
type TemplateFooterLink = {
    label: string;
    href: string;
    /**
     * If omitted, default behavior is new tab (true).
     * Can be overridden per link.
     */
    newTab?: boolean;
};
type TemplateFooterPresetConfig = {
    leftText: string;
    links?: TemplateFooterLink[];
    version?: string;
};
type TemplateFooterConfig = {
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
type TemplateLayoutConfig = {
    sidebar?: TemplateSidebarConfig;
    navbar?: TemplateNavbarConfig;
    footer?: TemplateFooterConfig;
};

/**
 * Props for the `Template` (Dashboard Shell) component.
 * Backward compatible with legacy sidebar/logo/onLogout while
 * supporting modern `sidebar`, `navbar`, and optional `footer` configs.
 */
interface DashboardProps {
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
declare const Template: React__default.FC<DashboardProps>;

/**
 * Props for `Breadcrumb` component.
 * - `pageName`: current page label displayed in the trail.
 */
interface BreadcrumbProps {
    pageName: string;
}
/**
 * Accessible breadcrumb navigation.
 * Renders a current page label and a link to home.
 */
declare const Breadcrumb: React__default.FC<BreadcrumbProps>;

/** The list of supported field types. */
type FieldType = 'text' | 'number' | 'textarea' | 'select' | 'checkbox' | 'multiSelect' | 'custom';
/** For select-type fields, each option has a label and a value. */
interface FieldOption {
    label: string;
    value: string | number;
}
/**
 * Describes each field in your dynamic form:
 * - name, label, type, (optionally) placeholder, options, etc.
 * - if "type" is "custom", you can supply a "component"
 *   that the form will render directly.
 */
interface FieldConfigDynamicForm {
    /** Unique field name => used to store the value in state, reference in Zod schema, etc. */
    name: string;
    /** The label displayed above or next to the input. */
    label?: string;
    /** Type of input: text, number, textarea, select, checkbox, multiSelect, or custom. */
    type: FieldType;
    /** Optional placeholder text for text/textarea/number fields. */
    placeholder?: string;
    /** For select or multiSelect, an array of label/value pairs. */
    options?: FieldOption[];
    /** Default initial value (e.g. '', 0, [], etc.). */
    defaultValue?: any;
    /** For multiSelect or custom logic, an optional URL for searching. */
    /**
     * If `type` is 'custom', you can specify a React component
     * that the form will render. This component should accept
     * props like { value: any, onChange: (val: any) => void } at minimum.
     */
    component?: React__default.ComponentType<any>;
    step?: string;
    /**
     * Tailwind classes for the field wrapper (the <div>).
     * e.g. "w-1/2 px-2" or "col-span-2" or "flex-1"
     */
    wrapperClassName?: string;
    /**
     * If you want custom classes for the <label>, <input>, etc.
     */
    labelClassName?: string;
    inputClassName?: string;
    props?: Record<string, any>;
}

interface ControlledZodDynamicFormProps {
    schema: ZodSchema<any>;
    fields: FieldConfigDynamicForm[];
    values: Record<string, any>;
    onChangeField: (fieldName: string, newValue: any) => void;
    onSubmit: (parsedValues: Record<string, any>) => void;
    submitLabel?: string;
    header?: React__default.ReactNode;
}
declare function ControlledZodDynamicForm({ schema, fields, values, onChangeField, onSubmit, submitLabel, header, }: ControlledZodDynamicFormProps): react_jsx_runtime.JSX.Element;

interface ToolbarItem {
    /** Whether to show/hide the item. Default is true. */
    visible?: boolean;
    /**
     * The position for this item: 'left' or 'right'.
     * If not specified, default to 'left'.
     */
    position?: 'left' | 'right';
    /** The React node to render. e.g. a search input, a button, etc. */
    node: React__default.ReactNode;
}

interface ColumnConfigTable<T> {
    key: keyof T | (keyof T)[];
    title: string;
    /**
     * Optional custom renderer.
     * If key is an array, value will be an array of values.
     */
    render?: (value: T[keyof T] | (T[keyof T] | string)[], row: T, setPopover: (popover: {
        anchor: HTMLElement | null;
        content: React.ReactNode;
    }) => void) => React.ReactNode;
}

/**
 * Pagination configuration for table navigation.
 */
type PaginationProps = {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    pageSize?: number;
    onPageChange?: (page: number) => void;
};
/**
 * Props for `TableDataCustom` and base component.
 */
interface TableDataCustomProps<T> {
    columns: ColumnConfigTable<T>[];
    data: T[];
    loading?: boolean;
    pagination?: PaginationProps;
    errorMessage?: string | null;
    toolbarItems?: ToolbarItem[];
}

/**
 * Public table component with built-in error boundary.
 * Wraps `TableDataCustomBase` in `TableErrorBoundary` to provide a safe fallback.
 * Consumers should import `TableDataCustom` from the package root.
 */
declare function TableDataCustom<T>(props: TableDataCustomProps<T>): react_jsx_runtime.JSX.Element;

/**
 * Setter type used by `useLocalStorage`.
 * Accepts a direct value or an updater function.
 */
type SetValue<T> = T | ((val: T) => T);
/**
 * A typed hook that syncs a stateful value with `window.localStorage`.
 * Returns a tuple `[value, setValue]` similar to `useState`.
 */
declare function useLocalStorage<T>(key: string, initialValue: T): [T, (value: SetValue<T>) => void];

/**
 * Persisted color mode hook.
 * Toggles `dark` class on `<body>` when mode is 'dark'.
 * Returns `[colorMode, setColorMode]`.
 */
declare const useColorMode: () => (string | ((value: SetValue<string>) => void))[];

/**
 * Generate a compact page list for pagination controls.
 * Includes first/last pages and ellipses around the current.
 */
declare function generatePageNumbers(current: number, total: number): (number | string)[];

/**
 * Credentials payload for login.
 */
type LoginCredentials = {
    username: string;
    password: string;
};
/**
 * Result returned by a login service.
 */
type LoginResult<TUser = unknown> = {
    user: TUser;
    token?: string;
};
/**
 * Options for `useLogin`.
 * Provide a `login` function to integrate with your auth backend, and an optional Zod schema for validation.
 */
type UseLoginOptions<TUser = unknown> = {
    login: (credentials: LoginCredentials) => Promise<LoginResult<TUser>>;
    schema?: ZodSchema<LoginCredentials>;
};
/**
 * A composable login hook: manages form state, validation, submit, and loading/errors.
 */
declare function useLogin<TUser = unknown>({ login, schema }: UseLoginOptions<TUser>): {
    values: LoginCredentials;
    update: <K extends keyof LoginCredentials>(key: K, value: LoginCredentials[K]) => void;
    submit: () => Promise<LoginResult<TUser>>;
    loading: boolean;
    error: string | null;
    result: LoginResult<TUser> | null;
};

/**
 * Generic registration payload.
 */
type RegisterPayload = Record<string, unknown>;
/**
 * Options for `useRegister`.
 */
type UseRegisterOptions<TUser = unknown> = {
    register: (payload: RegisterPayload) => Promise<TUser>;
    schema?: ZodSchema<RegisterPayload>;
};
/**
 * A composable registration hook: manages form state, validation, submit, and loading/errors.
 */
declare function useRegister<TUser = unknown>({ register, schema }: UseRegisterOptions<TUser>): {
    values: RegisterPayload;
    update: <K extends string>(key: K, value: unknown) => void;
    submit: () => Promise<TUser>;
    loading: boolean;
    error: string | null;
    user: TUser | null;
};

/**
 * Password reset input: allow email or username.
 */
type PasswordResetInput = {
    email?: string;
    username?: string;
};
/**
 * Options for `usePasswordReset`.
 */
type UsePasswordResetOptions = {
    reset: (input: PasswordResetInput) => Promise<void>;
    schema?: ZodSchema<PasswordResetInput>;
};
/**
 * A composable password reset hook: manages form state, validation, submit, and loading/errors.
 */
declare function usePasswordReset({ reset, schema }: UsePasswordResetOptions): {
    values: PasswordResetInput;
    update: <K extends keyof PasswordResetInput>(key: K, value: PasswordResetInput[K]) => void;
    submit: () => Promise<void>;
    loading: boolean;
    error: string | null;
    success: boolean;
};

/**
 * Manage ARIA live region announcements.
 * Returns a ref to attach to an element with `aria-live="polite"` or `assertive`.
 * Use `announce()` to set text content.
 */
declare function useLiveRegion(): {
    ref: React$1.MutableRefObject<HTMLElement | null>;
    announce: (message: string) => void;
};
/**
 * Trap focus within a container element (e.g., modal) while `active`.
 * Adds keydown handlers to cycle focus.
 */
declare function useFocusTrap(active: boolean): {
    ref: React$1.MutableRefObject<HTMLElement | null>;
};

var undefined$1 = undefined;

export { Breadcrumb, type BreadcrumbProps, type ColumnConfigTable, ControlledZodDynamicForm, type ControlledZodDynamicFormProps, type DashboardProps, type FieldConfigDynamicForm, type LoginCredentials, type LoginResult, type PaginationProps, type PasswordResetInput, type RegisterPayload, type SidebarActionItem, type SidebarExternalLink, type SidebarInternalLink, type SidebarItem$1 as SidebarItem, type SidebarSection, TableDataCustom, type TableDataCustomProps, Template, type TemplateFooterConfig, type TemplateLayoutConfig, type TemplateNavbarBrandConfig, type TemplateNavbarConfig, type TemplateSidebarConfig, type SidebarItem as TemplateSidebarItem, type ToolbarItem, type UseLoginOptions, type UsePasswordResetOptions, type UseRegisterOptions, type VisibilityRule, generatePageNumbers, useColorMode, useFocusTrap, undefined$1 as useKeyboardNavigation, useLiveRegion, useLocalStorage, useLogin, usePasswordReset, useRegister };
