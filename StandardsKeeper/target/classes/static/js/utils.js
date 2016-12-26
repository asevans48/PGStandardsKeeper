var arn = 0;

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
		if(data['success']){
			var $table = $("<table>");
			var fields = data['fields'];
			var len = fields.length;
			var i = 0;
			for(i = 0;i < len; i++){
				var $tr = $("<tr>");

				var $td = $("<td>");
				$td.append("")
			}
		}
	});
}

function addTableRowToIndices(){

}

function addIndices(){

}

function cancelIndices(){

}

function getIndices(){

}

function addTableRowToKeys(){

}

function addKeys(){

}

function getKeys(){

}

function cancelKeys(){

}


function setEditField(source){

}

function editFields(){
	//look down table and submit fields to edit
}

function cancelEdit(){
	//cancel the edit and remove the edit fields button
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
			},
			failure: function(errMessage){alert("Failed to Post Additions\n"+errMessage);}
		});
	}	
}

function cancelAdditions(){

}

function addTableRowToAdditions(){
	
	if(arn == 0){
		var $ainp = $('<input>');
		$ainp.attr('type','button');
		$ainp.attr('id','addButton');
		$ainp.attr('value','Add');
		$ainp.attr('onClick','postAdditions()');
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
	}
}