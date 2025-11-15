// filepath: c:\Users\ASUS\Desktop\Gameprime\GamePrime-main\vistas\admin\productos\formulario.php
<?php
// Vista para crear/editar producto
// $producto es pasado desde el controlador (solo en modo editar)
$modo = isset($producto) ? 'Editar' : 'Crear';
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Panel Admin - <?php echo $modo; ?> Producto</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../../../admi.css">
</head>
<body>
    <header class="header">
        <div class="logo">
            <a href="../../../index.php">
                <img src="../../../imagenes/logo.png" alt="Logo" class="logo-img">
            </a>
        </div>
        <nav>
            <ul class="nav-links">
                <li><a href="../../../index.php?accion=adminProductos">Productos</a></li>
                <li><a href="../../../index.php?accion=adminUsuarios">Usuarios</a></li>
                <li><a href="../../../index.php?accion=adminReportes">Reportes</a></li>
                <li><a href="../../../index.php?accion=inicio">Volver a Tienda</a></li>
            </ul>
            <div class="hamburger" onclick="toggleMenu()">
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
            </div>
        </nav>
    </header>

    <main class="admin-container">
        <h1><?php echo $modo; ?> Producto</h1>
        <form action="" method="POST" class="producto-form">
            <label for="titulo">Título:</label>
            <input type="text" id="titulo" name="titulo" value="<?php echo htmlspecialchars($producto['titulo'] ?? ''); ?>" required>

            <label for="categoria">Categoría:</label>
            <input type="text" id="categoria" name="categoria" value="<?php echo htmlspecialchars($producto['categoria'] ?? ''); ?>" required>

            <label for="precio">Precio:</label>
            <input type="number" id="precio" name="precio" step="0.01" value="<?php echo htmlspecialchars($producto['precio'] ?? ''); ?>" required>

            <label for="fecha_lanzamiento">Fecha de Lanzamiento:</label>
            <input type="date" id="fecha_lanzamiento" name="fecha_lanzamiento" value="<?php echo htmlspecialchars($producto['fecha_lanzamiento'] ?? ''); ?>" required>

            <label for="descripcion_corta">Descripción Corta:</label>
            <textarea id="descripcion_corta" name="descripcion_corta" required><?php echo htmlspecialchars($producto['descripcion_corta'] ?? ''); ?></textarea>

            <label for="descripcion">Descripción:</label>
            <textarea id="descripcion" name="descripcion" required><?php echo htmlspecialchars($producto['descripcion'] ?? ''); ?></textarea>

            <label for="portada">Portada (imagen):</label>
            <input type="text" id="portada" name="portada" value="<?php echo htmlspecialchars($producto['portada'] ?? ''); ?>" required>

            <label for="video">Video:</label>
            <input type="text" id="video" name="video" value="<?php echo htmlspecialchars($producto['video'] ?? ''); ?>">

            <label for="imagen1">Imagen 1:</label>
            <input type="text" id="imagen1" name="imagen1" value="<?php echo htmlspecialchars($producto['imagen1'] ?? ''); ?>">

            <label for="imagen2">Imagen 2:</label>
            <input type="text" id="imagen2" name="imagen2" value="<?php echo htmlspecialchars($producto['imagen2'] ?? ''); ?>">

            <label for="imagen3">Imagen 3:</label>
            <input type="text" id="imagen3" name="imagen3" value="<?php echo htmlspecialchars($producto['imagen3'] ?? ''); ?>">

            <label for="imagen4">Imagen 4:</label>
            <input type="text" id="imagen4" name="imagen4" value="<?php echo htmlspecialchars($producto['imagen4'] ?? ''); ?>">

            <button type="submit"><?php echo $modo; ?> Producto</button>
        </form>
        <a href="../../../index.php?accion=adminProductos" class="btn-volver">Volver a Lista</a>
    </main>

    <footer class="pie-pagina">
        <div class="grupo-1">
            <div class="box">
                <figure>
                    <a href="../../../index.php?accion=reclamaciones">
                        <img src="../../../imagenes/libro_de_reclamaciones.png" alt="libro de reclamaciones">
                    </a>
                </figure>
            </div>
            <div class="box">
                <h2>SOBRE NOSOTROS</h2>
                <p>Nuestra idea nace de la experiencia propia al comprar videojuegos, garantizando confianza porque hemos estado en tu lugar.</p>
                <p>Fundada en 2024, nos comprometemos a ofrecer siempre las mejores ofertas.</p>
            </div>
            <div class="box">
                <h2>SIGUENOS</h2>
                <div class="red-social">
                    <a href="https://www.facebook.com/?locale=es_LA" class="fa fa-facebook"></a>
                    <a href="https://www.instagram.com/" class="fa fa-instagram"></a>
                    <a href="https://x.com/?lang=es" class="fa fa-twitter"></a>
                    <a href="https://www.youtube.com/" class="fa fa-youtube"></a>
                </div>
            </div>
        </div>
        <div class="grupo-2">
            <small>&copy; 2024 <b>GAME PRIME</b> - Todos los Derechos Reservados.</small>
        </div>
    </footer>

    <script src="../../../script.js"></script>
</body>
</html>