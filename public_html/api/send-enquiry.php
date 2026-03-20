<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Cambia * por tu dominio en producción
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Incluir PHPMailer (ajusta la ruta)
require_once __DIR__ . '/../vendor/PHPMailer/src/Exception.php';
require_once __DIR__ . '/../vendor/PHPMailer/src/PHPMailer.php';
require_once __DIR__ . '/../vendor/PHPMailer/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$response = ['success' => false, 'error' => ''];

try {
    // Validar campos requeridos
    $name    = trim($_POST['name'] ?? '');
    $email   = trim($_POST['email'] ?? '');
    $message = trim($_POST['message'] ?? '');

    if (empty($name) || empty($email) || empty($message)) {
        throw new Exception('Todos los campos son obligatorios.');
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        throw new Exception('El email no es válido.');
    }

    // Configurar PHPMailer con SMTP de one.com
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host       = 'smtp.one.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'tu_correo@tudominio.com'; // Cambia por tu email real
    $mail->Password   = 'tu_contraseña';           // Cambia por la contraseña
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;

    // Remitente y destinatario
    $mail->setFrom($email, $name);
    $mail->addAddress('db@dbsdesigner.com');
    $mail->addReplyTo($email, $name);

    $mail->Subject = 'Nuevo proyecto desde db+';
    $mail->Body    = "Nombre: $name\nEmail: $email\n\nMensaje:\n$message";

    // Adjuntar archivos
    if (!empty($_FILES['files']['tmp_name'][0])) {
        $fileCount = count($_FILES['files']['tmp_name']);
        for ($i = 0; $i < $fileCount; $i++) {
            if ($_FILES['files']['error'][$i] === UPLOAD_ERR_OK) {
                $tmpName = $_FILES['files']['tmp_name'][$i];
                $fileName = $_FILES['files']['name'][$i];
                $mail->addAttachment($tmpName, $fileName);
            } else {
                throw new Exception("Error al subir el archivo: " . $_FILES['files']['name'][$i]);
            }
        }
    }

    $mail->send();
    $response['success'] = true;
    $response['message'] = 'Correo enviado correctamente.';

} catch (Exception $e) {
    $response['error'] = $e->getMessage();
    http_response_code(500);
}

echo json_encode($response);
