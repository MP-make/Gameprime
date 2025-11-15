// filepath: c:\Users\ASUS\Desktop\Gameprime\GamePrime-main\controladores\ProductoController.php
<?php
require_once __DIR__ . '/../modelos/Producto.php';

class ProductoController {
    private $modelo;

    public function __construct() {
        $this->modelo = new Producto();
    }

    public function verProducto() {
        $id = $_GET['id'] ?? 1;
        $producto = $this->modelo->getById($id);
        if (!$producto) {
            // Producto no encontrado, redirigir o mostrar error
            echo "Producto no encontrado";
            return;
        }
        // Cargar la vista
        include __DIR__ . '/../vistas/producto.php';
    }

    public function listarProductos() {
        $productos = $this->modelo->getAll();
        include __DIR__ . '/../vistas/lista_productos.php'; // Si es necesario
    }
}
?>