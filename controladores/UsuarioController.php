// filepath: c:\Users\ASUS\Desktop\Gameprime\GamePrime-main\controladores\UsuarioController.php
<?php
require_once __DIR__ . '/../modelos/Usuario.php';

class UsuarioController {
    private $modelo;

    public function __construct() {
        $this->modelo = new Usuario();
    }

    public function login() {
        $email = $_POST['email'] ?? '';
        $password = $_POST['password'] ?? '';

        // Hardcoded admin for development
        if ($email === 'admin@gameprime.com' && $password === 'admin123') {
            $_SESSION['usuario_id'] = 1; // Dummy ID
            $_SESSION['rol'] = 'admin';
            header('Location: index.php?accion=inicio');
            return;
        }

        $usuario = $this->modelo->verificarUsuario($email);

        if ($usuario && password_verify($password, $usuario['password_hash'])) {
            $_SESSION['usuario_id'] = $usuario['id'];
            $_SESSION['rol'] = $usuario['rol']; // Guardar el rol en la sesión
            header('Location: index.php?accion=inicio');
        } else {
            $error = 'Usuario o contraseña incorrectos';
            include __DIR__ . '/../vistas/login.php';
        }
    }

    public function registro() {
        $nombre = $_POST['nombre'] ?? '';
        $email = $_POST['email'] ?? '';
        $password = $_POST['password'] ?? '';
        $confirm_password = $_POST['confirm_password'] ?? '';

        if ($password !== $confirm_password) {
            $error = 'Las contraseñas no coinciden';
            include __DIR__ . '/../vistas/registro.php';
            return;
        }

        $password_hash = password_hash($password, PASSWORD_DEFAULT);

        if ($this->modelo->registrarUsuario($nombre, $email, $password_hash)) {
            $success = 'Registro exitoso. Ahora puedes iniciar sesión.';
            include __DIR__ . '/../vistas/login.php';
        } else {
            $error = 'Error al registrar usuario';
            include __DIR__ . '/../vistas/registro.php';
        }
    }
}
?>