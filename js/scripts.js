// to store all albums IDs
var albumids = new Array();

// to store all selected albums IDs
var albumidsselect = new Array();

var fbAuthResp;

$(document).ready(function() {
	$('#supersized-loader').hide();
	$('#supersized').hide();

	// Download all selected albums
	$('#download_album_select').click(function(event) {
		event.preventDefault();
		//Album ids to array for download
		var i = 0;
		$('.checkboxSelect:checked').each(function() {

			albumidsselect[i] = $(this).val();
			i++;

		});
		downloadAllAlbums(albumidsselect);
	});

	// Move all selected albums
	$('#move_album_select').click(function(event) {
		event.preventDefault();
		//Album ids to array for download
		var i = 0;
		$('.checkboxSelect:checked').each(function() {

			albumidsselect[i] = $(this).val();
			i++;

		});
		moveAllAlbums(albumidsselect);
	});

	//Logout
	$('#logout').click(function() {
		FB.logout(function(response) {
			// user is now logged out
			window.location.reload();
			$("#fblogin").show();
			$("#fbicon").show();
			$('#supersized-loader').hide();
		});
	});

});

//Authanticate User with app
$("#fblogin").click(function() {

	$('#supersized-loader').show();
	FB.login(function(response) {
		if (response.authResponse) {
			fbAuthResp = response;
			//Set Accesstoken of user in session
			$.ajax({
				url : 'fb.php',
				type : 'post',
				data : {
					'accesstoken' : response.authResponse.accessToken
				},
				success : function(data) {

				}
			});
			//Get User Name
			FB.api('/me?fields=name', function(respo) {
				$("#UserName").html(respo.name);
				$("#title").html(respo.name + "'s Albums");
				$("#fblogin").hide();
				$("#fbicon").hide();
				$('#ProfilePic').attr('src', 'http://graph.facebook.com/' + respo.id + '/picture?width=500&height=500');
				//Get All ablums of user
				FB.api('/me/albums', showAlbums);
			});

		} else {
			//User close auth window
			$('#supersized-loader').hide();
			alert('User cancelled login or did not fully authorize.');
		}
	}, {
		scope : 'email,user_photos,friends_photos'
	});

});

/**
 * Process response of /me/albums and display it
 */
function showAlbums(response) {
	$('#galleryLoading').hide();
	$('.container').show();
	$('#supersized-loader').hide();
	$.each(response.data, function(key, value) {

		//Album ids to array for download
		albumids[key] = value.id;

		//create html structure
		//var strHtml = '' + '<div id="album_' + key + '" class="large-4 small-6 columns"> ' + '<a href="#" class="album_link_' + key + '"><img style="height:200px;width:200px;" class="imgcover" id="album_cover_' + key + '" /></a>' + '<img id="loading_' + key + '" src="../img/ajax-loader.gif" /><div class="panel"><input class="checkboxSelect" id="checkbox_' + key + '" type="checkbox" value="' + value.id + '"><a for="checkbox_' + key + '" href="#" class="album_link_' + key + '"><h5>' + value.name + '</h5></a><label class="subheader">' + value.count + ' photos</label><ul class="button-group"><li><a title="Download" id="download_album_' + key + '" class="button success tiny step fi-download size-36"></a></li><li><a title="Move to Picasa" id="move_album_' + key + '" class="button success tiny">Move</a></li></ul>' + '</div></div>';
var strHtml="<div class='medium-4 large-4 columns supporticons'><a href='javascript:show_albums_photos("+value.id+")' class='album_link_'" + key +"'><img class='uiMediaThumb'  id='album_cover_"+key+"'><h3>"+value.name+"</h3><p>"+value.count+"</p></a></div>";
		$('#albums').append(strHtml);
		FB.api('/' + value.cover_photo , function(response) {
			if (!response.picture) {
				$('#album_' + key).hide();
			} else {
				$('#loading_' + key).hide();
				$('#album_cover_' + key).attr("src", response.picture);
			}
		});

		//Show albums photos in gallery
		/*$('.album_link_' + key).click(function(event) {
			event.preventDefault();
			
			show_albums_photos(value.id);
		});*/

		//Download album & zip creation
		$('#download_album_' + key).click(function(event) {
			event.preventDefault();
			downloadAlbum(value.id);
		});

		//Move the albums to google plus/picasa
		$('#move_album_' + key).click(function(event) {
			event.preventDefault();
			moveAlbum(value.id);
		});

	});

	//Download all albums & zip creation
	$('#download_album_all').click(function(event) {
		event.preventDefault();
		downloadAllAlbums(albumids);
	});

	//Move all albums
	$('#move_album_all').click(function(event) {
		event.preventDefault();
		moveAllAlbums(albumids);
	});

}

