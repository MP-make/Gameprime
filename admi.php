<?php
require_once __DIR__ . '/conexion.php'; // Conecta a Supabase

header("Content-Type: application/json");

// === LISTAR PRODUCTOS ===
if ($_SERVER['REQUEST_METHOD'] === 'GET' && !isset($_GET['type'])) {
    try {
        $stmt = $conn->query("SELECT * FROM productos ORDER BY id");
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    } catch (PDOException $e) {
        echo json_encode(["status" => "error", "message" => $e->getMessage()]);
    }
    exit;
}

// === AGREGAR PRODUCTO ===
if ($_SERVER['REQUEST_METHOD'] === 'POST' && ($_POST['action'] ?? '') === 'add_producto') {
    $titulo = $_POST['titulo'] ?? '';
    $categoria = $_POST['categoria'] ?? '';
    $precio = floatval($_POST['precio'] ?? 0);
    $fecha = $_POST['fecha_lanzamiento'] ?? date('Y-m-d');
    $descuento = floatval($_POST['descuento'] ?? 0);

    try {
        $stmt = $conn->prepare("
            INSERT INTO productos (titulo, categoria, precio, fecha_lanzamiento, descuento)
            VALUES (:titulo, :categoria, :precio, :fecha, :descuento)
        ");
        $stmt->execute([
            ':titulo' => $titulo,
            ':categoria' => $categoria,
            ':precio' => $precio,
            ':fecha' => $fecha,
            ':descuento' => $descuento
        ]);
        echo json_encode(["status" => "success"]);
    } catch (PDOException $e) {
        echo json_encode(["status" => "error", "message" => $e->getMessage()]);
    }
    exit;
}

// === ELIMINAR PRODUCTO ===
if ($_SERVER['REQUEST_METHOD'] === 'POST' && ($_POST['action'] ?? '') === 'delete_producto') {
    $id = intval($_POST['id'] ?? 0);
    try {
        $stmt = $conn->prepare("DELETE FROM productos WHERE id = :id");
        $stmt->execute([':id' => $id]);
        echo json_encode(["status" => "success"]);
    } catch (PDOException $e) {
        echo json_encode(["status" => "error", "message" => $e->getMessage()]);
    }
    exit;
}

echo json_encode(["status" => "error", "message" => "Acción no reconocida"]);
?>
