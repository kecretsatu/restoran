
$(document).ready(function(){
	cart("load");
});

function cart(el, tipe, id, name, price){
	var data = [];
	data.push({ name: "tipe", value: tipe });
	data.push({ name: "id", value: id });
	data.push({ name: "name", value: name });
	data.push({ name: "price", value: price });
	
	$.ajax({
		type: "POST",
		url: JS_URL+"modul/cart.php",
		dataType: 'json',
		cache: false,
		data: data,
		success: get_cart_callback,
		error: function(xhr,textStatus,err) {
			alert('Error: ' + xhr.readyState + '; ' + xhr.responseText + '; ' + xhr.status + '; ' + textStatus +'; ' + err);
		}
	});
	if(tipe=='add'){
		animate_add_cart(el, id);
	}
}

function get_cart_callback(data){
	var items = ''; var total = 0;
	$.each(data, function(index, array){	
		var cl = '';
		
		if(array["last"] == 1){
			cl = "new-cart"
		}
		
		items += '<div id="cart-list-'+array['id']+'" class="'+cl+' col-md-12 col-xs-12" >';
		items += '<div class="col-md-6 col-xs-6" style="padding:0px; ">';
		items += '<span style="display:block;">'+array["name"]+'</span><span style="font-size:0.85em; display:block;">'+array["qty"]+' x @'+array["price"]+'</span>';
		items += '</div>';
		items += '<div class="col-md-6 col-xs-6" style="padding:0px; " align="right">';
		items += (parseInt(array["qty"]) * parseInt(array["price"])).formatMoney(0);
		items += '</div>';
		items += '</div>';
		
		total += parseInt(array["qty"]) * parseInt(array["price"]);
	});
	$('#cart-list').html(items);
	$('#cart-total').html(total.formatMoney(0));
	
	setTimeout(function(){
		$('#cart-list > .new-cart').removeClass('new-cart');
	}, 1000);
}

function animate_add_cart(el, id){
	var div2 = $('#cart');
	var height = 50;
	
	if( $('#cart-list-'+id).length ){
		div2 = $('#cart-list-'+id);
		height = div2.height();
	}

	var wrapper = $(el).closest('.panel').clone();
	$(wrapper).addClass('choosen');
	
	
	if( $(el).closest('.spec').length ){
		wrapper = $(el).closest('.spec').clone();
		$('button', wrapper).remove();
		$('.p_price', wrapper).remove();
		$(el).closest('.spec').append(wrapper);
	}
	else{
		$(el).closest('a').append(wrapper);
	}
	
	
	wrapper = wrapper
		.contents()
		.wrap($('<div>').css('position','absolute'))
		.parent();
		
	var top = div2.offset().top - wrapper.offset().top;
	var left = div2.offset().left - wrapper.offset().left;

	wrapper.animate({top: top, left: left, height: height}, 500, function() {
		//$(this).contents().appendTo(div2);
		wrapper.remove();
		$('.choosen').remove();
	});
}



