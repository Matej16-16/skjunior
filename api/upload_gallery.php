<?php
/**
 * ŠK JUNIOR IVANKA PRI NITRE - BACKEND PRE FOTOGALÉRIU (WEBHOSTING)
 * Prijíma hromadný upload fotografií (aj 30+ fotiek z akcie) a ukladá ich na webhosting.
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Povolená je iba metóda POST.']);
    exit;
}

$title = trim($_POST['title'] ?? '');
$category = trim($_POST['category'] ?? 'Klub');
$date = trim($_POST['date'] ?? date('d.m.Y'));
$description = trim($_POST['description'] ?? '');

if (empty($title)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Názov akcie / albumu je povinný.']);
    exit;
}

$albumId = 'alb-' . date('Ymd-His') . '-' . substr(md5(uniqid()), 0, 4);

// Cesta pre ukladanie na hostingu
$uploadBaseDir = __DIR__ . '/../uploads/galeria/' . $albumId;
if (!is_dir($uploadBaseDir)) {
    mkdir($uploadBaseDir, 0755, true);
}

$savedPhotos = [];
$allowedExtensions = ['jpg', 'jpeg', 'png', 'webp', 'gif'];

// Spracovanie viacerých nahratých súborov ($_FILES['photos'])
if (!empty($_FILES['photos']['name'][0])) {
    $totalFiles = count($_FILES['photos']['name']);
    for ($i = 0; $i < $totalFiles; $i++) {
        if ($_FILES['photos']['error'][$i] === UPLOAD_ERR_OK) {
            $tmpName = $_FILES['photos']['tmp_name'][$i];
            $origName = $_FILES['photos']['name'][$i];
            $ext = strtolower(pathinfo($origName, PATHINFO_EXTENSION));

            if (in_array($ext, $allowedExtensions)) {
                $newFileName = sprintf('foto_%03d_%s.%s', $i + 1, substr(md5(uniqid()), 0, 6), $ext);
                $targetPath = $uploadBaseDir . '/' . $newFileName;

                if (move_uploaded_file($tmpName, $targetPath)) {
                    // Relatívna cesta k obrázku pre web
                    $savedPhotos[] = 'uploads/galeria/' . $albumId . '/' . $newFileName;
                }
            }
        }
    }
}

// Pridanie prípadných externých URL odkazov na fotky
if (!empty($_POST['photo_urls'])) {
    $rawUrls = explode("\n", $_POST['photo_urls']);
    foreach ($rawUrls as $u) {
        $u = trim($u);
        if (!empty($u) && filter_var($u, FILTER_VALIDATE_URL)) {
            $savedPhotos[] = $u;
        }
    }
}

if (empty($savedPhotos)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Neboli nahraté žiadne platné fotografie.']);
    exit;
}

$coverImage = $savedPhotos[0];

$albumData = [
    'id' => $albumId,
    'title' => $title,
    'category' => $category,
    'date' => $date,
    'description' => $description,
    'image' => $coverImage,
    'photos' => $savedPhotos,
    'createdAt' => date('c')
];

// Uloženie do JSON databázy na hostingu
$dataPath = __DIR__ . '/../data/galeria.json';
$dataDir = dirname($dataPath);
if (!is_dir($dataDir)) {
    mkdir($dataDir, 0755, true);
}

$allAlbums = [];
if (file_exists($dataPath)) {
    $json = file_get_contents($dataPath);
    $allAlbums = json_decode($json, true) ?: [];
}

// Nový album vložíme na začiatok
array_unshift($allAlbums, $albumData);
file_put_contents($dataPath, json_encode($allAlbums, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

echo json_encode([
    'success' => true,
    'message' => "Album '{$title}' bol úspešne vytvorený so " . count($savedPhotos) . " fotografiami.",
    'album' => $albumData
]);
