<?php
header("Content-Type: application/json; charset=utf-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["success" => false, "error" => "Method not allowed"]);
    exit;
}

$rawInput = file_get_contents("php://input");
if (empty($rawInput)) {
    http_response_code(400);
    echo json_encode(["success" => false, "error" => "Žiadne dáta na uloženie"]);
    exit;
}

$data = json_decode($rawInput, true);
if ($data === null) {
    http_response_code(400);
    echo json_encode(["success" => false, "error" => "Neplatný formát JSON"]);
    exit;
}

$targetFile = dirname(__DIR__) . DIRECTORY_SEPARATOR . 'club_custom_data.json';

// Uložíme čistý JSON so slovenskými znakmi
$jsonEncoded = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

if (file_put_contents($targetFile, $jsonEncoded)) {
    echo json_encode([
        "success" => true,
        "message" => "Klubové údaje (vedenie, sponzori, články, galéria) boli úspešne a trvalo uložené na serveri do club_custom_data.json!",
        "timestamp" => time()
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "error" => "Nepodarilo sa zapísať do súboru club_custom_data.json na serveri. Skontrolujte oprávnenia zápisu (chmod)."
    ]);
}
