var arn = 0;
var irn = 0;
var krn = 0;
var serSet = false;
var serKSet = false;
var serISet = false;

function parseResults(json){
	var parsed = $.parseJSON(json);
	var table= '<table class="results" id="result" name="result"></table>';
	document.getElementById('content').innerHTML = table;
	$(function(){
		$.each(parsed, function(i, item){
			$('<tr>').append(
				$('<td>').text(item.field),
				$('<td>').text(item.type),
				$('<td>').text(item.standard),
				$('<td>').text(item.description)
			).appendTo('#result');
		
		});
	});
}

function getResults(){
	var data = $("#qform").serialize();
	
	//post query
	$.post("/getResults",data).done(function(data){
		//recreate results section
		document.getElementById('results').innerHTML = '';
		if(data['success']){
			var r = 0;
			var table = $("<table>");
			table.append($('<tr><th>Table</th><th>Field</th><th>Type</th><th>Standard</th><th>Description</th><th>R</th></tr>'));
			var fields = data['fields'];
			if(fields.length > 0){
				var row;
				var i = 0;
				for(i =0; i < fields.length;i++){
					row = fields[i];
					var tr = $('<tr>');
					tr.attr('id','fres'+r);

					var td   = $('<td>');
					td.attr('onMouseUp','setResEditField(this)');
					td.attr('name','table');
					td.attr('id','fresTable'+r);
					td.text(row['table']);
					tr.append(td);

					var td2   = $('<td>');
					td2.attr('onMouseUp','setResEditField(this)');
					td2.attr('name','fields');
					td2.attr('id','fresField'+r);
					td2.text(row['fields']);
					tr.append(td2);

					var td3   = $('<td>');
					td3.attr('onMouseUp','setResEditField(this)');
					td3.attr('name','type');
					td3.attr('id','fresType'+r);
					td3.text(row['type']);
					tr.append(td3);

					var td4 = $('<td>');
					td4.attr('onMouseUp','setResEditField(this)');
					td4.attr('name','standard');
					td4.attr('id','fresStandard'+r);
					td4.text(row['standard']);
					tr.append(td4);

					var td5 = $('<td>');
					td5.attr('onMouseUp','setResEditField(this)');
					td5.attr('name','description');
					td5.attr('id','fresDescription'+r);
					td5.text(row['description']);
					tr.append(td5);

					var $td6 = $('<td>');
					var $im5 = $('<img>');
					$im5 = $im5.attr('src','images/minus.jpg');
					$im5 = $im5.attr('width',"20px");
					$im5 = $im5.attr('height',"20px");
					$im5 = $im5.attr('id',name);
					$im5 = $im5.attr('onClick',"removeField(this)");
					$td6.append($im5);
					tr.append($td6);

					table.append(tr);

				}
			}
			var clb = $('<input>');
			clb.attr('type','button'); 
			clb.attr('value','Clear'); 
			clb.attr('onClick','clearRes()');
			var br = $('<br />');
			var h3 = $('<h3>Field Results</h3>');
			h3.appendTo(br);
			h3.appendTo("#results");
			clb.appendTo("#results");
			table.appendTo("#results");
		}
	});
}

