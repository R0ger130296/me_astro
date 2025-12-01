# Configuración de Astro DB

## Instalación Completada ✅

Astro DB ha sido instalado correctamente en el proyecto.

## Configuración Actual

- **Integración**: `@astrojs/db` v0.18.3
- **Output Mode**: `server` (requerido para Astro DB)
- **Archivo de Configuración**: `db/config.ts`
- **Seed File**: `db/seed.ts`

## Esquema de Base de Datos

Las siguientes tablas están definidas en `db/config.ts`:

1. **PersonalInfo** - Información personal
2. **Experience** - Experiencias profesionales
3. **Education** - Educación académica
4. **Certification** - Certificaciones
5. **Reference** - Referencias profesionales
6. **Skill** - Habilidades técnicas y blandas
7. **Language** - Idiomas

## Desarrollo Local

Para desarrollo, Astro DB usa una base de datos SQLite local automáticamente. No se requiere configuración adicional.

```bash
npm run dev
```

## Producción

Para producción, Astro DB requiere una base de datos remota compatible con libSQL. Tienes dos opciones:

### Opción 1: Build con Base de Datos Remota

1. Configura las variables de entorno:
   ```bash
   ASTRO_DATABASE_FILE=./.astro/db.sqlite
   # O para producción remota:
   ASTRO_DB_REMOTE_URL=tu-url-libsql
   ASTRO_DB_APP_TOKEN=tu-token
   ```

2. Build con flag `--remote`:
   ```bash
   npm run build:remote
   ```

### Opción 2: Mantener Output Estático (Recomendado para Portfolio)

Si prefieres mantener el portfolio como sitio estático, puedes:

1. Cambiar `output: 'static'` en `astro.config.mjs`
2. Remover la integración `db()` temporalmente
3. Usar los datos de `src/data/database.ts` directamente

## Migración de Datos

Para migrar los datos existentes de `src/data/database.ts` a Astro DB, puedes usar el archivo `db/seed.ts` que se ejecuta automáticamente en desarrollo.

## Recursos

- [Documentación Oficial de Astro DB](https://docs.astro.build/en/guides/astro-db/)
- [Conectar Base de Datos libSQL](https://docs.astro.build/en/guides/astro-db/#connect-a-libsql-database-for-production)

