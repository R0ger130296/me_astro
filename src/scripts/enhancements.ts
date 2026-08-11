type CodeTab = {
  id: string;
  label: string;
  file: string;
  language: string;
  explanation: string;
  lines: string[];
};

type SkillArea = {
  id: string;
  title: string;
  description: string;
  stack: string;
  experience?: string;
  useCase?: string;
  signal?: string;
};

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function renderCode(lines: string[], target: HTMLElement) {
  target.replaceChildren();
  lines.forEach((line, index) => {
    const row = document.createElement('span');
    const number = document.createElement('i');
    number.textContent = String(index + 1);
    row.append(number, document.createTextNode(line || ' '));
    target.append(row);
  });
}

const codeTabsRaw = document.documentElement.dataset.codeTabs;
const codeTabs: CodeTab[] = codeTabsRaw ? JSON.parse(codeTabsRaw) : [];
const codeButtons = document.querySelectorAll<HTMLButtonElement>('[data-code-tab]');
const codeContent = document.querySelector<HTMLElement>('[data-code-content]');
const codeFilename = document.querySelector<HTMLElement>('[data-code-filename]');
const codeLanguage = document.querySelector<HTMLElement>('[data-code-language]');
const codeExplanation = document.querySelector<HTMLElement>('[data-code-explanation]');
const codeWindow = document.querySelector<HTMLElement>('[data-live-code-window]');

codeButtons.forEach((button) => button.addEventListener('click', () => {
  const selected = codeTabs.find((tab) => tab.id === button.dataset.codeTab);
  if (!selected || !codeContent) return;
  codeButtons.forEach((item) => {
    const active = item === button;
    item.classList.toggle('active', active);
    item.setAttribute('aria-selected', String(active));
  });
  renderCode(selected.lines, codeContent);
  if (codeFilename) codeFilename.textContent = selected.file;
  if (codeLanguage) codeLanguage.textContent = selected.language;
  if (codeExplanation) codeExplanation.textContent = selected.explanation;
  if (!reduceMotion.matches && codeWindow) {
    codeWindow.animate(
      [{ transform: 'translateY(6px)', opacity: .72 }, { transform: 'translateY(0)', opacity: 1 }],
      { duration: 260, easing: 'cubic-bezier(.2,.8,.2,1)' },
    );
  }
}));

document.querySelectorAll<HTMLButtonElement>('[data-case-study-toggle]').forEach((button) => {
  button.addEventListener('click', () => {
    const card = button.closest<HTMLElement>('[data-project-card]');
    const detail = card?.querySelector<HTMLElement>('[data-case-study]');
    if (!detail) return;
    const expanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!expanded));
    detail.hidden = expanded;
    const label = button.querySelector('span');
    if (label) label.textContent = expanded ? 'Ver cómo está construido' : 'Ocultar detalle técnico';
    if (!expanded && !reduceMotion.matches) {
      detail.animate(
        [{ transform: 'translateY(-8px)', opacity: 0 }, { transform: 'translateY(0)', opacity: 1 }],
        { duration: 280, easing: 'cubic-bezier(.2,.8,.2,1)' },
      );
    }
  });
});

const devViewToggle = document.querySelector<HTMLButtonElement>('[data-dev-view-toggle]');
const storedDevView = localStorage.getItem('portfolio-dev-view') === 'true';

function setDevView(enabled: boolean) {
  document.documentElement.classList.toggle('dev-view', enabled);
  devViewToggle?.setAttribute('aria-pressed', String(enabled));
  if (devViewToggle) devViewToggle.title = enabled ? 'Ocultar arquitectura del portafolio' : 'Mostrar arquitectura del portafolio';
  localStorage.setItem('portfolio-dev-view', String(enabled));
}

if (storedDevView) setDevView(true);
devViewToggle?.addEventListener('click', () => setDevView(!document.documentElement.classList.contains('dev-view')));

const skillExperience = document.querySelector<HTMLElement>('[data-skill-experience]');
const skillUseCase = document.querySelector<HTMLElement>('[data-skill-use-case]');
const skillSignal = document.querySelector<HTMLElement>('[data-skill-signal]');

document.querySelectorAll<HTMLButtonElement>('[data-skill-node]').forEach((node) => {
  node.addEventListener('click', () => {
    if (!node.dataset.skillNode) return;
    const area = JSON.parse(node.dataset.skillNode) as SkillArea;
    if (skillExperience) skillExperience.textContent = area.experience ?? 'Producto digital';
    if (skillUseCase) skillUseCase.textContent = area.useCase ?? area.description;
    if (skillSignal) skillSignal.textContent = area.signal ?? area.stack;
  });
});
