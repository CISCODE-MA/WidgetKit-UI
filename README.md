# WidgetKit-UI: React Dashboard & Data Table Library

Reusable React TypeScript library for dashboard widgets, grid layout, and advanced data tables. Built for host app integration with drag, resize, actions, and localStorage persistence.

## What you get

- Dashboard widget grid: drag, resize, duplicate, remove, actions
- Layout persistence: localStorage hydration and commit
- Data table: typed columns, selection, sorting, filtering, inline edit, pagination
- Error boundaries for widgets and tables
- Pluggable chart adapters (default SVG)
- ESM + CJS + Types build (tsup)
- Vitest unit/integration tests
- ESLint + Prettier (flat config)
- Changesets (manual release flow)
- Husky (pre-commit + pre-push)
- Enforced public API via `src/index.ts`
- Tailwind-compatible styling (no dependency)

## Peer Dependencies & Requirements

- React ecosystem:
  - `react` and `react-dom` (host-provided)
  - `react-router-dom` (required for router-integrated components)
  - `zod` (required for forms)
  - `@ciscode/ui-translate-core` (optional i18n)

Install in host app:

```bash
npm i react react-dom react-router-dom zod @ciscode/ui-translate-core
```

## Package structure

- `src/components` – dashboard, table, form, layout, and common UI components
- `src/hooks` – reusable React hooks
- `src/models` – typed configs for tables, forms, sidebar, toolbar
- `src/index.ts` – **only public API** (no deep imports allowed)

Anything not exported from `src/index.ts` is considered private.

## Scripts

- `npm run dev` – start Vite dev server (for docs/examples)
- `npm run preview` – preview Vite build
- `npm run build` – build library to `dist/` (tsup: ESM + CJS + dts)
- `npm test` – run unit/integration tests (Vitest)
- `npm run test:cov` – run tests with coverage report
- `npm run typecheck` – TypeScript typecheck
- `npm run lint` – ESLint
- `npm run format` – Prettier
- `npx changeset` – create a changeset

### Public API (summary)

Root exports from `src/index.ts`:

- Components: `DashboardGrid`, `WidgetContainer`, `TableDataCustom`, `Breadcrumb`, `ControlledZodDynamicForm`, `Loader`, `PageTitle`, `Sidebar`, `DarkModeSwitcher`, etc.
- Hooks: `useLocalStorage`, `useColorMode`, `useGeneratePageNumbers`
- Types: `ColumnConfigTable`, `FieldConfigDynamicForm`, `SidebarItemModel`, `ToolbarItemModel`, layout types

Internal-only components and utilities are intentionally not exported to avoid coupling. Use the wrapped components provided by the public API.

### Router Integration

Some components (e.g., `Breadcrumb`) rely on React Router. In host apps, wrap your app with `RouterProvider` from `react-router-dom` and ensure `Link` works:

```tsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
const router = createBrowserRouter([{ path: '/', element: <App /> }]);
export function Root() {
  return <RouterProvider router={router} />;
}
```

### Usage Examples

Hooks

- `useLocalStorage`:
  ```tsx
  const [theme, setTheme] = useLocalStorage('color-theme', 'light');
  ```
- `useColorMode`:
  ```tsx
  const { colorMode, setColorMode } = useColorMode();
  ```
- `useGeneratePageNumbers`:
  ```tsx
  const pages = useGeneratePageNumbers({ currentPage: 1, totalPages: 5 });
  ```

Components

- `DashboardGrid`:
  ```tsx
  <DashboardGrid widgets={widgets} persistKey="dashboard-layout" />
  ```
- `TableDataCustom`:

  ```tsx
  import { TableDataCustom, type ColumnConfigTable } from '@ciscode/widgetkit-ui';

  type Row = { id: number; name: string };
  const columns: ColumnConfigTable<Row>[] = [
    { key: 'id', title: 'ID' },
    { key: 'name', title: 'Name' },
  ];

  <TableDataCustom<Row>
    columns={columns}
    data={[{ id: 1, name: 'Alice' }]}
    pagination={{
      currentPage: 1,
      totalPages: 3,
      totalItems: 1,
      onPageChange: (p) => console.log(p),
    }}
  />;
  ```

- `ControlledZodDynamicForm`:

  ```tsx
  import { ControlledZodDynamicForm, type FieldConfigDynamicForm } from '@ciscode/widgetkit-ui';
  import { z } from 'zod';

  const schema = z.object({ name: z.string().min(1) });
  const fields: FieldConfigDynamicForm[] = [{ key: 'name', label: 'Name', type: 'text' }];

  <ControlledZodDynamicForm
    fields={fields}
    schema={schema}
    values={{ name: '' }}
    onChangeField={(field, val) => {
      /* update your form state */
    }}
    onSubmit={(values) => console.log(values)}
  />;
  ```

### Migration Guide (from older template)

- Router: switch imports to `react-router-dom` (`Link`, `RouterProvider`).
- Forms: `ControlledZodDynamicForm` expects controlled `values` and `onChangeField` for reliability.
- Table: use `TableDataCustom` wrapper; base-only internals are private.
- Exports: import only from the package root — all public APIs are re-exported via `src/index.ts`.

### Testing & Coverage

- Unit tests live under `tests/unit/` and run in `jsdom`.
- Coverage uses `v8` provider; HTML report is written to `coverage/`.
- Demo/layout code excluded from coverage; focus is on exported library APIs.

### RTL Support

- Pagination icons respond to `document.dir` and mirror correctly for RTL.
- Components use `ltr:` / `rtl:` Tailwind variants where layout matters.

## Release flow (summary)

- Work on a `feature` branch from `develop`
- Merge to `develop`
- Add a changeset for user-facing changes: `npx changeset`
- Promote `develop` → `master`
- Tag `vX.Y.Z` to publish (npm OIDC)

### Examples App

- Run the local examples to preview components:

```bash
npm run dev
```

- The examples import from the local source via an alias `@ciscode/widgetkit-ui`.

To publish:

- Ensure `npm run prepublishOnly` passes (format, lint, typecheck, tests, build).
- Use Changesets to bump versions and generate changelog.
- Publish with `npm publish --provenance`.

### Publishing Checklist

- `npm run prepublishOnly` succeeds
- Unit coverage ≥ 80%
- E2E smoke/examples pass (optional for host-only packages)
- Changeset created and PR merged
- `dist/` contains `index.js`, `index.cjs`, `index.d.ts`

This repository is a **library**. Teams should focus only on
library logic, not tooling or release mechanics.
