
function history_back_referrer(){
	var lastURL = document.referrer;
	window.location.replace(lastURL);
}

function datasave(frm){
	var data = $(frm).serializeArray();
	
	$.ajax({
	  method: "POST",
	  url: JS_URL+"modul/crud.php",
	  dataType: "json",
	  data: data,
	  success: function(data){
		  data = data[0];
		  if(data['state'] == 1){
				alert('Data berhasil disimpan. '+data['msg']);
				if ( $(frm).parents("#formPage").length == 1 ) {
					dialog_page_callback();
				}
				else{
					history_back_referrer();
				}
		  }
		  else{
			  alert('Data gagal disimpan, err : '+data['msg']);
		  }
	  }
	});
}

function datasavecallback(frm, callback){
	var data = $(frm).serializeArray();
	//alert(JSON.stringify(data));
	waitingDialog.show("Loading...", {dialogSize: 'sm'});
	$.ajax({
		method: "POST",
		url: JS_URL+"modul/crud.php",
		dataType: "json",
		data: data,
		success: callback,
		error: function(xhr,textStatus,err) {
			waitingDialog.hide();
			alert('Error: ' + xhr.readyState + '; ' + xhr.responseText + '; ' + xhr.status + '; ' + textStatus +'; ' + err);
		}
	});
}

function dataremove(frm){
	var v = confirm("Apakah anda yakin ingin menghapus data ?");
	
	if(v == true){
		var data = $(frm).serializeArray();
		$.ajax({
		  method: "POST",
		  url: JS_URL+"modul/remove.php",
		  dataType: "json",
		  data: data,
		  success: function(data){
			  data = data[0];
			  if(data['state'] == 1){
				  alert('Data berhasil disimpan. '+data['msg']);
				  history_back_referrer();
			  }
			  else{
				  alert('Data gagal disimpan, err : '+data['msg']);
			  }
		  }
		});
	}
}

function set_remove(name, id){
	$('#form-remove input[name=name]').val(name);
	$('#form-remove input[name=id]').val(id);
}

function dataremovecallback(frm, callback){
	var v = confirm("Apakah anda yakin ingin menghapus data ?");
	
	waitingDialog.show("Loading...", {dialogSize: 'sm'});
	if(v == true){
		var data = $(frm).serializeArray();
		$.ajax({
		  method: "POST",
		  url: JS_URL+"modul/remove.php",
		  dataType: "json",
		  data: data,
		  success: callback
		});
	}
}