function addTableRowToIndices(){
	if(irn == 0){
		var addButton = $('<input>');
		addButton.attr('id','indexAddButton');
		addButton.attr('onClick','postIndices()');
		addButton.attr('value','Add');
		addButton.attr('type','button');
		addButton.appendTo("#subi");

		addButton = $('<input>');
		addButton.attr('id','indexCancelButton');
		addButton.attr('onClick','cancelIndices()');
		addButton.attr('type','button');
		addButton.attr('value','Cancel');
		addButton.appendTo("#subi");
	}
	irn += 1;
	var name = 'ind'+irn;
	var $tr = $('<tr>');
	$tr = $tr.attr('name',name);

	var $td = $('<td>')
	var $inp = $('<input>');
	$inp = $inp.attr('type','text');
	$inp = $inp.attr('id',name);
	$inp = $inp.attr('name','name');
	$inp = $inp.attr('size',25);
	$inp = $inp.attr('value','Name');
	$td.append($inp);
	$tr.append($td);

	var $td3 = $('<td>')
	var $inp3 = $('<input>');
	$inp3 = $inp3.attr('type','text');
	$inp3 = $inp3.attr('id',name);
	$inp3 = $inp3.attr('name','tables');
	$inp3 = $inp3.attr('size',25);
	$inp3 = $inp3.attr('value','Tables (x.a,x.b,...)');
	$td3.append($inp3);
	$tr.append($td3);

    var $td3 = $('<td>')
	var $inp3 = $('<input>');
	$inp3 = $inp3.attr('type','text');
	$inp3 = $inp3.attr('id',name);
	$inp3 = $inp3.attr('name','keys');
	$inp3 = $inp3.attr('size',25);
	$inp3 = $inp3.attr('value','Keys (f1,f2,f3,....)');
	$td3.append($inp3);
	$tr.append($td3);

	var $td4 = $('<td>');
	var $im4 = $('<img>');
	$im4 = $im4.attr('src','images/minus.jpg');
	$im4 = $im4.attr('width',"20px");
	$im4 = $im4.attr('height',"20px");
	$im4 = $im4.attr('id',name);
	$im4 = $im4.attr('onClick',"removeIndexRow(this)");
	$td4.append($im4);
	$tr.append($td4);


	$tr.appendTo("#indexTable");

}

function removeIndexRow(el){
	var row = el.parentNode.parentNode;
	row.parentNode.removeChild(row);
	irn -= 1;

	if(irn == 0){
		document.getElementById('subi').innerHTML ='';
	}
}


function cancelIndices(){
	document.getElementById('indexTable').innerHTML ='<tbody><tr><th>Name</th><th>Tables</th><th>Keys</th><th>R</th></tr></tbody>';
	document.getElementById('subi').innerHTML ='';
	irn = 0;
}

function postIndices(){
	var data=[];
	
    $('#indexTable').find('tr').each(function(){
         var row={};
         var rown = 0;
         $(this).find('input,select,textarea').each(function(){
            row[$(this).attr('name')]=$(this).val();
            rown += 1;
         });

        if(rown > 0){
        	data.push(row);
    	}
     });

	if(data.length > 0){
		$.ajax({
			type: "POST",
			url: "/addIndices",
			contentType: "application/json",
			dataType: "json",
			data: JSON.stringify(data),
			success: function(data){
				//remove rows from additions table
				document.getElementById('indexTable').innerHTML ='<tbody><tr><th>Name</th><th>Tables</th><th>Keys</th><th>R</th></tr></tbody>';			
				document.getElementById('subi').innerHTML ='';
				irn = 0;
			},
			failure: function(errMessage){alert("Failed to Post Additions\n"+errMessage);}
		});
	}	
}

function clearIndexResults(){
	document.getElementById('indexResults').innerHTML='';
}

function getIndices(){
	$.post("/getIndices",$('#iform').serialize()).done(function(data){

		document.getElementById('indexResults').innerHTML ='';
		serISet = false;
		var table = $('<table>');

		var hr = $('<tr><th>Name</th><th>Tables</th><th>Keys</th><th>R</th></tr>');
		table.append(hr);
		var r = 0;
		if(data['success']){
			var res = data['fields'];
			if(res.length > 0){
				var i = 0;
				for(i = 0; i < res.length; i++){
					var row = res[i];
					var tr = $('<tr>');
					tr.attr('id','indRow'+r);
					var td = $('<td>')
					td.attr('id','indName'+r);
					td.attr('name','name');
					td.attr('onMouseUp','setIndexEditField(this)');
					td.text(row['name']);
					tr.append(td);

					var td2 = $('<td>')
					td2.attr('id','indTable'+r);
					td2.attr('name','tables');
					td2.attr('onMouseUp','setIndexEditField(this)');
					td2.text(row['tables']);
					tr.append(td2);

					var td3 = $('<td>')
					td3.attr('id','indKey'+r);
					td3.attr('name','keys');
					td3.attr('onMouseUp','setIndexEditField(this)');
					td3.text(row['keys']);
					tr.append(td3);

					var $td5 = $('<td>');
					var $im5 = $('<img>');
					$im5 = $im5.attr('src','images/minus.jpg');
					$im5 = $im5.attr('width',"20px");
					$im5 = $im5.attr('height',"20px");
					$im5 = $im5.attr('id',name);
					$im5 = $im5.attr('onClick',"removeIndex(this)");
					$td5.append($im5);
					tr.append($td5);

					table.append(tr);
					r += 1;
				}
			}
		}
		$('<h3>Index Results</h3>').appendTo("#indexResults");
		$('<input type="button" onClick="clearIndexResults()" value="Clear"/>').appendTo("#indexResults");
		table.appendTo("#indexResults");
	});
}

