# Portafolio profesional de Roger Cedeño

Portafolio mobile-first construido con Astro, TypeScript y desplegado en Vercel.

Sitio público: <https://me-astro-alpha.vercel.app>

## Backend y administración

Incluye API NestJS en `backend/`, PostgreSQL y administración de proyectos en `/admin/` con Keycloak. Consulta [la guía de instalación, arquitectura y despliegue](docs/administracion.md). Los cambios publicados se incorporan al sitio estático en el siguiente despliegue.

## Comandos

```bash
npm install
npm run dev
npm run quality
```

En integración continua y Vercel se utiliza `npm ci` para respetar exactamente `package-lock.json`.

La aplicación es estática, no utiliza Astro DB y está preparada para Vercel. Incluye Web Analytics, Speed Insights, cabeceras de seguridad, recursos PWA, una imagen social de 1200×630, recorrido guiado y microinteracciones discretas con Anime.js, mapa interactivo de habilidades, credenciales progresivas, CV descargable y página 404 personalizada.

Los iconos PWA y la imagen social pueden regenerarse con:

```bash
python tools/generate_brand_assets.py
```

El CV se recopila desde la información profesional del portafolio y puede regenerarse con:

```bash
python tools/generate_cv.py
```
