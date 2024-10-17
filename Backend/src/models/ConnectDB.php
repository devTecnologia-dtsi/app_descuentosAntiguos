<?php
require_once __DIR__ . '/../../config/database.php';
error_reporting(E_ALL);
ini_set('display_errors', 1);
class ConnectDB
{
    protected static $conn;
    public function __construct()
    {
        $this->validaConexion();
    }
    private function connect()
    {
        try {
            // // // // self::$conn->options(MYSQLI_OPT_CONNECT_TIMEOUT, 2);
            self::$conn = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_DATABASE);
        } catch (\Throwable $th) {
            error_log("Error de conexión a la base de datos: " . $th, 0);
            http_response_code(500);
            header('Content-Type: application/json');
            echo json_encode([
                'error' => 'Error de comunicación'
            ]);
            exit;
        }
        self::$conn->set_charset("utf8mb4");
    }
    private function validaConexion()
    {
        if (self::$conn && self::$conn->ping()) {
            return;
        } else {
            $this->connect();
        }
    }
    protected function getConnection()
    {
        $this->validaConexion();
        return self::$conn;
    }
    public static function disconnect()
    {
        if (isset(self::$conn)) {
            self::$conn->close();
            self::$conn = null;
        }
    }
}