<?php
// Allow your Cloudflare frontend
header("Access-Control-Allow-Origin: https://dbsdesigner.com");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Increase server limits (1000 MB)
ini_set('upload_max_filesize', '1000M');
ini_set('post_max_size', '1000M');
ini_set('max_execution_time', '300');
ini_set('max_input_time', '300');

$uploadDir = __DIR__ . "/uploads/";

if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

$response = [];

foreach ($_FILES['files']['tmp_name'] as $key => $tmpName) {
    $name = basename($_FILES['files']['name'][$key]);
    $safeName = preg_replace("/[^A-Za-z0-9._-]/", "_", $name);
    $unique = time() . "_" . $safeName;
    $target = $uploadDir . $unique;

    if (move_uploaded_file($tmpName, $target)) {
        $response[] = [
            "name" => $safeName,
            "url"  => "https://api.dbsdesigner.com/uploads/" . $unique
        ];
    } else {
        $response[] = [
            "name"  => $safeName,
            "error" => true
        ];
    }
}

echo json_encode($response);
