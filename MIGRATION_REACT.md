# Migración Completa: SvelteKit → Astro + React

Este proyecto ha sido completamente migrado de SvelteKit a Astro con componentes React.

## ✅ Cambios Realizados

### 1. Configuración del Proyecto
- ✅ `package.json` actualizado con dependencias de React
- ✅ `astro.config.mjs` configurado con integración de React
- ✅ `tsconfig.json` actualizado para soportar JSX de React
- ✅ `vercel.json` actualizado para Astro

### 2. Componentes UI Migrados a React
- ✅ `Icon.tsx` - Componente de iconos usando lucide-react
- ✅ `Button.tsx` - Botón reutilizable
- ✅ `Badge.tsx` - Badge para etiquetas
- ✅ `Card.tsx` - Tarjeta contenedora
- ✅ `Section.tsx` - Sección con título
- ✅ `ContactLink.tsx` - Enlaces de contacto
- ✅ `Modal.tsx` - Modal con scroll lock
- ✅ `Pagination.tsx` - Paginación
- ✅ `ScrollToTop.tsx` - Botón scroll to top

### 3. Componentes del Portfolio Migrados
- ✅ `Header.tsx` - Encabezado con información personal
- ✅ `Hero.tsx` - Sección hero con animación de código
- ✅ `About.tsx` - Sección sobre mí
- ✅ `Experience.tsx` - Experiencia profesional con modal
- ✅ `Education.tsx` - Educación
- ✅ `Skills.tsx` - Habilidades técnicas
- ✅ `Certifications.tsx` - Certificaciones
- ✅ `Languages.tsx` - Idiomas

### 4. Hooks y Utilidades
- ✅ `useBodyScrollLock.tsx` - Hook para bloquear scroll (adaptado a React)
- ✅ `browser.ts` - Utilidad para detección de navegador
- ✅ Todos los hooks de presentación funcionan igual (son funciones async)

## 🚀 Instalación y Uso

### 1. Instalar dependencias
```bash
npm install
```

### 2. Ejecutar en desarrollo
```bash
npm run dev
```
El servidor se iniciará en `http://localhost:4321` (puerto por defecto de Astro)

### 3. Build para producción
```bash
npm run build
```

### 4. Preview de producción
```bash
npm run preview
```

## 📦 Dependencias Principales

- **Astro**: Framework web moderno
- **React**: Biblioteca de UI
- **lucide-react**: Iconos (reemplaza lucide-svelte)
- **Tailwind CSS**: Framework de utilidades CSS
- **TypeScript**: Tipado estático

## 🔄 Diferencias Clave: Svelte → React

### Props
```tsx
// React
interface Props {
  title: string;
  children: React.ReactNode;
}

export const Component: React.FC<Props> = ({ title, children }) => {
  return <div>{title}{children}</div>;
};
```

### Estado
```tsx
// React
const [count, setCount] = useState(0);
```

### Efectos
```tsx
// React
useEffect(() => {
  // código
  return () => {
    // cleanup
  };
}, [dependencies]);
```

### Directivas de Astro
En Astro, los componentes React necesitan la directiva `client:load`:
```astro
<Header client:load />
<Hero client:load />
```

## 📝 Notas Importantes

1. **Arquitectura Hexagonal**: Se mantiene intacta, solo cambió la capa de presentación
2. **Hooks de Presentación**: Funcionan igual porque son funciones asíncronas
3. **Estilos**: Tailwind CSS funciona igual
4. **Rendimiento**: Astro genera HTML estático, mejorando el rendimiento y SEO

## 🐛 Solución de Problemas

Si encuentras errores de importación:
- Verifica que `$lib` esté configurado en `tsconfig.json`
- Asegúrate de que los componentes React tengan la extensión `.tsx`
- Verifica que `client:load` esté en los componentes React en archivos `.astro`

## ✨ Ventajas de Astro + React

1. **Mejor SEO**: HTML renderizado en servidor
2. **Rendimiento**: Solo carga JavaScript necesario (islas de interactividad)
3. **Compatibilidad**: React funciona perfectamente con Astro
4. **Build Optimizado**: Genera sitios estáticos ultra-rápidos

