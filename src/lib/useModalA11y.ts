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

  // Callers pass inline callbacks whose identity changes every render (e.g.
  // lightbox prev/next). Read them through refs so the mount effect below runs
  // exactly once per dialog open — otherwise each keypress would tear down the
  // effect, restore focus to the background trigger, then re-focus the close
  // button.
  const onCloseRef = useRef(onClose);
  const onArrowRef = useRef(onArrow);
  useEffect(() => {
    onCloseRef.current = onClose;
    onArrowRef.current = onArrow;
  });

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    initialFocusRef.current?.focus();

    // Lock background scroll while the dialog is open (matches the mobile menu)
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCloseRef.current();
      if (e.key === 'ArrowLeft') onArrowRef.current?.('prev');
      if (e.key === 'ArrowRight') onArrowRef.current?.('next');
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
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, []);

  return { containerRef, initialFocusRef };
}
