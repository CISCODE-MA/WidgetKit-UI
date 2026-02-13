import { useEffect, useRef } from 'react';

/**
 * Manage ARIA live region announcements.
 * Returns a ref to attach to an element with `aria-live="polite"` or `assertive`.
 * Use `announce()` to set text content.
 */
export type LiveRegionReturn = {
  ref: React.MutableRefObject<HTMLElement | null>;
  announce: (message: string) => void;
};

export function useLiveRegion(): LiveRegionReturn {
  const ref = useRef<HTMLElement | null>(null);
  function announce(message: string): void {
    if (ref.current) {
      ref.current.textContent = message;
    }
  }
  return { ref, announce };
}

/**
 * Trap focus within a container element (e.g., modal) while `active`.
 * Adds keydown handlers to cycle focus.
 */
export type FocusTrapReturn = { ref: React.MutableRefObject<HTMLElement | null> };

export function useFocusTrap(active: boolean): FocusTrapReturn {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!active) return;
    const current = ref.current;
    if (!current) return;
    const el: HTMLElement = current;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== 'Tab') return;
      const focusable = (
        Array.from(
          el.querySelectorAll<HTMLElement>(
            'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])',
          ),
        ) as HTMLElement[]
      ).filter((node: HTMLElement) => !node.hasAttribute('disabled'));
      if (focusable.length === 0) return;
      const first: HTMLElement = focusable[0] as HTMLElement;
      const last: HTMLElement = focusable[focusable.length - 1] as HTMLElement;
      const current = document.activeElement as HTMLElement | null;

      if (e.shiftKey) {
        if (!current || current === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (!current || current === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    el.addEventListener('keydown', onKeyDown);
    return () => {
      el.removeEventListener('keydown', onKeyDown);
    };
  }, [active]);

  return { ref };
}
