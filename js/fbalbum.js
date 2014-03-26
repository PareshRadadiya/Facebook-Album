/*
 *  callback for fb connection stat change
 */
var id,operation;
function getLoginStatus(response){
	console.log(response.status);
  if (response.status === 'connected') {
  $.post("php-sdk/SetToken.php",{"provider":'facebook',"accessToken":response.authResponse.accessToken});
  	// callback for album load compleat
  	FB.api('/me/albums', loadAlbums);
  }else {
   window.location.href="index.php";
  }
}

/**
 * get all album and show album cover for download
 */
function loadAlbums(response) {
	
	$.each(response.data, function(index, value) {
		var strHtml="<div id='#album_"+index+"' class='medium-4 large-4 columns supporticons'><a href='album.php?id="+value.id+"' class='album_link_'" + index +"'><img class='uiMediaThumb'  id='album_cover_"+index+"'><h3>"+value.name+"</h3></a><ul class='button-group'><li style='float:none;'><a href='javascript:downloadAlbum("+value.id+")' class='fbstyle tiny button fi-download' ></a><a href='javascript:moveAlbum("+value.id+")' class='fbstyle tiny button fi-social-picasa' ></a> <input style='width:20px;height:20px;' value='"+value.id+"' type='checkbox'></li></ul></div>";
		$('#albums').append(strHtml);
		FB.api('/' + value.cover_photo , function(response) {
			if (!response.picture) {
				$('#album_' + index).hide();
			} else {
				$('#album_cover_' + index).attr("src", response.picture);
			}
			
		});
});

}

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


function picasaLogin(){
	$.blockUI({ message: '<h4><img width="50px" height="50px;" src="img/1389435415272.gif" />Authenticating.......</h4>' });
	var sendData={"provider":'picasa',"username":$("#username").val(),"password":$("#password").val()};
	$.post("php-sdk/SetToken.php",sendData,function(response){
		$.unblockUI();	
		if(response!="success"){
			toastr.error('Invalid Credentials .... ');
		}else{
			toastr.success('Authenticated successfully....');
			$('#loginModal').foundation('reveal', 'close');
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

function logout(){
	FB.logout(function(response) {
  window.location.href="index.php";
});
}
