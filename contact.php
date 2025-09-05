<?php
header('Content-Type: application/json; charset=utf-8');
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  echo json_encode(['ok' => false, 'error' => 'Invalid request.']);
  exit;
}

function sanitize($v) { return trim(filter_var($v, FILTER_SANITIZE_STRING)); }

$name = sanitize($_POST['name'] ?? '');
$email = filter_var($_POST['email'] ?? '', FILTER_VALIDATE_EMAIL);
$phone = sanitize($_POST['phone'] ?? '');
$subject = sanitize($_POST['subject'] ?? '');
$message = trim($_POST['message'] ?? '');

if (!$name || !$email || !$subject || !$message) {
  echo json_encode(['ok' => false, 'error' => 'Missing required fields.']);
  exit;
}

$to = 'muagacaua@gmail.com'; // Change to your preferred recipient
$subjectLine = "[ACG Website] " . $subject;

$lines = [
  "Name: $name",
  "Email: $email",
  "Phone: " . ($phone ? $phone : '-'),
  "",
  "Message:",
  $message
];
$body = implode("\r\n", $lines);

$headers = [];
$headers[] = "From: ACG Website <no-reply@{$_SERVER['SERVER_NAME']}>";
$headers[] = "Reply-To: $name <$email>";
$headers[] = "Content-Type: text/plain; charset=UTF-8";

$sent = @mail($to, $subjectLine, $body, implode("\r\n", $headers));

if ($sent) {
  echo json_encode(['ok' => true]);
} else {
  echo json_encode(['ok' => false, 'error' => 'Mail server not configured.']);
}
