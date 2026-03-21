<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$response = ['success' => false, 'error' => ''];

try {
    $name    = trim($_POST['name'] ?? '');
    $email   = trim($_POST['email'] ?? '');
    $message = trim($_POST['message'] ?? '');

    if (empty($name) || empty($email) || empty($message)) {
        throw new Exception('Todos los campos son obligatorios.');
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        throw new Exception('El email no es válido.');
    }

    $to = 'db@dbsdesigner.com';
    $subject = 'Nuevo proyecto desde db+';
    $body = "Nombre: $name\nEmail: $email\n\nMensaje:\n$message";

    // Boundary para adjuntos
    $boundary = md5(uniqid(rand(), true));
    $headers = "From: $email\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";

    $mailBody = "--$boundary\r\n";
    $mailBody .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $mailBody .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
    $mailBody .= $body . "\r\n";

    // Adjuntar archivos
    if (!empty($_FILES['files']['tmp_name'][0])) {
        $files = $_FILES['files'];
        $fileCount = count($files['tmp_name']);
        for ($i = 0; $i < $fileCount; $i++) {
            if ($files['error'][$i] === UPLOAD_ERR_OK) {
                $fileName = $files['name'][$i];
                $fileTmp = $files['tmp_name'][$i];
                $fileType = $files['type'][$i];
                $fileContent = chunk_split(base64_encode(file_get_contents($fileTmp)));

                $mailBody .= "--$boundary\r\n";
                $mailBody .= "Content-Type: $fileType; name=\"$fileName\"\r\n";
                $mailBody .= "Content-Transfer-Encoding: base64\r\n";
                $mailBody .= "Content-Disposition: attachment; filename=\"$fileName\"\r\n\r\n";
                $mailBody .= $fileContent . "\r\n";
            } else {
                throw new Exception("Error al subir el archivo: " . $files['name'][$i]);
            }
        }
    }

    $mailBody .= "--$boundary--";

    if (mail($to, $subject, $mailBody, $headers)) {
        $response['success'] = true;
        $response['message'] = 'Correo enviado correctamente.';
    } else {
        throw new Exception('El servidor no pudo enviar el correo.');
    }

} catch (Exception $e) {
    $response['error'] = $e->getMessage();
    http_response_code(500);
}

echo json_encode($response);
