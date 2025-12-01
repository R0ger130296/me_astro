# 📚 Documentación de la API del Portafolio

Este proyecto utiliza una base de datos JSON centralizada (`src/data/database.json`) y endpoints API en Astro para gestionar todos los datos del portafolio.

## 🗄️ Base de Datos

La base de datos principal se encuentra en:
```
src/data/database.json
```

Este archivo contiene toda la información del portafolio:
- Información personal
- Experiencias laborales
- Educación
- Certificaciones
- Referencias
- Habilidades técnicas
- Habilidades blandas
- Idiomas

## 🔌 Endpoints API

Todos los endpoints están disponibles en `/api/portfolio/`:

### 1. Información Personal
```
GET /api/portfolio/personal-info.json
```

**Respuesta:**
```json
{
  "name": "Roger Cedeño",
  "title": "Software Engineer | Full Stack Developer",
  "email": "grarogccee@gmail.com",
  "phone": "+593 990475612",
  "location": "Quito, Pichincha, Ecuador",
  "summary": "..."
}
```

### 2. Experiencias
```
GET /api/portfolio/experiences.json
```

**Respuesta:**
```json
[
  {
    "id": 1,
    "title": "Full Stack Developer",
    "company": "Kruger Corp",
    "location": "Ecuador",
    "startDate": "08/2023",
    "endDate": "09/2025",
    "responsibilities": [...]
  }
]
```

### 3. Educación
```
GET /api/portfolio/education.json
```

### 4. Certificaciones
```
GET /api/portfolio/certifications.json
```

**Respuesta:**
```json
[
  {
    "id": 1,
    "name": "NestJS: The Complete Developer's Guide",
    "issuer": "Udemy",
    "image": "/certificados/UC-xxx.pdf"
  }
]
```

### 5. Referencias
```
GET /api/portfolio/references.json
```

**Respuesta:**
```json
[
  {
    "id": 1,
    "name": "Erick Daniel Erraez Guamán",
    "position": "Ingeniero en Software",
    "company": "Neoris",
    "email": "erickerraez2@gmail.com",
    "phone": "097178106",
    "testimonial": "...",
    "linkedinUrl": null
  }
]
```

### 6. Habilidades Técnicas
```
GET /api/portfolio/skills.json
```

**Respuesta:**
```json
[
  {
    "name": "React",
    "category": "frontend",
    "level": 90
  }
]
```

### 7. Habilidades Blandas
```
GET /api/portfolio/soft-skills.json
```

**Respuesta:**
```json
[
  "Responsabilidad",
  "Trabajo en Equipo",
  ...
]
```

### 8. Idiomas
```
GET /api/portfolio/languages.json
```

**Respuesta:**
```json
[
  {
    "name": "Español",
    "level": "Nativo"
  },
  {
    "name": "Inglés",
    "level": "Intermedio"
  }
]
```

## 🛠️ Uso en el Código

### En el Repositorio

El repositorio (`PortfolioRepository`) importa directamente el JSON:

```typescript
import database from '../../data/database.json';

async getCertifications(): Promise<Certification[]> {
  return database.certifications.map(
    (cert: any) => new Certification(cert.id, cert.name, cert.issuer, cert.image)
  );
}
```

### Consumir la API desde el Cliente

Si necesitas consumir la API desde componentes React en el cliente:

```typescript
const response = await fetch('/api/portfolio/certifications.json');
const certifications = await response.json();
```

## 📝 Actualizar Datos

Para actualizar cualquier información del portafolio:

1. Edita el archivo `src/data/database.json`
2. Los cambios se reflejarán automáticamente en:
   - El repositorio (que lee directamente el JSON)
   - Los endpoints API (que sirven el JSON)

## 🏗️ Arquitectura

```
src/data/database.json (Fuente única de verdad)
    ↓
src/lib/infrastructure/repositories/PortfolioRepository.ts (Lee el JSON)
    ↓
src/lib/application/use-cases/ (Casos de uso)
    ↓
src/lib/presentation/hooks/usePortfolio.ts (Hooks para componentes)
    ↓
src/lib/components/portfolio/ (Componentes React)
```

## 🔄 Flujo de Datos

1. **Base de Datos**: `database.json` contiene todos los datos
2. **Repositorio**: Lee directamente del JSON (modo estático)
3. **API Endpoints**: Sirven el JSON para consumo externo (si es necesario)
4. **Componentes**: Usan los hooks que llaman a los casos de uso

## ✅ Ventajas

- ✅ **Fuente única de verdad**: Todos los datos en un solo archivo JSON
- ✅ **Fácil de actualizar**: Solo edita `database.json`
- ✅ **API disponible**: Endpoints REST para consumo externo
- ✅ **Type-safe**: TypeScript valida la estructura
- ✅ **Arquitectura limpia**: Separación de responsabilidades

## 🚀 Próximos Pasos

Si necesitas migrar a una base de datos real:
1. Reemplaza la importación del JSON en el repositorio
2. Implementa métodos para leer/escribir en la base de datos
3. Los endpoints API seguirán funcionando igual

