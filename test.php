<!DOCTYPE html>
<html>
	<head>
		<script src="js/vendor/jquery.js"></script>
		<script>
		$(function(){
			var ar=new Array();
			$("#send").click(function(){
				$.each($(".ck"),function(key,val){
					ar.push($(this).val());
				});
				//ar.push("5")
				$.post("php-sdk/test.php",{"data[]":ar});
			});
			
			
		});
		
		
		</script>
		
		</head>
		<body>
			
			
				<input type="checkbox" class="ck" value="4">
			<input type="checkbox" class="ck" value="5">

<input type="checkbox" class="ck" value="1">

<input type="checkbox" class="ck" value="2">

<input type="checkbox" class="ck" value="3">
<input type="button" id="send" name="send" />


			
		</body>
		</html>