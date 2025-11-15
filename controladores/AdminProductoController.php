// filepath: c:\Users\ASUS\Desktop\Gameprime\GamePrime-main\controladores\AdminProductoController.php
<?php
require_once 'AdminBaseController.php';
require_once __DIR__ . '/../modelos/Producto.php'; 

class AdminProductoController extends AdminBaseController {

    private $modelo;

    public function __construct() {
        parent::__construct(); // ¡Importante! Ejecuta el chequeo de seguridad
        $this->modelo = new Producto(); // Asumimos que el modelo ya existe
    }

    // LEER (READ) - Mostrar todos los productos
    public function listar() {
        $productos = $this->modelo->getAll(); // Función que ya debe existir
        // Cargar la vista de la tabla de productos
        require __DIR__ . '/../vistas/admin/productos/lista.php';
    }

    // CREAR (CREATE) - Mostrar formulario y procesar
    public function crear() {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            // 1. Procesar formulario
            $datos = [
                'titulo' => $_POST['titulo'],
                'categoria' => $_POST['categoria'],
                'precio' => $_POST['precio'],
                'fecha_lanzamiento' => $_POST['fecha_lanzamiento'],
                'descripcion_corta' => $_POST['descripcion_corta'],
                'descripcion' => $_POST['descripcion'],
                'portada' => $_POST['portada'],
                'video' => $_POST['video'],
                'imagen1' => $_POST['imagen1'],
                'imagen2' => $_POST['imagen2'],
                'imagen3' => $_POST['imagen3'],
                'imagen4' => $_POST['imagen4']
                // ... otros campos
            ];
            $this->modelo->crearProducto($datos); // Nueva función en el modelo
            header('Location: index.php?accion=adminProductos');
        } else {
            // 2. Mostrar formulario vacío
            require __DIR__ . '/../vistas/admin/productos/formulario.php';
        }
    }

    // ACTUALIZAR (UPDATE) - Mostrar formulario con datos y procesar
    public function editar() {
        $id = $_GET['id'];

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            // 1. Procesar formulario
            $datos = [
                'titulo' => $_POST['titulo'],
                'categoria' => $_POST['categoria'],
                'precio' => $_POST['precio'],
                'fecha_lanzamiento' => $_POST['fecha_lanzamiento'],
                'descripcion_corta' => $_POST['descripcion_corta'],
                'descripcion' => $_POST['descripcion'],
                'portada' => $_POST['portada'],
                'video' => $_POST['video'],
                'imagen1' => $_POST['imagen1'],
                'imagen2' => $_POST['imagen2'],
                'imagen3' => $_POST['imagen3'],
                'imagen4' => $_POST['imagen4']
                // ... otros campos
            ];
            $this->modelo->actualizarProducto($id, $datos); // Nueva función
            header('Location: index.php?accion=adminProductos');
        } else {
            // 2. Mostrar formulario con datos existentes
            $producto = $this->modelo->getById($id); // Función que ya existe
            require __DIR__ . '/../vistas/admin/productos/formulario.php';
        }
    }

    // BORRAR (DELETE)
    public function eliminar() {
        $id = $_GET['id'];
        $this->modelo->eliminarProducto($id); // Nueva función
        header('Location: index.php?accion=adminProductos');
    }
}
?>