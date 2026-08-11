# Portafolio profesional de Roger Cedeño

Portafolio mobile-first construido con Astro, TypeScript y desplegado en Vercel.

Sitio público: <https://me-astro-alpha.vercel.app>

## Comandos

```bash
npm install
npm run dev
npm run quality
```

En integración continua y Vercel se utiliza `npm ci` para respetar exactamente `package-lock.json`.

La aplicación es estática, no utiliza Astro DB y está preparada para Vercel. Incluye Web Analytics, Speed Insights, cabeceras de seguridad, recursos PWA y una imagen social de 1200×630.

Los iconos PWA y la imagen social pueden regenerarse con:

```bash
python tools/generate_brand_assets.py
```
