# GamePrime

## Descripción
GamePrime es una plataforma de venta de videojuegos en línea, construida con Node.js, Express y Supabase.

## Requisitos Previos
- Node.js (versión 14 o superior)
- npm (viene incluido con Node.js)
- Git

## Instalación y Configuración

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/MP-make/Gameprime.git
   cd Gameprime
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   ```

3. **Configura las variables de entorno:**
   - Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:
     ```
     SUPABASE_URL=https://ukzadyiieylaaekxblpk.supabase.co
     SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVremFkeWlpZXlsYWFla3hibHBrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMzMzExOTgsImV4cCI6MjA3ODkwNzE5OH0.JRmxRCO8FNvw6Ix89Rd6CSK82o8jod2iCQhCk98LvN8
     ```
   - **Nota:** El archivo `.env` ya está incluido en el repositorio, pero asegúrate de que contenga las credenciales correctas de Supabase.

4. **Ejecuta el servidor:**
   ```bash
   node server.js
   ```

5. **Accede a la aplicación:**
   - Abre tu navegador y ve a `http://localhost:3000` (o el puerto configurado en server.js)

## Estructura del Proyecto
- `server.js`: Servidor principal con Express
- `public/`: Archivos estáticos (HTML, CSS, JS, imágenes)
- `.env`: Variables de entorno (no subir a repositorio)

## Tecnologías Utilizadas
- **Backend:** Node.js, Express
- **Base de Datos:** Supabase (PostgreSQL)
- **Frontend:** HTML, CSS, JavaScript
- **Autenticación:** Supabase Auth

## Notas Adicionales
- Asegúrate de que el puerto 3000 esté disponible.
- Para desarrollo, puedes usar `nodemon` para recarga automática: `npm install -g nodemon` y luego `nodemon server.js`.

---
