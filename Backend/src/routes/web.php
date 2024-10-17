<?php
require_once __DIR__ . '/../controllers/documentoController.php';
$url = $_SERVER['REQUEST_URI'];
$metodo = $_SERVER['REQUEST_METHOD'];
// Analizar la URL
$urlComponents = parse_url($url);
$path = $urlComponents['path'] ?? '';
$query = $urlComponents['query'] ?? '';

// Separar los segmentos de la ruta
$pathSegments = explode('/', $path);
$rutaBase = $pathSegments[1] ?? '/'; // upload
$pathParam = $pathSegments[2] ?? ''; // 11111

// Analizar los query parameters
parse_str($query, $queryParams);

$controller = new DocumentoController();

switch (true) {
    case 'uploads' === $rutaBase && $rutaBase !== null && 'POST' === $metodo:
        // $correo = $queryParams['correo'] ?? null;
        $controller->subirDocumento();
        break;
    case 'validar' === $rutaBase && 'POST' === $metodo:
        $controller->validarCaptcha();
        break;
    case 'error' === $rutaBase:
        require_once __DIR__ . '/../views/error.php';
        break;
    default:
        if (!headers_sent()) {
            header('HTTP/1.1 503 Service Unavailable');
        }
        break;
}