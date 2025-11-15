// filepath: c:\Users\ASUS\Desktop\Gameprime\GamePrime-main\controladores\CarritoController.php
<?php
require_once __DIR__ . '/../modelos/Carrito.php';

class CarritoController {
    private $modelo;

    public function __construct() {
        $this->modelo = new Carrito();
    }

    public function agregarAlCarrito() {
        if (!isset($_SESSION['usuario_id'])) {
            header('Location: index.php?accion=login&error=necesita_login');
            exit;
        }
        $producto_id = $_POST['id'];
        $this->modelo->agregar($producto_id, $_SESSION['usuario_id']);
        header('Location: index.php?accion=verCarrito');
    }

    public function verCarrito() {
        if (!isset($_SESSION['usuario_id'])) {
            header('Location: index.php?accion=login');
            exit;
        }
        $productos = $this->modelo->obtener($_SESSION['usuario_id']);
        include __DIR__ . '/../vistas/carrito.php';
    }

    public function mostrarCarrito() {
        if (!isset($_SESSION['usuario_id'])) {
            header('Location: index.php?accion=login&error=necesitas_login');
            exit;
        }
        $usuario_id = $_SESSION['usuario_id'];
        $items = $this->modelo->obtener($usuario_id);
        $total = 0;
        foreach ($items as $item) {
            $total += $item['precio'] * $item['cantidad'];
        }
        include __DIR__ . '/../vistas/carrito.php';
    }
}
?>