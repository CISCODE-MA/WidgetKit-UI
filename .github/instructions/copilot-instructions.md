# Copilot Instructions - @ciscode/ui-widget-kit

> **Purpose**: Reusable React component library providing dashboard widgets, grid layout, data tables, dynamic forms, and the main app template shell — consumed as a shared UI layer across all `@ciscode/*` frontend apps.

---

## 🎯 Package Overview

**Package**: `@ciscode/ui-widget-kit`  
**Version**: 1.0.x  
**Type**: React Frontend Component Library  
**Purpose**: Centralized, typed, accessible UI components and hooks — the single source of truth for dashboard layout, data display, and form patterns across all host apps

### This Package Provides:

- Component-Hook-Model (CHM) architecture — the frontend equivalent of CSR
- `DashboardGrid` + `WidgetContainer` — drag, resize, actions, layout persistence
- `TableDataCustom` — typed columns, selection, sorting, filtering, pagination, inline edit
- `ControlledZodDynamicForm` — schema-driven, fully controlled form with Zod validation
- `Template` — full app shell (sidebar, navbar, footer, layout config)
- `Breadcrumb`, `Loader`, `PageTitle`, `Sidebar`, `DarkModeSwitcher` — common UI
- `DefaultChartAdapter` — pluggable SVG chart adapter
- Auth hooks: `useLogin`, `useRegister`, `usePasswordReset`
- Utility hooks: `useLocalStorage`, `useColorMode`, `useKeyboardNavigation`
- Accessibility hooks: `useLiveRegion`, `useFocusTrap`
- Complete TypeScript types for all public contracts
- Tailwind-compatible styling (utility classes only — no Tailwind dependency on host)
- Vitest unit/integration tests with 80% coverage threshold
- Playwright E2E tests
- Changesets for version management
- Husky + lint-staged for code quality

---

## 🏗️ Module Architecture

**WidgetKit uses Component-Hook-Model (CHM) pattern — the frontend equivalent of CSR.**

> **WHY CHM for UI libraries?** Reusable component libraries need clean separation between rendering (Components), logic/state (Hooks), and data contracts (Models). This mirrors CSR but for the React world: Components are Controllers, Hooks are Services, Models are Entities/DTOs.

```
src/
  ├── index.ts                                  # PUBLIC API — all exports go through here
  ├── assets/
  │   └── styles/
  │       └── style.css                         # Global styles — imported once by host app
  │
  ├── components/                               # UI Layer (rendering + interaction)
  │   ├── Dashboard/
  │   │   └── Widgets/
  │   │       ├── DashboardGrid.tsx             # Grid orchestrator
  │   │       ├── WidgetContainer.tsx           # Single widget shell (drag, resize, actions)
  │   │       └── ChartAdapters/               # Pluggable chart adapters
  │   ├── Table/
  │   │   ├── TableDataCustom.tsx              # Public wrapper (exported)
  │   │   └── TableDataCustomBase.tsx          # Internal base (not exported directly)
  │   ├── Form/
  │   │   └── ZodDynamicForm.tsx               # ControlledZodDynamicForm
  │   ├── Breadcrumbs/
  │   │   └── Breadcrumb.tsx
  │   └── (Loader, PageTitle, Sidebar, etc.)
  │
  ├── hooks/                                   # Logic Layer (state, side effects, auth)
  │   ├── useLocalStorage.ts
  │   ├── useColorMode.ts
  │   ├── useGeneratePageNumbers.ts
  │   ├── useLogin.ts
  │   ├── useRegister.ts
  │   ├── usePasswordReset.ts
  │   ├── useA11y.ts                           # useLiveRegion, useFocusTrap
  │   └── useKeyboardNavigation.ts
  │
  ├── models/                                  # Type Layer (contracts, configs)
  │   ├── ColumnConfigTable.ts
  │   ├── FieldConfigDynamicForm.ts
  │   ├── ToolbarItemModel.ts
  │   ├── SidebarItemModel.ts
  │   └── DashboardWidget.ts
  │
  └── main/                                    # App Shell
      ├── dashboard.tsx                        # Template component (full layout)
      └── layoutTypes.ts                       # Layout config types
```

