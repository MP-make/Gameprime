// filepath: c:\Users\ASUS\Desktop\Gameprime\GamePrime-main\controladores\PagoController.php
<?php
require_once __DIR__ . '/../modelos/Orden.php';
require_once __DIR__ . '/../modelos/Pago.php';

class PagoController {
    private $modeloOrden;
    private $modeloPago;

    public function __construct() {
        $this->modeloOrden = new Orden();
        $this->modeloPago = new Pago();
    }

    public function confirmar() {
        // Recibir notificación POST del webhook de MercadoPago
        $input = file_get_contents('php://input');
        $data = json_decode($input, true);

        // Verificar autenticidad (placeholder)
        // if (!verificarWebhook($data)) return;

        // Obtener orden_id de referencia_externa
        $orden_id = $data['external_reference'] ?? null;
        $estado_pago = $data['status'] ?? null;

        if ($estado_pago === 'approved') {
            $this->modeloOrden->actualizarEstado($orden_id, 'PAGADA');

            // Obtener total de la orden
            $orden = $this->modeloOrden->obtenerPorId($orden_id);
            $this->modeloPago->registrar($orden_id, $orden['total'], 'APROBADO');
        }

        // Responder a la pasarela
        http_response_code(200);
        echo 'OK';
    }
}
?>