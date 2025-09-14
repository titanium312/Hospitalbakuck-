<?php
// visitas.php — contador simple con almacenamiento en archivo JSON.
// Soporta: action=inc | get, key=<cadena>.
// Devuelve SIEMPRE JSON válido: {"ok":true,"key":"...","views":N}

declare(strict_types=1);

// ---------- CORS ----------
$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '*';
// Si quieres restringirlo en prod, cambia '*' por tu dominio:
// $origin = 'https://tu-dominio.com';

header("Access-Control-Allow-Origin: $origin");
header("Vary: Origin");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Accept");
header("Access-Control-Max-Age: 86400"); // 24h

// Respuesta rápida al preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(204);
  exit;
}

// ---------- Cabecera JSON ----------
header('Content-Type: application/json; charset=utf-8');

// ---------- Parámetros ----------
$action = isset($_GET['action']) ? $_GET['action'] : 'get';
$key    = isset($_GET['key'])    ? trim($_GET['key']) : '';

if ($key === '') {
  http_response_code(400);
  echo json_encode(["ok" => false, "error" => 'Missing "key"']);
  exit;
}

$allowed_actions = ['inc', 'get'];
if (!in_array($action, $allowed_actions, true)) {
  http_response_code(400);
  echo json_encode(["ok" => false, "error" => 'Invalid "action"']);
  exit;
}

// ---------- Almacenamiento ----------
$storageDir = __DIR__ . '/storage';          // crea carpeta "storage" junto al PHP
$storageFile = $storageDir . '/views.json';  // archivo JSON de contadores

if (!is_dir($storageDir)) {
  @mkdir($storageDir, 0775, true);
  // opcional: crear .htaccess para bloquear acceso directo:
  @file_put_contents($storageDir . '/.htaccess', "Deny from all\n");
}

// Carga segura con lock
$views = [];
$fp = null;
try {
  if (!file_exists($storageFile)) {
    @file_put_contents($storageFile, "{}");
  }

  $fp = fopen($storageFile, 'c+'); // crea si no existe
  if ($fp === false) {
    throw new RuntimeException('Cannot open storage file');
  }

  // Bloqueo exclusivo para evitar carreras
  if (!flock($fp, LOCK_EX)) {
    throw new RuntimeException('Cannot lock storage file');
  }

  // Leer contenido actual
  $size = filesize($storageFile);
  $raw = $size > 0 ? fread($fp, $size) : '{}';
  $views = json_decode($raw ?: '{}', true);
  if (!is_array($views)) $views = [];

  // Acción
  $current = isset($views[$key]) && is_int($views[$key]) ? $views[$key] : 0;

  if ($action === 'inc') {
    $current++;
    $views[$key] = $current;

    // Rewind + truncar + escribir JSON bonito
    ftruncate($fp, 0);
    rewind($fp);
    fwrite($fp, json_encode($views, JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES));
  }

  // Respuesta
  echo json_encode([
    "ok"    => true,
    "key"   => $key,
    "views" => $current
  ], JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES);

} catch (Throwable $e) {
  http_response_code(500);
  echo json_encode(["ok" => false, "error" => $e->getMessage()]);
} finally {
  if ($fp) {
    fflush($fp);
    flock($fp, LOCK_UN);
    fclose($fp);
  }
}
