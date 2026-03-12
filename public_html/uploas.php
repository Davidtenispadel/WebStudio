<?php
// CORS (Cloudflare → One.com)
header("Access-Control-Allow-Origin: https://dbsdesigner.com");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Responder preflight (importante para navegadores modernos)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Max-Age: 86400");
    exit(0);
}

// Carpeta uploads (ruta absoluta segura)
$uploadDir = __DIR__ . "/uploads/";

if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0775, true); // permisos seguros
}

$response = [];

// Validación mínima
if (
    !isset($_FILES['files']) ||
    !is_array($_FILES['files']['tmp_name'])
) {
    echo json_encode([
        "error" => "No files[] received"
    ]);
    exit;
}

// Procesar todos los archivos recibidos
foreach ($_FILES['files']['tmp_name'] as $key => $tmpName) {

    $originalName = basename($_FILES['files']['name'][$key] ?? "file");
    $safeName     = preg_replace("/[^A-Za-z0-9._-]/", "_", $originalName);

    // Nombre único robusto
    $uniqueName   = time() . "_" . bin2hex(random_bytes(4)) . "_" . $safeName;
    $target       = $uploadDir . $uniqueName;

    // Validar archivo temporal
    if (!is_uploaded_file($tmpName)) {
        $response[] = [
            "name"  => $safeName,
            "error" => true,
            "msg"   => "Invalid tmp file"
        ];
        continue;
    }

    // Mover archivo
    if (move_uploaded_file($tmpName, $target)) {
        $response[] = [
            "name" => $safeName,
            "saved" => $uniqueName,
            "url"  => "https://dbsdesigner.com/uploads/" . $uniqueName
        ];
    } else {
        $response[] = [
            "name"  => $safeName,
            "error" => true,
            "msg"   => "Failed to move file"
        ];
    }
}

// Respuesta JSON final
echo json_encode($response);