/**
 * To start downalod all images and zip in to file
 */
function downloadAlbum(albumId) {
	$("#downloadlink").hide();
	$("#downloadprogress").show();
	$('#openmodal').click();
	//location.href="fb.php?albumid="+ albumId;
	$.ajax({
		url : 'fb.php?albumid=' + albumId,
		type : 'get',
		success : function(data) {
			//show download button
			$("#downloadprogress").hide();
			$("#downloadlink").show();
			$("#hrefDownload").attr('href', albumId + '.zip');
		},
		error : function(data) {
			//Handle error
			alert('Error Occure on server,Please Try again')
		}
	});
}

/**
 * To start move images to google picasa
 */
function moveAlbum(albumId) {
	$("#downloadlink").hide();
	$("#downloadprogress").show();
	$('#openmodal').click();
	//location.href = "fb.php?albumid=" + albumId +"&move=true";
	$.ajax({
		url : 'fb.php?albumid=' + albumId + '&move=true',
		type : 'get',
		success : function(data) {
			location.href = "picasamove.php?albumid=" + albumId;
		},
		error : function(data) {
			alert('Error Occure on server,Please Try again');
		}
	});
}

/**
 * To start move images to google picasa
 */
function moveAllAlbums(albumIds) {
	$("#downloadlink").hide();
	$("#downloadprogress").show();
	$('#openmodal').click();
	//location.href = "fb.php?albumids=" + albumIds +"&move=true";
	$.ajax({
		url : 'fb.php?albumids=' + albumIds + '&move=true',
		type : 'get',
		success : function(data) {
			location.href = "picasamove.php?albumids=" + albumIds;
		},
		error : function(data) {
			//Handle error
			alert('Error Occure on server,Please Try again')
		}
	});
}

/**
 * To start downalod all albums and zip
 */
function downloadAllAlbums(albumIds) {
	var uid;
	$("#downloadlink").hide();
	$("#downloadprogress").show();
	$('#openmodal').click();
	//location.href="fb.php?albumids="+ albumIds;
	$.ajax({
		url : 'fb.php?albumids=' + albumIds,
		type : 'get',
		success : function(data) {
			//get userid from facebook api
			FB.api('/me', function(response) {
				//show download button
				$("#downloadprogress").hide();
				$("#downloadlink").show();
				$("#hrefDownload").attr('href', response.id + '.zip');
			});

		},
		error : function(data) {
			//Handle error
			alert('Error Occure on server,Please Try again')
		}
	});
}

//get all photos for an album and hide the album view

var lastAlbumId;
function show_albums_photos(album_id) {

	lastAlbumId = album_id;
	
	if ($('#album_' + album_id).length > 0) {
		$('#album_' + album_id).show();
	} else {
		FB.api('/' + album_id + '/photos', function(response) {
			var arrPhotos = [];
			$("#slides").html("<ul id='temp'  data-orbit data-orbit data-options='timer: true; animation:slide;pause_on_hover:false;timer_speed: 3000;animation_speed:1500;variable_height: false;'></ul>");
			
			$.each(response.data, function(key, value) {
				
				
				 $("#temp").append("<li data-orbit-slide='headline-2'><img class='orbit_img' src='"+value.source+"' alt='slide 1' /><div class='orbit-caption'>Subheadline</div></li>");
				
			});
			
     
			$(document).foundation('orbit');
  
		});
		$("#slides").fullscreen();

	}
}

//back to album from full screen slideshow
$("#backtoalbum").click(function() {
	$('#supersized-loader').hide();
	$('#supersized').hide();
	$('#slider').hide();
	$("#thumb-list").remove();
	$("#supersized").html('');
	$('.connect').show();
	$('.top-bar').show();
});

//Download Button in  Slideshow
$("#btnDownload").click(function() {
	downloadAlbum(lastAlbumId);
});

//Move Button in  Slideshow
$("#btnMove").click(function() {
	moveAlbum(lastAlbumId);
});
$(document).bind('fscreenchange', function(e, state, elem) {
		// if we currently in fullscreen mode
		if ($.fullscreen.isFullScreen()) {
			$('#slides').show();
		} else {
			$('#slides').hide();
			//$('#fullscreen .exitfullscreen').hide();
		}
		$('#state').text($.fullscreen.isFullScreen() ? '' : 'not');
	});