<!DOCTYPE html>
<html class="no-js" lang="en">
	<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Facebook Album</title>
    <link rel="stylesheet" type="text/css" href="asset/css/normalize.css">

      <link type="text/css" rel="stylesheet" href="asset/css/foundation.css">
        <link type="text/css" rel="stylesheet" href="asset/css/foundation-icons.css">
  <link type="text/css" rel="stylesheet" href="lib/toastr/toastr.min.css">
 <link type="text/css" rel="stylesheet" href="asset/css/fbalbum.css">
<link type="text/css" rel="stylesheet" href="lib/MetroJs/MetroJs.min.css">

    <script src="asset/js/vendor/modernizr.js"></script>
     <script src="asset/js/vendor/jquery.js"></script>
     <script src="asset/js/foundation.min.js"></script>

  <script src="lib/toastr/toastr.min.js"></script>
  <script src="lib/blockUI/jquery.blockUI.min.js"></script>
     <script src="asset/js/fbalbum.js"></script>
          <script src="lib/MetroJs/MetroJs.min.js"></script>
    <script type="text/javascript">

$(function(){
$(document).foundation(); 	
/**
* Relaod page in chrome to referesh catch
*/
if(/chrom(e|ium)/.test(navigator.userAgent.toLowerCase())){
if(localStorage.getItem("page")){
	console.log(localStorage.getItem("page"));
	localStorage.removeItem("page");
	location.reload();
}
}

 $.ajaxSetup({cache: true ,cookie:true,oauth:true});
  $.getScript('//connect.facebook.net/en_UK/all.js', function(){
    FB.init({
      appId: '209721652515800',
     
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
        <a href="#" class="">Download</a>
        <ul class="dropdown">
        	
          <li><a href="javascript:downloadAll()">Download All</a></li>
          <li><a href="javascript:downloadAlbums()">Download Selected</a></li>
       
        </ul>
      </li>
      <li class="divider"></li>
      <li class="has-dropdown not-click">
        <a href="#" class="">Move</a>
        <ul class="dropdown">
        	
          <li><a href="javascript:moveAll();">Move All</a></li>
          <li><a href="javascript:moveAlbums()">Move Selected</a></li>
         
        </ul>
      </li>  
      <li class="divider"></li>
      <li class="has-form">
        <a href="javascript:logout()" class="alert button expand">Log out</a>
    </li></ul>
  </section>
  </nav>
  
<section>
<ul class="cover-orbit" data-orbit  data-options="animation:slide;pause_on_hover:false; animation_speed:500;navigation_arrows:true;bullets:false;">
</ul>
</section>

<section id="main-content">
		
  <div  class="row centered-text">
    	<ul id="albums" class="large-block-grid-3"></ul>  
  </div>
  
<div style="background-image: url('asset/img/google-plus-social.jpg');background-size:contain;" id="loginModal" class="reveal-modal small" data-reveal>
<p style="color: #D3290E;" class="lead"><img src="asset/img/GooglePlus_red-380x252.jpg" width="50" height="50"/> Sigin with google+</p>
<input type="text" id="username" placeholder="Email Id" />
<input type="password"id="password"  placeholder="Password" />
<input type="button" value="Sigin" class="button alert small" onclick="googleLogin();"/>
<a class="close-reveal-modal">&#215;</a>
</div>

<div  style="background-image: url('asset/img/google-plus-social.jpg');background-size:contain;" id="downloadModal" class="reveal-modal small" data-reveal>
<p style="color: #133783;" class="lead "><img src="asset/img/facebook.png" width="50" height="50"/> Your album is ready to download</p>
<a class="startdownload button fbstyle small fi-download">  Start Download</a>
<a class="close-reveal-modal">&#215;</a>
</div>

</section>
 
</div></div>
</body>
  </html>