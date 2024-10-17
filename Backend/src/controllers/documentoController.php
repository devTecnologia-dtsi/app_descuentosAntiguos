<?php
require_once __DIR__ . '/../models/Carga.php';
require_once __DIR__ . '/../models/Google.php';
error_reporting(E_ALL);
ini_set('log_errors', 1);
ini_set('error_log', '/errors.log');
class DocumentoController
{
    public function subirDocumento()
    {
        $cargar = new Carga();
        $cargar->guardarDocumento();
    }
    public function validarCaptcha()
    {
        $captcha = new Google();
        $captcha->validarCaptcha();
    }

}