**Responsibility Layers:**

| Layer          | Responsibility                                         | Examples                                             |
| -------------- | ------------------------------------------------------ | ---------------------------------------------------- |
| **Components** | Rendering, user interaction, composition               | `DashboardGrid`, `TableDataCustom`, `Breadcrumb`     |
| **Hooks**      | State logic, side effects, auth, a11y                  | `useColorMode`, `useLogin`, `useFocusTrap`           |
| **Models**     | TypeScript contracts, config shapes (no runtime logic) | `ColumnConfigTable`, `DashboardLayout`, `WidgetType` |
| **Main/Shell** | App-level layout orchestration                         | `Template`, `layoutTypes`                            |
| **Assets**     | Global stylesheet — CSS variables, base resets         | `style.css`                                          |

### Layer Rules — STRICTLY ENFORCED

| Layer        | Can import from                 | Cannot import from            |
| ------------ | ------------------------------- | ----------------------------- |
| `components` | `hooks`, `models`, `assets`     | `main` internals              |
| `hooks`      | `models`                        | `components`                  |
| `models`     | Nothing internal                | `hooks`, `components`, `main` |
| `main`       | `components`, `hooks`, `models` | —                             |

> **The golden rule**: `models/` is pure TypeScript — no React imports, no hooks, no runtime code. If you're writing `import { useState }` inside a model file, it's in the wrong layer.

---

## 📝 Naming Conventions

### Files

**Pattern**: `PascalCase` for components, `camelCase` for hooks and models

| Type              | Example                   | Directory                                         |
| ----------------- | ------------------------- | ------------------------------------------------- |
| Component         | `DashboardGrid.tsx`       | `src/components/<Feature>/`                       |
| Hook              | `useColorMode.ts`         | `src/hooks/`                                      |
| Model / Type file | `ColumnConfigTable.ts`    | `src/models/`                                     |
| Layout type       | `layoutTypes.ts`          | `src/main/`                                       |
| Chart adapter     | `DefaultChartAdapter.tsx` | `src/components/Dashboard/Widgets/ChartAdapters/` |
| Test (unit)       | `DashboardGrid.test.tsx`  | `tests/unit/`                                     |
| Test (E2E)        | `dashboard.spec.ts`       | `tests/e2e/`                                      |

### Code Naming

- **Components**: `PascalCase` → `DashboardGrid`, `WidgetContainer`, `TableDataCustom`
- **Hooks**: `camelCase` with `use` prefix → `useLocalStorage`, `useFocusTrap`
- **Types / Interfaces**: `PascalCase` → `ColumnConfigTable`, `DashboardLayout`, `WidgetType`
- **Props types**: named `Props` locally, exported with component name → `DashboardProps`, `TableDataCustomProps`
- **Enum values**: `UPPER_SNAKE_CASE` (if used) or string literals
- **Constants**: `UPPER_SNAKE_CASE` → `DEFAULT_GRID_COLS`, `PERSIST_KEY_PREFIX`

### Component Pattern — ALWAYS follow this structure

```tsx
import type { JSX } from 'react';
import type { ColumnConfigTable } from '../../models/ColumnConfigTable';

// 1. Define Props type explicitly — never inline in function signature
type Props = {
  columns: ColumnConfigTable<Row>[];
  data: Row[];
  onRowClick?: (row: Row) => void;
  className?: string;
};

// 2. Default export for components
export default function TableDataCustom<Row>({
  columns,
  data,
  onRowClick,
  className,
}: Props): JSX.Element {
  // ...
}

// 3. Export Props type for consumers
export type { Props as TableDataCustomProps };
```

**Rules:**

