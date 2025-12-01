// Best practices: Centralize constants and configurations
export const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
  desktop: 1200
} as const;

export const ANIMATION_DURATION = {
  fast: '0.2s',
  normal: '0.3s',
  slow: '0.5s'
} as const;

export const SPACING = {
  xs: '0.5rem',
  sm: '1rem',
  md: '1.5rem',
  lg: '2rem',
  xl: '3rem'
} as const;

