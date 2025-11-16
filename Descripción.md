# GamePrime - Tienda de Videojuegos en Línea

## Descripción General
GamePrime es una aplicación web para una tienda en línea de videojuegos. Permite a los usuarios navegar productos, registrarse, iniciar sesión, agregar productos al carrito y gestionar pedidos. Incluye un panel de administración para gestionar productos. Originalmente desarrollado con PHP y MySQL, ha sido convertido a una versión completamente client-side usando JavaScript y Supabase para la base de datos y autenticación.

## Tecnologías Utilizadas
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Supabase (Base de datos PostgreSQL, autenticación, almacenamiento)
- **Librerías**: Supabase JS SDK
- **Servidor Local**: Se ejecuta en un servidor web local (ej. Apache con XAMPP) para archivos estáticos
- **Version Anterior**: PHP, MySQL (archivos legacy incluidos)

## Estructura del Proyecto
```
GamePrime-main/
├── indexinicio.html          # Página principal (inicio)
├── login.html                # Página de inicio de sesión
├── registro.html             # Página de registro
├── carrito.html              # Página del carrito de compras
├── producto.html             # Página de detalles del producto
├── admi.html                 # Panel de administración
├── ofertas.html              # Página de ofertas
├── contactanos.html          # Página de contacto
├── reclamaciones.html        # Página de libro de reclamaciones
├── usuario.html              # Página de perfil de usuario
├── index.html                # Página alternativa de inicio
├── index.php                 # Versión PHP de inicio (legacy)
├── admi.php                  # Versión PHP de admin (legacy)
├── insert_admin.php          # Script para insertar admin en BD (legacy)
├── sample_data.sql           # Datos de ejemplo para la tabla productos
├── inicio.css                # Estilos para páginas de login/registro
├── styles.css                # Estilos principales
├── stylesP.css               # Estilos para página de producto
├── admi.css                  # Estilos para panel de admin
├── script.js                 # JavaScript general (menú hamburguesa, etc.)
├── login.js                  # JavaScript para login (legacy)
├── admi.js                   # JavaScript para admin
├── audios/                   # Archivos de audio (música de juegos)
├── imagenes/                 # Imágenes (portadas, banners, logos)
│   └── PROYECTO BASE/        # Archivos del proyecto base
├── video/                    # Videos de trailers de juegos
├── conexion/                 # Archivos de conexión a BD (legacy)
│   ├── conexion.php
│   └── test_db.php
├── controladores/            # Controladores PHP (legacy)
│   ├── AdminBaseController.php
│   ├── AdminProductoController.php
│   ├── CarritoController.php
│   ├── PagoController.php
│   ├── PedidoController.php
│   ├── ProductoController.php
│   └── UsuarioController.php
├── modelos/                  # Modelos PHP (legacy)
│   ├── Carrito.php
│   ├── ItemOrden.php
│   ├── Orden.php
│   ├── Pago.php
│   ├── Producto.php
│   └── Usuario.php
├── vistas/                   # Vistas PHP (legacy)
│   ├── admin/
│   │   ├── productos/
│   │   │   ├── formulario.php
│   │   │   └── lista.php
│   ├── carrito.php
│   ├── login.php
│   ├── pagoExito.php
│   ├── pagoFallo.php
│   ├── producto.php
│   └── registro.php
└── README.md                 # Archivo README original
```

## Funcionalidades Principales
- **Navegación de Productos**: Muestra productos en la página principal con imágenes, títulos, descripciones y precios.
- **Detalles de Producto**: Página individual con video, imágenes adicionales y tabla de información.
- **Autenticación**: Registro e inicio de sesión usando Supabase Auth. Soporta roles (cliente, admin).
- **Carrito de Compras**: Agregar productos al carrito usando localStorage (simulación client-side).
- **Panel de Administración**: Para usuarios admin, gestionar productos (agregar, editar, eliminar) usando Supabase.
- **Ofertas y Contacto**: Páginas estáticas para ofertas y contacto.
- **Libro de Reclamaciones**: Página para quejas o sugerencias.

