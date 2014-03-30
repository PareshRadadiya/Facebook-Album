<?php
/**
 * Move one or more albums to google+ account base on specified albumId list
 */
try {
	require_once ("facebook.php");
	require_once ("Fbcredentials.php");
	require_once 'Zend/Loader.php';
	/*
	 * Load zend gdata lib for google+ authentication and moving process
	 */
	Zend_Loader::loadClass('Zend_Gdata_Photos');
	Zend_Loader::loadClass('Zend_Gdata_ClientLogin');
	Zend_Loader::loadClass('Zend_Gdata_AuthSub');
	Zend_Loader::loadClass('Zend_Gdata_Photos_AlbumQuery');
	Zend_Loader::loadClass('Zend_Gdata_Photos_UserQuery');
	$serviceName = Zend_Gdata_Photos::AUTH_SERVICE_NAME;

	//Get google+ user id and password from session
	$user = $_SESSION["username"];
	$pass = $_SESSION["password"];

	// Create an authenticated HTTP client
	$client = Zend_Gdata_ClientLogin::getHttpClient($user, $pass, $serviceName);

	// Create an instance of the service
	$service = new Zend_Gdata_Photos($client);

	$photoList = array();
	// Array of albumId that user requested for moving
	$albums = $_REQUEST["albums"];
	//Check for user is logged in or not
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
			//foreach ($albums as $i => $albumId) {
			ini_set('max_execution_time', 500);
			$photoList = $facebook -> api('/' . $albumId . '/photos', 'GET');
			foreach ($photoList["data"] as $photo) {

				//Fetch photo from fb for move
				file_put_contents(basename($photo["source"]), file_get_contents($photo["source"]));
				$fd = $service -> newMediaFileSource(basename($photo["source"]));
				$fd -> setContentType("image/" . pathinfo($photo["source"], PATHINFO_EXTENSION));

				//Creating a new photo for an authenticated user
				$entry = new Zend_Gdata_Photos_PhotoEntry();
				$entry -> setMediaSource($fd);
				$entry -> setTitle($service -> newTitle(basename($photo["source"])));

				//Retrieving an album
				$albumQuery = new Zend_Gdata_Photos_AlbumQuery();
				$albumQuery -> setUser($user);
				$albumQuery -> setAlbumId($album_id);

				$albumEntry = $service -> getAlbumEntry($albumQuery);

				//Inser photo into specified album
				$service -> insertPhotoEntry($entry, $albumEntry);

				//Remove temp file created for moving
				unlink(basename($photo["source"]));
			}
		}

	}
} catch (Exception $e) {
	echo "fail";
}
?>