function setIndexEditField(el){
	//get values
	var id = el.id;
	var val = el.textContent;
	var name = el.getAttribute("name");
	
	//set hidden fields
	var k_input = $('<input>');
	k_input.attr('type','hidden');
	k_input.attr('name','oldKey');
	k_input.attr('value',name);

	var v_input = $('<input>');
	v_input.attr('type','hidden');
	v_input.attr('name','oldValue');
	v_input.attr('value',val);

	//set input for editing
	var edit_input = $('<input>');
	edit_input.attr('type','text');
	edit_input.attr('name',name);
	edit_input.attr('id',"newKV");
	edit_input.attr('value',val);

	el.innerHTML = '';

	k_input.appendTo(el);
	v_input.appendTo(el);
	edit_input.appendTo(el);
	el.removeAttribute("onMouseUp");
	if(!serISet){
		serISet = true;
		var edbs = $('<input type="button" value="Edit" id="indexEditButton" onClick="updateFromIndexEditFields()"/><input type="button" id="indexCancelButton" value="Cancel" onClick="clearIndexEdits()"/>');
		edbs.appendTo('#indexResults');
	}
}

function updateFromIndexEditFields(){
	var updateList = [];

	//look down table and submit fields to edit
	var tbl = $("#indexResults")
	var rows = tbl.find("tr").has("td input");

	rows.each(function(){
		//serialize each row
		var js = {};
		var newFields = {}
		$(this).find("td").each(function(){
			if($(this).find("input").length > 0){
				//get update states and new values
				var name = $(this).find("input[name='oldKey']");
				var value = $(this).find("input[name='oldValue']");
				var newInp = $(this).find("input[id='newKV']");
				var newKey = newInp.attr("name");
				var newValue = newInp.val();
				js[name.val()] = value.val();
				newFields[newKey] = newValue;
			}else{
				//get former values
				var name = $(this).attr("name");
				var value =$(this).text();
				js[name]=value;
			}
		});

		if(Object.keys(js).length > 0){
			js["newkvs"]=newFields;
			updateList.push(js);
		}
	});

	//post the results
	if(updateList.length > 0){
		$.ajax({
			type: "POST",
			url: "/updateIndices",
			contentType: "application/json",
			dataType: "json",
			data: JSON.stringify(updateList),
			success : function(data){
				//reset the Edit Fields
				var sb = document.getElementById('indexEditButton');
				sb.parentNode.removeChild(sb);

				var cb = document.getElementById('indexCancelButton');
				cb.parentNode.removeChild(cb);
				serISet = false;
				tbl.find("input").each(function(){
					var inp = $(this);
					if(inp.attr("type") != "hidden" && inp.attr("type") != "button"){
						var row = inp.parent();
						inp.detach();
						var name = inp.attr("name");
						var value = inp.attr("value");
						row.attr("name",name);
						row.attr("onMouseUp","setIndexEditField(this)")
						row.text(value);
					}else if((inp[0].hasAttribute("value") && inp.val() != "Clear" ) || !inp[0].hasAttribute("value")){
						inp.remove();
					}
				}) 

			},
			failure : function(msg){
				alert("Failed to Post Edits!\n"+msg);
		    }
		});
	}
}


