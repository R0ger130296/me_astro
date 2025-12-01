# 🚀 Instrucciones de Instalación

## Paso 1: Instalar Dependencias

Abre una terminal en este directorio y ejecuta:

```bash
npm install
```

Esto instalará todas las dependencias necesarias:
- Svelte y SvelteKit
- TypeScript
- Vite (el bundler)
- ESLint y Prettier (para código limpio)

## Paso 2: Iniciar el Servidor de Desarrollo

```bash
npm run dev
```

Esto iniciará el servidor de desarrollo en `http://localhost:5173`

## Paso 3: Abrir en el Navegador

Abre tu navegador y ve a: **http://localhost:5173**

Deberías ver:
- Un mensaje de bienvenida
- Un contador interactivo
- Una lista de tareas

## 📚 Siguiente Paso: Aprender

Lee el archivo `GUIA_APRENDIZAJE.md` para comenzar a aprender Svelte paso a paso.

## 🛠️ Comandos Útiles

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview de producción
npm run preview

# Verificar tipos TypeScript
npm run check

# Verificar código (linting)
npm run lint

# Formatear código
npm run format
```

## ⚠️ Nota sobre Errores del Linter

Si ves errores sobre `$props` o módulos no encontrados:
1. Asegúrate de haber ejecutado `npm install`
2. Los errores de `$props` pueden aparecer porque el linter aún no reconoce completamente la sintaxis de Svelte 5, pero el código funcionará correctamente

---

¡Listo para comenzar! 🎉

