<?php
declare(strict_types=1);

require __DIR__ . '/_helpers.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(405, ['ok' => false, 'error' => 'Method not allowed.']);
}

$config = load_config();
$data = read_json_body();
check_honeypot($data);

$titleSubject = str_field($data, 'titleSubject', 2, 120, 'Please enter a short subject for your message.');
$name = str_field($data, 'name', 2, 100, 'Please enter your name.');
$email = str_field($data, 'email', 1, 200, 'Please enter a valid email address.');
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    json_response(400, ['ok' => false, 'error' => 'Please enter a valid email address.']);
}
$phone = optional_phone($data);
$message = str_field($data, 'message', 20, 5000, 'Please give us a bit more detail (at least 20 characters).');

$phoneDisplay = $phone !== '' ? $phone : '(not provided)';
$subject = '[Study Hive Enquiry] ' . $titleSubject;

$text = implode("\n", [
    'New enquiry from the Study Hive website',
    '',
    'Subject: ' . $titleSubject,
    'Name:    ' . $name,
    'Email:   ' . $email,
    'Phone:   ' . $phoneDisplay,
    '',
    'Message:',
    $message,
    '',
    '---',
    'Reply to this email to respond directly to ' . $name . '.',
]);

$html = build_email_html(
    'New enquiry from the Study Hive website',
    [
        ['label' => 'Subject', 'value' => $titleSubject],
        ['label' => 'Name', 'value' => $name],
        ['label' => 'Email', 'value' => $email, 'isLink' => true],
        ['label' => 'Phone', 'value' => $phoneDisplay],
    ],
    'Message',
    $message,
    $name
);

send_resend_email($config, [
    'subject' => $subject,
    'replyTo' => $email,
    'html' => $html,
    'text' => $text,
]);

json_response(200, ['ok' => true]);
