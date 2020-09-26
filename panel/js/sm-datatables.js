

$.fn.smDataTables = function(data, hiddenColumns, action, params, headerBtn, column_format){
	
	var el		= this;
	var count	= 10;
	var paging	= 1;
	var keyword	= "";
	
	
	if(params){
		count 	= params.count;
		paging 	= params.paging;
		keyword = params.keyword;
	}
	count = parseInt(count);
	paging = parseInt(paging);
	
	if(data.length <= 0){
		var items = build_header() ;
		$(el).html(items);
	}
	else{
		build();
	}
	
	function build(){
		var thead = '';
		thead += '<th>No</th>';
		$.each(data[0], function(key, arr){
			if(hiddenColumns.indexOf(key) <= -1){
				var title	= key.toUpperCase();
				title		= title.replace(/_/g, " ");
				thead 		+= '<th>'+title+'</th>';
			}
		});	
		thead = '<thead>'+thead+'<th></th></thead>';
		
		var tbody = ''; var n = 0; var total = 0; var start = ((paging - 1) * count)+1 ; var end = (start + count)-1;
		
		$.each(data, function(index, array){
			var this_row = JSON.stringify(array).toLowerCase();
			var doAdding = true;
			
			if(keyword != "" && keyword.length > 0){
				doAdding = false;
				$.each(data[0], function(key, arr){
					if(hiddenColumns.indexOf(key) <= -1){
						var val = array[key];
						val		= val.replace(/"/g,'').toLowerCase();
						if(val.indexOf(keyword) > -1){
							total++;
							n++;
							doAdding=true;
							return false;
						}
					}
				});	
			}
			else{
				n++; 
			}
			
			if(n < start || n > end){
				doAdding=false;
			}
			
			
			if(doAdding){
				tbody += '<tr>';
				tbody += '<td>'+n+'</td>';
			
				$.each(data[0], function(key, arr){
					if(hiddenColumns.indexOf(key) <= -1){
						var val = array[key];
						val		= val.replace(/"/g,'');
						tbody += '<td>'+val+'</td>';
					}
				});	
			
				var action_btn = "";
				for(var i=0; i < action.length; i++){
					action_btn += '<button type="button" class="btn btn-sm '+action[i].class+'" onclick="'+action[i].callback+'('+(n-1)+')" style="'+action[i].style+'">';
					action_btn += '<span class="glyphicon glyphicon-'+action[i].icon+'"></span>'; 
					action_btn += action[i].text; 
					action_btn += '</button>';
				}
				tbody += '<td class="action" align="center" style="width:'+(35 * action.length)+'px">'+action_btn+'</td></tr>';
			}
		});	
		
		
		tbody = '<tbody>'+tbody+'</tbody>';
		
		var table = '<div class="sm-table-body"><table class="table table-bordered table-striped table-hover">'+thead+tbody+'</table></div>';
		
		var table_footer = build_footer(Math.ceil(data.length / count));
		if(keyword != "" && keyword.length > 0){
			table_footer = build_footer(Math.ceil(total / count));
		}
		
		var items = build_header() + table + table_footer;
		$(el).html(items);
		
		if(params){
			$('.sm-table-header select', el).val(count);
			$('.sm-table-header input[type=search]', el).val(keyword);
			$('.sm-table-header input[type=search]', el).focus();
		}
		
		if(column_format){
			var table_name		= column_format[0].table_name;
			var row_count		= $(table_name + ' tbody tr').length;
			var column_number	= column_format[0].column_number;
			
			for(var i = 0; i < row_count; i++){
				for(var j = 0; j < column_number.length; j++){
					var val = parseInt($(table_name + ' tbody tr:eq('+i+') td:eq('+column_number[j]+')').html());
					$(table_name + ' tbody tr:eq('+i+') td:eq('+column_number[j]+')').html(val.formatMoney(0));
				}
			}
			
		}
		
	}
	
	function build_header(){
		var table_header	= '';
		table_header		+= '<div class="sm-table-header">';
		table_header		+= '<label>Show</label>';
		table_header		+= '<select>';
		table_header		+= '<option value="10">10 Rows</option>';
		table_header		+= '<option value="25">25 Rows</option>';
		table_header		+= '<option value="100">100 Rows</option>';
		table_header		+= '<option value="9999999">All Rows</option>';
		table_header		+= '</select>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
		table_header		+= '<label>Search</label><input type="search" placeholder="Keyword" />';
		
		if(headerBtn){
			var header_btn = ""; var header_btn_width = (33 * action.length);
			for(var i=0; i < headerBtn.length; i++){
				header_btn += '<button type="button" class="btn btn-sm pull-right '+headerBtn[i].class+'" onclick="'+headerBtn[i].callback+'()" style="'+headerBtn[i].style+'; width: '+header_btn_width+'px">';
				header_btn += '<span class="glyphicon glyphicon-'+headerBtn[i].icon+'"></span>'; 
				header_btn += headerBtn[i].text; 
				header_btn += '</button>';
				
				table_header += header_btn;
			}
		}
		
		table_header 		+= '</div>';
		return table_header;
	}
	
	function build_footer(n){
		var table_footer	= '';
		table_footer		+= '<div class="sm-table-footer">';
		table_footer		+= '<ul>';
		
		for($i = 1; $i <= n; $i++){
			var cl = "";
			if(paging == $i){cl = "active";}
			table_footer		+= '<li><a class="'+cl+'" href="javasript:void(0)">'+$i+'</a></li>';	
		}
		table_footer		+= '</ul>';
		table_footer		+= '</div>';
		return table_footer;
	}
	
	
	$('.sm-table-header select', el).change(function(e){
		$(el).smDataTables(data, hiddenColumns, action, {
			count: $('.sm-table-header select', el).val(),
			paging: paging,
			keyword: $('.sm-table-header input[type=search]', el).val()
		}, headerBtn, column_format);
	});
	
	$('.sm-table-header input[type=search]', el).keyup(function(e){
		$(el).smDataTables(data, hiddenColumns, action, {
			count: $('.sm-table-header select', el).val(),
			paging:1,
			keyword: $('.sm-table-header input[type=search]', el).val()
		}, headerBtn, column_format);
	});
	
	$('.sm-table-footer ul li a', el).click(function(e){
		$(el).smDataTables(data, hiddenColumns, action, {
			count: $('.sm-table-header select', el).val(),
			paging: $(this).html(),
			keyword: $('.sm-table-header input[type=search]', el).val()
		}, headerBtn, column_format);
	});
}