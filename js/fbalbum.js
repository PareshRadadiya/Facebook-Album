/**
 * Callback of fb login status change 
 */
var id,operation;
function getLoginStatus(response){
  if (response.status === 'connected') {
  $.post("php-sdk/SetToken.php",{"provider":'facebook',"accessToken":response.authResponse.accessToken});
  	// callback for album load compleat
  	FB.api('/me/albums', loadAlbums);
  }else {
  //Redirect to login page if not connected to fb
   window.location.href="index.php";
  }
}

/**
 * load album photo into live tiles
 */
function loadAlbums(response) {
	var arr = ["<div class='two-wide blue live-tile' data-delay='3000'>", "<div class='two-wide blue live-tile' data-mode='flip' data-delay='2000'>", "<div class='two-wide blue live-tile' data-mode='carousel' data-direction='horizontal' data-delay='2500'>" ];
	$.each(response.data, function(index, value) {		
		var liveTile="";
		FB.api('/' + value.id +"/photos", function(response) {
			$.each((response.data).slice(0, 2),function(key,val){
				if(key<2){
					if(val.source!=""){
						liveTile+="<div><img  class='full' src='"+val.source+"' alt='3'> <span class='tile-title red'>"+value.name+"</div>";
					}else{
						liveTile+="<div><img  class='full' src='lib/MetroJs/metroIcons.jpg' alt='3'> <span class='tile-title red'>"+value.name+"</span></div>";
					}
				}
				
			});	
			var no=Math.floor((Math.random()*3)+1)-1;
			$('#albums').append("<li>"+arr[no]+liveTile+"</div><ul class='button-group'><li style='float:none;'><a href='javascript:downloadAlbum("+value.id+")' class='fbstyle tiny button fi-download' ></a><a href='javascript:moveAlbum("+value.id+")' class='fbstyle tiny button fi-social-picasa' ></a> <input style='width:20px;height:20px;' value='"+value.id+"' type='checkbox'></li></ul></li>");
				$(".live-tile, .flip-list").not(".exclude").liveTile();	
		});

});
}
/**
 * Used to download one album
 * @param {Object} albumId is id of album being downloaded
 */
function downloadAlbum(albumId){
	$.blockUI({ message: '<h4><img width="50px" height="50px;" src="img/1389435415272.gif" />Your album is being prepared...</h4>' });
	var albums=[albumId];
	$.post("php-sdk/DownloadAlbum.php",{"albums":albums},function(response){
		$.unblockUI();
		if(response!="fail" && response.split(".")[1]=="zip"){	
		$(".startdownload").attr("href","php-sdk/"+response);
		$(".startdownload").click(function(){
			$('#downloadModal').foundation('reveal', 'close');
		});
		$('#downloadModal').foundation('reveal', 'open');
		}else{
			toastr.error('Something bad happen');
		}
    });
}
/**
 * Used to download selected albums 
 */
function downloadAlbums(){
	$.blockUI({ message: '<h4><img width="50px" height="50px;" src="img/1389435415272.gif" />Your albums is being prepared...</h4>' });
	var albums = $("input:checkbox:checked").map(function(){
      return $(this).val();
    }).get();
     $.post("php-sdk/DownloadAlbum.php",{"albums":albums},function(response){
     	$.unblockUI();
     	if(response!="fail" && response.split(".")[1]=="zip"){		
    	$(".startdownload").attr("href","php-sdk/"+response);
    	$(".startdownload").click(function(){
			$('#downloadModal').foundation('reveal', 'close');
		});
		$('#downloadModal').foundation('reveal', 'open');
     	}else{
     		toastr.error('Something bad happen');
     	}
     
    });
}
/**
 * Used to download all albums 
 */
