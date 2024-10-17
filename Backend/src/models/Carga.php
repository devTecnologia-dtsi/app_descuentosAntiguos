<?php
include_once 'ConnectDB.php';
class Carga extends ConnectDB
{
    public function __construct()
    {
        parent::__construct();
    }
    public function guardarDocumento()
    {
        $conn = $this->getConnection();
        $logs = new Logs();
        if (isset($_FILES['file']) && $_FILES['file']['error'] === UPLOAD_ERR_OK) {
            $tmp = $_FILES['file']['tmp_name'];
            $nombreFichero = $_FILES['file']['name'];
            $tipoFichero = $_FILES['file']['type'];
            $carpetaDestino = __DIR__ . "/../documents";
            $ficheroDestino = $carpetaDestino . "/" . $nombreFichero;
            $idBanner = $_POST['idBanner'];
            $correo = $_POST['correo'];
            $nombres = $_POST['nombres'];
            $descuento = $_POST['descuento'];
            if ($tipoFichero !== "application/pdf") {
                echo json_encode(["error" => "Solo se permiten ficheros en formato PDF."]);
                exit;
            }
            if (!is_dir($carpetaDestino)) {
                mkdir($carpetaDestino, 0755, true);
            }
            if (move_uploaded_file($tmp, $ficheroDestino)) {
                if (file_exists($ficheroDestino)) {
                    $stmt = $conn->prepare("INSERT INTO documentos (id, correo, nombres, descuento, documento) VALUES (?, ?, ?, ?, ?)");
                    $stmt->bind_param("sssss", $idBanner, $correo, $nombres, $descuento, $nombreFichero);
                    // Ejecutar la consulta
                    try {
                        if ($stmt->execute()) {
                            $logs->saveToDatabase('INFO', $correo, "Archivo y datos subidos correctamente");
                            echo json_encode(["mensaje" => "Archivo y datos subidos correctamente"]);
                        } else {
                            throw new Exception("El usuario ya subió el documento.");
                        }
                    } catch (Exception $e) {
                        http_response_code(400);
                        $logs->saveToDatabase('ERROR', $correo, "Error, el usuario ya cargó su documento.");
                        echo json_encode(["mensaje" => "El usuario ya tiene un documento cargado."]);
                    }
                } else {
                    http_response_code(400);
                    $logs->saveToDatabase('ERROR', $correo, "Error al subir el archivo.");
                    echo json_encode(["mensaje" => "Error al subir el archivo"]);
                }
                $stmt->close();
            } else {
                http_response_code(400);
                $logs->saveToDatabase('ERROR', $correo, "Error al subir el archivo.");
                echo json_encode(["mensaje" => "Error al subir el archivo"]);
            }
        }
        $this->disconnect();
    }
}