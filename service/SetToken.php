<?php
/**
 *  Set authentication token for client according to provider
 */
session_start();
$provider = $_REQUEST["provider"];
if ($provider == "facebook") {
	//Set authentication token for facebook client
	$_SESSION["accessToken"] = $_REQUEST["accessToken"];
}
?>