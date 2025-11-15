// filepath: c:\Users\ASUS\Desktop\Gameprime\GamePrime-main\vistas\producto.php
<?php
// Vista para mostrar un producto individual
// $producto es pasado desde el controlador
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo htmlspecialchars($producto['titulo']); ?> - Detalles del Producto</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="stylesP.css">
    <script src="https://kit.fontawesome.com/f4c52f4663.js" crossorigin="anonymous"></script>
</head>
<body onload="iniciarPagina()">
    <header class="header"> 
        <div class="logo">
            <a href="index.php">
                <img src="imagenes/logo.png" alt="logo" class="logo">
            </a> 
        </div>
        <nav> 
            <ul class="nav-links">
                <li><a href="index.php?accion=ofertas">Ofertas</a></li>
                <li><a href="index.php?accion=contacto">Contacto</a></li>
                <li><a href="index.php?accion=carrito">Carrito</a></li>
            </ul>
            <div class="hamburger" onclick="toggleMenu()">
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
            </div>
        </nav>
    </header>
    <main class="fondo-1">
        <section class="product-details">
            <video controls>
                <source src="video/<?php echo htmlspecialchars($producto['video']); ?>" type="video/mp4">
            </video>
            <div class="related-images">
                <!-- Asumiendo que hay campos para imágenes relacionadas -->
                <img src="imagenes/<?php echo htmlspecialchars($producto['imagen1']); ?>" alt="<?php echo htmlspecialchars($producto['titulo']); ?> 1">
                <img src="imagenes/<?php echo htmlspecialchars($producto['imagen2']); ?>" alt="<?php echo htmlspecialchars($producto['titulo']); ?> 2">
                <img src="imagenes/<?php echo htmlspecialchars($producto['imagen3']); ?>" alt="<?php echo htmlspecialchars($producto['titulo']); ?> 3">
                <img src="imagenes/<?php echo htmlspecialchars($producto['imagen4']); ?>" alt="<?php echo htmlspecialchars($producto['titulo']); ?> 4">
            </div>
            <div class="product-description">
                <table>
                    <tr>
                        <th>Descripción</th>
                        <th>Contenido</th>
                    </tr>
                    <tr>
                        <td>Producto</td>
                        <td><?php echo htmlspecialchars($producto['titulo']); ?></td>
                    </tr>
                    <tr>
                        <td>Categoría</td>
                        <td><?php echo htmlspecialchars($producto['categoria']); ?></td>
                    </tr>
                    <tr>
                        <td>Descripción</td>
                        <td><?php echo htmlspecialchars($producto['descripcion']); ?></td>
                    </tr>
                    <!-- Agregar más campos según la DB -->
                </table>
            </div>
        </section>
        
        <aside class="product-info">
            <img src="imagenes/<?php echo htmlspecialchars($producto['portada']); ?>" alt="Portada <?php echo htmlspecialchars($producto['titulo']); ?>">
            <p>DESCRIPCIÓN DEL PRODUCTO:</p>
            <p><?php echo htmlspecialchars($producto['descripcion_corta']); ?></p>
            <p>FECHA DE LANZAMIENTO:</p>
            <p><?php echo htmlspecialchars($producto['fecha_lanzamiento']); ?></p>
            <p>PRECIO:</p>
            <p>S/<?php echo htmlspecialchars($producto['precio']); ?> PEN</p>
            <form action="index.php" method="post">
                <input type="hidden" name="accion" value="agregarAlCarrito">
                <input type="hidden" name="id" value="<?php echo $producto['id']; ?>">
                <button type="submit">Comprar <?php echo htmlspecialchars($producto['titulo']); ?></button>
            </form>
        </aside>
        
    </main>
    <footer class="pie-pagina">
        <div class="grupo-1">
            <div class="box">
                <figure>
                    <a href="index.php?accion=reclamaciones">
                        <img src="imagenes/libro_de_reclamaciones.png" alt="libro de reclamaciones">
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
</body>
</html>

<script src="script.js"></script>