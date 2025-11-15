// filepath: c:\Users\ASUS\Desktop\Gameprime\GamePrime-main\vistas\carrito.php
<?php
$items = $items ?? [];
$total = $total ?? 0;
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Carrito de Compras - GamePrime</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header class="header">
        <div class="logo">
            <a href="index.php">
                <img src="imagenes/logo.png" alt="Logo" class="logo-img">
            </a>
        </div>
        <nav>
            <ul class="nav-links">
                <li><a href="index.php?accion=ofertas">Ofertas</a></li>
                <li><a href="index.php?accion=contacto">Contacto</a></li>
                <li><a href="index.php?accion=verCarrito">Carrito</a></li>
            </ul>
            <div class="hamburger" onclick="toggleMenu()">
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
            </div>
        </nav>
    </header>

    <main class="carrito-container">
        <h1>Carrito de Compras</h1>
        <?php if (empty($items)): ?>
            <p>Tu carrito está vacío.</p>
        <?php else: ?>
            <div class="carrito-items">
                <?php foreach ($items as $item): ?>
                    <div class="carrito-item">
                        <img src="imagenes/<?php echo htmlspecialchars($item['portada'] ?? 'producto1.jpg'); ?>" alt="<?php echo htmlspecialchars($item['titulo']); ?>">
                        <div class="item-details">
                            <h3><?php echo htmlspecialchars($item['titulo']); ?></h3>
                            <p>Precio: S/<?php echo htmlspecialchars($item['precio']); ?></p>
                            <p>Cantidad: <?php echo htmlspecialchars($item['cantidad']); ?></p>
                            <p>Subtotal: S/<?php echo htmlspecialchars($item['precio'] * $item['cantidad']); ?></p>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
            <div class="carrito-total">
                <h2>Total: S/<?php echo htmlspecialchars($total); ?></h2>
                <form action="index.php" method="post">
                    <input type="hidden" name="accion" value="crearOrden">
                    <button type="submit" class="btn-pago">Proceder al Pago</button>
                </form>
            </div>
        <?php endif; ?>
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

    <script src="script.js"></script>
</body>
</html>