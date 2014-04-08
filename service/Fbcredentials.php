<?php
session_start();
require_once($_SERVER['DOCUMENT_ROOT'].'/lib/Facebook/facebook.php');
$appId='209721652515800';
 $appSecret='6d4dc86a9b34d4a9ef23299b47ef24b1';
  $config = array(
    'appId' => $appId,
    'secret' => $appSecret,
    'cookie' => true,
    'allowSignedRequest' => false // optional but should be set to false for non-canvas apps
  );
$facebook=new Facebook($config);
$facebook -> setAccessToken($_SESSION["accessToken"]);
$user = $facebook->getUser(); 
?>