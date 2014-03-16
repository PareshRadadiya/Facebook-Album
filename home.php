
<?php
require_once ("php-sdk/Fbcredentials.php");
require_once ("header.php");
?>

<section id="main-content">
	
  <div class="row centered-text">
       <div id="albums" class="row centered-text">
  	</div>  
  </div>
  <div id="slides">
 <!--Demo styles (you can delete this block)-->
	
	<ul id="demo-block">
		<li><a href="http://buildinternet.com/project/supersized/" target="_blank"><img src="img/supersized-logo.png"/></a></li>
		<li>Photographers: <a href="http://cargocollective.com/mariakazvan" target="_blank">Maria Kazvan</a>, <a href="http://colindub.com" target="_blank">Colin Wojno</a>, &amp; <a href="http://brookeshaden.com/" target="_blank">Brooke Shaden</a></li>
	</ul>
	
	<!--End of styles-->

	<!--Thumbnail Navigation-->
	<div id="prevthumb"></div>
	<div id="nextthumb"></div>
	
	<!--Arrow Navigation-->
	<a id="prevslide" class="load-item"></a>
	<a id="nextslide" class="load-item"></a>
	
	<div id="thumb-tray" class="load-item">
		<div id="thumb-back"></div>
		<div id="thumb-forward"></div>
	</div>
	
	<!--Time Bar-->
	<div id="progress-back" class="load-item">
		<div id="progress-bar"></div>
	</div>
	
	<!--Control Bar-->
	<div id="controls-wrapper" class="load-item">
		<div id="controls">
			
			<a id="play-button"><img id="pauseplay" src="img/pause.png"/></a>
		
			<!--Slide counter-->
			<div id="slidecounter">
				<span class="slidenumber"></span> / <span class="totalslides"></span>
			</div>
			
			<!--Slide captions displayed here-->
			<div id="slidecaption"></div>
			
			<!--Thumb Tray button-->
			<a id="tray-button"><img id="tray-arrow" src="img/button-tray-up.png"/></a>
			
			<!--Navigation-->
			<ul id="slide-list"></ul>
			
		</div>
	</div>
</div>
 </section>
 
 
<?php
require_once ("footer.php");
?>