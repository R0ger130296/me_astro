# Backend y administración

El portafolio conserva Astro estático y añade una API NestJS independiente en `backend/`. La primera funcionalidad administrable son los proyectos y sus casos técnicos. Perfil, experiencia y certificados siguen en `src/data/` y pueden convertirse en módulos posteriores.

## Arquitectura

Flujo: Astro `/admin/` → Keycloak (Authorization Code + PKCE S256) → API NestJS → PostgreSQL.

- `projects.controller.ts`: contrato HTTP y validación mediante DTOs.
- `projects.service.ts`: operaciones de aplicación y conflictos de edición.
- `project.ts`: tipos del dominio y puerto abstracto del repositorio, sin dependencias de NestJS o PostgreSQL.
- `postgres-project.repository.ts`: persistencia con consultas parametrizadas.
- `auth/`: guard global y verificación criptográfica JWKS. Toda ruta es privada salvo las marcadas explícitamente `@Public()`.
- `database/`: pool compartido, cierre ordenado y migraciones versionadas transaccionales con bloqueo.

La inversión de dependencias permite sustituir la persistencia; las responsabilidades están separadas sin añadir CQRS o microservicios innecesarios. El caso técnico se guarda como JSONB porque se edita como documento completo. El slug tiene restricción única. Actualizar y eliminar exige una versión para detectar cambios concurrentes.

## Inicio local

Requisitos: PowerShell, Node 24 y Docker. Desde la raíz:

```powershell
npm ci
npm --prefix backend ci
# Copiar solo si todavía no existen; conservar la configuración existente.
Copy-Item .env.example .env
Copy-Item backend/.env.example backend/.env
docker compose -f backend/compose.yml up -d --wait
npm --prefix backend run build
npm --prefix backend run migrate
```

En dos terminales:

```powershell
npm --prefix backend run dev
```

```powershell
npm run dev
```

- Administración: http://localhost:4321/admin/ (usar `localhost`, como en Keycloak).
- API: http://localhost:3001/api/v1.
- Salud y disponibilidad de tablas: `GET /api/v1/health`.
- PostgreSQL: puerto local 5433 y volumen persistente Docker. Las credenciales del ejemplo son exclusivamente de desarrollo.
- Keycloak existente: http://localhost:9090. Su base SQL Server es independiente de los datos del portafolio.

## Keycloak y tu usuario

Importa `infrastructure/keycloak/portfolio-realm.json` desde **Create realm** en la consola, o ejecuta:

```powershell
node tools/setup-keycloak.mjs D:/proyectos/keycloak/.env
```

El script usa las credenciales locales solo en memoria. Crea el realm si no existe y no sobrescribe otros realms. Para otro servidor establece `KEYCLOAK_URL`.

1. Selecciona el realm **portfolio** en la consola.
2. En **Users → Add user**, crea tu cuenta y establece una contraseña en **Credentials**. Una contraseña temporal exige cambiarla al entrar.
3. En **Role mapping → Assign role**, filtra por clientes y asigna **portfolio-api → portfolio-admin**.
4. Entra a `/admin/`. **Importar proyectos actuales** agrega el contenido inicial sin sobrescribir slugs existentes. Es posible reintentar una importación interrumpida.

El cliente público `portfolio-admin` no tiene secreto ni habilita password grant o implicit flow. La API exige issuer, audience `portfolio-api`, expiración, firma RS256, tipo Bearer y rol de cliente. Los tokens se mantienen en memoria, nunca en localStorage o sessionStorage. El frontend renueva la sesión y la API verifica cada petición.

## Publicación

Después de importar el contenido, configura `PORTFOLIO_API_URL=http://localhost:3001/api/v1` en `.env` para que Astro lea proyectos publicados al compilar. Reinicia Astro tras cambiar variables.

```powershell
npm run build
```

Listado, paleta de comandos y páginas de detalle usan la API. Sin esa variable se usan los datos originales. Con la variable configurada, una API caída hace fallar el build para evitar publicar contenido antiguo silenciosamente; una lista vacía significa que no hay proyectos publicados.

