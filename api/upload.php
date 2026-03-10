<?php
header("Access-Control-Allow-Origin: https://dbsdesigner.com");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$uploadDir = __DIR__ . "/uploads/";

if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

$response = [];

foreach ($_FILES['files']['tmp_name'] as $key => $tmpName) {
    $name = basename($_FILES['files']['name'][$key]);

    $safeName = preg_replace("/[^A-Za-z0-9._-]/", "_", $name);
    $uniqueName = time() . "_" . $safeName;

    $target = $uploadDir . $uniqueName;

    if (move_uploaded_file($tmpName, $target)) {
        $response[] = [
            "name" => $uniqueName,
            "url"  => "https://api.dbsdesigner.com/uploads/" . $uniqueName
        ];
    } else {
        $response[] = [
            "name" => $uniqueName,
            "error" => true
        ];
    }
}

echo json_encode($response);
