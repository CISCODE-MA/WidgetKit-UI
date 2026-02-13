# @ciscode/ui-widget-kit

Template repository for building reusable React TypeScript **npm libraries**
(components + hooks + utilities).

## What you get

- ESM + CJS + Types build (tsup)
- Vitest testing
- ESLint + Prettier (flat config)
- Changesets (manual release flow, no automation PR)
- Husky (pre-commit + pre-push)
- Enforced public API via `src/index.ts`
- Dependency-free styling (Tailwind-compatible by convention only)
- `react` and `react-dom` as peerDependencies

## Peer Dependencies & Requirements

- React ecosystem:
  - `react` and `react-dom` (host-provided)
  - `react-router-dom` (required if you use `Breadcrumb` or any router-integrated components)
  - `zod` (required if you use `ControlledZodDynamicForm`)
  - `@ciscode/ui-translate-core` (optional i18n provider used by some components)

Install in host app:

```bash
npm i react react-dom react-router-dom zod @ciscode/ui-translate-core
```

## Package structure

- `src/components` – reusable UI components
- `src/hooks` – reusable React hooks
- `src/utils` – framework-agnostic utilities
- `src/index.ts` – **only public API** (no deep imports allowed)

Anything not exported from `src/index.ts` is considered private.

## Scripts

## Scripts

- `npm run dev` – start Vite dev server (for docs/examples)
- `npm run preview` – preview Vite build
- `npm run build` – build library to `dist/` (tsup: ESM + CJS + dts)
- `npm test` – run unit/integration tests (Vitest)
- `npm run test:cov` – run tests with coverage report
- `npm run e2e` / `npm run e2e:headed` – run Playwright tests
- `npm run typecheck` – TypeScript typecheck
- `npm run type-check:watch` – TypeScript typecheck in watch mode
- `npm run lint` – ESLint
- `npm run format` / `npm run format:write` – Prettier
- `npx changeset` – create a changeset
  Anything not exported from `src/index.ts` is considered private.

### Public API (summary)

Root exports from `src/index.ts`:

- Components: `Template`, `Breadcrumb`, `ControlledZodDynamicForm`, `TableDataCustom`
- Hooks: `useLocalStorage`, `useColorMode`, `generatePageNumbers`
- Types: `ColumnConfigTable`, `FieldConfigDynamicForm`, `ToolbarItem`, `SidebarItem`, `SidebarSection`, and layout types (`TemplateSidebarConfig`, `TemplateNavbarConfig`, `TemplateFooterConfig`, etc.)

Internal-only components and utilities are intentionally not exported to avoid coupling (e.g. base-only table components). Use the wrapped components provided by the public API.

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
- `useLogin`:
  ```tsx
  const { values, update, submit, loading, error } = useLogin({
    login: async ({ username, password }) => ({ user: { name: username }, token: 't123' }),
    schema: { parse: (v) => v },
  });
  ```

Components

- `Breadcrumb`:

  ```tsx
  <Breadcrumb pageName="Dashboard" />
  ```

- `TableDataCustom`:

  ```tsx
  import { TableDataCustom, type ColumnConfigTable } from '@ciscode/template-fe';

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
  import { ControlledZodDynamicForm, type FieldConfigDynamicForm } from '@ciscode/template-fe';
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
- We exclude demo/layout code from coverage to focus on exported library APIs.

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
npm run dev:examples
```

- The examples import from the local source via an alias `@ciscode/template-fe`.

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

This repository is a **template**. Teams should clone it and focus only on
library logic, not tooling or release mechanics.
