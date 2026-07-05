import { useEffect, useRef } from 'react';

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, iframe, [tabindex]:not([tabindex="-1"])';

// Shared modal-dialog behavior: Escape closes, optional arrow-key navigation,
// Tab/Shift+Tab stay trapped inside the dialog, focus moves to the close
// button on open and returns to the trigger element on close.
export function useModalA11y({
  onClose,
  onArrow,
}: {
  onClose: () => void;
  onArrow?: (direction: 'prev' | 'next') => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const initialFocusRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    initialFocusRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onArrow?.('prev');
      if (e.key === 'ArrowRight') onArrow?.('next');
      if (e.key === 'Tab') {
        const container = containerRef.current;
        if (!container) return;
        const focusables = Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE));
        if (focusables.length === 0) {
          e.preventDefault();
          return;
        }
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement as HTMLElement | null;
        const inside = active !== null && container.contains(active);
        if (e.shiftKey && (!inside || active === first)) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && (!inside || active === last)) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [onClose, onArrow]);

  return { containerRef, initialFocusRef };
}
