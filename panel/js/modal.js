
$(document).ready(function(){
	$('#form-category form').submit(function(e){
		e.preventDefault();
	});
	$('#form-product form').submit(function(e){
		e.preventDefault();
	});
});

/* Category */

var category = function(evt, data){
	
	switch (evt){
		case "modal":		
			modal(data); break;
		case "add":		
			add(); break;
		case "edit":		
			edit(); break;
		case "remove":		
			remove(); break;
	}
		
	function modal(data){
		$('#form-category form input[name=id]').val(0);
		$('#form-category form input[name=tipe]').val("");
		$('#form-category form input[name=name]').val("");
		$('#form-category form input[name=name]').attr("placeholder", "New Category");	
		$('#form-category .btn-primary').hide();
		$('#form-category .btn-success').show();
		$('#form-category .btn-warning').attr("href", BASE + "/product");
		
		if(data){
			$('#form-category form input[name=id]').val(data.id_category);	
			$('#form-category form input[name=name]').attr("placeholder", data.name);	
			$('#form-category .btn-warning').attr("href", BASE + "/product/" + data.category_link);
			
			$('#form-category .btn-primary').show();
			if(data.parent_category != 0){
				$('#form-category .btn-success').hide();
			}
		}		
		
		$('#form-category').modal("show");
	}	
	function add(){
		$('#form-category form input[name=tipe]').val('add');
		
		datasavecallback('#form-category form', function(data){
			if(data[0].status == 1){
				alert('Save Success');
				
				var parent	= data[0].parent;
				var id		= data[0].id;
				var url		= data[0].url;
				var name	= data[0].name;
				
				var items	 = '<li>';
				items	 	+= '<a id="'+id+'" href="javascript:void(0)" onclick="return false;" data-toggle="collapse" data-target=".sub-'+id+'" aria-expanded="false">'+name+'</a>';
				items		+= '<button class="btn btn-primary" onclick="category(\'modal\', {\'id_category\':\''+id+'\', \'parent_category\':\''+parent+'\', \'name\':\''+name+'\', \'category_link\':\''+url+'\'}); return false;"><span class="glyphicon glyphicon-edit"></span></button>';
				
				if(parent == 0){
					items += '<ul class="sub-'+id+' nav collapse" role="menu" aria-labelledby="btn-1"></ul>';
				}
				
				items		+= '</li>';
				
				if($('.menu #'+parent).parent('li').children('ul').html() == ""){
					$('.menu #'+parent).parent('li').children('ul').html(items);
				}
				else{
					$('.menu #'+parent).parent('li').children('ul').prepend(items);
				}
				animate(id);
				
				$('#form-category').modal("hide");
			}
			waitingDialog.hide();
		});
	}
	function edit(){
		$('#form-category form input[name=tipe]').val('edit');
		
		datasavecallback('#form-category form', function(data){
			if(data[0].status == 1){
				alert('Edit Success');
				
				var parent	= data[0].parent;
				var id		= data[0].id;
				var url		= data[0].url;
				var name	= data[0].name;
				
//				alert('category(\'modal\', {\'id_category\':\''+id+'\', \'parent_category\':\''+id+'\', \'name\':\''+name+'\', \'url\':\''+url+'\'}); return false;');
				$('.menu #'+id).parent("li").children("button").attr("onclick", 'category(\'modal\', {\'id_category\':\''+id+'\', \'parent_category\':\''+parent+'\', \'name\':\''+name+'\', \'category_link\':\''+url+'\'}); return false;');
				$('.menu #'+id).html(name);
				animate(id);
				
				$('#form-category').modal("hide");
			}
			waitingDialog.hide();			
		});
	}
	function remove(){
		$('#form-category form input[name=tipe]').val('remove');
		
		datasavecallback('#form-category form', function(data){
			if(data[0].status == 1){
				alert('Remove Success');
				
				var id		= data[0].id;
				
				
				$('.menu #'+id).remove();
				
				$('#form-category').modal("hide");
			}
			waitingDialog.hide();			
		});
	}
	function animate(id){
		$('.menu #'+id).addClass('new');
		setTimeout(function(){$('.menu #'+id).removeClass('new');}, 2000);
	}
}

/* End Category */


/* Product */

