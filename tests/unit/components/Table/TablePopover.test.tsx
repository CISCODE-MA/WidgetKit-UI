import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { TablePopover } from '../../../../src/components/Table/TablePopover';

describe('TablePopover', () => {
  it('renders with anchor and displays children', () => {
    const anchor = document.createElement('button');
    document.body.appendChild(anchor);
    const onClose = vi.fn();
    const { getByText } = render(
      <TablePopover anchor={anchor} onClose={onClose}>
        <div>content</div>
      </TablePopover>,
    );
    expect(getByText('content')).toBeInTheDocument();
  });

  it('invokes onClose when clicking outside', () => {
    const anchor = document.createElement('button');
    document.body.appendChild(anchor);
    const onClose = vi.fn();
    render(
      <TablePopover anchor={anchor} onClose={onClose}>
        <div>content</div>
      </TablePopover>,
    );
    // Simulate a click far from popover and anchor
    document.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    expect(onClose).toHaveBeenCalled();
  });

  it('does not close when clicking inside, but closes with close button', () => {
    const anchor = document.createElement('button');
    document.body.appendChild(anchor);
    const onClose = vi.fn();
    const { getByRole, container } = render(
      <TablePopover anchor={anchor} onClose={onClose}>
        <div>inside</div>
      </TablePopover>,
    );
    const popover = container.querySelector('div[style]') as HTMLElement;
    popover?.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    expect(onClose).not.toHaveBeenCalled();
    const closeBtn = getByRole('button', { name: 'Close' });
    closeBtn.click();
    expect(onClose).toHaveBeenCalled();
  });
});