- ✅ Always explicit `Props` type — never `React.FC<{...}>` inline
- ✅ Always explicit `JSX.Element` return type
- ✅ Default export for components, named exports for hooks and types
- ✅ Destructure props in the function signature
- ❌ Never use `React.FC` — it hides return type and adds implicit children
- ❌ Never use `any` for prop types — use `unknown` or proper generics

---

## 📦 Public API — `src/index.ts`

**Everything the host app can use must be exported here. Anything not in `src/index.ts` is private.**

```typescript
// ✅ All host app imports must come from the package root
import {
  DashboardGrid,
  TableDataCustom,
  ControlledZodDynamicForm,
  useColorMode,
  useLocalStorage,
  type ColumnConfigTable,
  type DashboardLayout,
} from '@ciscode/ui-widget-kit';

// Also import the stylesheet once in your app entry point
import '@ciscode/ui-widget-kit/style.css';
```

**Export rules:**

```typescript
// ✅ Exported — public API
export { default as DashboardGrid } from './components/Dashboard/Widgets/DashboardGrid';
export { default as TableDataCustom } from './components/Table/TableDataCustom';
export { default as useColorMode } from './hooks/useColorMode';
export type { ColumnConfigTable } from './models/ColumnConfigTable';

// ❌ NEVER export
// Internal base components (TableDataCustomBase — use the wrapper)
// Internal sub-components (WidgetContainer when used only inside DashboardGrid)
// Internal utilities and helpers not part of the public contract
```

**When adding a new export**, always ask: _is this something a host app needs directly, or is it an internal implementation detail?_ If unsure — keep it private.

---

## ⚙️ Peer Dependencies

Host apps must install peer dependencies. Only install what you use:

| Peer dep                         | Required for                               | Optional |
| -------------------------------- | ------------------------------------------ | -------- |
| `react` + `react-dom` >= 18      | Everything                                 | No       |
| `react-router-dom` ^7            | `Breadcrumb`, router-integrated components | No       |
| `zod` ^4                         | `ControlledZodDynamicForm`                 | No       |
| `react-select` ^5                | Select/dropdown form fields                | No       |
| `@ciscode/ui-translate-core`     | i18n/translations in components            | No       |
| `@ciscode/ui-authentication-kit` | Auth hooks (`useLogin`, etc.)              | Yes      |

> **Rule for new peer deps**: mark optional in `peerDependenciesMeta`, guard usage with a clear runtime error if missing, document in README. Never add a required peer dep without a MAJOR version bump.

---

## 🧩 Core Components

### `DashboardGrid`

```tsx
<DashboardGrid
  grid={{ cols: 3, gap: '1rem' }}
  widgets={layout}
  onLayoutChange={setLayout}
  enableDrag={true} // default: true
  enableResize={true} // default: true
  showActions={true} // default: true
  persistKey="my-dashboard" // optional: enables localStorage persistence
/>
```

**Rules for widget types**: `card`, `stat`, `progress`, `activity`, `chart`, `custom`. Adding a new widget type requires updating `WidgetType` in `models/DashboardWidget.ts` and the renderer in `DashboardGrid.tsx`.

### `TableDataCustom`

```tsx
const columns: ColumnConfigTable<User>[] = [
  { key: 'name', title: 'Name', sortable: true },
  { key: 'email', title: 'Email' },
];

<TableDataCustom<User>
  columns={columns}
  data={users}
  pagination={{ currentPage, totalPages, totalItems, onPageChange }}
/>;
```

### `ControlledZodDynamicForm`

Fully controlled — host app owns state. No internal state for field values.

```tsx
<ControlledZodDynamicForm
  fields={fields}
  schema={schema} // Zod schema (z.object)
  values={formState} // host-owned state
  onChangeField={(key, val) => setFormState((prev) => ({ ...prev, [key]: val }))}
  onSubmit={(values) => handleSubmit(values)}
/>
```

### `Template` (App Shell)

```tsx
<Template
  layout={{
    sidebar: { items: [...], config: {...} },
    navbar: { brand: {...} },
    footer: { text: '© 2026' },
  }}
/>
```

