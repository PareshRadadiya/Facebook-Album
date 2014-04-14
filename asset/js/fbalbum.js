/**
 * Callback of fb login status change
 */
function getLoginStatus(response) {
	if (response.status === 'connected') {
		// Callback for album load compleat
		FB.api('/me/albums', loadAlbums);
	} else {
		//Redirect to login page if not connected to fb
		window.location.href = "index.php";
	}
}

/**
 * load album photo into live tiles
 */
function loadAlbums(response) {
	var arr = ["<div class='blue live-tile' data-delay='4000'>", "<div class='blue live-tile' data-mode='flip' data-delay='4000'>", "<div class='blue live-tile' data-mode='carousel' data-direction='horizontal' data-delay='4000'>"];
	$.each(response.data, function(index, value) {
		var liveTile = "";
		if(value.count!=undefined){
		FB.api('/' + value.id + "/photos", function(response) {
			$.each((response.data).slice(0, 2), function(key, val) {
				if (value.name == "Cover Photos") {
					$(window).resize();
					$(".cover-orbit").append("<li><img src='" + val.source + "' /><div class='orbit-caption'>" + value.from.name + "</div></li>");
					$(document).foundation('orbit');	
				}
				if (key < 2) {
					if (val.picture != "") {
						liveTile += "<div><img  class='full' src='" + val.picture + "' alt='3'> <span class='tile-title red'>" + value.name + "</div>";
					} else {
						liveTile += "<div><img  class='full' src='lib/MetroJs/metroIcons.jpg' alt='3'> <span class='tile-title red'>" + value.name + "</span></div>";
					}
				}
			});
			var no = Math.floor((Math.random() * 3) + 1) - 1;
		var type='single';
			$('#albums').append("<li><a class='th' href='album.php?id=" + value.id + "'>" + arr[no] + liveTile + "</div></a><ul style='margin-left: 50px;' class='button-group'><li><a href='javascript:downloadAlbum(\"single\"," + value.id + ")' class='fbstyle tiny button fi-download' ></a><a href='javascript:moveAlbum(\"single\"," + value.id + ")' class='fbstyle tiny button fi-social-picasa' ></a> <input style='width:20px;height:20px;' value='" + value.id + "' type='checkbox'></li></ul></li>");
			$(".live-tile, .flip-list").not(".exclude").liveTile();
			
		});
		}
	});
}

/**
 * Used to download album zip
 * @param {downloadType} downloadType used to specify download type like single or multiple or all
 * @param {Object} albumId is id of album being downloaded
 */
function downloadAlbum(downloadType,albumId) {
	$.blockUI({message : '<h4><img width="50px" height="50px;" src="asset/img/1389435415272.gif" />Your album is being prepared...</h4>'});
	var albums;
	if(downloadType=="single"){
		albums = [albumId];
	}else if(downloadType=="multiple"){
		albums = $("input:checkbox:checked").map(function() {
				return $(this).val();
			}).get();
	}else if(downloadType=="all"){
		albums = $("input:checkbox").map(function() {
				return $(this).val();
			}).get();
	}
	$.post("service/DownloadAlbum.php", {"albums" : albums}, function(response) {
		$.unblockUI();
		if (response != "fail" && response.split(".")[1] == "zip") {
			$(".startdownload").attr("href", "service/" + response);
			$(".startdownload").click(function() {
				$('#downloadModal').foundation('reveal', 'close');
			});
			$('#downloadModal').foundation('reveal', 'open');
		} else {
			toastr.error("Opps, something wasn't right, Try again");
		}
	});
}

/**
 * Used to move album to google+
 * @param {moveType} moveType used to specify move type like single or multiple or all
 * @param {albumId} albumId is the id of album being moved
 */
function moveAlbum(moveType,albumId) {
	$.blockUI({message : '<h4><img width="50px" height="50px;" src="asset/img/1389435415272.gif" />Your album is being moved to google+...</h4>'});
	var albums;
	if(moveType=="single"){
		albums = [albumId];
	}else if(moveType=="multiple"){
		albums = $("input:checkbox:checked").map(function() {
				return $(this).val();
			}).get();
	}else if(moveType=="all"){
		albums = $("input:checkbox").map(function() {
				return $(this).val();
			}).get();
	}
	$.post("service/MoveAlbum.php", {"albums" : albums}, function(response) {
		
		$.unblockUI();
		if (/google/i.test(response)){
			window.location.href=response;
		}else{
			if (response != "success") {
				toastr.error("Opps, something wasn't right, Try again");
			} else {
				toastr.success('Album is moved sucessfully.');
			}
		}
	});
}

/**
 * Used to logout from facebook and redirect to login page
 */
function logout() {
	FB.logout(function(response) {
		window.location.href = "index.php";
	});
}


