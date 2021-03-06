<?php
require_once("lib/Facebook/facebook.php");
require_once("service/Fbcredentials.php");
?>
<!DOCTYPE html>
<html>
	<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Facebook Album</title>
    <link type="text/css" rel="stylesheet" href="lib/maximage/css/jquery.maximage.min.css">
 	<style type="text/css" media="screen">			
			#maximage {
/*				position:fixed !important;*/
			}
			
			/*Set my logo in bottom left*/
			#logo {
				bottom:30px;
				height:auto;
				left:30px;
				position:absolute;
				width:34%;
				z-index:1000;
			}
			#logo img {
				width:100%;
			}

			#arrow_left, #arrow_right {
				bottom:30px;
				height:67px;
				position:absolute;
				right:30px;
				width:36px;
				z-index:1000;
			}
			#arrow_left {
				right:86px;
			}

			#arrow_left:hover, #arrow_right:hover {
				bottom:29px;
			}
			#arrow_left:active, #arrow_right:active {
				bottom:28px;
			}
		</style>
    
       <link type="text/css" rel="stylesheet" href="asset/css/foundation.css">
        <link type="text/css" rel="stylesheet" href="asset/css/foundation-icons.css">
  <link type="text/css" rel="stylesheet" href="lib/toastr/toastr.min.css">
 <link type="text/css" rel="stylesheet" href="asset/css/fbalbum.css">

    <script src="asset/js/vendor/modernizr.js"></script>
     <script src="asset/js/vendor/jquery.js"></script>
     <script src="asset/js/foundation.min.js"></script>

  <script src="lib/toastr/toastr.min.js"></script>
  <script src="lib/blockUI/jquery.blockUI.min.js"></script>
     <script src="asset/js/fbalbum.js"></script>
       <script src="lib/maximage/js/jquery.easing.min.js"></script>
     
  <script src="lib/maximage/js/jquery.cycle.all.min.js"></script>
  <script src="lib/maximage/js/jquery.maximage.min.js"></script>
   <script type="text/javascript">
   
			$(function(){
				if(/chrom(e|ium)/.test(navigator.userAgent.toLowerCase())){
						localStorage.setItem("page", "album");
				}
			
					$(document).foundation();
				$('#maximage').maximage({
					cycleOptions: {
						fx: 'fade',
						speed: 1000, // Has to match the speed for CSS transitions in jQuery.maximage.css (lines 30 - 33)
						timeout: 500,
						prev: '#arrow_left',
						next: '#arrow_right',
						
					},
					cssBackgroundSize: false,
					backgroundSize: 'auto'
				});
				
			
		
			});
		</script>
     
</head>
<body>
	 <div class="row" style="margin-top: 20px;">
   <div class="medium-4 large-4 columns supporticons">
      <ul class='button-group'><li>
      	<a style="float: left;" href='javascript:downloadAlbum("single",<?php echo $_REQUEST["id"]; ?>)' class='medium hide-for-small fbstyle  button fi-download'> Download </a>
      	<a style="float: left;"  href='javascript:downloadAlbum("single",<?php echo $_REQUEST["id"]; ?>)' class='small show-for-small fbstyle button fi-download'> Download </a>
      	<a style="float: right;" href='javascript:moveAlbum("single",<?php echo $_REQUEST["id"]; ?>)' class='medium hide-for-small fbstyle  button fi-social-picasa'> Move</a>
      	<a style="float: right;" href='javascript:moveAlbum("single",<?php echo $_REQUEST["id"]; ?>)' class='small show-for-small fbstyle  button fi-social-picasa'> Move</a> 
      </li></ul>
   </div>
  </div>
  
<?php

	if(isset($user)){
		if(isset($_REQUEST["id"])){
			$photoList = $facebook -> api('/' . $_REQUEST["id"] . '/photos', 'GET');
			$albumDetail = $facebook -> api('/' . $_REQUEST["id"] , 'GET');
			?>
	<a href="home.php" id="logo">
	<h1 style="color: white;"><?php echo $albumDetail["name"]; ?></h1>
		</a>

	<a href="" id="arrow_left"><img src="asset/img/arrow_left.png" alt="Slide Left" /></a>
		<a href="" id="arrow_right"><img src="asset/img/arrow_right.png" alt="Slide Right" /></a>
<div id="maximage">
	<?php
 foreach ($photoList["data"] as $photo) {
 	?>
			<img src="<?php echo $photo["source"]; ?>"  />
				 	<?php
}
		}
	}else{
		header("Location: index.php");
	}
	
	?>
	
			
		</div>
		
</body>

  </html>
 <div  style="background-image: url('asset/img/google-plus-social.jpg');background-size:contain; z-index: 9999" id="downloadModal" class="reveal-modal small" data-reveal>
  <p style="color: #133783;" class="lead "><img src="asset/img/facebook.png" width="50" height="50"/> Your album is ready to download</p>
<a class="startdownload button fbstyle small fi-download">  Start Download</a>
  <a class="close-reveal-modal">&#215;</a>
</div>
	