---

## 🎨 Styling Rules

- ✅ Use Tailwind utility classes directly in JSX — no custom CSS files per component
- ✅ RTL support via `ltr:` / `rtl:` Tailwind variants where layout is directional
- ✅ Dark mode via `dark:` variants — driven by `useColorMode` hook
- ✅ Global overrides and CSS variables go in `src/assets/styles/style.css` only
- ❌ Never create per-component `.css` or `.module.css` files
- ❌ Never use inline `style={{}}` for anything expressible as a Tailwind class
- ❌ Never hardcode color values — use Tailwind's color scale or CSS variables

```tsx
// ❌ Wrong — inline style for layout
<div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>

// ✅ Correct — Tailwind utilities
<div className="flex flex-col gap-4">

// ✅ Correct — RTL-aware
<div className="ltr:ml-4 rtl:mr-4">
```

---

## ♿ Accessibility (a11y) — NON-NEGOTIABLE

Every interactive component must meet WCAG 2.1 AA. Use the built-in a11y hooks:

```tsx
// Live announcements (for async state changes)
const { announce } = useLiveRegion();
announce('Table data updated');

// Focus trap (for modals, dropdowns)
const { containerRef } = useFocusTrap(isOpen);

// Keyboard navigation
useKeyboardNavigation({ onEscape: closeModal, onEnter: confirm });
```

**Checklist for every new component:**

- [ ] All interactive elements reachable by keyboard (`Tab`, `Enter`, `Space`, `Escape`)
- [ ] `aria-label` or `aria-labelledby` on all interactive elements
- [ ] `role` attribute where semantics are ambiguous
- [ ] Focus visible at all times (no `:focus { outline: none }` without replacement)
- [ ] Live region announcements for dynamic content updates
- [ ] Correct color contrast ratio (4.5:1 for text, 3:1 for UI components)

---

## 🧪 Testing - RIGOROUS for Libraries

### Coverage Target: 80%+

**Unit Tests — MANDATORY (Vitest + @testing-library/react):**

- ✅ All exported components — render, props variants, user interactions
- ✅ All exported hooks — state changes, side effects, edge cases
- ✅ `DashboardGrid` — widget rendering per type, layout change callback
- ✅ `TableDataCustom` — column rendering, pagination, sorting, empty state
- ✅ `ControlledZodDynamicForm` — field rendering, validation errors, submit flow
- ✅ `useLocalStorage` — read, write, SSR safety
- ✅ `useColorMode` — toggle, persistence, system preference
- ✅ `useFocusTrap` + `useLiveRegion` — a11y behavior

**Integration Tests:**

- ✅ `Template` — full layout render with sidebar + navbar + footer
- ✅ Form + Table together (common dashboard pattern)
- ✅ `DashboardGrid` with `persistKey` — localStorage hydration and commit

**E2E Tests (Playwright):**

- ✅ Dashboard drag/resize (critical user path)
- ✅ Table sort + filter + pagination
- ✅ Form submit with validation errors

**Test file location:**

```
tests/
  └── unit/
      ├── DashboardGrid.test.tsx
      ├── TableDataCustom.test.tsx
      ├── useColorMode.test.ts
      └── ...
```

**Test patterns:**

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import DashboardGrid from '../../src/components/Dashboard/Widgets/DashboardGrid';
import type { DashboardLayout, GridConfig } from '../../src/models/DashboardWidget';

