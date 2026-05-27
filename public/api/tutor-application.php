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
$application = str_field($data, 'application', 30, 5000, 'Please tell us a bit more about your experience.');

$phoneDisplay = $phone !== '' ? $phone : '(not provided)';
$subject = '[Tutor Application] ' . $titleSubject;

$text = implode("\n", [
    'New tutor application from the Study Hive website',
    '',
    'Subject: ' . $titleSubject,
    'Name:    ' . $name,
    'Email:   ' . $email,
    'Phone:   ' . $phoneDisplay,
    '',
    'Application:',
    $application,
    '',
    '---',
    'Reply to this email to respond directly to ' . $name . '.',
]);

$html = build_email_html(
    'New tutor application from the Study Hive website',
    [
        ['label' => 'Subject', 'value' => $titleSubject],
        ['label' => 'Name', 'value' => $name],
        ['label' => 'Email', 'value' => $email, 'isLink' => true],
        ['label' => 'Phone', 'value' => $phoneDisplay],
    ],
    'Application',
    $application,
    $name
);

send_resend_email($config, [
    'subject' => $subject,
    'replyTo' => $email,
    'html' => $html,
    'text' => $text,
]);

json_response(200, ['ok' => true]);