function addTableRowToKeys(){
	if(krn == 0){
		var addButton = $('<input>');
		addButton.attr('id','keyAddButton');
		addButton.attr('onClick','postKeys()');
		addButton.attr('value','Add');
		addButton.attr('type','button');
		addButton.appendTo("#subk");

		addButton = $('<input>');
		addButton.attr('id','keyCancelButton');
		addButton.attr('onClick','cancelKeys()');
		addButton.attr('value','Cancel');
		addButton.attr('type','button');
		addButton.appendTo("#subk");
	}

	krn += 1;
	var name = 'knd'+krn;
	var $tr = $('<tr>');
	$tr = $tr.attr('name',name);

	var $tda = $('<td>')
	var $inpa = $('<input>');
	$inpa = $inpa.attr('type','text');
	$inpa = $inpa.attr('id',name);
	$inpa = $inpa.attr('name','table');
	$inpa = $inpa.attr('size',25);
	$inpa = $inpa.attr('value','Field');
	$tda.append($inpa);
	$tr.append($tda);

	var $td = $('<td>')
	var $inp = $('<input>');
	$inp = $inp.attr('type','text');
	$inp = $inp.attr('id',name);
	$inp = $inp.attr('name','field');
	$inp = $inp.attr('size',25);
	$inp = $inp.attr('value','Field');
	$td.append($inp);
	$tr.append($td);

	var $td3 = $('<td>')
	var $inp3 = $('<input>');
	$inp3 = $inp3.attr('type','text');
	$inp3 = $inp3.attr('id',name);
	$inp3 = $inp3.attr('name','foreign_table');
	$inp3 = $inp3.attr('size',25);
	$inp3 = $inp3.attr('value','Foreign Table');
	$td3.append($inp3);
	$tr.append($td3);

    var $td3 = $('<td>')
	var $inp3 = $('<input>');
	$inp3 = $inp3.attr('type','text');
	$inp3 = $inp3.attr('id',name);
	$inp3 = $inp3.attr('name','description');
	$inp3 = $inp3.attr('size',25);
	$inp3 = $inp3.attr('value','Description');
	$td3.append($inp3);
	$tr.append($td3);

	var $td4 = $('<td>');
	var $im4 = $('<img>');
	$im4 = $im4.attr('src','images/minus.jpg');
	$im4 = $im4.attr('width',"20px");
	$im4 = $im4.attr('height',"20px");
	$im4 = $im4.attr('id',name);
	$im4 = $im4.attr('onClick',"removeKeyRow(this)");
	$td4.append($im4);
	$tr.append($td4);


	$tr.appendTo("#keyTable");
}

function removeKeyRow(el){
	var row = el.parentNode.parentNode;
	row.parentNode.removeChild(row);

	krn -= 1;

	if(krn == 0){
		document.getElementById('subk').innerHTML ='';
	}
}

function postKeys(){
	var data=[];
	
    $('#keyTable').find('tr').each(function(){
         var row={};
         var rown = 0;
         $(this).find('input,select,textarea').each(function(){
            row[$(this).attr('name')]=$(this).val();
            rown += 1;
         });

        if(rown > 0){
        	data.push(row);
    	}
     });

	if(data.length > 0){
		$.ajax({
			type: "POST",
			url: "/addKeys",
			contentType: "application/json",
			dataType: "json",
			data: JSON.stringify(data),
			success: function(data){
				//remove rows from additions table
				krn = 0;
				document.getElementById('subk').innerHTML='';
				document.getElementById('keyTable').innerHTML ='<tbody><tr><th>Field</th><th>Foreign Table</th><th>Description</th><th>R</th></tr></tbody>';
			},
			failure: function(errMessage){alert("Failed to Post Additions\n"+errMessage);}
		});
	}	
}

