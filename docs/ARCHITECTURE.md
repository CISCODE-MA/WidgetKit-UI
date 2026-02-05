# Architecture (React TS DeveloperKit)

This template is for building a reusable React TypeScript **library**:
**components + hooks + utils**.

Tooling is standardized — do not change it casually.

---

## Folder structure

- `src/components/`  
  React UI components only.

- `src/hooks/`  
  React hooks only (state/side-effects/live integrations).

- `src/utils/`  
  Framework-agnostic utilities (no React imports).

- `src/__tests___`
  Unit tests directory

- `src/index.ts`  
  **The only public API** entrypoint.

---

## Public API rules (strict)

- Consumers must import from the package root only:
  - ✅ `import { X } from "@scope/pkg"`
  - ❌ `import { X } from "@scope/pkg/dist/..."`
  - ❌ `import { X } from "@scope/pkg/src/..."`

- Only export public things from `src/index.ts`.
- Anything not exported from `src/index.ts` is private and may change freely.

---

## Layer rules

### `utils`

- MUST NOT import `react` or `react-dom`.
- No DOM globals unless explicitly required.
- Pure functions preferred.

### `hooks`

- May import React.
- Avoid “magic” side effects: prefer explicit params.
- No direct network calls unless the library is explicitly meant to do so.

### `components`

- May import React.
- Keep UI behavior self-contained and testable.
- No styling dependencies.
  - Tailwind-compatible className patterns are allowed
  - Do not assume global CSS
  - Do not ship Tailwind as a dependency

---

## Exports convention

Default pattern:

- `src/components/Button/Button.tsx`
- `src/components/Button/index.ts` exports Button
- `src/components/index.ts` re-exports all components
- `src/index.ts` re-exports `components`, `hooks`, `utils`

---

## Testing

- Vitest only.
- Prefer unit tests for `utils`.
- For `components/hooks`, start with behavior tests and keep DOM coupling minimal.

---

## Data Inputs & Models

This library exposes typed models and component props via the public API to make data contracts explicit:

- Components
  - `Breadcrumb` (`BreadcrumbProps`): minimal UI breadcrumb with `pageName`.
  - `TableDataCustom` (`TableDataCustomProps<T>`):
    - `columns: ColumnConfigTable<T>[]` where each column has `key`, `title`, optional `render`.
    - `data: T[]` rows, consumed by renderers.
    - `pagination?: PaginationProps` (`currentPage`, `totalPages`, `totalItems`, optional `pageSize`, `onPageChange`).
    - `toolbarItems?: ToolbarItem[]` split into left/right via `position` (`'left'|'right'`), `visible`, and `node`.
    - `errorMessage?: string`, `loading?: boolean` to control table states.

- Hooks
  - `useLocalStorage<T>(key, initialValue)`: persists state to `localStorage`.
  - `useColorMode()`: toggles color theme; stores in local storage.
  - `generatePageNumbers(currentPage, totalPages)`: returns numbers and ellipses for pagination.
  - Auth flows:
    - `useLogin(options)`: accepts `{ login, schema }`, returns `{ values, update, submit, loading, error }`.
    - `useRegister(options)` and `usePasswordReset(options)`: similar shape for values/submits.
  - Accessibility:
    - `useLiveRegion()`: announces messages via ARIA live region.
    - `useFocusTrap(ref)`: traps focus within a container for modal/popover contexts.
    - `useKeyboardNavigation(container, { selector, initialIndex })`: roving tabindex for lists.

- Models
  - `ColumnConfigTable<T>`: column `key` (single or tuple for composed values), `title`, optional `render`.
  - `FieldConfigDynamicForm`: key/label/type for dynamic form fields.
  - `ToolbarItem`: toolbar item definition (`position`, `visible`, `node`).
  - Layout types: `TemplateSidebarConfig`, `TemplateNavbarConfig`, etc. for host app integration.

All public types are re-exported from `src/index.ts`; non-exported modules are internal.
