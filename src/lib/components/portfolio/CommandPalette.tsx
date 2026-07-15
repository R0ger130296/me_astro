import React, { useEffect, useMemo, useRef, useState } from 'react';

interface CommandPaletteProps {
  email: string;
}

interface CommandAction {
  label: string;
  description: string;
  keywords: string;
  run: () => void;
}

const focusStyles =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-500 focus-visible:ring-offset-2 dark:ring-offset-primary-950';

export const CommandPalette: React.FC<CommandPaletteProps> = ({ email }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const navigateTo = (hash: string) => {
    setIsOpen(false);
    window.setTimeout(() => document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' }), 0);
  };

  const actions = useMemo<CommandAction[]>(
    () => [
      { label: 'Ir a experiencia', description: 'Trayectoria y responsabilidades', keywords: 'trabajo empleo experiencia', run: () => navigateTo('#experiencia') },
      { label: 'Ver proyectos', description: 'Proyectos destacados y GitHub', keywords: 'codigo repositorio github proyectos', run: () => navigateTo('#proyectos') },
      { label: 'Ver habilidades', description: 'Stack técnico y fortalezas', keywords: 'skills tecnologias stack', run: () => navigateTo('#habilidades') },
      { label: 'Ver certificaciones', description: 'Credenciales profesionales', keywords: 'certificados cursos', run: () => navigateTo('#certificaciones') },
      { label: 'Contactar', description: email, keywords: 'correo email contacto', run: () => { window.location.href = `mailto:${email}`; } },
      { label: 'Abrir GitHub', description: 'github.com/R0ger130296', keywords: 'repos codigo', run: () => window.open('https://github.com/R0ger130296', '_blank', 'noopener,noreferrer') },
    ],
    [email],
  );

  const filteredActions = actions.filter((action) => {
    const searchValue = `${action.label} ${action.description} ${action.keywords}`.toLowerCase();
    return searchValue.includes(query.trim().toLowerCase());
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setIsOpen((current) => !current);
      }

      if (event.key === 'Escape') setIsOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      return;
    }

    window.setTimeout(() => inputRef.current?.focus(), 0);
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={`inline-flex min-h-10 items-center gap-2 rounded-xl border border-primary-200 bg-white px-3 text-sm font-medium text-primary-600 transition-colors hover:bg-primary-50 hover:text-primary-900 dark:bg-primary-900 ${focusStyles}`}
        aria-label="Abrir comandos rápidos"
      >
        <span className="hidden sm:inline">Buscar</span>
        <kbd className="rounded-md border border-primary-200 bg-primary-50 px-1.5 py-0.5 text-[11px] font-medium text-primary-500">⌘K</kbd>
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Comandos rápidos"
          className="fixed inset-0 z-[100] flex items-start justify-center bg-primary-950/55 px-4 pt-[12vh] backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) setIsOpen(false);
          }}
        >
          <div className="w-full max-w-xl overflow-hidden rounded-2xl border border-primary-200 bg-white shadow-2xl dark:bg-primary-950">
            <div className="border-b border-primary-100 p-3">
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Buscar una sección o acción…"
                className="h-12 w-full rounded-xl bg-primary-50 px-4 text-base text-primary-900 outline-none placeholder:text-primary-400 focus:ring-2 focus:ring-secondary-500"
              />
            </div>

            <div className="max-h-[55vh] overflow-y-auto p-2">
              {filteredActions.length > 0 ? (
                filteredActions.map((action) => (
                  <button
                    key={action.label}
                    type="button"
                    onClick={action.run}
                    className={`flex w-full items-center justify-between gap-4 rounded-xl px-4 py-3 text-left transition-colors hover:bg-primary-50 ${focusStyles}`}
                  >
                    <span>
                      <span className="block text-sm font-semibold text-primary-900">{action.label}</span>
                      <span className="mt-0.5 block text-xs text-primary-500">{action.description}</span>
                    </span>
                    <span aria-hidden="true" className="text-primary-400">↗</span>
                  </button>
                ))
              ) : (
                <p className="px-4 py-8 text-center text-sm text-primary-500">No encontramos una acción.</p>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-primary-100 px-4 py-3 text-xs text-primary-400">
              <span>Enter para abrir</span>
              <span>Esc para cerrar</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
