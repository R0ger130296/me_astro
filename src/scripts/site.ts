import { inject } from '@vercel/analytics';
import { injectSpeedInsights } from '@vercel/speed-insights';
import { animate } from 'animejs/animation';
import { stagger } from 'animejs/utils';

type Theme = 'light' | 'dark';

inject();
injectSpeedInsights();

const root = document.documentElement;
const themeToggle = document.querySelector<HTMLButtonElement>('[data-theme-toggle]');
const themeMeta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
const colorMedia = window.matchMedia('(prefers-color-scheme: dark)');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
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
const certificateToggle = document.querySelector<HTMLButtonElement>('[data-certificate-toggle]');
const certificateToggleLabel = document.querySelector<HTMLElement>('[data-certificate-toggle-label]');
const certificateMore = document.querySelector<HTMLElement>('[data-certificate-more]');
let activeCertificateCategory = 'Todos';
let certificatesExpanded = false;

function renderCertificateCards(withAnimation = true) {
  const visibleCards: HTMLElement[] = [];
  certificateCards.forEach((card) => {
    const matchesCategory = activeCertificateCategory === 'Todos' || card.dataset.category === activeCertificateCategory;
    const isFeatured = card.dataset.certificateFeatured === 'true';
    const shouldShow = matchesCategory && (activeCertificateCategory !== 'Todos' || certificatesExpanded || isFeatured);
    card.toggleAttribute('hidden', !shouldShow);
    if (shouldShow) visibleCards.push(card);
  });

  if (certificateMore) certificateMore.hidden = activeCertificateCategory !== 'Todos';
  if (certificateToggle) certificateToggle.setAttribute('aria-expanded', String(certificatesExpanded));
  if (certificateToggleLabel) certificateToggleLabel.textContent = certificatesExpanded ? 'Mostrar solo destacadas' : 'Ver todas las credenciales';
  certificateToggle?.classList.toggle('expanded', certificatesExpanded);

  if (withAnimation && !reduceMotion.matches && visibleCards.length > 0) {
    animate(visibleCards, { opacity: { from: 0 }, y: { from: 16 }, delay: stagger(45), duration: 420, ease: 'out(4)' });
  }
}

certificateFilters.forEach((filter) => filter.addEventListener('click', () => {
  activeCertificateCategory = filter.dataset.certificateFilter ?? 'Todos';
  certificateFilters.forEach((item) => item.classList.toggle('active', item === filter));
  if (!reduceMotion.matches) animate(filter, { scale: { from: 0.94 }, duration: 300, ease: 'out(4)' });
  renderCertificateCards();
}));

certificateToggle?.addEventListener('click', () => {
  certificatesExpanded = !certificatesExpanded;
  renderCertificateCards();
});

const revealElements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  }), { threshold: 0.12 });
  revealElements.forEach((element) => observer.observe(element));
} else revealElements.forEach((element) => element.classList.add('visible'));

const counters = document.querySelectorAll<HTMLElement>('[data-counter]');
if ('IntersectionObserver' in window && !reduceMotion.matches) {
  const counterObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const counter = entry.target as HTMLElement;
    const value = Number(counter.dataset.counterValue ?? 0);
    const suffix = counter.dataset.counterSuffix ?? '';
    const decimals = Number(counter.dataset.counterDecimals ?? 0);
    const state = { value: 0 };
    animate(state, {
      value,
      duration: 1200,
      ease: 'out(4)',
      onUpdate: () => { counter.textContent = `${state.value.toFixed(decimals)}${suffix}`; },
    });
    counterObserver.unobserve(counter);
  }), { threshold: 0.6 });
  counters.forEach((counter) => counterObserver.observe(counter));
}

const technologyStack = document.querySelector<HTMLElement>('[data-tech-stack]');
if (technologyStack && !reduceMotion.matches && 'IntersectionObserver' in window) {
  const technologyObserver = new IntersectionObserver(([entry]) => {
    if (!entry?.isIntersecting) return;
    animate(technologyStack.querySelectorAll('span'), { opacity: { from: 0 }, y: { from: 10 }, delay: stagger(55), duration: 420, ease: 'out(4)' });
    technologyObserver.disconnect();
  }, { threshold: 0.45 });
  technologyObserver.observe(technologyStack);
}

