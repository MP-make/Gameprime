// filepath: c:\Users\ASUS\Desktop\Gameprime\GamePrime-main\modelos\Usuario.php
<?php
require_once __DIR__ . '/../conexion/conexion.php';

class Usuario {
    private $db;

    public function __construct() {
        $this->db = Database::getInstance()->getConnection();
    }

    public function verificarUsuario($email) {
        $stmt = $this->db->prepare("SELECT id, password_hash FROM usuarios WHERE email = ?");
        $stmt->execute([$email]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function registrarUsuario($nombre, $email, $password_hash) {
        $stmt = $this->db->prepare("INSERT INTO usuarios (nombre, email, password_hash) VALUES (?, ?, ?)");
        return $stmt->execute([$nombre, $email, $password_hash]);
    }
}
?>