function getKeys(){
	$.post("/getKeys",$('#kform').serialize()).done(function(data){

		document.getElementById('indexResults').innerHTML ='';
		serISet = false;
		var table = $('<table>');

		var hr = $('<tr><th>Table</th><th>Field</th><th>Foreign Table</th><th>Description</th><th>R</th></tr>');
		table.append(hr);
		var r = 0;
		if(data['success']){
			var res = data['fields'];
			if(res.length > 0){
				var i = 0;
				for(i = 0; i < res.length; i++){
					var row = res[i];
					var tr = $('<tr>');
					tr.attr('id','kndRow'+r);
					var td = $('<td>')
					td.attr('id','indName'+r);
					td.attr('name','table');
					td.attr('onMouseUp','setKeyEditField(this)');
					td.text(row['table']);
					tr.append(td);

					var td2 = $('<td>')
					td2.attr('id','kndTable'+r);
					td2.attr('name','field');
					td2.attr('onMouseUp','setKeyEditField(this)');
					td2.text(row['field']);
					tr.append(td2);

					var td3 = $('<td>')
					td3.attr('id','kndKey'+r);
					td3.attr('name','foreign_table');
					td3.attr('onMouseUp','setKeyEditField(this)');
					td3.text(row['foreign_table']);
					tr.append(td3);

					var td4 = $('<td>')
					td4.attr('id','kndKey'+r);
					td4.attr('name','description');
					td4.attr('onMouseUp','setKeyEditField(this)');
					td4.text(row['description']);
					tr.append(td4);

					var $td5 = $('<td>');
					var $im5 = $('<img>');
					$im5 = $im5.attr('src','images/minus.jpg');
					$im5 = $im5.attr('width',"20px");
					$im5 = $im5.attr('height',"20px");
					$im5 = $im5.attr('id',name);
					$im5 = $im5.attr('onClick',"removeKey(this)");
					$td5.append($im5);
					tr.append($td5);

					table.append(tr);
					r += 1;
				}
			}
		}
		$('<h3>Key Results</h3>').appendTo("#keyResults");
		$('<input type="button"  value="Clear" onClick="clearKeyRes()"/>').appendTo("#keyResults");
		table.appendTo("#keyResults");
	});
}

function setKeyEditField(el){
	//get values
	var id = el.id;
	var val = el.textContent;
	var name = el.getAttribute("name");
	
	//set hidden fields
	var k_input = $('<input>');
	k_input.attr('type','hidden');
	k_input.attr('name','oldKey');
	k_input.attr('value',name);

	var v_input = $('<input>');
	v_input.attr('type','hidden');
	v_input.attr('name','oldValue');
	v_input.attr('value',val);

	//set input for editing
	var edit_input = $('<input>');
	edit_input.attr('type','text');
	edit_input.attr('name',name);
	edit_input.attr('id',"newKV");
	edit_input.attr('value',val);

	el.innerHTML = '';

	k_input.appendTo(el);
	v_input.appendTo(el);
	edit_input.appendTo(el);
	el.removeAttribute("onMouseUp");
	if(!serKSet){
		serKSet = true;
		var edbs = $('<input type="button" value="Edit" id="keyEditButton" onClick="updateFromKeyEditFields()"/><input type="button" id="keyCancelButton" value="Cancel" onClick="clearKeyEdits()"/>');
		edbs.appendTo('#keyResults');
	}
}

