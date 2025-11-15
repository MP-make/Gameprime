// filepath: c:\Users\ASUS\Desktop\Gameprime\GamePrime-main\vistas\admin\productos\lista.php
<?php
// Vista para listar productos en el panel de admin
// $productos es pasado desde el controlador
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Panel Admin - Productos</title>
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
        <h1>Gestión de Productos</h1>
        <a href="../../../index.php?accion=adminCrearProducto" class="btn-agregar">Agregar Producto</a>
        <table class="productos-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Título</th>
                    <th>Categoría</th>
                    <th>Precio</th>
                    <th>Fecha Lanzamiento</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($productos as $producto): ?>
                    <tr>
                        <td><?php echo htmlspecialchars($producto['id']); ?></td>
                        <td><?php echo htmlspecialchars($producto['titulo']); ?></td>
                        <td><?php echo htmlspecialchars($producto['categoria']); ?></td>
                        <td>S/<?php echo htmlspecialchars($producto['precio']); ?></td>
                        <td><?php echo htmlspecialchars($producto['fecha_lanzamiento']); ?></td>
                        <td>
                            <a href="../../../index.php?accion=adminEditarProducto&id=<?php echo $producto['id']; ?>" class="btn-editar">Editar</a>
                            <a href="../../../index.php?accion=adminEliminarProducto&id=<?php echo $producto['id']; ?>" class="btn-eliminar" onclick="return confirm('¿Estás seguro de eliminar este producto?')">Eliminar</a>
                        </td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
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