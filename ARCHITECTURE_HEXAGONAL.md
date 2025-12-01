# 🏗️ Arquitectura Hexagonal / Clean Architecture

Este proyecto implementa **Arquitectura Hexagonal** (también conocida como **Clean Architecture** o **Ports & Adapters**), siguiendo los principios SOLID y separación de responsabilidades.

## 📐 Estructura de Capas

```
src/lib/
├── domain/                    # Capa de Dominio (Núcleo)
│   ├── entities/              # Entidades de negocio
│   │   ├── Experience.entity.ts
│   │   ├── Education.entity.ts
│   │   ├── Certification.entity.ts
│   │   ├── PersonalInfo.entity.ts
│   │   ├── Reference.entity.ts
│   │   ├── Skill.entity.ts
│   │   └── Language.entity.ts
│   └── ports/                 # Interfaces (Puertos)
│       └── IPortfolioRepository.port.ts
│
├── application/               # Capa de Aplicación
│   └── use-cases/            # Casos de uso
│       ├── GetPersonalInfoUseCase.ts
│       ├── GetExperiencesUseCase.ts
│       ├── GetCertificationsUseCase.ts
│       ├── GetEducationUseCase.ts
│       ├── GetSkillsUseCase.ts
│       ├── GetLanguagesUseCase.ts
│       └── GetReferencesUseCase.ts
│
├── infrastructure/            # Capa de Infraestructura
│   ├── repositories/         # Implementaciones concretas
│   │   └── PortfolioRepository.ts
│   └── di/                   # Inyección de dependencias
│       └── Container.ts
│
└── presentation/             # Capa de Presentación
    └── hooks/                # Hooks para componentes
        └── usePortfolio.ts
```

## 🎯 Principios Aplicados

### 1. **Separación de Responsabilidades (SoC)**
- **Dominio**: Contiene la lógica de negocio pura, sin dependencias externas
- **Aplicación**: Orquesta los casos de uso
- **Infraestructura**: Implementa detalles técnicos (repositorios, servicios externos)
- **Presentación**: Interfaz de usuario (componentes Svelte)

### 2. **Inversión de Dependencias (DIP)**
- Las capas externas dependen de las internas
- Las interfaces están en el dominio, las implementaciones en infraestructura
- El dominio NO conoce la infraestructura

### 3. **Single Responsibility Principle (SRP)**
- Cada clase tiene una única responsabilidad
- Casos de uso específicos y enfocados
- Entidades con validaciones propias

### 4. **Open/Closed Principle (OCP)**
- Abierto para extensión (nuevos casos de uso)
- Cerrado para modificación (entidades estables)

## 🔄 Flujo de Datos

```
Componente Svelte (Presentación)
    ↓
Hook usePortfolio (Presentación)
    ↓
Caso de Uso (Aplicación)
    ↓
Repositorio Interface (Puerto/Dominio)
    ↓
Repositorio Implementación (Infraestructura)
    ↓
Datos (portfolio.ts)
```

## 📦 Capas Detalladas

### **Domain Layer (Dominio)**
- **Entidades**: Objetos de negocio con lógica propia
- **Validaciones**: Reglas de negocio en las entidades
- **Puertos**: Interfaces que definen contratos

**Ejemplo:**
```typescript
export class Experience {
  constructor(...) {
    this.validate(); // Validación en el dominio
  }
  
  get duration(): string {
    // Lógica de negocio
  }
}
```

### **Application Layer (Aplicación)**
- **Casos de Uso**: Lógica de aplicación orquestada
- **Sin dependencias de UI o infraestructura**
- **Usa interfaces del dominio**

**Ejemplo:**
```typescript
export class GetExperiencesUseCase {
  constructor(private repository: IPortfolioRepository) {}
  
  async execute(): Promise<Experience[]> {
    return await this.repository.getExperiences();
  }
}
```

### **Infrastructure Layer (Infraestructura)**
- **Implementaciones concretas** de los puertos
- **Acceso a datos** (archivos, APIs, bases de datos)
- **Servicios externos**

**Ejemplo:**
```typescript
export class PortfolioRepository implements IPortfolioRepository {
  async getExperiences(): Promise<Experience[]> {
    // Implementación concreta
  }
}
```

### **Presentation Layer (Presentación)**
- **Componentes Svelte**: UI
- **Hooks**: Conectan UI con casos de uso
- **Sin lógica de negocio**

## 🔌 Dependency Injection

El contenedor de dependencias (`Container.ts`) gestiona todas las dependencias:

```typescript
const container = Container.getInstance();
const useCase = container.getGetExperiencesUseCase();
```

## ✅ Ventajas de esta Arquitectura

1. **Testeable**: Fácil de testear cada capa independientemente
2. **Mantenible**: Cambios aislados por capa
3. **Escalable**: Fácil agregar nuevas funcionalidades
4. **Desacoplado**: Bajo acoplamiento entre capas
5. **Reutilizable**: Lógica de negocio reutilizable
6. **Independiente de frameworks**: El dominio no depende de Svelte

## 🧪 Testing

Con esta arquitectura, puedes testear:

- **Entidades**: Validaciones y lógica de negocio
- **Casos de Uso**: Con mocks del repositorio
- **Repositorios**: Con datos de prueba
- **Componentes**: Con casos de uso mockeados

## 🚀 Extensibilidad

### Agregar nuevo caso de uso:
1. Crear entidad en `domain/entities/`
2. Agregar método al puerto `IPortfolioRepository`
3. Crear caso de uso en `application/use-cases/`
4. Implementar en `infrastructure/repositories/`
5. Crear hook en `presentation/hooks/`
6. Usar en componente

### Cambiar fuente de datos:
Solo modificar `PortfolioRepository`, sin tocar el dominio ni casos de uso.

## 📚 Referencias

- [Clean Architecture - Robert C. Martin](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Hexagonal Architecture - Alistair Cockburn](https://alistair.cockburn.us/hexagonal-architecture/)
- [SOLID Principles](https://en.wikipedia.org/wiki/SOLID)

---

**Última actualización**: 2024
**Arquitectura**: Hexagonal / Clean Architecture
