import { useEffect } from 'react';

// Shared global state to handle multiple locks
let activeLocks = 0;
let originalOverflow = '';
let originalPaddingRight = '';
let scrollbarWidth = 0;

function lockBodyScroll(): void {
  if (typeof window === 'undefined') return;

  activeLocks++;

  // Only apply the lock the first time
  if (activeLocks === 1) {
    originalOverflow = document.body.style.overflow || '';
    originalPaddingRight = document.body.style.paddingRight || '';
    scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
  }
}

function unlockBodyScroll(): void {
  if (typeof window === 'undefined') return;

  activeLocks = Math.max(0, activeLocks - 1);

  // Only unlock when there are no more active locks
  if (activeLocks === 0) {
    document.body.style.overflow = originalOverflow;
    document.body.style.paddingRight = originalPaddingRight;
  }
}

export function useBodyScrollLock() {
  // Auto-unlock on unmount
  useEffect(() => {
    return () => {
      if (activeLocks > 0) {
        unlockBodyScroll();
      }
    };
  }, []);

  return {
    lock: lockBodyScroll,
    unlock: unlockBodyScroll,
  };
}

