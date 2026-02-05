import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { useKeyboardNavigation } from '../../../src/hooks/useKeyboardNavigation';

function RovingHarness() {
  const [container, setContainer] = React.useState<HTMLElement | null>(null);
  useKeyboardNavigation(container, { selector: 'button', initialIndex: 1 });
  return (
    <div ref={setContainer as any} data-testid="container">
      <button>one</button>
      <button>two</button>
      <button>three</button>
    </div>
  );
}

describe('useKeyboardNavigation', () => {
  it('initializes tabindex with initialIndex focused', async () => {
    const { getByText } = render(<RovingHarness />);
    const one = getByText('one');
    const two = getByText('two');
    const three = getByText('three');
    await waitFor(() => {
      expect(one.getAttribute('tabindex')).toBe('-1');
      expect(two.getAttribute('tabindex')).toBe('0');
      expect(three.getAttribute('tabindex')).toBe('-1');
    });
  });

  it('moves focus with ArrowRight/Left and updates tabindex', async () => {
    const { getByTestId, getByText } = render(<RovingHarness />);
    const container = getByTestId('container');
    const one = getByText('one');
    const two = getByText('two');
    const three = getByText('three');

    // Await initialization
    await waitFor(() => {
      expect(two.getAttribute('tabindex')).toBe('0');
    });

    // Start: two is focusable
    two.focus();
    fireEvent.keyDown(container, { key: 'ArrowRight' });
    expect(document.activeElement).toBe(three);
    expect(three.getAttribute('tabindex')).toBe('0');
    expect(two.getAttribute('tabindex')).toBe('-1');

    fireEvent.keyDown(container, { key: 'ArrowRight' });
    expect(document.activeElement).toBe(one);

    fireEvent.keyDown(container, { key: 'ArrowLeft' });
    expect(document.activeElement).toBe(three);
  });
});
