<?php
/**
 * Envío del formulario de contacto de la web (issue #32).
 *
 * Recibe por POST un JSON con { subject, lines, name, email, phone, privacy,
 * reason, catalogues, product, website } y manda el correo a
 * info@agro-clavel.com con mail() de PHP.
 *
 * - El destinatario está fijado aquí, nunca viene del navegador: el script no
 *   puede usarse para enviar correo a otras direcciones.
 * - Vuelve a validar lo mismo que el formulario: motivo, al menos un catálogo
 *   si es «Solicitar catálogo», el producto si es «Información sobre
 *   productos», nombre, correo o teléfono y aceptación de la privacidad.
 * - `website` es un campo trampa oculto: las personas lo dejan vacío y muchos
 *   robots lo rellenan. Si llega con texto se responde «ok» sin enviar nada.
 *
 * Respuesta: { "ok": true } o, con código 4xx/5xx, { "ok": false, "error": "…" }.
 */

// Configuración.
const MAIL_TO = 'info@agro-clavel.com';
// Remitente del dominio para que el correo no se marque como suplantado; la
// respuesta va al visitante gracias a Reply-To.
const MAIL_FROM = 'info@agro-clavel.com';
const MAIL_FROM_NAME = 'Web Clavel';
const MAX_LINES = 40;
const MAX_LINE_LENGTH = 5000;
// Motivos y catálogos (uno por gama) que admite el formulario.
const REASONS = ['catalogue', 'advice', 'productInfo', 'distributor', 'job', 'other'];
const CATALOGUES = ['terra', 'protection', 'booster', 'nutrition', 'correctors'];

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

function respond(int $status, array $payload): void
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE);
    exit;
}

/** Texto de una sola línea: sin saltos (evita inyectar cabeceras) y recortado. */
function single_line($value, int $max = 200): string
{
    $text = is_string($value) ? $value : '';
    $text = trim(preg_replace('/[\r\n\t]+/', ' ', $text));
    return mb_substr($text, 0, $max, 'UTF-8');
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    respond(405, ['ok' => false, 'error' => 'method']);
}

$data = json_decode(file_get_contents('php://input'), true);
if (!is_array($data)) {
    respond(400, ['ok' => false, 'error' => 'json']);
}

// Campo trampa relleno: se finge el envío.
if (single_line($data['website'] ?? '') !== '') {
    respond(200, ['ok' => true]);
}

$name = single_line($data['name'] ?? '');
$email = single_line($data['email'] ?? '', 254);
$phone = single_line($data['phone'] ?? '', 40);
$privacy = ($data['privacy'] ?? false) === true;
$subject = single_line($data['subject'] ?? '', 200);
$lines = $data['lines'] ?? [];
$reason = single_line($data['reason'] ?? '', 20);
$catalogues = $data['catalogues'] ?? [];
$product = single_line($data['product'] ?? '', 40);

$validReason = in_array($reason, REASONS, true);
$validCatalogues = is_array($catalogues) && count($catalogues) > 0
    && count(array_filter($catalogues, 'is_string')) === count($catalogues)
    && count(array_diff($catalogues, CATALOGUES)) === 0;
$validProduct = preg_match('/^[a-z0-9-]{1,40}$/', $product) === 1;

$validEmail = $email !== '' && filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
$validPhone = $phone !== '' && preg_match('/^\+?[0-9\s().-]{9,20}$/', $phone)
    && strlen(preg_replace('/\D/', '', $phone)) >= 9;

if (!$validReason
    || ($reason === 'catalogue' && !$validCatalogues)
    || ($reason === 'productInfo' && !$validProduct)
    || $name === '' || !$privacy || (!$validEmail && !$validPhone)
    || ($email !== '' && !$validEmail) || ($phone !== '' && !$validPhone)
    || !is_array($lines) || count($lines) === 0 || count($lines) > MAX_LINES) {
    respond(422, ['ok' => false, 'error' => 'validation']);
}

$body = implode("\n", array_map(function ($line) {
    $text = is_string($line) ? $line : '';
    return mb_substr(str_replace("\r", '', $text), 0, MAX_LINE_LENGTH, 'UTF-8');
}, $lines));

if ($subject === '') {
    $subject = 'Consulta desde la web';
}

$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    'From: ' . mb_encode_mimeheader(MAIL_FROM_NAME, 'UTF-8') . ' <' . MAIL_FROM . '>',
    'X-Mailer: Clavel web',
];
if ($validEmail) {
    $headers[] = 'Reply-To: ' . mb_encode_mimeheader($name, 'UTF-8') . ' <' . $email . '>';
}

$sent = mail(
    MAIL_TO,
    mb_encode_mimeheader($subject, 'UTF-8'),
    $body,
    implode("\r\n", $headers),
    '-f' . MAIL_FROM
);

if (!$sent) {
    respond(500, ['ok' => false, 'error' => 'mail']);
}

respond(200, ['ok' => true]);
