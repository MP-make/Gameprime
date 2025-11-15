<?php
require_once 'conexion/conexion.php';

$db = Database::getInstance()->getConnection();

$nombre = 'Admin';
$email = 'admin@gameprime.com';
$password_hash = password_hash('admin123', PASSWORD_DEFAULT);
$rol = 'admin';

$stmt = $db->prepare("INSERT INTO usuarios (nombre, email, password_hash, rol) VALUES (?, ?, ?, ?)");
$stmt->execute([$nombre, $email, $password_hash, $rol]);

echo "Usuario admin creado exitosamente.\n";
echo "Email: admin@gameprime.com\n";
echo "Contraseña: admin123\n";
?>