Guardar en administración **no lanza un despliegue automáticamente**. Un nuevo despliegue de Vercel actualiza las páginas públicas. Las versiones desplegadas mantienen su contenido hasta entonces. Esto conserva SEO y alojamiento estático. Automatizar despliegues o adoptar renderizado en servidor son ampliaciones futuras.

## API

| Método | Ruta bajo `/api/v1` | Acceso |
| --- | --- | --- |
| GET | `/health` | Público |
| GET | `/projects` | Solo publicados, sin metadatos internos |
| GET | `/admin/projects` | Administrador, incluye borradores |
| POST | `/admin/projects` | Administrador, `CreateProjectDto` |
| PUT | `/admin/projects/:id` | Administrador, documento completo + `version` |
| DELETE | `/admin/projects/:id?version=1` | Administrador, versión actual |

Errores: 400 validación, 401 sesión inválida, 403 permisos, 409 slug repetido o versión antigua, 429 límite de peticiones. Ante conflicto, conserva los cambios, actualiza la lista y abre la versión actual para editar.

## Producción

1. Usa PostgreSQL con credenciales propias y TLS según el proveedor. Ejecuta migraciones como paso de release antes de iniciar la API. No compartas la cuenta de la base de Keycloak.
2. Construye `backend/Dockerfile` con `backend/` como contexto. Configura `DATABASE_URL`, `KEYCLOAK_ISSUER`, `KEYCLOAK_AUDIENCE`, `CORS_ORIGINS`, `PORT` y `NODE_ENV=production`. Expón API y Keycloak mediante HTTPS. No se confía por defecto en cabeceras de proxy del cliente.
3. En Keycloak sustituye las URLs locales por el dominio exacto: redirect `/admin/`, web origin y post logout redirect `/admin/`. Mantén PKCE S256 y roles explícitos. Configura SMTP para recuperar contraseñas y MFA según tu política.
4. En Vercel configura `PUBLIC_API_URL`, `PUBLIC_KEYCLOAK_URL`, `PUBLIC_KEYCLOAK_REALM=portfolio`, `PUBLIC_KEYCLOAK_CLIENT_ID=portfolio-admin` y `PORTFOLIO_API_URL` accesible desde build. Las variables `PUBLIC_*` no deben contener secretos.
5. Prepara los dominios de la CSP **antes del despliegue**:

```powershell
$env:PUBLIC_API_URL = 'https://api.tu-dominio.com/api/v1'
$env:PUBLIC_KEYCLOAK_URL = 'https://auth.tu-dominio.com'
node tools/configure-admin-csp.mjs
```

Revisa y guarda `vercel.json`. El generador añade una política para `/admin/:path*` con los orígenes exactos, `no-store` y `noindex`. La política pública sigue restrictiva. Sin este paso, la CSP original bloquea conexiones externas. Comprueba los headers efectivos en el primer despliegue. El service worker excluye administración, API, peticiones autorizadas y otros dominios.

El límite es local a cada instancia: 120 peticiones/minuto por IP. Para varias réplicas usa almacenamiento compartido y configura los proxies de confianza de tu plataforma. Prevé backups y registros operativos sin tokens. Esta versión no incluye historial editorial ni papelera.

## Pruebas

```powershell
npm run quality
npm --prefix backend test
```

La API necesita PostgreSQL del compose o `TEST_DATABASE_URL`. Las pruebas crean y eliminan un esquema temporal aleatorio aislado; usan firmas RSA y JWKS de prueba para autenticación, y la base real para CRUD, unicidad, publicación y concurrencia. También comprueban validación, configuración y CORS. GitHub Actions ejecuta ambas suites con Node 24 y PostgreSQL.

Referencias: [autenticación NestJS](https://docs.nestjs.com/security/authentication), [validación NestJS](https://docs.nestjs.com/techniques/validation), [adaptador de Keycloak](https://www.keycloak.org/securing-apps/javascript-adapter).