type SkillArea = { id: string; title: string; description: string; stack: string };
const skillNodes = document.querySelectorAll<HTMLButtonElement>('[data-skill-node]');
const skillDetail = document.querySelector<HTMLElement>('[data-skill-detail]');
const skillTitle = document.querySelector<HTMLElement>('[data-skill-title]');
const skillDescription = document.querySelector<HTMLElement>('[data-skill-description]');
const skillStack = document.querySelector<HTMLElement>('[data-skill-stack]');
skillNodes.forEach((node) => node.addEventListener('click', () => {
  if (!node.dataset.skillNode || !skillTitle || !skillDescription || !skillStack) return;
  const area = JSON.parse(node.dataset.skillNode) as SkillArea;
  skillNodes.forEach((item) => {
    const active = item === node;
    item.classList.toggle('active', active);
    item.setAttribute('aria-pressed', String(active));
  });
  skillTitle.textContent = area.title;
  skillDescription.textContent = area.description;
  skillStack.textContent = area.stack;
  if (!reduceMotion.matches) {
    animate(node, { scale: { from: 0.9 }, duration: 360, ease: 'out(4)' });
    if (skillDetail) animate(skillDetail, { opacity: { from: 0 }, x: { from: 14 }, duration: 420, ease: 'out(4)' });
  }
}));

const notFound = document.querySelector<HTMLElement>('[data-not-found]');
if (notFound && !reduceMotion.matches) {
  animate(notFound.querySelectorAll('.not-found-visual span'), { opacity: { from: 0 }, scale: { from: 0.72 }, delay: stagger(120), duration: 700, ease: 'out(5)' });
  const notFoundCopy = notFound.querySelector('.not-found-copy');
  if (notFoundCopy) animate(notFoundCopy, { opacity: { from: 0 }, y: { from: 24 }, duration: 700, delay: 180, ease: 'out(4)' });
}

if ('serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js').catch(() => {}));

const tourSteps = [
  {
    target: '#inicio .hero-copy',
    label: 'Inicio',
    title: 'Productos digitales de principio a fin',
    copy: 'Una presentación breve de mi enfoque: conectar experiencia, ingeniería y objetivos de negocio en una sola solución.',
  },
  {
    target: '#proyectos .section-heading',
    label: 'Trabajo seleccionado',
    title: 'Problemas reales, soluciones concretas',
    copy: 'Aquí encontrarás productos web, móviles y empresariales explicados desde el problema, la solución y el valor que pueden generar.',
  },
  {
    target: '#trayectoria .section-heading',
    label: 'Trayectoria',
    title: 'Experiencia construida en contexto',
    copy: 'Mi recorrido profesional muestra cómo he evolucionado entre producto, frontend, backend, mobile, datos y entrega en la nube.',
  },
  {
    target: '#formacion .section-heading',
    label: 'Formación',
    title: 'Aprendizaje continuo y verificable',
    copy: 'La formación complementa la experiencia práctica con credenciales en cloud, arquitectura, seguridad, gestión y desarrollo.',
  },
  {
    target: '#servicios .section-heading',
    label: 'Capacidades',
    title: 'Una visión transversal del producto',
    copy: 'Puedo participar en una etapa concreta o acompañar todo el ciclo: diseño técnico, interfaz, APIs, datos, móvil y despliegue.',
  },
  {
    target: '#contacto',
    label: 'Contacto',
    title: 'Convirtamos una necesidad en un plan',
    copy: 'El formulario organiza el contexto, el resultado esperado y el plazo para iniciar una conversación clara desde el primer mensaje.',
  },
] as const;

const tourRoot = document.querySelector<HTMLElement>('[data-tour]');
const tourCard = document.querySelector<HTMLElement>('[data-tour-card]');
const tourLabel = document.querySelector<HTMLElement>('[data-tour-label]');
const tourTitle = document.querySelector<HTMLElement>('[data-tour-title]');
const tourCopy = document.querySelector<HTMLElement>('[data-tour-copy]');
const tourProgress = document.querySelector<HTMLElement>('[data-tour-progress]');
const tourDots = document.querySelector<HTMLElement>('[data-tour-dots]');
const tourPrevious = document.querySelector<HTMLButtonElement>('[data-tour-previous]');
const tourNext = document.querySelector<HTMLButtonElement>('[data-tour-next]');
const tourNextLabel = document.querySelector<HTMLElement>('[data-tour-next-label]');
let tourIndex = 0;
let activeTourTarget: HTMLElement | null = null;
let lastTourLauncher: HTMLElement | null = null;

