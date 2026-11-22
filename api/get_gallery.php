<?php
/**
 * ŠK JUNIOR IVANKA PRI NITRE - ČÍTANIE FOTOGALÉRIE
 * Vráti zoznam všetkých albumov a ich fotografií.
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

$dataPath = __DIR__ . '/../data/galeria.json';

if (file_exists($dataPath)) {
    echo file_get_contents($dataPath);
} else {
    echo json_encode([]);
}
