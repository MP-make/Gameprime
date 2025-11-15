// filepath: c:\Users\ASUS\Desktop\Gameprime\GamePrime-main\vistas\login.php
<?php
$error = $error ?? '';
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Iniciar Sesión - GamePrime</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="inicio.css">
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

    <main class="login-container">
        <div class="login-form">
            <h1>Iniciar Sesión</h1>
            <?php if ($error): ?>
                <p class="error-message"><?php echo htmlspecialchars($error); ?></p>
            <?php endif; ?>
            <form action="index.php?accion=procesarLogin" method="POST">
                <label for="email">Correo Electrónico:</label>
                <input type="email" id="email" name="email" required>

                <label for="password">Contraseña:</label>
                <input type="password" id="password" name="password" required>

                <button type="submit">Iniciar Sesión</button>
            </form>
            <p>¿No tienes cuenta? <a href="index.php?accion=registro">Regístrate aquí</a></p>
        </div>
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