function animateTourCard() {
  if (!tourCard || reduceMotion.matches) return;
  animate(tourCard, {
    opacity: { from: 0 },
    y: { from: 16 },
    duration: 420,
    ease: 'out(4)',
  });
}

function renderTourStep(index: number) {
  const step = tourSteps[index];
  if (!step) return;
  const target = document.querySelector<HTMLElement>(step.target);
  if (!target || !tourLabel || !tourTitle || !tourCopy || !tourProgress) return;

  activeTourTarget?.classList.remove('tour-highlight');
  activeTourTarget?.style.removeProperty('transform');
  activeTourTarget = target;
  activeTourTarget.classList.add('tour-highlight');

  tourLabel.textContent = step.label;
  tourTitle.textContent = step.title;
  tourCopy.textContent = step.copy;
  tourProgress.textContent = `Paso ${index + 1} de ${tourSteps.length}`;
  if (tourPrevious) tourPrevious.disabled = index === 0;
  if (tourNextLabel) tourNextLabel.textContent = index === tourSteps.length - 1 ? 'Finalizar' : 'Siguiente';

  tourDots?.querySelectorAll<HTMLButtonElement>('button').forEach((dot, dotIndex) => {
    dot.toggleAttribute('aria-current', dotIndex === index);
  });

  target.scrollIntoView({ behavior: 'auto', block: 'center' });
  if (!reduceMotion.matches) {
    animate(target, { scale: { from: 0.985 }, duration: 520, ease: 'out(4)' });
    animateTourCard();
  }
}

function openTour(launcher: HTMLElement) {
  if (!tourRoot) return;
  lastTourLauncher = launcher;
  tourIndex = 0;
  tourRoot.hidden = false;
  tourRoot.setAttribute('aria-hidden', 'false');
  document.body.classList.add('tour-active');
  renderTourStep(tourIndex);
  tourNext?.focus({ preventScroll: true });
}

function closeTour() {
  if (!tourRoot) return;
  activeTourTarget?.classList.remove('tour-highlight');
  activeTourTarget?.style.removeProperty('transform');
  activeTourTarget = null;
  tourRoot.hidden = true;
  tourRoot.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('tour-active');
  lastTourLauncher?.focus({ preventScroll: true });
}

document.querySelectorAll<HTMLElement>('[data-tour-launch]').forEach((launcher) => {
  launcher.addEventListener('click', () => openTour(launcher));
});

tourSteps.forEach((step, index) => {
  const dot = document.createElement('button');
  dot.type = 'button';
  dot.setAttribute('aria-label', `Ir a ${step.label}`);
  dot.addEventListener('click', () => { tourIndex = index; renderTourStep(tourIndex); });
  tourDots?.append(dot);
});

tourPrevious?.addEventListener('click', () => {
  if (tourIndex === 0) return;
  tourIndex -= 1;
  renderTourStep(tourIndex);
});

tourNext?.addEventListener('click', () => {
  if (tourIndex === tourSteps.length - 1) { closeTour(); return; }
  tourIndex += 1;
  renderTourStep(tourIndex);
});

document.querySelector('[data-tour-close]')?.addEventListener('click', closeTour);
document.addEventListener('keydown', (event) => {
  if (tourRoot?.hidden) return;
  if (event.key === 'Escape') closeTour();
  if (event.key === 'ArrowRight') tourNext?.click();
  if (event.key === 'ArrowLeft') tourPrevious?.click();
});

const contactForm = document.querySelector<HTMLFormElement>('[data-contact-form]');
const contactStatus = document.querySelector<HTMLElement>('[data-contact-status]');
contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!contactForm.reportValidity()) return;

  const data = new FormData(contactForm);
  const name = String(data.get('name') ?? '').trim();
  const email = String(data.get('email') ?? '').trim();
  const message = String(data.get('message') ?? '').trim();
  const timeline = String(data.get('timeline') ?? '').trim();
  const recipient = contactForm.dataset.contactEmail;
  if (!recipient) return;

  const subject = encodeURIComponent(`Proyecto de ${name}`);
  const body = encodeURIComponent([
    `Hola Roger,`,
    '',
    message,
    '',
    `Plazo aproximado: ${timeline || 'Por definir'}`,
    `Correo de contacto: ${email}`,
  ].join('\n'));

  if (contactStatus) contactStatus.textContent = 'Abriendo tu aplicación de correo…';
  window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
});
