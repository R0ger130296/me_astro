# 🧩 Guía de Componentes UI

Este documento describe todos los componentes reutilizables disponibles en el proyecto.

## 📦 Componentes Base

### Icon
Componente para mostrar iconos de Lucide.

```svelte
<script>
  import { Icon } from '$lib/components/ui';
</script>

<Icon name="Mail" size={20} />
<Icon name="Phone" size={24} color="#3b82f6" />
```

**Props:**
- `name` (string): Nombre del icono (Mail, Phone, MapPin, etc.)
- `size` (number | string): Tamaño del icono (default: 20)
- `className` (string): Clases CSS adicionales
- `color` (string): Color del icono

### Button
Botón reutilizable con múltiples variantes.

```svelte
<script>
  import { Button } from '$lib/components/ui';
</script>

<Button variant="primary" size="md">Click me</Button>
<Button variant="secondary" size="lg" href="/about">Link Button</Button>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
- `size`: 'sm' | 'md' | 'lg'
- `href` (string): Si se proporciona, renderiza como `<a>`
- `type`: 'button' | 'submit' | 'reset'
- `disabled` (boolean)
- `className` (string)

### Card
Contenedor con sombra y padding configurable.

```svelte
<script>
  import { Card } from '$lib/components/ui';
</script>

<Card padding="md" elevation="md">
  Contenido de la tarjeta
</Card>
```

**Props:**
- `padding`: 'none' | 'sm' | 'md' | 'lg'
- `elevation`: 'none' | 'sm' | 'md' | 'lg'
- `className` (string)

### Section
Sección con título y card opcional.

```svelte
<script>
  import { Section } from '$lib/components/ui';
</script>

<Section title="Mi Sección" card={true} padding="md">
  Contenido
</Section>
```

**Props:**
- `title` (string): Título de la sección
- `card` (boolean): Si renderiza dentro de un Card (default: true)
- `padding`: 'none' | 'sm' | 'md' | 'lg'
- `className` (string)

### Badge
Badge para etiquetas y estados.

```svelte
<script>
  import { Badge } from '$lib/components/ui';
</script>

<Badge variant="primary">Nuevo</Badge>
<Badge variant="success">Completado</Badge>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'success' | 'warning' | 'info'
- `className` (string)

### Avatar
Avatar con iniciales o imagen.

```svelte
<script>
  import { Avatar } from '$lib/components/ui';
</script>

<Avatar name="Roger Cedeño" size="lg" />
<Avatar name="Roger Cedeño" image="/photo.jpg" size="md" />
```

**Props:**
- `name` (string): Nombre para generar iniciales
- `image` (string): URL de la imagen (opcional)
- `size`: 'sm' | 'md' | 'lg' | 'xl'
- `className` (string)

### ContactLink
Enlace de contacto con icono automático.

```svelte
<script>
  import { ContactLink } from '$lib/components/ui';
</script>

<ContactLink type="email" value="email@example.com" />
<ContactLink type="phone" value="+1234567890" />
<ContactLink type="location" value="Quito, Ecuador" />
```

**Props:**
- `type`: 'email' | 'phone' | 'location' | 'linkedin' | 'github' | 'website'
- `value` (string): Valor del contacto
- `href` (string): URL personalizada (opcional)
- `iconSize` (number): Tamaño del icono (default: 20)
- `className` (string)

## 🎨 Sistema de Utilidades

### cn()
Función para combinar clases CSS de manera inteligente.

```typescript
import { cn } from '$lib/utils/cn';

const classes = cn('base-class', condition && 'conditional-class', 'another-class');
```

## 📚 Librerías Utilizadas

### lucide-svelte
Iconos profesionales y modernos.
- [Documentación](https://lucide.dev/)
- Más de 1000 iconos disponibles

### clsx + tailwind-merge
Utilidades para manejo de clases CSS.
- `clsx`: Combina clases condicionalmente
- `tailwind-merge`: Resuelve conflictos de clases Tailwind

## 🎯 Buenas Prácticas

1. **Siempre usa los componentes base** en lugar de crear nuevos desde cero
2. **Combina componentes** para crear interfaces más complejas
3. **Usa `cn()`** para clases condicionales
4. **Mantén la consistencia** usando las variantes predefinidas
5. **Tipa tus props** usando los tipos exportados de `./types`

## 🔧 Extender Componentes

Para crear variantes personalizadas:

```svelte
<script>
  import Button from '$lib/components/ui/Button.svelte';
</script>

<Button variant="primary" className="custom-class">
  Botón personalizado
</Button>
```

## 📝 Ejemplo Completo

```svelte
<script>
  import { Section, Card, Badge, Icon, Button } from '$lib/components/ui';
</script>

<Section title="Mi Proyecto">
  <Card padding="lg">
    <div class="flex items-center gap-2 mb-4">
      <Icon name="Code" size={24} />
      <h3>Proyecto React</h3>
      <Badge variant="success">Activo</Badge>
    </div>
    <p>Descripción del proyecto...</p>
    <Button variant="primary" size="sm" href="/project">
      Ver más
    </Button>
  </Card>
</Section>
```

---

**Última actualización**: 2024

