<?php
class Google
{
    function validarCaptcha()
    {
        $rawData = file_get_contents('php://input');
        $data = json_decode($rawData, true);
        $captchaResponse = $data['captchaResponse'];
        // Usa variable de entorno para la clave secreta o una por defecto
        $secretKey = getenv('RECAPTCHA_SECRET_KEY') ?: '6LcHplwqAAAAAPNaYcRBtkEprtKHzdX1PcHOwnK0';
        // URL para verificar el captcha
        $url = 'https://www.google.com/recaptcha/api/siteverify?secret=' . $secretKey . '&response=' . $captchaResponse;
        $data = file_get_contents($url);
        // Decodifica el resultado de la respuesta JSON
        $captchaResult = json_decode($data, true);
        if ($captchaResult['success']) {
            header('Content-Type: application/json');
            echo json_encode(['respuesta' => true]);
        } else {
            header('Content-Type: application/json');
            http_response_code(400);
            echo json_encode(['respuesta' => false]);
        }
    }
}
?>