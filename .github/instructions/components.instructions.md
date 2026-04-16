# Component Development Instructions - WidgetKit-UI

> **Purpose**: React component development standards for reusable widget UI components.

---

## 🎯 Component Architecture

### Component Structure
```
ComponentName/
  ├── ComponentName.tsx       # Main component
  ├── ComponentName.test.tsx  # Tests
  ├── ComponentName.types.ts  # Props & types
  ├── ComponentName.styles.ts # Styled components (if using)
  └── index.ts                # Exports
```

### Widget Component Template
```typescript
import React from 'react';
import { WidgetProps } from './Widget.types';

/**
 * Reusable widget component
 * @param {WidgetProps} props - Component props
 * @returns {JSX.Element} Rendered widget
 */
export const Widget: React.FC<WidgetProps> = ({
  title,
  children,
  isLoading = false,
  error,
  onRefresh,
  className,
  ...props
}) => {
  return (
    <div className={`widget ${className}`} {...props}>
      <div className="widget-header">
        <h3>{title}</h3>
        {onRefresh && (
          <button
            onClick={onRefresh}
            aria-label="Refresh widget"
            disabled={isLoading}
          >
            {isLoading ? '⟳' : '↻'}
          </button>
        )}
      </div>
      <div className="widget-content">
        {isLoading ? (
          <div role="status" aria-label="Loading">
            Loading...
          </div>
        ) : error ? (
          <div role="alert" className="widget-error">
            {error}
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
};

Widget.displayName = 'Widget';
```

---

## 📝 Props Standards

### Widget Props Interface
```typescript
export interface WidgetProps {
  /** Widget title */
  title: string;
  /** Widget content */
  children?: React.ReactNode;
  /** Loading state */
  isLoading?: boolean;
  /** Error message */
  error?: string;
  /** Refresh callback */
  onRefresh?: () => void;
  /** Additional CSS classes */
  className?: string;
  /** Widget size variant */
  size?: 'small' | 'medium' | 'large';
  /** Widget color theme */
  variant?: 'default' | 'primary' | 'secondary' | 'accent';
}
```

---

## ♿ Accessibility (A11y)

### Widget Accessibility
```typescript
// ✅ Good - Accessible widget
<div
  role="region"
  aria-labelledby="widget-title"
  className="widget"
>
  <h3 id="widget-title">{title}</h3>
  {isLoading && (
    <div role="status" aria-live="polite" aria-label="Loading">
      <Spinner />
    </div>
  )}
  {error && (
    <div role="alert" aria-live="assertive">
      {error}
    </div>
  )}
  <div className="widget-body">{children}</div>
</div>

// ❌ Bad - Inaccessible
<div className="widget">
  <div>{title}</div>
  {isLoading && <div>Loading...</div>}
  {children}
</div>
```

### Required Accessibility Features
- ✅ `role="region"` for widget containers
- ✅ `aria-labelledby` linking to widget title
- ✅ `role="status"` for loading states
- ✅ `role="alert"` for error messages
- ✅ `aria-live` for dynamic content updates
- ✅ Keyboard navigation for interactive widgets

---

## 🎨 Theming & Styling

### Widget Variants
```typescript
const widgetVariants = {
  default: {
    background: theme.colors.background,
    border: theme.colors.border,
    text: theme.colors.text,
  },
  primary: {
    background: theme.colors.primaryLight,
    border: theme.colors.primary,
    text: theme.colors.primaryDark,
  },
  secondary: {
    background: theme.colors.secondaryLight,
    border: theme.colors.secondary,
    text: theme.colors.secondaryDark,
  },
  accent: {
    background: theme.colors.accentLight,
    border: theme.colors.accent,
    text: theme.colors.accentDark,
  },
};
```

### Widget Sizes
```typescript
const widgetSizes = {
  small: {
    padding: theme.spacing.sm,
    fontSize: theme.fontSize.sm,
    headerHeight: '32px',
  },
  medium: {
    padding: theme.spacing.md,
    fontSize: theme.fontSize.md,
    headerHeight: '40px',
  },
  large: {
    padding: theme.spacing.lg,
    fontSize: theme.fontSize.lg,
    headerHeight: '48px',
  },
};
```

### Responsive Widgets
```typescript
const responsiveWidget = css`
  @media (max-width: ${theme.breakpoints.sm}) {
    grid-column: span 12; /* Full width on mobile */
  }
  
  @media (min-width: ${theme.breakpoints.md}) {
    grid-column: span 6; /* Half width on tablet */
  }
  
  @media (min-width: ${theme.breakpoints.lg}) {
    grid-column: span 4; /* Third width on desktop */
  }
`;
```

---

## 🧪 Component Testing

