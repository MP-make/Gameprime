// filepath: c:\Users\ASUS\Desktop\Gameprime\GamePrime-main\modelos\Producto.php
<?php
require_once __DIR__ . '/../conexion/conexion.php';

class Producto {
    private $db;

    public function __construct() {
        $this->db = Database::getInstance()->getConnection();
    }

    public function getById($id) {
        $stmt = $this->db->prepare("SELECT * FROM productos WHERE id = ?");
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function getAll() {
        $stmt = $this->db->query("SELECT * FROM productos ORDER BY id");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function crearProducto($datos) {
        $stmt = $this->db->prepare("INSERT INTO productos (titulo, categoria, precio, fecha_lanzamiento, descripcion_corta, descripcion, portada, video, imagen1, imagen2, imagen3, imagen4) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute(array_values($datos));
    }

    public function actualizarProducto($id, $datos) {
        $stmt = $this->db->prepare("UPDATE productos SET titulo = ?, categoria = ?, precio = ?, fecha_lanzamiento = ?, descripcion_corta = ?, descripcion = ?, portada = ?, video = ?, imagen1 = ?, imagen2 = ?, imagen3 = ?, imagen4 = ? WHERE id = ?");
        $datos[] = $id;
        $stmt->execute(array_values($datos));
    }

    public function eliminarProducto($id) {
        $stmt = $this->db->prepare("DELETE FROM productos WHERE id = ?");
        $stmt->execute([$id]);
    }
}
?>