function updateFromKeyEditFields(){
	var updateList = [];

	//look down table and submit fields to edit
	var tbl = $("#keyResults")
	var rows = tbl.find("tr").has("td input");

	rows.each(function(){
		//serialize each row
		var js = {};
		var newFields = {}
		$(this).find("td").each(function(){
			if($(this).find("input").length > 0){
				//get update states and new values
				var name = $(this).find("input[name='oldKey']");
				var value = $(this).find("input[name='oldValue']");
				var newInp = $(this).find("input[id='newKV']");
				var newKey = newInp.attr("name");
				var newValue = newInp.val();
				js[name.val()] = value.val();
				newFields[newKey] = newValue;
			}else{
				//get former values
				var name = $(this).attr("name");
				var value =$(this).text();
				js[name]=value;
			}
		});

		if(Object.keys(js).length > 0){
			js["newkvs"]=newFields;
			updateList.push(js);
		}
	});

	//post the results
	if(updateList.length > 0){
		$.ajax({
			type: "POST",
			url: "/updateKeys",
			contentType: "application/json",
			dataType: "json",
			data: JSON.stringify(updateList),
			success : function(data){
				//reset the Edit Fields
				var sb = document.getElementById('keyEditButton');
				sb.parentNode.removeChild(sb);

				var cb = document.getElementById('keyCancelButton');
				cb.parentNode.removeChild(cb);
				serKSet = false;
				tbl.find("input").each(function(){
					var inp = $(this);
					if(inp.attr("type") != "hidden" && inp.attr("type") != "button"){
						var row = inp.parent();
						inp.detach();
						var name = inp.attr("name");
						var value = inp.attr("value");
						row.attr("name",name);
						row.attr("onMouseUp","setKeyEditField(this)")
						row.text(value);
					}else if((inp[0].hasAttribute("value") && inp.val() != "Clear" ) || !inp[0].hasAttribute("value")){
						inp.remove();
					}
				}) 

			},
			failure : function(msg){
				alert("Failed to Post Edits!\n"+msg);
		    }
		});
	}
}



function cancelKeys(){
	krn = 0;
	document.getElementById('subk').innerHTML='';
	document.getElementById('keyTable').innerHTML ='<tbody><tr><th>Field</th><th>Foreign Table</th><th>Description</th><th>R</th></tr></tbody>';
}


function postAdditions(){
	var data=[];
	
    $('#additionsTable').find('tr').each(function(){
         var row={};
         var rown = 0;
         $(this).find('input,select,textarea').each(function(){
            row[$(this).attr('name')]=$(this).val();
            rown += 1;
         });

        if(rown > 0){
        	data.push(row);
    	}
     });

	if(data.length > 0){
		$.ajax({
			type: "POST",
			url: "/addResults",
			contentType: "application/json",
			dataType: "json",
			data: JSON.stringify(data),
			success: function(data){
				//remove rows from additions table
				document.getElementById('additionsDiv').innerHTML = '<table id="additionsTable" class="additionsTable" name ="records"><tr><th>Table</th><th>Field</th><th>Type</th><th>Standard</th><th>Description</th><th>R</th></tr></table>';
				document.getElementById('suba').innerHTML ='';
				arn = 0;
			},
			failure: function(errMessage){alert("Failed to Post Additions\n"+errMessage);}
		});
	}	
}

function cancelAdditions(){
	document.getElementById('additionsDiv').innerHTML = '<table id="additionsTable" class="additionsTable" name ="records"><tr><th>Table</th><th>Field</th><th>Type</th><th>Standard</th><th>Description</th><th>R</th></tr></table>';
	arn = 0;
	var addButton = document.getElementById('addButton');	
	addButton.parentNode.removeChild(addButton);

	addButton = document.getElementById('cancelAddButton');	
	addButton.parentNode.removeChild(addButton);
}

