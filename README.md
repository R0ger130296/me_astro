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

# me_astro

Portfolio personal construido con Astro y desplegado mediante un flujo CI/CD automatizado con GitHub Actions.

El proyecto soporta dos estrategias de despliegue:

- Producción en Vercel
- Laboratorio local en WSL/Ubuntu usando Docker y GitHub Self-Hosted Runner

---

## Stack

- Astro
- TypeScript
- Node.js 24
- Nginx
- Docker
- GitHub Actions
- GitHub Container Registry
- Vercel
- WSL2
- Ubuntu
- GitHub Self-Hosted Runner

---

## Arquitectura

```text
                    git push
                       │
                       ▼
                    GitHub
                       │
              ┌────────┴────────┐
              │                 │
              ▼                 ▼
         GitHub Actions      Deploy Vercel
              │                 │
              ▼                 ▼
         Quality checks       Vercel
              │
              ▼
         Docker build
              │
              ▼
             GHCR
              │
              ▼
       Self-hosted Runner
              │
              ▼
          Ubuntu / WSL
              │
              ▼
            Docker
              │
              ▼
        me-astro container
              │
              ▼
      http://localhost:8080



      npm ci
↓
npm test
↓
astro check
↓
astro build
↓
docker build



Node.js 24
↓
npm ci
↓
tests
↓
Astro build


Nginx
↓
dist/




docker build -t me-astro:test .




docker run --rm \
  --name me-astro \
  -p 8080:80 \
  me-astro:test


  http://localhost:8080



  ghcr.io/r0ger130296/me_astro



  Despliegue local

El laboratorio local utiliza un GitHub Self-Hosted Runner dentro de Ubuntu/WSL.

Flujo:

GitHub Actions
↓
GHCR
↓
Self-hosted Runner
↓
docker pull
↓
reemplazo del contenedor anterior
↓
docker run



cd ~/projects/me_astro/actions-runner/actions-runner
sudo ./svc.sh status


docker info


Despliegue en Vercel

El proyecto también se despliega a Vercel automáticamente.

El workflow utiliza:

vercel pull
↓
vercel build --prod
↓
vercel deploy --prebuilt --prod

Secrets requeridos en GitHub:

VERCEL_TOKEN
VERCEL_PROJECT_ID
VERCEL_ORG_ID

Estos valores se configuran en:

Repository
→ Settings
→ Secrets and variables
→ Actions

Nunca deben almacenarse directamente en el repositorio.

Desarrollo local
Requisitos
WSL2
Ubuntu
NVM
Node.js 24
Docker Desktop
Node.js
nvm use 24

Verificar:

node --version
npm --version
Dependencias
npm ci
Desarrollo
npm run dev -- --host 0.0.0.0

Abrir:

http://localhost:4321
Quality checks

Ejecutar todas las validaciones:

npm run quality

Este comando ejecuta:

npm test
npm run check
npm run build
Scripts
npm run dev

Servidor de desarrollo.

npm run build

Genera el sitio de producción.

npm run preview

Previsualiza el build.

npm run check

Valida Astro y TypeScript.

npm run test

Ejecuta tests automatizados.

npm run quality

Ejecuta todas las validaciones de calidad.

Workflows

Los workflows se encuentran en:

.github/workflows/
ci.yml

Responsable de:

instalación de dependencias
tests
Astro check
build
construcción de imagen Docker
publicación en GHCR
deploy-local.yml

Responsable del despliegue automático al laboratorio WSL.

vercel.yml

Responsable del despliegue de producción en Vercel.

Seguridad

Las credenciales nunca deben incluirse en el código fuente.

GitHub Secrets utilizados:

VERCEL_TOKEN
VERCEL_PROJECT_ID
VERCEL_ORG_ID

Los tokens para GHCR o Vercel deben almacenarse únicamente como secretos del repositorio o del entorno.

Roadmap DevOps

El laboratorio está diseñado para evolucionar progresivamente.

Docker
  ↓
GitHub Actions
  ↓
GHCR
  ↓
Self-hosted Runner
  ↓
Kubernetes
  ↓
Helm
  ↓
Ingress
  ↓
Prometheus
  ↓
Grafana
  ↓
Jenkins

Próximas etapas:

Kubernetes local con kind
Helm Charts
Nginx Ingress Controller
análisis de seguridad con Trivy
observabilidad con Prometheus y Grafana
pipeline equivalente en Jenkins
Autor

Roger Cedeño

Software Developer

GitHub:

https://github.com/R0ger130296

Yo además pondría arriba del README badges de CI, Docker y Vercel. Eso le da aspecto de repo serio inmediatamente.

Por ejemplo:

```markdown
![CI](https://github.com/R0ger130296/me_astro/actions/workflows/ci.yml/badge.svg)
![Vercel](https://img.shields.io/badge/deploy-vercel-black)
![Docker](https://img.shields.io/badge/docker-GHCR-blue)
![Astro](https://img.shields.io/badge/Astro-7.2-orange)

Y el encabezado podría quedar:

# me_astro

![CI](...)
![Vercel](...)
![Docker](...)
![Astro](...)

Portfolio personal y laboratorio CI/CD construido con Astro, Docker, GitHub Actio