// filepath: c:\Users\ASUS\Desktop\Gameprime\GamePrime-main\controladores\AdminBaseController.php
<?php
class AdminBaseController {

    public function __construct() {
        // 1. Verificar si hay sesión
        if (!isset($_SESSION['usuario_id'])) {
            header('Location: index.php?accion=login');
            exit;
        }

        // 2. Verificar si es ADMIN
        if (!isset($_SESSION['rol']) || $_SESSION['rol'] !== 'admin') {
            // Si no es admin, lo sacamos.
            echo "Acceso Denegado. No tienes permisos de administrador.";
            exit; 
        }

        // Si es admin, puede continuar...
    }
}
?>