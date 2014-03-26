<?php
try{
require_once("facebook.php");
require_once("Fbcredentials.php");
require_once 'Zend/Loader.php';
Zend_Loader::loadClass('Zend_Gdata_Photos');
Zend_Loader::loadClass('Zend_Gdata_ClientLogin');
Zend_Loader::loadClass('Zend_Gdata_AuthSub');
Zend_Loader::loadClass('Zend_Gdata_Photos_AlbumQuery');
Zend_Loader::loadClass('Zend_Gdata_Photos_UserQuery');
$serviceName = Zend_Gdata_Photos::AUTH_SERVICE_NAME;

$user = $_SESSION["username"];
$pass = $_SESSION["password"];

$client = Zend_Gdata_ClientLogin::getHttpClient($user, $pass, $serviceName);
$service  = new Zend_Gdata_Photos($client);

$photoList=array();
$albums = $_REQUEST["albums"];
if($user){
	 foreach ($albums as $i => $albumId) {
	  $entry = new Zend_Gdata_Photos_AlbumEntry();
$entry->setTitle($service->newTitle($albumId));
$service->insertAlbumEntry($entry);
	
 $results = $service->getUserFeed();
    while($results != null) {
        foreach($results as $entry) {
        	
            $album_id = $entry->gphotoId->text;//$entry->getId();//$entry->getGphotoId()->getText();
            $album_name = $entry->title->text;
if($album_name==$albumId){
	break;
}
	 }

        try {
            $results = $results->getNextFeed();
        }
        catch(Exception $e) {$results = null;}
    }
 //foreach ($albums as $i => $albumId) {
	 ini_set('max_execution_time', 500);
 $photoList = $facebook -> api('/' . $albumId . '/photos', 'GET');
 foreach ($photoList["data"] as $photo) {
 	
 	$entry = new Zend_Gdata_Photos_AlbumEntry();
$entry->setTitle($service->newTitle("test album"));
$service->insertAlbumEntry($entry);
file_put_contents(basename($photo["source"]),file_get_contents($photo["source"]));
$fd = $service->newMediaFileSource(basename($photo["source"]));
$fd->setContentType("image/".pathinfo($photo["source"], PATHINFO_EXTENSION));

$entry = new Zend_Gdata_Photos_PhotoEntry();
$entry->setMediaSource($fd);
$entry->setTitle($service->newTitle(basename($photo["source"])));



$albumQuery = new Zend_Gdata_Photos_AlbumQuery();
$albumQuery->setUser($user);
$albumQuery->setAlbumId($album_id);
 
$albumEntry = $service->getAlbumEntry($albumQuery);
 
$service->insertPhotoEntry($entry, $albumEntry);
 //$zip->addFromString(basename($photo["source"]),file_get_contents($photo["source"]));
 unlink(basename($photo["source"]));
}
}

}
} catch (Exception $e) {
    echo "fail";
}


?>