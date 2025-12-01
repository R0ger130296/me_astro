// Best practices: Centralized utility function to combine classes
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combina clases CSS de manera inteligente
 * Uses clsx to handle conditionals and tailwind-merge to resolve conflicts
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

