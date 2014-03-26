<?php
session_start();
if(isset($_SESSION["username"]) && isset($_SESSION["password"])){
	echo 1;
}else{
	echo 0;
}
?>