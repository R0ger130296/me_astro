import React, { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

const getPreferredTheme = (): Theme => {
  if (typeof window === 'undefined') return 'dark';

  const storedTheme = window.localStorage.getItem('portfolio-theme');
  return storedTheme === 'light' ? 'light' : 'dark';
};

const applyTheme = (theme: Theme) => {
  document.documentElement.classList.toggle('dark', theme === 'dark');
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
};

export const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const preferredTheme = getPreferredTheme();
    setTheme(preferredTheme);
    applyTheme(preferredTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    applyTheme(nextTheme);
    window.localStorage.setItem('portfolio-theme', nextTheme);
  };

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Activar tema claro' : 'Activar tema oscuro'}
      title={isDark ? 'Activar tema claro' : 'Activar tema oscuro'}
      className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-xl border border-primary-200 bg-white text-primary-700 transition-colors hover:bg-primary-50 hover:text-primary-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-500 focus-visible:ring-offset-2 dark:bg-primary-900 dark:ring-offset-primary-950"
    >
      <span aria-hidden="true" className="text-base leading-none">
        {isDark ? '☀' : '☾'}
      </span>
    </button>
  );
};