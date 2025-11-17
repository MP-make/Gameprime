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

Instrucciones para el Desarrollador: Migración a Backend con Node.js/Express
Vamos a realizar un cambio fundamental en la arquitectura del proyecto GamePrime.

El análisis del README.md describe una arquitectura client-side, donde los archivos HTML y su JavaScript (admi.js, script.js, etc.) llaman directamente a Supabase. Esa arquitectura ya no se usará.

La nueva arquitectura correcta debe separar el Frontend del Backend, usando Node.js/Express como nuestro servidor.

Este es el único modelo que debemos seguir:

1. Frontend (Lo que ve el cliente)
HTML: La estructura de la página (indexinicio.html, carrito.html, etc.).

CSS: El maquillaje y los estilos.

JavaScript (Frontend): La interactividad.

Mobiscroll: La librería que usamos para calendarios.

El JavaScript del frontend YA NO debe contener supabase.createClient() ni ninguna clave de Supabase. Su única función es hacer peticiones fetch a nuestro propio backend (ej. fetch('/api/productos')).

2. ⚙️ Backend (El "motor" en el servidor)
Aquí está el trabajo principal.

Node.js: Es el entorno que ejecutará nuestro server.js.

Express: Es el framework que usaremos en server.js para crear nuestra propia API (rutas).

dotenv: Lo usará el server.js para leer el archivo .env.

Lógica de Implementación:

Crearemos un server.js que use Express.

Este servidor será el ÚNICO que tenga las claves de Supabase (leídas desde .env).

Crearemos rutas (endpoints) para todo. Ejemplos:

GET /api/productos

GET /api/producto/:id

POST /api/login

POST /api/registro

POST /api/carrito/agregar (requerirá autenticación)

GET /api/admin/pedidos (requerirá rol de admin)

3. 📦 Base de Datos (La "memoria")
Supabase (Postgres): Nuestra base de datos.

Punto Clave: El frontend (navegador) NUNCA hablará con Supabase. Solo nuestro backend (Node.js/Express) tiene permiso para conectarse a la base de datos.

Ejemplo: Flujo de Login (Cómo debe ser)
Así debe funcionar el login en la nueva arquitectura:

Frontend: El usuario rellena login.html y pulsa "Entrar".

Frontend (JS): El login.js toma el email y la contraseña y hace un fetch a nuestro servidor:

JavaScript

fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
});
Backend (server.js): Nuestra ruta POST /api/login recibe la petición.

Backend (server.js): El servidor (y solo el servidor) usa sus claves de Supabase (del .env) para autenticar al usuario contra Supabase.

Backend (server.js): Supabase le responde al servidor.

Backend (server.js): El servidor crea una sesión o un token (JWT) y se lo envía como respuesta al frontend.

En resumen: toda la lógica de Supabase (y la lógica de negocio, como verificar precios o roles de admin) debe moverse de los archivos .js del cliente a las rutas de nuestro nuevo servidor Express.