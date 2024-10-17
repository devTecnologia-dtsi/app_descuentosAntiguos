<?php
require_once 'ConnectDB.php';
class Logs extends ConnectDB
{
    public function __construct()
    {
        parent::__construct();
    }
    public function saveToDatabase(string $level, string $request, string $response)
    {
        $conn = $this->getConnection();
        $requestIP = $_SERVER['REMOTE_ADDR'];
        $method = $_SERVER['REQUEST_METHOD'];
        $route = $_SERVER['REQUEST_URI'];
        $agent = $_SERVER['HTTP_USER_AGENT'] ?? 'API REST';

        $stmt = $conn->prepare("INSERT INTO logs (requestIP, level, method, route, agent, request, response) VALUES (?, ?, ?, ?, ?, ?, ?)");
        if ($stmt === false) {
            die("Error preparando la consulta: " . $conn->error);
        }
        $stmt->bind_param("sssssss", $requestIP, $level, $method, $route, $agent, $request, $response);
        // $stmt->execute();
        try {
            // Registrar el log en la base de datos
            $stmt->execute();
        } catch (Exception $e) {
            // Registra el error en un log interno
            //$logFile = '/var/log/apache2/errors.log'; // Ruta al archivo de logs
            $logFile = 'errors.log'; // Ruta al archivo de logs
            error_log("Error al registrar el log: " . $e->getMessage(), 0, $logFile);
        }
        $stmt->close();
        $this->disconnect();
    }
}