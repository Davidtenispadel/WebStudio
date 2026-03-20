<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Ajusta al dominio de tu app si es necesario
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Configuración del correo
$to = 'db@dbsdesigner.com';
$from = $_POST['email'] ?? 'no-reply@tudominio.com';
$subject = 'Nuevo proyecto desde db+';
$message = "Nombre: " . ($_POST['name'] ?? '') . "\n\n";
$message .= "Email: " . ($_POST['email'] ?? '') . "\n\n";
$message .= "Mensaje:\n" . ($_POST['message'] ?? '');

// Preparar el email con adjuntos
$boundary = md5(uniqid(rand(), true));
$headers = "From: $from\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";

$body = "--$boundary\r\n";
$body .= "Content-Type: text/plain; charset=UTF-8\r\n";
$body .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
$body .= $message . "\r\n";

// Adjuntar archivos
if (!empty($_FILES['files']['tmp_name'][0])) {
    $files = $_FILES['files'];
    for ($i = 0; $i < count($files['name']); $i++) {
        $fileName = $files['name'][$i];
        $fileTmp = $files['tmp_name'][$i];
        $fileType = $files['type'][$i];

        if (is_uploaded_file($fileTmp)) {
            $fileContent = chunk_split(base64_encode(file_get_contents($fileTmp)));
            $body .= "--$boundary\r\n";
            $body .= "Content-Type: $fileType; name=\"$fileName\"\r\n";
            $body .= "Content-Transfer-Encoding: base64\r\n";
            $body .= "Content-Disposition: attachment; filename=\"$fileName\"\r\n\r\n";
            $body .= $fileContent . "\r\n";
        }
    }
}

$body .= "--$boundary--";

// Enviar el correo
$success = mail($to, $subject, $body, $headers);

if ($success) {
    echo json_encode(['success' => true, 'message' => 'Email enviado con éxito']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Error al enviar el correo']);
}
