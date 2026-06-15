<?php
/**
 * Copy this file to config.php on the server (Hostinger File Manager).
 * config.php is NOT in git — keep your API key secret.
 *
 * Resend setup (https://resend.com):
 * 1. Create an API key → paste below as resend_api_key
 * 2. Until thestudy-hive.org is verified in Resend, contact_email must be an
 *    address you verified in Resend (often your signup email for testing)
 * 3. Keep from as onboarding@resend.dev until your domain is verified
 */
return [
    'resend_api_key' => 're_your_key_here',
    'contact_email' => 'ask@thestudy-hive.org',
    'from' => 'Study Hive <onboarding@resend.dev>',
];
