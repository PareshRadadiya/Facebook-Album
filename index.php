<!DOCTYPE html>
<html>
	<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Facebook Album</title>
    <link rel="stylesheet" type="text/css" href="css/normalize.css">
        <link rel="stylesheet" type="text/css" href="css/foundation.css">
      <link type="text/css" rel="stylesheet" href="css/fbalbum.css">
    <script src="js/vendor/modernizr.js"></script>
     <script src="js/vendor/jquery.js"></script>
     <script src="js/foundation.min.js"></script>
    <script src="js/scripts.js"></script>
    <script>
  $(document).foundation();
  
  $(document).ready(function(){
  	$(".fbstyle").click(function(){
  		 $.ajaxSetup({ cache: true ,cookie:true,oauth:true});
  $.getScript('//connect.facebook.net/en_UK/all.js', function(){
    FB.init({
      appId: '209721652515800',
    });     
  		 FB.login(function(response) {
   if (response.authResponse) {
     FB.api('/me', function(response) {
     	window.location.href="home.php";
     });
   }
 });
  	});
  	
  });
  });
</script>
  

</head>
  <body>
   
    <div class="off-canvas-wrap">
      <div class="inner-wrap">
         <title>Facebook Album</title>
<nav class="top-bar" data-topbar="">
  <ul class="title-area">
    <li class="name">
      <h1><a href="#">Facebook</a></h1>
    </li>
  </ul>

</nav>

<section id="homepage-hero">

  <div class="row">
    <div class="medium-7 large-6 columns">
      <h1>Facebook Album</h1><br>
      <h3>Download your Facebook albums <br class="hide-for-small">and move it to picasa.</h3>
      <br>
    </div>
  </div>

  <div class="row">
    <div class="large-4 medium-6 columns">
      <button class="large button hide-for-small fbstyle">Connect with facebook</button>
      <button class="small button show-for-small fbstyle">Connect with facebook</button>
    </div>
  </div>

  
  <div class="floatingyeti">
    <img src="img/Facebook_like_thumb.png">
  </div>
</section>
        <a class="exit-off-canvas"></a>
      </div>      
    </div>
   
  

</body></html>
<?php
phpinfo();
?>