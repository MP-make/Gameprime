// filepath: c:\Users\ASUS\Desktop\Gameprime\GamePrime-main\index.php
<?php
session_start();

// Incluir clases necesarias
require_once 'conexion/conexion.php';
require_once 'modelos/Producto.php';
require_once 'modelos/Carrito.php';
require_once 'modelos/Usuario.php';
require_once 'modelos/Orden.php';
require_once 'modelos/ItemOrden.php';
require_once 'modelos/Pago.php';
require_once 'controladores/ProductoController.php';
require_once 'controladores/CarritoController.php';
require_once 'controladores/UsuarioController.php';
require_once 'controladores/PedidoController.php';
require_once 'controladores/PagoController.php';
require_once 'controladores/AdminBaseController.php';
require_once 'controladores/AdminProductoController.php';

// Routing
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $accion = $_POST['accion'] ?? '';
    switch ($accion) {
        case 'agregarAlCarrito':
            $controller = new CarritoController();
            $controller->agregarAlCarrito();
            break;
        case 'procesarLogin':
            $controller = new UsuarioController();
            $controller->login();
            break;
        case 'procesarRegistro':
            $controller = new UsuarioController();
            $controller->registro();
            break;
        case 'crearOrden':
            $controller = new PedidoController();
            $controller->crear();
            break;
        // Agregar más casos POST si es necesario
    }
} else {
    // GET routing
    $accion = $_GET['accion'] ?? 'inicio';
    switch ($accion) {
        case 'verProducto':
            $controller = new ProductoController();
            $controller->verProducto();
            break;
        case 'verCarrito':
            $controller = new CarritoController();
            $controller->mostrarCarrito();
            break;
        case 'login':
            include 'vistas/login.php';
            break;
        case 'registro':
            include 'vistas/registro.php';
            break;
        case 'webhookPago':
            $controller = new PagoController();
            $controller->confirmar();
            break;
        case 'retornoPago':
            $controller = new PedidoController();
            $controller->mostrarResultado();
            break;
        case 'adminProductos':
            $controller = new AdminProductoController();
            $controller->listar();
            break;
        case 'adminCrearProducto':
            $controller = new AdminProductoController();
            $controller->crear();
            break;
        case 'adminEditarProducto':
            $controller = new AdminProductoController();
            $controller->editar();
            break;
        case 'adminEliminarProducto':
            $controller = new AdminProductoController();
            $controller->eliminar();
            break;
        case 'inicio':
        default:
            include 'indexinicio.html';
            break;
    }
}
?>