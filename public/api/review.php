<?php
declare(strict_types=1);

require __DIR__ . '/_helpers.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(405, ['ok' => false, 'error' => 'Method not allowed.']);
}

$config = load_config();
$data = read_json_body();
check_honeypot($data);

$name = str_field($data, 'name', 2, 100, 'Please enter your name.');
$email = str_field($data, 'email', 1, 200, 'Please enter a valid email address.');
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    json_response(400, ['ok' => false, 'error' => 'Please enter a valid email address.']);
}

$tutorName = '';
if (isset($data['tutorName']) && is_string($data['tutorName'])) {
    $tutorName = trim($data['tutorName']);
    if (strlen($tutorName) > 100) {
        json_response(400, ['ok' => false, 'error' => 'Tutor name is too long.']);
    }
}

$review = str_field($data, 'review', 20, 5000, 'Please write a bit more detail (at least 20 characters).');

$tutorDisplay = $tutorName !== '' ? $tutorName : '(not provided)';
$subject = '[Study Hive Review] Feedback from ' . $name;

$text = implode("\n", [
    'New tutor review from the Study Hive website',
    '',
    'Name:   ' . $name,
    'Email:  ' . $email,
    'Tutor:  ' . $tutorDisplay,
    '',
    'Review:',
    $review,
    '',
    '---',
    'Reply to this email to respond directly to ' . $name . '.',
]);

$html = build_email_html(
    'New tutor review from the Study Hive website',
    [
        ['label' => 'Name', 'value' => $name],
        ['label' => 'Email', 'value' => $email, 'isLink' => true],
        ['label' => 'Tutor', 'value' => $tutorDisplay],
    ],
    'Review',
    $review,
    $name
);

send_resend_email($config, [
    'subject' => $subject,
    'replyTo' => $email,
    'html' => $html,
    'text' => $text,
]);

json_response(200, ['ok' => true]);