function downloadAll(){
	$.blockUI({ message: '<h4><img width="50px" height="50px;" src="img/1389435415272.gif" />Your albums is being prepared...</h4>' });
	var albums = $("input:checkbox").map(function(){
      return $(this).val();
    }).get();
     $.post("php-sdk/DownloadAlbum.php",{"albums":albums},function(response){
     	$.unblockUI();	
     	if (response!="fail" && response.split(".")[1]=="zip") {
    	$(".startdownload").attr("href","php-sdk/"+response);
    	$(".startdownload").click(function(){
			$('#downloadModal').foundation('reveal', 'close');
		});
		$('#downloadModal').foundation('reveal', 'open');
     	}else{
     		toastr.error('Something bad happen');
     	}
     
    });
}
/**
 * Used to move single album to google+ 
 * @param {Object} albumId is the id of album being moved
 */
function moveAlbum(albumId){
	$.blockUI({ message: '<h4><img width="50px" height="50px;" src="img/1389435415272.gif" />Your album is being moved to google+...</h4>' });
	$.get("php-sdk/getToken.php",function(response){
		if(response=="1"){
			var albums=[albumId];
			$.post("php-sdk/MoveAlbum.php",{"albums":albums},function(response){
				$.unblockUI();	
				if (response=="fail") {
					toastr.error('Something bad happen');
				}else{
					toastr.success('Album is moved sucessfully.');
				}
   			});
		}else{
			id=albumId;
			operation="single";
			$.unblockUI();	
			$('#loginModal').foundation('reveal', 'open');
		}
	});
}
/**
 * Used to move selected albums to google+ 
 */
function moveAlbums(){
	$.blockUI({ message: '<h4><img width="50px" height="50px;" src="img/1389435415272.gif" />Your albums is being moved to google+...</h4>' });
	$.get("php-sdk/getToken.php",function(response){
	if(response=="1"){
		var albums = $("input:checkbox:checked").map(function(){
      	return $(this).val();
    	}).get();
     	$.post("php-sdk/MoveAlbum.php",{"albums":albums},function(response){
  			$.unblockUI();	
			if (response=="fail") {
			toastr.error('Something bad happen');
			}else{
					toastr.success('Album is moved sucessfully.');
				}
    	});
	}else{
		$.unblockUI();	
		operation="multiple";
		$('#loginModal').foundation('reveal', 'open');
	}
	});
}
/**
 * Used to move all fb albums to google+ 
 */
function moveAll(){
	$.blockUI({ message: '<h4><img width="50px" height="50px;" src="img/1389435415272.gif" />Your albums is being moved to google+...</h4>' });
	$.get("php-sdk/getToken.php",function(response){	
	if(response=="1"){
		var albums = $("input:checkbox").map(function(){
      		return $(this).val();
    	}).get();
     	$.post("php-sdk/MoveAlbum.php",{"albums":albums},function(response){
     		$.unblockUI();	
			if (response=="fail") {
				toastr.error('Something bad happen');
			}else{
					toastr.success('Album is moved sucessfully.');
			}
    	});
	}else{
		$.unblockUI();	
		operation="all";
		$('#loginModal').foundation('reveal', 'open');
	}
	});
}

/**
 * Used to login into google+ 
 */
function googleLogin(){
	$.blockUI({ message: '<h4><img width="50px" height="50px;" src="img/1389435415272.gif" />Authenticating.......</h4>' });
	var sendData={"provider":'picasa',"username":$("#username").val(),"password":$("#password").val()};
	$.post("php-sdk/SetToken.php",sendData,function(response){
		$.unblockUI();	
		if(response!="success"){
			toastr.error('Incorrect Google+ User ID or Password');
		}else{
			toastr.success('Authenticated successfully....');
			$('#loginModal').foundation('reveal', 'close');
			// After successfully authentication resume the moving process
			if(operation=="single"){
				moveAlbum(id);
			}else if(operation=="multiple"){
				moveAlbums();
			}else if(operation=="all"){
				moveAll();
			}
		}
	});
}
/**
 * Used to logout from facebook and redirect to login page 
 */
function logout(){
	FB.logout(function(response) {
  window.location.href="index.php";
});
}