var product = function(evt, data){
	
	switch (evt){
		case "modal":		
			modal(data); break;
		case "add":		
			add(); break;
		case "edit":		
			edit(); break;
	}
		
	function modal(data){
		$('#form-product form input[name=id]').val("");
		$('#form-product form input[name=product_code]').val("");
		$('#form-product form input[name=name]').val("");
		$('#form-product form input[name=price_old]').val(0);
		$('#form-product form input[name=price]').val(0);
		$('#form-product form input[name=disc]').val("");
		$('#form-product form input[name=weight]').val("");
		$('#form-product form input[name=about]').val("");
		$('#form-product form #description').html("");
		$('#description').summernote('code', "");
		
		$('#form-product .btn-primary').hide();
		$('#form-product .btn-danger').hide();
		$('#form-product .btn-success').show();
				
		if(data){
			$('#form-product form input[name=id]').val(data.id);
			$('#form-product form input[name=product_code]').val(data.product_code);
			$('#form-product form input[name=name]').val(data.name);
			$('#form-product form input[name=price_old]').val(data.price_old);
			$('#form-product form input[name=price]').val(data.price);
			$('#form-product form input[name=disc]').val(data.disc);
			$('#form-product form input[name=weight]').val(data.weight);
			$('#form-product form input[name=about]').val(data.about);
			$('#form-product form #description').html(data.description);
			$('#description').summernote('code', data.description);
			$('#form-product .btn-primary').show();
			$('#form-product .btn-danger').show();
			$('#form-product .btn-success').hide();
			
		}		
		
		$('#form-product form .editor').summernote({
			height: 300
		});
		
		$('#form-product').modal("show");
	}	
	function add(){
		$('#form-product form input[name=tipe]').val('add');
		$('#form-product form textarea[name=description]').val($('#description').summernote('code')) ;
		datasavecallback('#form-product form', function(data){
			if(data[0].status == 1){
				alert('Save Success');
				
				
				$('#form-product').modal("hide");
			}
			waitingDialog.hide();			
		});
	}
	function edit(){
		$('#form-product form input[name=tipe]').val('edit');
		$('#form-product form textarea[name=description]').val($('#description').summernote('code')) ;
		
		datasavecallback('#form-product form', function(data){
			if(data[0].status == 1){
				alert('Edit Success');
								
				$('#form-product').modal("hide");
			}
			waitingDialog.hide();			
		});
	}
	function animate(id){
		$('.menu #'+id).addClass('new');
		setTimeout(function(){$('.menu #'+id).removeClass('new');}, 2000);
	}
}

/* End Product */


/* Testimonial */

var testimonial = function(evt, data){
	
	switch (evt){
		case "modal":		
			modal(data); break;
		case "add":		
			add(); break;
		case "edit":		
			edit(); break;
	}
		
	function modal(data){
		$('#form-testimonial form input[name=id]').val("");
		$('#form-testimonial form input[name=name]').val("");
		$('#form-testimonial form input[name=content]').val("");
		
		$('#form-testimonial .btn-primary').hide();
		$('#form-testimonial .btn-danger').hide();
		$('#form-testimonial .btn-success').show();
				
		if(data){
			$('#form-testimonial form input[name=id]').val(data.id);
			$('#form-testimonial form input[name=name]').val(data.name);
			$('#form-testimonial form input[name=about]').val(data.content);
			$('#form-testimonial .btn-primary').show();
			$('#form-testimonial .btn-danger').show();
			$('#form-testimonial .btn-success').hide();
			
		}		
		
		$('#form-testimonial').modal("show");
	}	
	function add(){
		$('#form-testimonial form input[name=tipe]').val('add');
		
		datasavecallback('#form-testimonial form', function(data){
			if(data[0].status == 1){
				alert('Save Success');
				
				
				$('#form-testimonial').modal("hide");
			}
			waitingDialog.hide();			
		});
	}
	function edit(){
		$('#form-testimonial form input[name=tipe]').val('edit');
		
		datasavecallback('#form-testimonial form', function(data){
			if(data[0].status == 1){
				alert('Edit Success');
								
				$('#form-testimonial').modal("hide");
			}
			waitingDialog.hide();			
		});
	}
	function animate(id){
		$('.menu #'+id).addClass('new');
		setTimeout(function(){$('.menu #'+id).removeClass('new');}, 2000);
	}
}

/* End Testimonial */

/* Gallery */

var gallery = function(tipe, data){
	
	$("#form-gallery form").submit(function(){
			var formData = new FormData($(this)[0]);
			
			$.ajax({
				url: JS_URL+"modul/crud.php",
				type: 'POST',
				data: formData,
				async: false,
				success: function (data) {
					if(data[0].status = 1){
						alert("Gambar berhasil diupload");
						$('#form-gallery').modal("hide");
					}
				},
				error: function (xhr, ajaxOptions, thrownError) {
					alert(xhr.status);
					alert(thrownError);
				},
				cache: false,
				contentType: false,
				processData: false
			});

			return false;
		});
	
	$('#form-gallery form ul li a').click(function(){
		//alert($(this).attr('file'));
		var file_element = $(this).attr('file');
		$('input[name='+file_element+']').click();
	});
	
	$('#form-gallery form input[type=file]').change(function(){
		//alert($(this).attr("id"));
		PreviewImage($(this).attr("id"));
	});
	
	loadImage();
	
	function loadImage(){
		var id = data.id.replace(/-/g,"");
		
		for(var i = 1; i <= 4; i++){
			var src = JS_URL + 'images/'+tipe+'/'+id+i+'.png';
			
			imageExists(i,src, function(index, src, exists) {
			  if(exists){
				$('#form-gallery form ul li a[file=image'+index+'] img').attr('src', src);
			  }
			});
		}
		$('#form-gallery form input[name=id]').val(data.id);
		$('#form-gallery form input[name=tipe]').val(tipe);
		$('#form-gallery').modal("show");
	}
	
	function imageExists(index, url, callback) {
	  var img = new Image();
	  img.onload = function() { callback(index, url, true); };
	  img.onerror = function() { callback(index, JS_URL + 'images/noimage.jpg', false); };
	  img.src = url;
	}
	
	function PreviewImage(id) {
        var oFReader = new FileReader();
        oFReader.readAsDataURL(document.getElementById(id).files[0]);
		
        oFReader.onload = function (oFREvent) {
			$('#form-gallery form ul li a[file='+id+'] img').attr('src', oFREvent.target.result);
            //document.getElementById("uploadPreview").src = oFREvent.target.result;
        };
    }
	
}

/* End Gallery */