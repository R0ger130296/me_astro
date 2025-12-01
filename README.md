# 🎯 Portafolio Profesional - Roger Cedeño

Portafolio profesional desarrollado con **Astro** y **Svelte**, siguiendo las mejores prácticas de desarrollo moderno y arquitectura hexagonal.

## 🚀 Características

- ✨ **Diseño Moderno y Responsivo**: Adaptado a todos los dispositivos
- 🎨 **UI/UX Profesional**: Interfaz limpia y fácil de navegar
- ⚡ **Rendimiento Optimizado**: Generación estática con Astro para máxima velocidad
- 📱 **Totalmente Responsive**: Funciona perfectamente en móviles, tablets y desktop
- 🔧 **TypeScript**: Código tipado y seguro
- 🎯 **Buenas Prácticas**: Estructura de código limpia y mantenible
- 🏗️ **Arquitectura Hexagonal**: Separación clara de responsabilidades

## 📋 Secciones del Portafolio

- **Header**: Información personal y contacto
- **Sobre Mí**: Resumen profesional
- **Experiencia**: Historial laboral detallado
- **Educación**: Formación académica
- **Habilidades**: Técnicas y blandas
- **Certificaciones**: Cursos y certificados
- **Idiomas**: Dominio de idiomas
- **Referencias**: Contactos profesionales

## 🛠️ Tecnologías Utilizadas

- **Astro**: Framework web moderno para sitios estáticos
- **Svelte 5**: Framework reactivo moderno (componentes)
- **TypeScript**: Tipado estático
- **Tailwind CSS**: Framework de utilidades CSS
- **Arquitectura Hexagonal**: Separación de capas (Domain, Application, Infrastructure, Presentation)

## 📦 Instalación

```bash
# Instalar dependencias
npm install
```

## 🚀 Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev
```

Abre [http://localhost:4321](http://localhost:4321) en tu navegador (puerto por defecto de Astro).

## 🏗️ Build para Producción

```bash
# Construir para producción
npm run build

# Preview de producción
npm run preview
```

## 📁 Estructura del Proyecto

```
src/
├── layouts/
│   └── Layout.astro          # Layout base de Astro
├── pages/
│   └── index.astro           # Página principal
├── lib/
│   ├── components/
│   │   ├── portfolio/        # Componentes del portafolio (Svelte)
│   │   │   ├── Header.svelte
│   │   │   ├── About.svelte
│   │   │   ├── Experience.svelte
│   │   │   ├── Education.svelte
│   │   │   ├── Skills.svelte
│   │   │   ├── Certifications.svelte
│   │   │   ├── Languages.svelte
│   │   │   └── References.svelte
│   │   └── ui/               # Componentes UI reutilizables
│   ├── domain/               # Capa de dominio (entidades)
│   ├── application/         # Casos de uso
│   ├── infrastructure/       # Repositorios e inyección de dependencias
│   ├── presentation/        # Hooks de presentación
│   └── data/
│       └── portfolio.ts      # Datos del portafolio
└── app.css                   # Estilos globales
```

## 🎨 Personalización

### Modificar Datos

Edita el archivo `src/lib/data/portfolio.ts` para actualizar:
- Información personal
- Experiencia laboral
- Educación
- Habilidades
- Certificaciones
- Referencias

### Cambiar Colores

Modifica las variables CSS en `src/app.css`:

```css
:root {
  --color-primary: #3b82f6;      /* Color principal */
  --color-primary-dark: #2563eb;   /* Color principal oscuro */
  --color-secondary: #10b981;      /* Color secundario */
  /* ... más variables */
}
```

## 📝 Comandos Útiles

```bash
# Verificar tipos TypeScript
npm run check

# Verificar código (linting)
npm run lint

# Formatear código
npm run format
```

## 🔄 Migración a Astro

Este proyecto fue migrado de SvelteKit a Astro. Para más detalles, consulta:
- `MIGRATION_GUIDE.md` - Guía completa de la migración

## 📚 Recursos

- [Documentación oficial de Astro](https://docs.astro.build)
- [Documentación oficial de Svelte](https://svelte.dev/docs)
- [Astro + Svelte Integration](https://docs.astro.build/en/guides/integrations-guide/svelte/)

## 📄 Licencia

Este proyecto es de uso personal.

---

Desarrollado con ❤️ usando Astro y Svelte
