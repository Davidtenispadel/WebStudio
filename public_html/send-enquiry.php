<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

echo json_encode([
    'method' => $_SERVER['REQUEST_METHOD'],
    'post'   => $_POST,
    'files'  => isset($_FILES) ? array_keys($_FILES) : []
]);
