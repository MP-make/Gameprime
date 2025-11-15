// filepath: c:\Users\ASUS\Desktop\Gameprime\GamePrime-main\modelos\ItemOrden.php
<?php
require_once __DIR__ . '/../conexion/conexion.php';

class ItemOrden {
    private $db;

    public function __construct() {
        $this->db = Database::getInstance()->getConnection();
    }

    public function agregar($orden_id, $producto_id, $cantidad, $precio) {
        $stmt = $this->db->prepare("INSERT INTO item_orden (orden_id, producto_id, cantidad, precio) VALUES (?, ?, ?, ?)");
        $stmt->execute([$orden_id, $producto_id, $cantidad, $precio]);
    }
}
?>