## Instalación y Configuración
### Prerrequisitos
- Navegador web moderno (Chrome, Firefox, etc.)
- Servidor web local (recomendado: XAMPP para Windows, incluye Apache)
- Cuenta en Supabase (gratuita): https://supabase.com

### Pasos de Instalación
1. **Clona el Repositorio**:
   ```
   git clone https://github.com/MP-make/Gameprime.git
   cd Gameprime
   ```

2. **Configura Supabase**:
   - Crea un proyecto en Supabase.
   - Crea una tabla `productos` con las siguientes columnas (puedes usar el SQL en `sample_data.sql` como referencia):
     - id (serial, primary key)
     - titulo (text)
     - categoria (text)
     - precio (numeric)
     - fecha_lanzamiento (date)
     - descripcion_corta (text)
     - descripcion (text)
     - portada (text)  # Nombre del archivo de imagen
     - video (text)    # Nombre del archivo de video
     - imagen1, imagen2, imagen3, imagen4 (text)  # Nombres de archivos de imágenes adicionales
   - Inserta datos de ejemplo ejecutando `sample_data.sql` en el SQL Editor de Supabase.
   - Habilita autenticación (Auth) en Supabase.
   - Obtén tu URL y clave anónima (anon key) desde el dashboard de Supabase.

3. **Actualiza las Credenciales**:
   - En los archivos HTML/JS (indexinicio.html, login.html, registro.html, carrito.html, producto.html, admi.html), actualiza las variables `supabaseUrl` y `supabaseKey` con tus credenciales de Supabase.
     - supabaseUrl: 'https://tu-proyecto.supabase.co'
     - supabaseKey: 'tu-anon-key'

4. **Ejecuta el Servidor Local**:
   - Coloca la carpeta `GamePrime-main` en el directorio `htdocs` de XAMPP (o equivalente).
   - Inicia Apache en XAMPP.
   - Abre tu navegador y ve a `http://localhost/GamePrime-main/indexinicio.html` (ajusta la ruta según tu configuración).

5. **Credenciales de Prueba**:
   - Usuario Admin: email `admin@gameprime.com`, contraseña `admin123` (regístralo primero en Supabase si no existe).
   - Para clientes: Regístrate con cualquier email válido.

## Uso
- **Página Principal**: `http://localhost/GamePrime-main/indexinicio.html` - Navega productos, agrega al carrito.
- **Login**: `http://localhost/GamePrime-main/login.html` - Inicia sesión.
- **Registro**: `http://localhost/GamePrime-main/registro.html` - Crea una cuenta.
- **Carrito**: `http://localhost/GamePrime-main/carrito.html` - Ve y gestiona tu carrito.
- **Producto**: `http://localhost/GamePrime-main/producto.html?id=1` - Detalles de un producto (reemplaza 1 con el ID real).
- **Admin**: `http://localhost/GamePrime-main/admi.html` - Panel para admins (requiere login como admin).

## Notas Importantes
- **Sesiones**: Las sesiones se simulan con localStorage (no seguras como en PHP). Para producción, considera un backend seguro.
- **Pago**: El checkout está simulado (alert). Integra con MercadoPago o similar para pagos reales.
- **Migración**: El proyecto fue migrado de PHP/MySQL a JS/Supabase para simplicidad y evitar dependencias de servidor. Los archivos PHP son legacy y no se usan en la versión actual.
- **Imágenes/Videos**: Asegúrate de que los archivos en `imagenes/` y `video/` estén accesibles vía el servidor web.
- **Errores**: Si hay problemas con Supabase, verifica la consola del navegador para errores de API.

## Contribución
- Reporta issues en GitHub.
- Haz fork y pull requests para mejoras.
- Sigue buenas prácticas de código (comentarios, indentación).

## Licencia
Este proyecto es para fines educativos. No incluye licencia específica; úsalo bajo tu propio riesgo.

## Contacto
Para preguntas, contacta al desarrollador vía GitHub: https://github.com/MP-make/Gameprime

---
*Última actualización: Noviembre 2025*