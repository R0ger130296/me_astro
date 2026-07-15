/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'rgb(var(--tw-primary-50) / <alpha-value>)',
          100: 'rgb(var(--tw-primary-100) / <alpha-value>)',
          200: 'rgb(var(--tw-primary-200) / <alpha-value>)',
          300: 'rgb(var(--tw-primary-300) / <alpha-value>)',
          400: 'rgb(var(--tw-primary-400) / <alpha-value>)',
          500: 'rgb(var(--tw-primary-500) / <alpha-value>)',
          600: 'rgb(var(--tw-primary-600) / <alpha-value>)',
          700: 'rgb(var(--tw-primary-700) / <alpha-value>)',
          800: 'rgb(var(--tw-primary-800) / <alpha-value>)',
          900: 'rgb(var(--tw-primary-900) / <alpha-value>)',
          950: 'rgb(var(--tw-primary-950) / <alpha-value>)',
        },
        secondary: {
          50: 'rgb(var(--tw-secondary-50) / <alpha-value>)',
          100: 'rgb(var(--tw-secondary-100) / <alpha-value>)',
          200: 'rgb(var(--tw-secondary-200) / <alpha-value>)',
          300: 'rgb(var(--tw-secondary-300) / <alpha-value>)',
          400: 'rgb(var(--tw-secondary-400) / <alpha-value>)',
          500: 'rgb(var(--tw-secondary-500) / <alpha-value>)',
          600: 'rgb(var(--tw-secondary-600) / <alpha-value>)',
          700: 'rgb(var(--tw-secondary-700) / <alpha-value>)',
          800: 'rgb(var(--tw-secondary-800) / <alpha-value>)',
          900: 'rgb(var(--tw-secondary-900) / <alpha-value>)',
        },
        accent: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
      },
    },
  },
  plugins: [],
};
