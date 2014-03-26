<?php
session_start();
$provider=$_REQUEST["provider"];
if($provider=="facebook")
{
	$_SESSION["accessToken"]=$_REQUEST["accessToken"];
}else if($provider=="picasa"){
	require_once 'Zend/Loader.php';
	Zend_Loader::loadClass('Zend_Gdata_ClientLogin');
	$client = Zend_Gdata_ClientLogin::getHttpClient($_REQUEST["username"], $_REQUEST["password"]);
	if($client){
		$_SESSION["username"]=$_REQUEST["username"];
$_SESSION["password"]=$_REQUEST["password"];
echo "success";
	}

}

?>