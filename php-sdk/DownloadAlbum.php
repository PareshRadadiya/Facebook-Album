<?php
require_once("facebook.php");
require_once("Fbcredentials.php");
$photoList=array();
$albums = $_REQUEST["albums"];
if($user){
	$filename=$user.'.zip';
  $zip = new ZipArchive;
 $zip -> open($filename, ZipArchive::CREATE | ZIPARCHIVE::OVERWRITE);
 foreach ($albums as $i => $albumId) {
 	 //addToZip($albumId);
	 ini_set('max_execution_time', 500);
$photoList = $facebook -> api('/' . $albumId . '/photos', 'GET');
 foreach ($photoList["data"] as $photo) {
	$zip->addFromString(basename($photo["source"]),file_get_contents($photo["source"]));
}

 $zip->close();
/*header('Content-disposition: attachment; filename='.$filename);
header('Content-type: application/zip');
readfile($filename);
unlink($filename);*/
echo $filename;
}



}
?>