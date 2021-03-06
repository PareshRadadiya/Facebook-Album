<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Facebook Album</title>
		<link rel="stylesheet" type="text/css" href="asset/css/normalize.css">
		<link rel="stylesheet" type="text/css" href="asset/css/foundation.css">
		<link type="text/css" rel="stylesheet" href="asset/css/fbalbum.css">
		<script src="asset/js/vendor/modernizr.js"></script>
		<script src="asset/js/vendor/jquery.js"></script>
		<script src="asset/js/foundation.min.js"></script>
		<script>
			$(document).foundation();

			$(document).ready(function() {

				$.ajaxSetup({cache : true,cookie : true,oauth : true});
				$.getScript('//connect.facebook.net/en_UK/all.js', function() {
					FB.init({appId : '209721652515800'});
					FB.getLoginStatus(function(response) {
						if (response.status === 'connected') {
							$.post("service/SetToken.php", {"provider" : 'facebook',"accessToken" : response.authResponse.accessToken}, function() {
								window.location.href = "home.php";
							});
						}
					});
				});

				$(".fbstyle").click(function() {
					FB.login(function(response) {
						if (response.authResponse) {
							var authResponse=response.authResponse;
							FB.api('/me', function(response) {
								$.post("service/SetToken.php", {"provider" : 'facebook',"accessToken" :authResponse.accessToken}, function() {
									window.location.href = "home.php";
								});
							});
						}
					}, {scope : 'email,user_photos'})
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
							<h1>Facebook Album</h1>
							<br>
							<h3>Download your Facebook albums
							<br class="hide-for-small">
							and move it to picasa.</h3>
							<br>
						</div>
					</div>

					<div class="row">
						<div class="large-4 medium-6 columns">
							<button class="large button hide-for-small fbstyle">
								Connect with facebook
							</button>
							<button class="small button show-for-small fbstyle">
								Connect with facebook
							</button>
						</div>
					</div>

					<div class="floatingyeti">
						<img src="asset/img/Facebook_like_thumb.png">
					</div>
				</section>
				<a class="exit-off-canvas"></a>
			</div>
		</div>
	</body>
</html>