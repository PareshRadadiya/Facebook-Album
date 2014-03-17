/*
 *  callback for fb connection stat change
 */

function getLoginStatus(response){
  if (response.status === 'connected') {
  $.post("php-sdk/SetToken.php",{"accessToken":response.authResponse.accessToken});
  	// callback for album load compleat
  	FB.api('/me/albums', loadAlbums);
  }
}

/**
 * get all album and show album cover for download
 */
function loadAlbums(response) {
	$('#slides').hide();
	$.each(response.data, function(index, value) {
		var strHtml="<div id='#album_"+index+"' class='medium-4 large-4 columns supporticons'><a href='javascript:loadPhotos("+value.id+")' class='album_link_'" + index +"'><img class='uiMediaThumb'  id='album_cover_"+index+"'><h3>"+value.name+"</h3></a><ul class='button-group'><li style='float:none;'><a href='javascript:downloadAlbum("+value.id+")' class='fbstyle tiny button fi-download' ></a><a href='#' class='fbstyle tiny button fi-social-picasa' ></a> <input class='size-50' type='checkbox'></li></ul></div>";
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

//get all photos for an album
function loadPhotos(albumId) {
	
	if ($('#album_' + albumId).length > 0) {
		$('#album_' + albumId).show();
	} else {
		FB.api('/' + albumId + '/photos', function(response) {
			var arrPhotos = [];
			$.each(response.data, function(key, value) {
				arrPhotos.push({
					image : value.source,
					title : (value.name != undefined) ? value.name : '',
					thumb : value.picture,
					url : value.link
				});
			});
			jQuery(function($) {
				$.supersized({
					slide_interval : 3000,
					transition : 3, // 0-None, 1-Fade, 2-Slide Top, 3-Slide Right, 4-Slide Bottom, 5-Slide Left, 6-Carousel Right, 7-Carousel Left
					transition_speed : 700, // Speed of transition
					// Components
					slide_links : 'blank', // Individual links for each slide (Options: false, 'num', 'name', 'blank')
					slides : arrPhotos

				});
			});
		});
	
		$("#albums").hide();
		
		$('#slides').show();

	}
}

function downloadAlbum(albumId){
	var albums=[albumId];
	$.post("php-sdk/DownloadAlbum.php",{"albums":albums},function(response){
    	window.location.href="php-sdk/"+response;
    });
}

function downloadAlbums(){
	var albums = $("input:checkbox:checked").map(function(){
      return $(this).val();
    }).get();
    $.post("php-sdk/DownloadAlbum.php",{"albums":albums},function(response){
    	window.location.href="php-sdk/"+response;
    });
}
