// filepath: c:\Users\ASUS\Desktop\Gameprime\GamePrime-main\modelos\Orden.php
<?php
require_once __DIR__ . '/../conexion/conexion.php';

class Orden {
    private $db;

    public function __construct() {
        $this->db = Database::getInstance()->getConnection();
    }

    public function crear($usuario_id, $total, $estado) {
        $stmt = $this->db->prepare("INSERT INTO ordenes (usuario_id, total, estado, fecha) VALUES (?, ?, ?, NOW())");
        $stmt->execute([$usuario_id, $total, $estado]);
        return $this->db->lastInsertId();
    }

    public function actualizarEstado($orden_id, $estado) {
        $stmt = $this->db->prepare("UPDATE ordenes SET estado = ? WHERE id = ?");
        $stmt->execute([$estado, $orden_id]);
    }

    public function obtenerPorId($orden_id) {
        $stmt = $this->db->prepare("SELECT * FROM ordenes WHERE id = ?");
        $stmt->execute([$orden_id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}
?>