<?php
/**
 * Shared helpers for contact / tutor application forms (Hostinger PHP).
 * Copy config.example.php → config.php and add your Resend API key.
 */

declare(strict_types=1);

function json_response(int $status, array $payload): void
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($payload);
    exit;
}

function load_config(): array
{
    $path = __DIR__ . '/config.php';
    if (!is_file($path)) {
        json_response(500, [
            'ok' => false,
            'error' => 'Server not configured. Create public_html/api/config.php from config.example.php.',
        ]);
    }
    $config = require $path;
    if (
        !is_array($config)
        || empty($config['resend_api_key'])
        || empty($config['contact_email'])
    ) {
        json_response(500, [
            'ok' => false,
            'error' => 'Invalid server config. Check api/config.php.',
        ]);
    }
    return $config;
}

function read_json_body(): array
{
    $raw = file_get_contents('php://input');
    if ($raw === false || $raw === '') {
        json_response(400, ['ok' => false, 'error' => 'Invalid request body.']);
    }
    $data = json_decode($raw, true);
    if (!is_array($data)) {
        json_response(400, ['ok' => false, 'error' => 'Invalid request body.']);
    }
    return $data;
}

function str_field(array $data, string $key, int $min, int $max, string $message): string
{
    if (!isset($data[$key]) || !is_string($data[$key])) {
        json_response(400, ['ok' => false, 'error' => $message]);
    }
    $value = trim($data[$key]);
    $len = strlen($value);
    if ($len < $min || $len > $max) {
        json_response(400, ['ok' => false, 'error' => $message]);
    }
    return $value;
}

function optional_phone(array $data): string
{
    if (!isset($data['phone']) || $data['phone'] === '') {
        return '';
    }
    if (!is_string($data['phone'])) {
        json_response(400, ['ok' => false, 'error' => 'Invalid phone number.']);
    }
    $phone = trim($data['phone']);
    if (strlen($phone) > 40) {
        json_response(400, ['ok' => false, 'error' => 'Phone number is too long.']);
    }
    return $phone;
}

function check_honeypot(array $data): void
{
    if (!empty($data['website'])) {
        json_response(200, ['ok' => true]);
    }
}

function escape_html(string $s): string
{
    return htmlspecialchars($s, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function send_resend_email(array $config, array $payload): void
{
    $from = $config['from'] ?? 'Study Hive <onboarding@resend.dev>';

    $body = json_encode([
        'from' => $from,
        'to' => [$config['contact_email']],
        'subject' => $payload['subject'],
        'html' => $payload['html'],
        'text' => $payload['text'],
        'reply_to' => $payload['replyTo'],
    ]);

    $ch = curl_init('https://api.resend.com/emails');
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => [
            'Authorization: Bearer ' . $config['resend_api_key'],
            'Content-Type: application/json',
        ],
        CURLOPT_POSTFIELDS => $body,
        CURLOPT_TIMEOUT => 30,
    ]);

    $response = curl_exec($ch);
    $httpCode = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($response === false || $httpCode < 200 || $httpCode >= 300) {
        $decoded = is_string($response) ? json_decode($response, true) : null;
        $msg = is_array($decoded) && isset($decoded['message'])
            ? $decoded['message']
            : 'Email send failed.';
        error_log('Resend error: ' . $msg);
        json_response(500, [
            'ok' => false,
            'error' => "We couldn't send your message. Please email us directly at ask.studyhive@gmail.com or try again.",
        ]);
    }
}

function build_email_html(string $title, array $fields, string $bodyLabel, string $bodyText, string $name): string
{
    $rows = '';
    foreach ($fields as $field) {
        $label = escape_html($field['label']);
        $value = escape_html($field['value']);
        $cell = isset($field['isLink']) && $field['isLink']
            ? '<a href="mailto:' . $value . '" style="color:#3D2418;">' . $value . '</a>'
            : $value;
        $rows .= '<tr><td style="padding:6px 0;color:#5C3A1F;font-size:13px;width:100px;">'
            . $label . '</td><td style="padding:6px 0;">' . $cell . '</td></tr>';
    }

    return '<!DOCTYPE html><html><body style="font-family:-apple-system,BlinkMacSystemFont,\'Segoe UI\',sans-serif;line-height:1.5;color:#3D2418;max-width:600px;margin:0 auto;padding:24px;background:#FEE2B0;">'
        . '<div style="background:#FFFAF0;padding:32px;border-radius:12px;">'
        . '<h2 style="margin:0 0 16px;font-size:20px;color:#3D2418;">' . escape_html($title) . '</h2>'
        . '<table style="width:100%;border-collapse:collapse;margin-bottom:24px;">' . $rows . '</table>'
        . '<div style="padding:16px;background:#FEF8E7;border-radius:8px;border-left:4px solid #E8A93C;">'
        . '<div style="font-size:12px;color:#5C3A1F;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px;">'
        . escape_html($bodyLabel) . '</div>'
        . '<div style="white-space:pre-wrap;">' . escape_html($bodyText) . '</div></div>'
        . '<p style="margin-top:24px;font-size:13px;color:#5C3A1F;">Reply directly to this email to respond to '
        . escape_html($name) . '.</p></div></body></html>';
}
