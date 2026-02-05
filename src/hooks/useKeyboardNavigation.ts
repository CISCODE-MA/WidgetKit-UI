import { useEffect } from 'react';

export type RovingConfig = {
  /** CSS selector for focusable items inside the container */
  selector: string;
  /** Optional: initial index to focus when mounted */
  initialIndex?: number;
};

/**
 * Roving tabindex keyboard navigation for lists/menus.
 * Attach to a container element; items should be focusable via `tabindex`.
 */
export function useKeyboardNavigation(
  container: HTMLElement | null,
  { selector, initialIndex = 0 }: RovingConfig,
) {
  useEffect(() => {
    if (!container) return;
    const items = Array.from(container.querySelectorAll<HTMLElement>(selector));
    if (items.length === 0) return;

    // Initialize tabindex
    items.forEach((el, i) => el.setAttribute('tabindex', i === initialIndex ? '0' : '-1'));

    function onKeyDown(e: KeyboardEvent) {
      const currentIndex = items.findIndex((el) => el === document.activeElement);
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        const next = items[(currentIndex + 1 + items.length) % items.length];
        items.forEach((el) => el.setAttribute('tabindex', '-1'));
        next.setAttribute('tabindex', '0');
        next.focus();
        e.preventDefault();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        const prev = items[(currentIndex - 1 + items.length) % items.length];
        items.forEach((el) => el.setAttribute('tabindex', '-1'));
        prev.setAttribute('tabindex', '0');
        prev.focus();
        e.preventDefault();
      }
    }

    container.addEventListener('keydown', onKeyDown);
    return () => container.removeEventListener('keydown', onKeyDown);
  }, [container, selector, initialIndex]);
}

export default undefined;
