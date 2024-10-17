<?php
header('Access-Control-Allow-Origin: *');

// Maneja las solicitudes preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    header('Access-Control-Max-Age: 86400'); // Tiempo de vida de la preflight (24 horas)
    http_response_code(200); // Responde con éxito a la solicitud OPTIONS
    exit();
}

require_once __DIR__ . '/../../src/routes/web.php';