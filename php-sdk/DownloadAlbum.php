<?php
/**
 *  Download one or more albums base on specified albumId list
 */
try {
	require_once ("facebook.php");
	require_once ("Fbcredentials.php");
	$photoList = array();
	// Array of albumId that user requested for download
	$albums = $_REQUEST["albums"];
	//Check for user is logged in or not
	if ($user) {
		$filename =$user . '.zip';
	$zip = new ZipArchive;
	$zip -> open($filename, ZipArchive::CREATE | ZIPARCHIVE::OVERWRITE);
		foreach ($albums as $i => $albumId) {
			//Set directory name to album id
			$dirName=$albumId;
			ini_set('max_execution_time', 1000);
			$photoList = $facebook -> api('/' . $albumId . '/photos', 'GET');
			//Loop throughout all photos inside album
			foreach ($photoList["data"] as $photo) {
				//Add album photo into zip file
				$zip -> addFromString(basename($photo["source"]), file_get_contents($photo["source"]));
			}
		}
		$zip -> close();
		//Return name of zip file for download
		echo $filename;
	}
} catch (Exception $e) {
	echo "fail";
}
?>