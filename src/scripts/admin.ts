import { createAdminSession } from '../services/admin-api';
import { projects as initialProjects, type Project } from '../data/portfolio';

type Entry = Project & { id: string; published: boolean; version: number; updatedAt: string };
const element = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;
const feedback = element('feedback');
const form = element<HTMLFormElement>('project-form');
const editor = element('editor');
const workspace = element('workspace');
const login = element<HTMLButtonElement>('login');
let entries: Entry[] = [];
let selected: Entry | undefined;
let busy = false;

function message(text: string, error = false) { feedback.textContent = text; feedback.dataset.error = String(error); }
function run(operation: () => Promise<void>) {
  if (busy) return;
  busy = true;
  document.querySelectorAll<HTMLButtonElement>('button').forEach((button) => button.disabled = true);
  element<HTMLFieldSetElement>('editor-fields').disabled = true;
  operation().catch((error) => message(error instanceof Error ? error.message : 'Ocurrió un error. Intenta nuevamente.', true)).finally(() => {
    busy = false;
    document.querySelectorAll<HTMLButtonElement>('button').forEach((button) => button.disabled = false);
    element<HTMLFieldSetElement>('editor-fields').disabled = false;
  });
}

function edit(entry?: Entry) {
  selected = entry;
  form.reset();
  element('editor-title').textContent = entry ? `Editar ${entry.title}` : 'Nuevo proyecto';
  if (entry) {
    const values = { ...entry, ...entry.caseStudy, tags: entry.tags.join(', '), architecture: entry.caseStudy.architecture.join(', '), code: entry.caseStudy.code.join('\n') };
    for (const [name, value] of Object.entries(values)) {
      const input = form.elements.namedItem(name);
      if (input instanceof HTMLInputElement && input.type === 'checkbox') input.checked = Boolean(value);
      else if (input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement || input instanceof HTMLSelectElement) input.value = String(value ?? '');
    }
  }
  editor.hidden = false;
  (form.elements.namedItem('title') as HTMLInputElement).focus();
}

async function initialize() {
  const session = createAdminSession();
  const { keycloak, request } = session;
  const redirectUri = `${location.origin}/admin/`;
  keycloak.onAuthLogout = () => { workspace.hidden = true; editor.hidden = true; element('access').hidden = false; message('Tu sesión terminó. Ingresa de nuevo.'); };
  keycloak.onTokenExpired = () => { keycloak.updateToken(30).catch(() => keycloak.clearToken()); };
  login.onclick = () => run(async () => { await keycloak.login({ redirectUri }); });
  element('logout').onclick = () => run(async () => { await keycloak.logout({ redirectUri }); });
  const authenticated = await keycloak.init({ onLoad: 'check-sso', pkceMethod: 'S256', checkLoginIframe: false, responseMode: 'query', redirectUri });
  login.disabled = false;
  if (!authenticated) { message('Inicia sesión para continuar.'); return; }
  element('logout').hidden = false;
  if (!keycloak.hasResourceRole('portfolio-admin', 'portfolio-api')) { message('Tu cuenta no tiene permisos de administración.', true); return; }
  element('access').hidden = true;
  workspace.hidden = false;

  async function load() {
    const fresh = await request<Entry[]>('/projects');
    entries = fresh;
    const list = element('project-list');
    list.replaceChildren();
    element('count').textContent = `${entries.length} proyectos · ${entries.filter((entry) => entry.published).length} publicados`;
    if (!entries.length) { const empty = document.createElement('p'); empty.textContent = 'Empieza con un nuevo proyecto o importa los del portafolio.'; list.append(empty); }
    for (const entry of entries) {
      const row = document.createElement('article'); row.className = 'project-row';
      const info = document.createElement('div');
      const title = document.createElement('h3'); title.textContent = entry.title;
      const detail = document.createElement('p'); detail.textContent = `${entry.published ? 'Publicado' : 'Borrador'} · /${entry.slug} · ${entry.status}`;
      info.append(title, detail);
      const actions = document.createElement('div'); actions.className = 'row-actions';
      const editButton = document.createElement('button'); editButton.textContent = 'Editar'; editButton.className = 'secondary'; editButton.onclick = () => edit(entry);
      const remove = document.createElement('button'); remove.textContent = 'Eliminar'; remove.className = 'danger';
      remove.onclick = () => {
        if (!confirm(`¿Eliminar “${entry.title}”? Esta acción no se puede deshacer.`)) return;
        run(async () => {
          await request(`/projects/${entry.id}?version=${entry.version}`, { method: 'DELETE' });
          if (selected?.id === entry.id) editor.hidden = true;
          await load(); message('Proyecto eliminado.');
        });
      };
      actions.append(editButton, remove); row.append(info, actions); list.append(row);
    }
  }
  element('new').onclick = () => edit();
  element('cancel').onclick = () => { editor.hidden = true; selected = undefined; };
  element('reload').onclick = () => run(async () => { await load(); message('Lista actualizada.'); });
  element('import').onclick = () => run(async () => {
    await load();
    let imported = 0;
    for (const project of initialProjects) {
      if (entries.some((entry) => entry.slug === project.slug)) continue;
      await request('/projects', { method: 'POST', body: JSON.stringify({ ...project, published: true }) });
      imported++;
    }
    await load(); message(`${imported} proyectos importados. Los proyectos existentes se conservaron.`);
  });
  form.onsubmit = (event) => {
    event.preventDefault();
    const data = new FormData(form);
    run(async () => {
      const text = (name: string) => String(data.get(name) ?? '').trim();
      const csv = (name: string) => text(name).split(',').map((value) => value.trim()).filter(Boolean);
      const body = {
        title: text('title'), slug: text('slug'), status: text('status'), description: text('description'), impact: text('impact'), tags: csv('tags'),
        ...(text('repository') ? { repository: text('repository') } : {}), ...(text('href') ? { href: text('href') } : {}),
        featured: data.has('featured'), published: data.has('published'),
        caseStudy: { problem: text('problem'), decision: text('decision'), result: text('result'), architecture: csv('architecture'), codeLanguage: text('codeLanguage'), code: String(data.get('code') ?? '').split('\n') },
        ...(selected ? { version: selected.version } : {}),
      };
      await request(selected ? `/projects/${selected.id}` : '/projects', { method: selected ? 'PUT' : 'POST', body: JSON.stringify(body) });
      editor.hidden = true; selected = undefined;
      await load(); message('Proyecto guardado. Para verlo en el sitio público, genera un nuevo despliegue.');
    });
  };
  await load(); message('Sesión iniciada. Tu portafolio está listo para editar.');
}
initialize().catch((error) => message(error instanceof Error ? error.message : 'No se pudo iniciar la administración.', true));
