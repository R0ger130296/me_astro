type Theme = 'light' | 'dark';

const root = document.documentElement;
const themeToggle = document.querySelector<HTMLButtonElement>('[data-theme-toggle]');
const themeMeta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
const colorMedia = window.matchMedia('(prefers-color-scheme: dark)');
const themeColors: Record<Theme, string> = { light: '#fbf8ff', dark: '#08040d' };
const isTheme = (value: string | null | undefined): value is Theme => value === 'light' || value === 'dark';

function updateThemeControl(theme: Theme) {
  if (!themeToggle) return;
  const label = theme === 'dark' ? 'Activar tema claro' : 'Activar tema oscuro';
  themeToggle.setAttribute('aria-label', label);
  themeToggle.title = label;
}

function applyTheme(theme: Theme, persist = false) {
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
  themeMeta?.setAttribute('content', themeColors[theme]);
  updateThemeControl(theme);
  if (persist) localStorage.setItem('portfolio-theme', theme);
}

applyTheme(isTheme(root.dataset.theme) ? root.dataset.theme : (colorMedia.matches ? 'dark' : 'light'));
themeToggle?.addEventListener('click', () => applyTheme(root.dataset.theme === 'dark' ? 'light' : 'dark', true));
colorMedia.addEventListener('change', (event) => {
  if (!isTheme(localStorage.getItem('portfolio-theme'))) applyTheme(event.matches ? 'dark' : 'light');
});

const menuButton = document.querySelector<HTMLButtonElement>('[data-menu-button]');
const navigation = document.querySelector<HTMLElement>('[data-nav-links]');
menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  navigation?.classList.toggle('open', !open);
});
navigation?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  menuButton?.setAttribute('aria-expanded', 'false');
  navigation?.classList.remove('open');
}));

const certificateFilters = document.querySelectorAll<HTMLElement>('[data-certificate-filter]');
const certificateCards = document.querySelectorAll<HTMLElement>('[data-certificate-card]');
certificateFilters.forEach((filter) => filter.addEventListener('click', () => {
  const category = filter.getAttribute('data-certificate-filter');
  certificateFilters.forEach((item) => item.classList.toggle('active', item === filter));
  certificateCards.forEach((card) => card.toggleAttribute('hidden', category !== 'Todos' && card.getAttribute('data-category') !== category));
}));

const revealElements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  }), { threshold: 0.12 });
  revealElements.forEach((element) => observer.observe(element));
} else revealElements.forEach((element) => element.classList.add('visible'));

if ('serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js').catch(() => {}));
