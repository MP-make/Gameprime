// filepath: c:\Users\ASUS\Desktop\Gameprime\GamePrime-main\modelos\Pago.php
<?php
require_once __DIR__ . '/../conexion/conexion.php';

class Pago {
    private $db;

    public function __construct() {
        $this->db = Database::getInstance()->getConnection();
    }

    public function registrar($orden_id, $monto, $estado) {
        $stmt = $this->db->prepare("INSERT INTO pagos (orden_id, monto, estado, fecha) VALUES (?, ?, ?, NOW())");
        $stmt->execute([$orden_id, $monto, $estado]);
    }
}
?>