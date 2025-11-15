<?php
// conexion.php - Patrón Singleton para la conexión a la base de datos

class Database {
    private static $instance = null;
    private $conn;

    private function __construct() {
        // Cargar variables del archivo .env
        $this->loadEnv(__DIR__ . '/.env');

        // Variables de entorno para la base de datos
        $DB_HOST = $_ENV['DB_HOST'] ?? null;
        $DB_PORT = $_ENV['DB_PORT'] ?? null;
        $DB_NAME = $_ENV['DB_NAME'] ?? null;
        $DB_USER = $_ENV['DB_USER'] ?? null;
        $DB_PASSWORD = $_ENV['DB_PASSWORD'] ?? null;

        // Verificar que todas las variables estén definidas
        if (!$DB_HOST || !$DB_PORT || !$DB_NAME || !$DB_USER) {
            die(json_encode(["status" => "error", "message" => "Variables de entorno de la base de datos no definidas correctamente"]));
        }

        try {
            $dsn = "pgsql:host=$DB_HOST;port=$DB_PORT;dbname=$DB_NAME";
            $this->conn = new PDO($dsn, $DB_USER, $DB_PASSWORD);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            die(json_encode(["status" => "error", "message" => "Error de conexión a la base de datos: " . $e->getMessage()]));
        }
    }

    private function loadEnv($path) {
        if (!file_exists($path)) {
            die(json_encode(["status" => "error", "message" => "No se encontró el archivo .env"]));
        }

        $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        foreach ($lines as $line) {
            if (strpos(trim($line), '#') === 0) continue;
            list($name, $value) = explode('=', $line, 2);
            $_ENV[trim($name)] = trim($value);
        }
    }

    public static function getInstance() {
        if (self::$instance == null) {
            self::$instance = new Database();
        }
        return self::$instance;
    }

    public function getConnection() {
        return $this->conn;
    }
}
?>
