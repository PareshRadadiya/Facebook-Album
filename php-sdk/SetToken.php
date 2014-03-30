<?php
/**
 *  Set authentication token for client according to provider
 */
session_start();
$provider = $_REQUEST["provider"];
if ($provider == "facebook") {
	//Set authentication token for facebook client
	$_SESSION["accessToken"] = $_REQUEST["accessToken"];
} else if ($provider == "picasa") {
	//Set authentication token for google+ client
	require_once 'Zend/Loader.php';
	Zend_Loader::loadClass('Zend_Gdata_ClientLogin');
	$client = Zend_Gdata_ClientLogin::getHttpClient($_REQUEST["username"], $_REQUEST["password"]);
	if ($client) {
		$_SESSION["username"] = $_REQUEST["username"];
		$_SESSION["password"] = $_REQUEST["password"];
		echo "success";
	}
}
?>