describe('DashboardGrid', () => {
  const grid: GridConfig = { cols: 3, gap: '1rem' };
  const widgets: DashboardLayout = [
    {
      id: '1',
      type: 'card',
      title: 'Test',
      position: { x: 0, y: 0, w: 1, h: 1 },
      props: { content: 'Hello' },
    },
  ];

  it('renders widget titles', () => {
    render(<DashboardGrid grid={grid} widgets={widgets} onLayoutChange={vi.fn()} />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
```

**Vitest Configuration:**

```typescript
coverage: {
  provider: 'v8',
  thresholds: {
    branches:   80,
    functions:  80,
    lines:      80,
    statements: 80,
  },
  exclude: ['src/main/', 'examples/'],  // exclude shell and examples
}
```

---

## 📚 Documentation - Complete

### JSDoc/TSDoc — ALWAYS for public APIs

````tsx
/**
 * Renders a configurable grid of dashboard widgets with optional drag, resize, and persistence.
 *
 * @param grid - Grid configuration (columns, gap)
 * @param widgets - Current layout state (array of widget configs with positions)
 * @param onLayoutChange - Called with updated layout whenever a widget is moved or resized
 * @param enableDrag - Enable drag-to-reorder (default: true)
 * @param enableResize - Enable resize handles (default: true)
 * @param persistKey - localStorage key for layout persistence; omit to disable persistence
 *
 * @example
 * ```tsx
 * <DashboardGrid
 *   grid={{ cols: 3, gap: '1rem' }}
 *   widgets={layout}
 *   onLayoutChange={setLayout}
 *   persistKey="main-dashboard"
 * />
 * ```
 */
export default function DashboardGrid({ ... }: Props): JSX.Element
````

**Required for:**

- All exported components (full JSDoc on the function)
- All exported hooks (JSDoc + `@returns` description)
- All exported model types (JSDoc on the interface + each property — as already done in `DashboardWidget.ts`)
- All `Props` types that are re-exported

---

## 🚀 Library Development Principles

### 1. Controlled over Uncontrolled

Host apps own state. Components receive state via props and emit changes via callbacks. Never hide state inside a component that the host app needs to control.

```tsx
// ❌ Wrong — hidden internal state
function TableDataCustom() {
  const [page, setPage] = useState(1); // host can't control this
}

// ✅ Correct — fully controlled
function TableDataCustom({ currentPage, onPageChange }: Props) {
  // host owns page state
}
```

### 2. Composition over Configuration

Prefer composable primitives over mega-components with dozens of boolean flags.

```tsx
// ❌ Wrong — flag soup
<Table showFooter showToolbar enableSearch enableExport sortable filterable />

// ✅ Correct — compose what you need
<TableDataCustom columns={columns} data={data} pagination={pagination} />
```

### 3. Zero Business Logic in Components

Components render — they don't fetch, transform, or validate data. That belongs in hooks or the host app.

```tsx
// ❌ Wrong — component fetches its own data
export function UserTable() {
  const [users, setUsers] = useState([]);
  useEffect(() => { fetch('/api/users').then(...) }, []);
}

// ✅ Correct — data comes in via props
export function TableDataCustom<Row>({ data, columns }: Props) { }
```

### 4. Accessibility is Not Optional

Every component must be keyboard-navigable and screen-reader friendly before it can be considered complete. A component without a11y is a bug, not a feature gap.

### 5. Tailwind-Compatible, Not Tailwind-Dependent

Use Tailwind classes in this library's source — but the host app does not need to install Tailwind. The built `style.css` contains all necessary styles.

---

## 🔄 Workflow & Task Management

### Task-Driven Development

**1. Branch Creation:**

```bash
feature/WIDGET-123-add-timeline-widget-type
bugfix/WIDGET-456-fix-table-sort-rtl
refactor/WIDGET-789-extract-pagination-hook
```

**2. Task Documentation:**
Create task file at branch start:

```
docs/tasks/active/WIDGET-123-add-timeline-widget-type.md
```

**3. On Release:**
Move to archive:

```
docs/tasks/archive/by-release/v1.1.0/WIDGET-123-add-timeline-widget-type.md
```

### Development Workflow

**Simple changes**: Read context → Implement → Update docs → **Create changeset**

**Complex changes**: Read context → Discuss approach → Implement → Update docs → **Create changeset**

**When blocked**:

- **DO**: Ask immediately
- **DON'T**: Generate incorrect output

---

## 📦 Versioning & Breaking Changes

### Semantic Versioning (Strict)

**MAJOR** (x.0.0) — Breaking changes:

- Removed or renamed exported component or hook
- Changed required props on any exported component
- Changed hook return shape (renamed or removed returned values)
- Changed exported model type (removed or renamed fields)
- Added a new **required** peer dependency
- Renamed package exports

**MINOR** (0.x.0) — New features:

- New exported component or hook
- New **optional** prop on existing component
- New field on an exported model type
- New optional peer dependency

**PATCH** (0.0.x) — Bug fixes:

- Visual/layout fixes with no prop changes
- Hook logic fix with no API change
- Accessibility improvement with no prop changes
- Documentation updates

### Changesets Workflow

**ALWAYS create a changeset for user-facing changes:**

```bash
npx changeset
```

**When to create a changeset:**

- ✅ New features, bug fixes, breaking changes, a11y improvements
- ❌ Internal refactoring (no user-facing change)
- ❌ Documentation updates only
- ❌ Test improvements only

**Before completing any task:**

- [ ] Component implemented
- [ ] Tests passing
- [ ] JSDoc updated
- [ ] **Changeset created** ← CRITICAL
- [ ] PR ready

**Changeset format:**

```markdown
---
'@ciscode/ui-widget-kit': minor
---

Added `timeline` widget type to DashboardGrid with configurable event items
```

### CHANGELOG Required

```markdown
## [1.1.0] - 2026-02-26

### BREAKING CHANGES

- `DashboardGrid` now requires `grid` prop — previously optional with defaults

### Added

- `timeline` widget type for DashboardGrid
- `useKeyboardNavigation` hook exported for host app use
- RTL support for TableDataCustom pagination

### Fixed

- Focus trap not releasing on modal close in Safari
```

---

## 🔐 Security & Safety

- ✅ Never render raw HTML from props without sanitization (`dangerouslySetInnerHTML` is forbidden unless explicitly approved)
- ✅ All user-facing text must support i18n via `@ciscode/ui-translate-core` — no hardcoded English strings in exported components
- ✅ Auth hooks (`useLogin`, `useRegister`, `usePasswordReset`) must never log credentials
- ✅ `useLocalStorage` must handle `SecurityError` (private browsing) and `QuotaExceededError` gracefully
- ✅ No `console.log` in production builds — use the debug hook pattern if needed

```tsx
// ❌ WRONG — raw HTML from props
<div dangerouslySetInnerHTML={{ __html: widget.props.content }} />

// ✅ CORRECT — treat content as text
<div>{String(widget.props.content ?? '')}</div>
```

---

## 🚫 Restrictions — Require Approval

**NEVER without approval:**

- Breaking changes to exported component props
- Removing or renaming exported components, hooks, or types
- Adding a new required peer dependency
- Changes to `style.css` global styles (can affect all host apps)
- Changes to `Template` layout structure (high blast radius)
- Any `dangerouslySetInnerHTML` usage

**CAN do autonomously:**

- Bug fixes (non-breaking)
- New optional props on existing components
- New exported hooks or utility components (additive)
- Internal refactoring (no public API change)
- Test and documentation improvements
- A11y improvements (non-breaking)

---

## ✅ Release Checklist

`prepublishOnly` enforces this automatically, but verify manually:

- [ ] `npm run format` — Prettier clean
- [ ] `npm run lint` — ESLint `--max-warnings=0`
- [ ] `npm run typecheck` — TypeScript strict mode passing
- [ ] `npm test` — all Vitest tests passing
- [ ] `npm run test:cov` — coverage ≥ 80% (branches, functions, lines, statements)
- [ ] `npm run build` — `dist/` contains `index.js`, `index.cjs`, `index.d.ts`, `style.css`
- [ ] All new public APIs have JSDoc
- [ ] New props documented in README usage examples
- [ ] Changeset created
- [ ] Breaking changes highlighted
- [ ] Tested via `npm link` in a real host app

---

## 🔄 Development Workflow

### Working on the Library:

1. Clone the repo
2. Create branch: `feature/WIDGET-123-description` from `develop`
3. `npm run dev` — start Vite dev server with examples app
4. Implement with tests in `tests/unit/`
5. **Create changeset**: `npx changeset`
6. Verify checklist / `prepublishOnly`
7. Create PR → `develop`

### Running Examples:

```bash
npm run dev          # main dev server
npm run dev:examples # examples app (imports from local source)
```

### Testing in a Host App:

```bash
# In ui-widget-kit
npm run build
npm link

# In host app
npm link @ciscode/ui-widget-kit

# Remember to import the stylesheet
import '@ciscode/ui-widget-kit/style.css';

# Unlink when done
npm unlink @ciscode/ui-widget-kit
```

---

## 🎨 Code Style

- ESLint (flat config) `--max-warnings=0`
- Prettier formatting
- TypeScript strict mode
- Functional components only — no class components
- Pure functions for model/utility logic; hooks for stateful logic
- No `React.FC` — always explicit return type `JSX.Element` or `JSX.Element | null`
- Props destructured in function signature — never accessed via `props.x`

```tsx
// ✅ Correct
export default function Breadcrumb({ items, className }: Props): JSX.Element {
  return <nav aria-label="breadcrumb" className={className}>...</nav>;
}

// ❌ Wrong
export const Breadcrumb: React.FC<Props> = (props) => {
  return <nav>{props.items.map(...)}</nav>;
};
```

---

## 🐛 Error Handling

**Error boundaries — ALWAYS for widget and table renders:**

```tsx
// Wrap consumer-provided content in error boundaries
<ErrorBoundary fallback={<WidgetError title={widget.title} />}>
  <WidgetContainer>{renderWidgetContent(widget)}</WidgetContainer>
</ErrorBoundary>
```

**Hook errors — never throw to the render cycle:**

```tsx
// ❌ Wrong — throws during render
function useLocalStorage(key: string) {
  const value = localStorage.getItem(key); // throws in SSR / private mode
}

// ✅ Correct — safe with fallback
function useLocalStorage<T>(key: string, defaultValue: T) {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch {
    return defaultValue; // SSR, private browsing, quota exceeded
  }
}
```

**NEVER silent failures in callbacks:**

```tsx
// ❌ Wrong
onLayoutChange?.();

// ✅ Correct
try {
  onLayoutChange(updatedLayout);
} catch (error) {
  console.error('[DashboardGrid] onLayoutChange threw:', error);
}
```

---

## 💬 Communication Style

- Brief and direct
- Reference the correct layer (`components`, `hooks`, `models`) when discussing changes
- Always specify the component name and prop when discussing API changes
- Flag breaking changes immediately — even suspected ones
- This library is consumed by multiple host apps — when in doubt about blast radius, ask

---

## 📋 Summary

**Library Principles:**

1. Reusability over specificity
2. Controlled components — host apps own state
3. Comprehensive testing (80%+ coverage)
4. Complete documentation (JSDoc on all public APIs)
5. Strict versioning — breaking changes = MAJOR bump + changeset
6. Zero business logic in components
7. Accessibility is not optional — WCAG 2.1 AA minimum
8. Tailwind classes in source, no Tailwind required in host

**Layer ownership — quick reference:**

| Concern                    | Owner                         |
| -------------------------- | ----------------------------- |
| UI rendering & interaction | `src/components/<Feature>/`   |
| State logic & side effects | `src/hooks/`                  |
| TypeScript contracts       | `src/models/`                 |
| Layout config types        | `src/main/layoutTypes.ts`     |
| App shell                  | `src/main/dashboard.tsx`      |
| Global styles              | `src/assets/styles/style.css` |
| All public exports         | `src/index.ts`                |

**When in doubt:** Ask, don't assume. This library ships to multiple host apps — a broken prop type can fail builds across the whole org.

---

_Last Updated: February 26, 2026_  
_Version: 1.0.4_
