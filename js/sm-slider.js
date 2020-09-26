

$(document).ready(function(){
	
});

var initSmSlider = function (el, option){
	var element		= el;
	var children	= 'div:not(.banner-gallery)';
	
	var start		= option.start;
	var mode		= option.mode;	
	var speed		= option.speed;
	var interval	= option.interval;
		
	var index		= 0;
	var total		= $(element + ' > ' + children).length;
	
	$(element + ' > ' + children).hide();
		
	setTimeout(process, start);
	
	function process(){
		if(mode == 'toggle'){
			$(element + ' > ' + children).eq(index-1).slideUp(speed);
			$(element + ' > ' + children).eq(index).slideDown(speed);			
		}
		else{
			$(element + ' > ' + children).eq(index-1).hide(mode, speed);
			$(element + ' > .banner-gallery > div > div').eq(index-1).removeClass('active');
			
			$(element + ' > ' + children).eq(index).show(mode, speed);	
			$(element + ' > .banner-gallery > div > div').eq(index).addClass('active');
		}
		index++;
		if(index >= total){index = 0;}
		setTimeout(process, interval);
	}
	
}