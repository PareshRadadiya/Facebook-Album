<?php
/**
 * Get google+ Parameters for ClientAuth authentication
 */
session_start();
if(isset($_SESSION["username"]) && isset($_SESSION["password"])){
	echo 1;
}else{
	echo 0;
}
?>