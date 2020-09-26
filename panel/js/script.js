


$(document).ready(function(){
	//changePage(page);
	
	window.onpopstate = function(e){
		if(e.state){
			alert(e.state.html);
		}
	};
});

function changePage(page){
	waitingDialog.show("Loading...", {dialogSize: 'sm'});
	setTimeout(function () {
		if(page == ''){page = 'dashboard';}
		page = 'form/'+page;
		
		$.ajax( {
			url: page+'.html',
			type: "GET",
			cache: false,
			success: function(html) {
				$(".main").html(html);
				waitingDialog.hide();
			},
			error: function (xhr, ajaxOptions, thrownError) {
				alert(xhr.status);
				alert(thrownError);
				waitingDialog.hide();
			},
			always: function(){
			}
		});
		
	}, 1000);
}

/*$('a').click(function(e){
	if($(this).attr('href') != '#' && $(this).attr('href') != 'javascript:void(0)'){
		e.preventDefault();
		changePage($(this).attr('href'));
		//window.location.href = $(this).attr('href');
		window.history.pushState("", "", page);
	}
});

$(".nav-sidebar .has-subs > a").click(function(e) {
	e.preventDefault();
	$(".nav-sidebar .nav-sidebar").toggle(300);
});*/

function clearjQueryCache(){
    for (var x in jQuery.cache){
        delete jQuery.cache[x];
    }
}

function show_map(str, tipe, address, lat, lng){
	try{
		$.ajax( {
			url: 'form/maps.html',
			type: "GET",
			cache: false,
			success: function(html) {
				$("#maps .modal-body").html(html);
				$('#maps').modal();
				set_param(str, tipe, address, lat, lng);
			},
			error: function (xhr, ajaxOptions, thrownError) {
				alert(xhr.status);
				alert(thrownError);
			},
			always: function(){
			}
		});
	}	
	catch(e){
		alert(e.message);
	}
}

function show_gallery(str, tipe){
	try{
		$.ajax( {
			url: 'form/gallery.html',
			type: "GET",
			cache: false,
			success: function(html) {
				$("#gallery .modal-body").html(html);
				$('#gallery').modal();
				$('#this_upload input[name=tipe]').val(tipe);
				$('#this_upload input[name=id]').val(str);
				
				load_image(str, tipe);
			},
			error: function (xhr, ajaxOptions, thrownError) {
				alert(xhr.status);
				alert(thrownError);
			},
			always: function(){
			}
		});
	}	
	catch(e){
		alert(e.message);
	}
}