### Test Coverage Requirements
```typescript
describe('Widget', () => {
  it('renders title and children', () => {
    render(
      <Widget title="Test Widget">
        <p>Content</p>
      </Widget>
    );
    
    expect(screen.getByText('Test Widget')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('shows loading state', () => {
    render(<Widget title="Test" isLoading />);
    expect(screen.getByRole('status')).toHaveTextContent('Loading');
  });

  it('displays error message', () => {
    render(<Widget title="Test" error="Failed to load" />);
    expect(screen.getByRole('alert')).toHaveTextContent('Failed to load');
  });

  it('calls onRefresh when refresh button clicked', async () => {
    const onRefresh = jest.fn();
    render(<Widget title="Test" onRefresh={onRefresh} />);
    
    await userEvent.click(screen.getByLabelText('Refresh widget'));
    expect(onRefresh).toHaveBeenCalled();
  });

  it('disables refresh button while loading', () => {
    render(<Widget title="Test" isLoading onRefresh={jest.fn()} />);
    expect(screen.getByLabelText('Refresh widget')).toBeDisabled();
  });

  it('applies correct size styles', () => {
    const { container } = render(
      <Widget title="Test" size="large">Content</Widget>
    );
    
    expect(container.querySelector('.widget')).toHaveClass('widget-large');
  });

  it('applies correct variant styles', () => {
    const { container } = render(
      <Widget title="Test" variant="primary">Content</Widget>
    );
    
    expect(container.querySelector('.widget')).toHaveClass('widget-primary');
  });
});
```

---

## 🔄 State Management

### Widget State Hook
```typescript
interface WidgetState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

export const useWidgetData = <T,>(fetchFn: () => Promise<T>) => {
  const [state, setState] = useState<WidgetState<T>>({
    data: null,
    isLoading: true,
    error: null,
  });

  const fetchData = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const data = await fetchFn();
      setState({ data, isLoading: false, error: null });
    } catch (error) {
      setState({ data: null, isLoading: false, error: error.message });
    }
  }, [fetchFn]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { ...state, refetch: fetchData };
};
```

### Usage
```typescript
const MyWidget: React.FC = () => {
  const { data, isLoading, error, refetch } = useWidgetData(() =>
    fetch('/api/data').then(res => res.json())
  );

  return (
    <Widget
      title="My Data Widget"
      isLoading={isLoading}
      error={error}
      onRefresh={refetch}
    >
      {data && <DataDisplay data={data} />}
    </Widget>
  );
};
```

---

## 📦 Component Exports

### Public API (index.ts)
```typescript
// Export widget components
export { Widget } from './Widget';
export { WidgetGrid } from './WidgetGrid';
export { WidgetCard } from './WidgetCard';
export { WidgetHeader } from './WidgetHeader';

// Export hooks
export { useWidgetData } from './hooks/useWidgetData';
export { useWidgetResize } from './hooks/useWidgetResize';

// Export types
export type { WidgetProps } from './Widget.types';
export type { WidgetGridProps } from './WidgetGrid.types';
```

---

## 🚫 Anti-Patterns to Avoid

### ❌ Hardcoded Dimensions
```typescript
// Bad - Fixed sizes don't adapt
<div style={{ width: '300px', height: '200px' }}>

// Good - Responsive sizing
<div style={{ width: '100%', minHeight: '200px', maxWidth: '600px' }}>
```

### ❌ No Loading States
```typescript
// Bad - Content jumps when data loads
return <div>{data?.map(...)}</div>;

// Good - Show loading skeleton
if (isLoading) return <WidgetSkeleton />;
return <div>{data.map(...)}</div>;
```

### ❌ Ignoring Widget Grid Layout
```typescript
// Bad - Manual positioning
<div style={{ position: 'absolute', top: 20, left: 20 }}>

// Good - Use grid system
<WidgetGrid>
  <Widget gridColumn="span 4" />
  <Widget gridColumn="span 8" />
</WidgetGrid>
```

---

## 📋 Pre-Commit Checklist

- [ ] Widget has proper title and ARIA labels
- [ ] Loading state displays correctly
- [ ] Error state handles failures gracefully
- [ ] Refresh functionality works (if applicable)
- [ ] Responsive sizing applied
- [ ] Variant/size props working
- [ ] Keyboard navigation supported
- [ ] Tests cover all states (loading, error, success)
- [ ] Theme variables used (no hardcoded colors)
- [ ] TypeScript types complete

---

## 📚 Resources

- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [Responsive Design Patterns](https://responsivedesign.is/patterns/)
- [React Query (for data fetching)](https://tanstack.com/query/latest)
- [Dashboard Design Patterns](https://ui-patterns.com/patterns/Dashboard)
