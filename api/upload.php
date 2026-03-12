<?php
// CORS dinámico para permitir únicamente tus dominios reales
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowed = [
    "https://dbsdesigner.com",
    "https://www.dbsdesigner.com"
];

if (in_array($origin, $allowed, true)) {
    header("Access-Control-Allow-Origin: $origin");
}

header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Ruta uploads
$uploadDir = __DIR__ . "/uploads/";
if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0775, true);
}

$response = [];

if (!isset($_FILES['files']) || !is_array($_FILES['files']['tmp_name'])) {
    echo json_encode(["error" => "No files[] received"]);
    exit;
}

// Procesar cada archivo
foreach ($_FILES['files']['tmp_name'] as $key => $tmpName) {

    $originalName = basename($_FILES['files']['name'][$key] ?? "file");
    $safeName = preg_replace("/[^A-Za-z0-9._-]/", "_", $originalName);
    $uniqueName = time() . "_" . bin2hex(random_bytes(4)) . "_" . $safeName;

    $target = $uploadDir . $uniqueName;

    if (!is_uploaded_file($tmpName)) {
        $response[] = [
            "name" => $safeName,
            "error" => true,
            "msg" => "Invalid temp file"
        ];
        continue;
    }

    if (move_uploaded_file($tmpName, $target)) {
        $response[] = [
            "name"  => $safeName,
            "saved" => $uniqueName,
            "url"   => "https://dbsdesigner.com/api/uploads/" . $uniqueName
        ];
    } else {
        $response[] = [
            "name"  => $safeName,
            "error" => true,
            "msg"   => "Failed to move file"
        ];
    }
}

echo json_encode($response);
