<?php
require_once "conexion.php";

// Intentar acceder al REST API
$result = supabaseRequest("", "GET");

if (isset($result['error'])) {
    echo "❌ Error de conexión: {$result['error']}";
} elseif (in_array($result['status'], [200, 404])) {
    echo "✅ Conexión HTTP con Supabase exitosa";
    
} else {
    echo "⚠️ <b>Respuesta inesperada</b><br>";
    echo "📡 Código HTTP: {$result['status']}<br>";
    echo "<pre>" . htmlspecialchars(print_r($result['data'], true)) . "</pre>";
}
?>
