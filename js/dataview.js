

function dataview(name, startrow, callback, filterFrm){
	var data = [];
	
	if(filterFrm){
		data = $(filterFrm).find("select,textarea, input").serializeArray();
		data.push({ name: "filter", value: 1 });
	}
	data.push({ name: "name", value: name });
	data.push({ name: "startrow", value: startrow });
	//alert(JS_URL+"modul/view.php");
	$.ajax({
		type: "POST",
		url: JS_URL+"modul/view.php",
		dataType: 'json',
		cache: false,
		data: data,
		success: callback,
		error: function(xhr,textStatus,err) {
			alert('Error: ' + xhr.readyState + '; ' + xhr.responseText + '; ' + xhr.status + '; ' + textStatus +'; ' + err);
		}
	});
}

function dataview_callback(data){
	$.each(data, function(index, array){
		alert(array['NAMA']);
	});
}

function dataviewfilter(name, startrow, callback, frm){
	var data = $(frm).serializeArray();
	data.push({ name: "name", value: name });
	data.push({ name: "startrow", value: startrow });
	$.ajax({
	  method: "POST",
	  url: JS_URL+"modul/view.php",
	  dataType: "json",
	  data: data,
	  success: callback
	});
}

function setParamsURL(frm){
	var str		= '';
	var data 	= $(frm).serializeArray();
	
	$.each(data, function(index, array){
		str += array["name"] + '=' + array["value"]+'&';
	});
	str = str.substring(0, str.length-1)
	return str;
}

