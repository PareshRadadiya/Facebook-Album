<?php
/**
 * Move one or more albums to google+ account base on specified albumId list
 */

require_once ("../lib/Facebook/facebook.php");
require_once ("Fbcredentials.php");
$_SESSION['albums'] = isset($_REQUEST["albums"]) ? $_REQUEST["albums"] : $_SESSION['albums'];

set_include_path(get_include_path() . PATH_SEPARATOR . '../lib');
require_once ("Zend/Loader.php");
/*
 * Load zend gdata lib for google+ authentication and moving process
 */
Zend_Loader::loadClass('Zend_Gdata');
Zend_Loader::loadClass('Zend_Gdata_Photos');
Zend_Loader::loadClass('Zend_Gdata_ClientLogin');
Zend_Loader::loadClass('Zend_Gdata_AuthSub');
Zend_Loader::loadClass('Zend_Gdata_HttpClient');
Zend_Loader::loadClass('Zend_Gdata_Photos_AlbumQuery');
Zend_Loader::loadClass('Zend_Gdata_Photos_UserQuery');
$serviceName = Zend_Gdata_Photos::AUTH_SERVICE_NAME;

$photoList = array();
// Array of albumId that user requested for moving

$serviceScope = 'http://picasaweb.google.com/data';

if (!isset($_SESSION['photo_token'])) {
	if (isset($_GET['token'])) {
		// You can convert the single-use token to a session token.
		$session_token = Zend_Gdata_AuthSub::getAuthSubSessionToken($_GET['token']);
		// Store the session token in our session.
		$_SESSION['photo_token'] = $session_token;
		
		//Redirect to home page after successfully login to google account  
		header("location:" . "../home.php");
	} else {
		// Display link to generate single-use token
		$googleUri = Zend_Gdata_AuthSub::getAuthSubTokenUri('http://' . $_SERVER['SERVER_NAME'] . $_SERVER['REQUEST_URI'], $serviceScope, 0, 1);
		// Redirect to google account for authentication process
		echo $googleUri;
		exit();
	}
}

// Create an authenticated HTTP Client to talk to Google.
$client = Zend_Gdata_AuthSub::getHttpClient($_SESSION['photo_token']);

// Create a Gdata object using the authenticated Http Client
$service = new Zend_Gdata_Photos($client);
$albums = $_REQUEST['albums'];

if ($user) {
	foreach ($albums as $i => $albumId) {

		//Creating a new album for an authenticated user:
		$entry = new Zend_Gdata_Photos_AlbumEntry();
		$entry -> setTitle($service -> newTitle($albumId));
		$service -> insertAlbumEntry($entry);

		$results = $service -> getUserFeed();
		while ($results != null) {
			foreach ($results as $entry) {

				$album_id = $entry -> gphotoId -> text;
				$album_name = $entry -> title -> text;
				if ($album_name == $albumId) {
					break;
				}
			}
			try {
				$results = $results -> getNextFeed();
			} catch(Exception $e) {$results = null;
			}
		}

		$photoList = $facebook -> api('/' . $albumId . '/photos', 'GET');
		foreach ($photoList["data"] as $photo) {

			//Fetch photo from fb for move
			ini_set('max_execution_time', 500);
			file_put_contents(basename($photo["source"]), file_get_contents($photo["source"]));
			$fd = $service -> newMediaFileSource(basename($photo["source"]));
			$fd -> setContentType("image/" . pathinfo($photo["source"], PATHINFO_EXTENSION));
			
			//Creating a new photo for an authenticated user
			$entry = new Zend_Gdata_Photos_PhotoEntry();
			$entry -> setMediaSource($fd);
			$entry -> setTitle($service -> newTitle(basename($photo["source"])));
			
			//Retrieving an album
			$albumQuery = new Zend_Gdata_Photos_AlbumQuery();
			$albumQuery -> setUser("default");
			$albumQuery -> setAlbumId($album_id);
			//
			$albumEntry = $service -> getAlbumEntry($albumQuery);

			 //Inser photo into specified album
			$service -> insertPhotoEntry($entry, $albumEntry);

			//Delete temp file created for moving
			unlink(basename($photo["source"]));
		}
	}
echo "success";
}
?>