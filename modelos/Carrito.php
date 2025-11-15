// filepath: c:\Users\ASUS\Desktop\Gameprime\GamePrime-main\modelos\Carrito.php
<?php
require_once __DIR__ . '/../conexion/conexion.php';

class Carrito {
    private $db;

    public function __construct() {
        $this->db = Database::getInstance()->getConnection();
    }

    public function agregar($producto_id, $usuario_id) {
        // Asumiendo una tabla carrito con campos usuario_id, producto_id, cantidad
        $stmt = $this->db->prepare("INSERT INTO carrito (usuario_id, producto_id, cantidad) VALUES (?, ?, 1) ON CONFLICT (usuario_id, producto_id) DO UPDATE SET cantidad = cantidad + 1");
        $stmt->execute([$usuario_id, $producto_id]);
    }

    public function obtener($usuario_id) {
        $stmt = $this->db->prepare("SELECT p.*, c.cantidad FROM carrito c JOIN productos p ON c.producto_id = p.id WHERE c.usuario_id = ?");
        $stmt->execute([$usuario_id]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function limpiar($usuario_id) {
        $stmt = $this->db->prepare("DELETE FROM carrito WHERE usuario_id = ?");
        $stmt->execute([$usuario_id]);
    }
}
?>