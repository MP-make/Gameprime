// filepath: c:\Users\ASUS\Desktop\Gameprime\GamePrime-main\controladores\PedidoController.php
<?php
require_once __DIR__ . '/../modelos/Orden.php';
require_once __DIR__ . '/../modelos/ItemOrden.php';
require_once __DIR__ . '/../modelos/Carrito.php';

class PedidoController {
    private $modeloOrden;
    private $modeloItemOrden;
    private $modeloCarrito;

    public function __construct() {
        $this->modeloOrden = new Orden();
        $this->modeloItemOrden = new ItemOrden();
        $this->modeloCarrito = new Carrito();
    }

    public function crear() {
        if (!isset($_SESSION['usuario_id'])) {
            header('Location: index.php?accion=login&error=necesitas_login');
            exit;
        }

        $usuario_id = $_SESSION['usuario_id'];
        $items = $this->modeloCarrito->obtener($usuario_id);

        if (empty($items)) {
            header('Location: index.php?accion=verCarrito');
            exit;
        }

        $total = 0;
        foreach ($items as $item) {
            $total += $item['precio'] * $item['cantidad'];
        }

        $orden_id = $this->modeloOrden->crear($usuario_id, $total, 'PENDIENTE');

        foreach ($items as $item) {
            $this->modeloItemOrden->agregar($orden_id, $item['id'], $item['cantidad'], $item['precio']);
        }

        $this->modeloCarrito->limpiar($usuario_id);

        $this->procesarPago($orden_id, $total);
    }

    public function procesarPago($orden_id, $total) {
        // Placeholder para integración con MercadoPago
        // Crear preferencia de pago
        // Enviar total y referencia_externa = $orden_id
        // Obtener init_point
        // header('Location: ' . $init_point);

        // Simulación: Redirigir a retornoPago con éxito
        header('Location: index.php?accion=retornoPago&estado=exito&orden_id=' . $orden_id);
    }

    public function mostrarResultado() {
        $estado = $_GET['estado'] ?? 'fallo';
        $orden_id = $_GET['orden_id'] ?? null;

        if ($estado === 'exito') {
            include __DIR__ . '/../vistas/pagoExito.php';
        } else {
            include __DIR__ . '/../vistas/pagoFallo.php';
        }
    }
}
?>