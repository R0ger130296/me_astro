# 📸 Instrucciones para agregar tu foto de perfil

Para que tu foto aparezca en el portafolio en lugar de las iniciales "RC":

1. **Prepara tu foto:**
   - Formato: JPG, JPEG o PNG
   - Tamaño recomendado: 400x400px o más (cuadrada)
   - Nombre del archivo: `profile.jpg` (o `profile.png`)

2. **Coloca el archivo aquí:**
   - Ruta: `static/profile.jpg` (o `static/profile.png`)
   - Es decir, dentro de la carpeta `static/` del proyecto

3. **Ejemplo de estructura:**
   ```
   static/
   ├── profile.jpg  ← Tu foto aquí
   └── certificados/
       └── ...
   ```

4. **Si usas otro nombre o formato:**
   - Edita el archivo `src/lib/components/portfolio/Header.svelte`
   - Cambia la línea: `image="/profile.jpg"` por tu nombre de archivo

¡Listo! Tu foto aparecerá automáticamente en el header del portafolio.
