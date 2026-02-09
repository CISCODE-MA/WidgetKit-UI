import { describe, it, expect } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { useLiveRegion, useFocusTrap } from '../../../src/hooks/useA11y';

function LiveRegionHarness() {
  const { ref, announce } = useLiveRegion();
  return (
    <div>
      <div aria-live="polite" ref={ref as any} data-testid="region" />
      <button onClick={() => announce('Hello')}>announce</button>
    </div>
  );
}

function FocusTrapHarness({ active = true }: { active?: boolean }) {
  const { ref } = useFocusTrap(active);
  return (
    <div ref={ref as any} data-testid="trap">
      <button>first</button>
      <button>middle</button>
      <button>last</button>
    </div>
  );
}

describe('useA11y', () => {
  it('useLiveRegion announces messages into the region', () => {
    const { getByText, getByTestId } = render(<LiveRegionHarness />);
    fireEvent.click(getByText('announce'));
    expect(getByTestId('region').textContent).toBe('Hello');
  });

  it('useFocusTrap cycles focus with Tab and Shift+Tab', () => {
    const { getByTestId, getByText } = render(<FocusTrapHarness active />);
    const trap = getByTestId('trap');
    const first = getByText('first');
    const last = getByText('last');

    // When focused on last and Tab, moves to first
    last.focus();
    fireEvent.keyDown(trap, { key: 'Tab' });
    expect(document.activeElement).toBe(first);

    // When focused on first and Shift+Tab, moves to last
    first.focus();
    fireEvent.keyDown(trap, { key: 'Tab', shiftKey: true });
    expect(document.activeElement).toBe(last);
  });
});
