<!DOCTYPE html>
<html>
	<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Facebook Album</title>
    <link rel="stylesheet" type="text/css" href="css/normalize.css">
                 <link type="text/css" rel="stylesheet" href="lib/slideshow/css/supersized.css">
            <link type="text/css" rel="stylesheet" href="lib/slideshow/theme/supersized.shutter.css">
      <link type="text/css" rel="stylesheet" href="css/foundation.css">
        <link type="text/css" rel="stylesheet" href="css/foundation-icons.css">


          
 <link type="text/css" rel="stylesheet" href="css/fbalbum.css">
    <script src="js/vendor/modernizr.js"></script>
     <script src="js/vendor/jquery.js"></script>
     <script src="js/foundation.min.js"></script>

      <script src="lib/slideshow/js/jquery.easing.min.js"></script>
      <script src="lib/slideshow/js/supersized.3.2.7.min.js"></script>
       <script src="lib/slideshow/theme/supersized.shutter.min.js"></script>


   
     <script src="js/fbalbum.js"></script>
      <script>
  $(document).foundation();
</script>
    <script type="text/javascript">
   
    $(function() {
    	$("#slides").hide();
    	
  $.ajaxSetup({ cache: true ,cookie:true,oauth:true});
  $.getScript('//connect.facebook.net/en_UK/all.js', function(){
    FB.init({
      appId: '<?php echo $appId; ?>',
    });     
   
    FB.getLoginStatus(getLoginStatus);
  });
});
</script>
     
</head>
<body>
	<div class="off-canvas-wrap">
  <div class="inner-wrap">
    <nav class="tab-bar  show-for-small">
      <section class="left-small">
        <a class="left-off-canvas-toggle menu-icon" ><span></span></a>
      </section>

      <section class="middle tab-bar-section">
        <h1 class="title">Facebook</h1>
      </section>

      
    </nav>

    <aside class="left-off-canvas-menu">
      <ul class="off-canvas-list">
        <li><label>Download</label></li>
        <li><a href="http://foundation.zurb.com/learn/features.html">Download All</a></li>
    <li><a href="http://foundation.zurb.com/learn/faq.html">Download Selected</a></li>
      </ul>
       <ul class="off-canvas-list">
        <li><label>Move</label></li>
       <li><a href="http://foundation.zurb.com/templates.html">Move All</a></li>
    <li><a href="http://foundation.zurb.com/docs">Move Selected</a></li>
      </ul>
    </aside>

    


<nav class="top-bar hide-for-small" data-topbar>
  <ul class="title-area">
    <li class="name">
      <h1><a href="#">Facebook</a></h1>
    </li>
  </ul>
  
<section class="top-bar-section">
    <ul class="right">
      <li class="divider"></li>
      <li class="has-dropdown not-click">
        <a href="http://foundation.zurb.com/learn/features.html" class="">Download</a>
        <ul class="dropdown">
        	
          <li><a href="http://foundation.zurb.com/learn/features.html">Download All</a></li>
          <li><a href="http://foundation.zurb.com/learn/faq.html">Download Selected</a></li>
        
        </ul>
      </li>
      <li class="divider"></li>
      <li class="has-dropdown not-click">
        <a href="http://foundation.zurb.com/templates.html" class="">Move</a>
        <ul class="dropdown">
        	
          <li><a href="http://foundation.zurb.com/templates.html">Move All</a></li>
          <li><a href="http://foundation.zurb.com/docs">Move Selected</a></li>
         
        </ul>
      </li>
    
      
     
      <li class="divider"></li>
      <li class="has-form">
        <a href="http://foundation.zurb.com/docs" class="alert button expand">Log out</a>
    </li></ul>
  </section>
  </nav>

