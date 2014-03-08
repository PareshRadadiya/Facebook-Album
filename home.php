
<?php
require_once ("php-sdk/Fbcredentials.php");
?>
<html>
  <head>
    <script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
    <link rel="stylesheet" href="style.css" />
    <title>jQuery Example</title>
    <script src="js/scripts.js"></script>
    <script>
      $(document).ready(function() {
  $.ajaxSetup({ cache: true });
  $.getScript('//connect.facebook.net/en_UK/all.js', function(){
    FB.init({
      appId: '<?php echo $AppId; ?>',
    });     
    $('#loginbutton,#feedbutton').removeAttr('disabled');
    FB.getLoginStatus(updateStatusCallback);
  });
});
function updateStatusCallback(response){
  if (response.status === 'connected') {
  	FB.api('/me/albums', showAlbums);
  }
}
    </script>
  </head>
  <body>
  	<div id="albums"></div>
  </body>
  </html>

