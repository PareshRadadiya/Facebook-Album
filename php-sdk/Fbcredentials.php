<?php
  // Remember to copy files from the SDK's src/ directory to a
  // directory in your application on the server, such as php-sdk/
  require_once('php-sdk/facebook.php');

  $config = array(
    'appId' => '209721652515800',
    'secret' => '6d4dc86a9b34d4a9ef23299b47ef24b1',
    'allowSignedRequest' => false // optional but should be set to false for non-canvas apps
  );

  $facebook = new Facebook($config);
  $user_id = $facebook->getUser();
?>