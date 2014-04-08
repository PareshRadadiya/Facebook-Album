/**
 * Callback of fb login status change
 */
var id, operation;
function getLoginStatus(response) {
	if (response.status === 'connected') {
		$.post("service/SetToken.php", {
			"provider" : 'facebook',
			"accessToken" : response.authResponse.accessToken
		});
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
	var arr = ["<div class='two-wide blue live-tile' data-delay='4000'>", "<div class='two-wide blue live-tile' data-mode='flip' data-delay='4000'>", "<div class='two-wide blue live-tile' data-mode='carousel' data-direction='horizontal' data-delay='4000'>"];
	$.each(response.data, function(index, value) {
		var liveTile = "";
		FB.api('/' + value.id + "/photos", function(response) {
			$.each((response.data).slice(0, 2), function(key, val) {
				if (value.name == "Cover Photos") {
					$(window).resize();
					$(".cover-orbit").append("<li><img src='" + val.source + "' /><div class='orbit-caption'>" + value.from.name + "</div></li>");
					$(document).foundation('orbit');
					
				}
				if (key < 2) {
					if (val.source != "") {
						liveTile += "<div><img  class='full' src='" + val.source + "' alt='3'> <span class='tile-title red'>" + value.name + "</div>";
					} else {
						liveTile += "<div><img  class='full' src='lib/MetroJs/metroIcons.jpg' alt='3'> <span class='tile-title red'>" + value.name + "</span></div>";
					}
				}
			});
			var no = Math.floor((Math.random() * 3) + 1) - 1;
			$('#albums').append("<li><a href='album.php?id=" + value.id + "'>" + arr[no] + liveTile + "</div></a><ul class='button-group'><li style='float:none;'><a href='javascript:downloadAlbum(" + value.id + ")' class='fbstyle tiny button fi-download' ></a><a href='javascript:moveAlbum(" + value.id + ")' class='fbstyle tiny button fi-social-picasa' ></a> <input style='width:20px;height:20px;' value='" + value.id + "' type='checkbox'></li></ul></li>");
			$(".live-tile, .flip-list").not(".exclude").liveTile();
		});
	});
}

/**
 * Used to download one album
 * @param {Object} albumId is id of album being downloaded
 */
function downloadAlbum(albumId) {
	$.blockUI({
		message : '<h4><img width="50px" height="50px;" src="asset/img/1389435415272.gif" />Your album is being prepared...</h4>'
	});
	var albums = [albumId];
	$.post("service/DownloadAlbum.php", {
		"albums" : albums
	}, function(response) {
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
 * Used to download selected albums
 */
function downloadAlbums() {
	$.blockUI({
		message : '<h4><img width="50px" height="50px;" src="asset/img/1389435415272.gif" />Your albums is being prepared...</h4>'
	});
	var albums = $("input:checkbox:checked").map(function() {
		return $(this).val();
	}).get();
	$.post("service/DownloadAlbum.php", {
		"albums" : albums
	}, function(response) {
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
 * Used to download all albums
 */
function downloadAll() {
	$.blockUI({
		message : '<h4><img width="50px" height="50px;" src="asset/img/1389435415272.gif" />Your albums is being prepared...</h4>'
	});
	var albums = $("input:checkbox").map(function() {
		return $(this).val();
	}).get();
	$.post("service/DownloadAlbum.php", {
		"albums" : albums
	}, function(response) {
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
 * Used to move single album to google+
 * @param {Object} albumId is the id of album being moved
 */
function moveAlbum(albumId) {
	$.blockUI({
		baseZ : 99999,
		message : '<h4><img width="50px" height="50px;" src="asset/img/1389435415272.gif" />Your album is being moved to google+...</h4>'
	});
	$.get("service/getToken.php", function(response) {
		if (response == "1") {
			var albums = [albumId];
			$.post("service/MoveAlbum.php", {
				"albums" : albums
			}, function(response) {
				$.unblockUI();
				if (response == "fail") {
					toastr.error("Opps, something wasn't right, Try again");
				} else {
					toastr.success('Album is moved sucessfully.');
				}
			});
		} else {
			id = albumId;
			operation = "single";
			$.unblockUI();
			$('#loginModal').foundation('reveal', 'open');
		}
	});
}

/**
 * Used to move selected albums to google+
 */
function moveAlbums() {
	$.blockUI({
		message : '<h4><img width="50px" height="50px;" src="asset/img/1389435415272.gif" />Your albums is being moved to google+...</h4>'
	});
	$.get("service/getToken.php", function(response) {
		if (response == "1") {
			var albums = $("input:checkbox:checked").map(function() {
				return $(this).val();
			}).get();
			$.post("service/MoveAlbum.php", {
				"albums" : albums
			}, function(response) {
				$.unblockUI();
				if (response == "fail") {
					toastr.error("Opps, something wasn't right, Try again");
				} else {
					toastr.success('Album is moved sucessfully.');
				}
			});
		} else {
			$.unblockUI();
			operation = "multiple";
			$('#loginModal').foundation('reveal', 'open');
		}
	});
}

/**
 * Used to move all fb albums to google+
 */
function moveAll() {
	$.blockUI({
		message : '<h4><img width="50px" height="50px;" src="asset/img/1389435415272.gif" />Your albums is being moved to google+...</h4>'
	});
	$.get("service/getToken.php", function(response) {
		if (response == "1") {
			var albums = $("input:checkbox").map(function() {
				return $(this).val();
			}).get();
			$.post("service/MoveAlbum.php", {
				"albums" : albums
			}, function(response) {
				$.unblockUI();
				if (response == "fail") {
					toastr.error("Opps, something wasn't right, Try again");
				} else {
					toastr.success('Album is moved sucessfully.');
				}
			});
		} else {
			$.unblockUI();
			operation = "all";
			$('#loginModal').foundation('reveal', 'open');
		}
	});
}

/**
 * Used to login into google+
 */
function googleLogin() {
	$.blockUI({message : '<h4><img width="50px" height="50px;" src="asset/img/1389435415272.gif" />Authenticating.......</h4>'});
	$('#loginModal').foundation('reveal', 'close');
	var sendData = {
		"provider" : 'picasa',
		"username" : $("#username").val(),
		"password" : $("#password").val()
	};
	$.post("service/SetToken.php", sendData, function(response) {
		$.unblockUI();
		if (response != "success") {
			$('#loginModal').foundation('reveal', 'open');
			toastr.error('Incorrect Google+ User ID or Password');
		} else {
			toastr.success('Authenticated successfully....');
			// After successfully authentication resume the moving process
			if (operation == "single") {
				moveAlbum(id);
			} else if (operation == "multiple") {
				moveAlbums();
			} else if (operation == "all") {
				moveAll();
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