function addTableRowToAdditions(){
	
	if(arn == 0){
		var $ainp = $('<input>');
		$ainp.attr('type','button');
		$ainp.attr('id','addButton');
		$ainp.attr('value','Add');
		$ainp.attr('onClick','postAdditions()');
		$ainp.appendTo('#suba');

		var $ainp = $('<input>');
		$ainp.attr('type','button');
		$ainp.attr('id','cancelAddButton');
		$ainp.attr('value','Cancel');
		$ainp.attr('onClick','cancelAdditions()');
		$ainp.appendTo('#suba');
	}
	
	var name = 'at'+arn;
	arn += 1;
	var table = document.getElementById('additionsTable');
	
	var $tr = $('<tr>');
	$tr = $tr.attr('name',name);
    var $td5 = $('<td>')
	var $inp5 = $('<input>');
	$inp5 = $inp5.attr('type','text');
	$inp5 = $inp5.attr('id',name);
	$inp5 = $inp5.attr('name','table');
	$inp5 = $inp5.attr('size',25);
	$inp5 = $inp5.attr('value','schema.table');
	$td5.append($inp5);
	$tr.append($td5);
	
    var $td = $('<td>')
	var $inp = $('<input>');
	$inp = $inp.attr('type','text');
	$inp = $inp.attr('id',name);
	$inp = $inp.attr('name','fields');
	$inp = $inp.attr('size',25);
	$inp = $inp.attr('value','Field Value');
	$td.append($inp);
	$tr.append($td);
	
	var $td2 = $('<td>')
	var $inp2 = $('<input>');
	$inp2 = $inp2.attr('type','text');
	$inp2 = $inp2.attr('id',name);
	$inp2 = $inp2.attr('name','type');
	$inp2 = $inp2.attr('size',25);
	$inp2 = $inp2.attr('value','Type');
	$td2.append($inp2);
	$tr.append($td2);
	
	var $td3 = $('<td>')
	var $inp3 = $('<input>');
	$inp3 = $inp3.attr('type','text');
	$inp3 = $inp3.attr('id',name);
	$inp3 = $inp3.attr('name','standard');
	$inp3 = $inp3.attr('size',25);
	$inp3 = $inp3.attr('value','Standard');
	$td3.append($inp3);
	$tr.append($td3);
	
	var $td4 = $('<td>')
	var $inp4 = $('<input>');
	$inp4 = $inp4.attr('type','text');
	$inp4 = $inp4.attr('id',name);
	$inp4 = $inp4.attr('name','description');
	$inp4 = $inp4.attr('size',25);
	$inp4 = $inp4.attr('value','Description');
	$td4.append($inp4);
	$tr.append($td4);
	
	var $td5 = $('<td>');
	var $im5 = $('<img>');
	$im5 = $im5.attr('src','images/minus.jpg');
	$im5 = $im5.attr('width',"20px");
	$im5 = $im5.attr('height',"20px");
	$im5 = $im5.attr('id',name);
	$im5 = $im5.attr('onClick',"removeRow(this)");
	$td5.append($im5);
	$tr.append($td5);
	$tr.appendTo('#additionsTable')
	
}

function removeRow(ele){
	ele.parentNode.parentNode.parentNode.removeChild(ele.parentNode.parentNode);
	arn -= 1;
	
	if(arn == 0){
		var addButton = document.getElementById('addButton');	
		addButton.parentNode.removeChild(addButton);

		addButton = document.getElementById('cancelAddButton');	
		addButton.parentNode.removeChild(addButton);
	}
}

function setResEditField(el){
	//get values
	var id = el.id;
	var val = el.textContent;
	var name = el.getAttribute("name");
	
	//set hidden fields
	var k_input = $('<input>');
	k_input.attr('type','hidden');
	k_input.attr('name','oldKey');
	k_input.attr('value',name);

	var v_input = $('<input>');
	v_input.attr('type','hidden');
	v_input.attr('name','oldValue');
	v_input.attr('value',val);

	//set input for editing
	var edit_input = $('<input>');
	edit_input.attr('type','text');
	edit_input.attr('name',name);
	edit_input.attr('id',"newKV");
	edit_input.attr('value',val);

	el.innerHTML = '';

	k_input.appendTo(el);
	v_input.appendTo(el);
	edit_input.appendTo(el);
	el.removeAttribute("onMouseUp");
	if(!serSet){
		serSet = true;
		var edbs = $('<input type="button" value="Edit" id="resEditButton" onClick="updateFromResEditFields()"/><input type="button" id="resCancelButton" value="Cancel" onClick="clearResEdits()"/>');
		edbs.appendTo('#results');
	}
}

function updateFromResEditFields(){
	var updateList = [];

	//look down table and submit fields to edit
	var tbl = $("#results")
	var rows = tbl.find("tr").has("td input");

	rows.each(function(){
		//serialize each row
		var js = {};
		var newFields = {}
		$(this).find("td").each(function(){
			if($(this).find("input").length > 0){
				//get update states and new values
				var name = $(this).find("input[name='oldKey']");
				var value = $(this).find("input[name='oldValue']");
				var newInp = $(this).find("input[id='newKV']");
				var newKey = newInp.attr("name");
				var newValue = newInp.val();
				js[name.val()] = value.val();
				newFields[newKey] = newValue;
			}else{
				//get former values
				var name = $(this).attr("name");
				var value =$(this).text();
				js[name]=value;
			}
		});

		if(Object.keys(js).length > 0){
			js["newkvs"]=newFields;
			updateList.push(js);
		}
	});

	//post the results
	if(updateList.length > 0){
		$.ajax({
			type: "POST",
			url: "/updateFields",
			contentType: "application/json",
			dataType: "json",
			data: JSON.stringify(updateList),
			success : function(data){
				//reset the Edit Fields
				var sb = document.getElementById('resEditButton');
				sb.parentNode.removeChild(sb);

				var cb = document.getElementById('resCancelButton');
				cb.parentNode.removeChild(cb);
				serSet = false;
				tbl.find("input").each(function(){
					var inp = $(this);
					if(inp.attr("type") != "hidden" && inp.attr("type") != "button"){
						var row = inp.parent();
						inp.detach();
						var name = inp.attr("name");
						var value = inp.attr("value");
						row.attr("name",name);
						row.text(value);
					}else if((inp[0].hasAttribute("value") && inp.val() != "Clear" ) || !inp[0].hasAttribute("value")){
						inp.remove();
					}
				}) 

			},
			failure : function(msg){
				alert("Failed to Post Edits!\n"+msg);
		    }
		});
	}
}

function clearResEdits(){
	//cancel the edit and remove the edit fields button
	$("#results").find("td").has("input").each(function(){
		//find out if there are inputs
		var v = $(this).find("input[name='oldValue']").val();
		var k = $(this).find("input[name='oldKey']").val();
		var i = $(this).id;
		$(this).attr('name',k);
		$(this).attr('id',i);
		$(this).attr("onMouseUp","setResEditField(this)");
		$(this).text(v);
	});

	var sb = document.getElementById('resEditButton');
	sb.parentNode.removeChild(sb);

	var cb = document.getElementById('resCancelButton');
	cb.parentNode.removeChild(cb);
	serSet = false;

}

function clearIndexEdits(){
	//cancel the edit and remove the edit fields button
	$("#indexResults").find("td").has("input").each(function(){
		//find out if there are inputs
		var v = $(this).find("input[name='oldValue']").val();
		var k = $(this).find("input[name='oldKey']").val();
		var i = $(this).id;
		$(this).attr('name',k);
		$(this).attr('id',i);
		$(this).attr("onMouseUp","setIndexEditField(this)");
		$(this).text(v);
	});

	var sb = document.getElementById('indexEditButton');
	sb.parentNode.removeChild(sb);

	var cb = document.getElementById('indexCancelButton');
	cb.parentNode.removeChild(cb);
	serISet = false;

}

function clearKeyEdits(){
	//cancel the edit and remove the edit fields button
	$("#keyResults").find("td").has("input").each(function(){
		//find out if there are inputs
		var v = $(this).find("input[name='oldValue']").val();
		var k = $(this).find("input[name='oldKey']").val();
		var i = $(this).id;
		$(this).attr('name',k);
		$(this).attr('id',i);
		$(this).attr("onMouseUp","setKeyEditField(this)");
		$(this).text(v);
	});

	var sb = document.getElementById('keyEditButton');
	sb.parentNode.removeChild(sb);

	var cb = document.getElementById('keyCancelButton');
	cb.parentNode.removeChild(cb);
	serKSet = false;

}

function clearRes(){
	document.getElementById('results').innerHTML = '';
}


function clearIndRes(){
	document.getElementById('indexResults').innerHTML = '';
}

function clearKeyRes(){
	document.getElementById('keyResults').innerHTML = '';
}

function removeField(el){

}

function removeIndex(el){

}

function removeKey(el){

}



function generateDDL(){
	//send the schema to get the ddl and post to new window. DDL should be in text box to allow for editing.

}