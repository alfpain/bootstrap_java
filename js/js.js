var busqueda = "";
$( ".search" ).submit(function( event ) {
	$(".informacion").empty();
	busqueda = $(".texto").val();
	$(".texto").val("");
	var service_url = 'https://www.googleapis.com/freebase/v1/search';
	var params = {
		'query': busqueda,
		'limit': 10,
		'indent': true
	};

	$.getJSON(service_url + '?callback=?', params, function(response) {
		var numero = 0;
		$.each(response.result, function(i, result) {
			numero+=1;
			var obj = {text:result['name']}.text;
			var insertar = "<tr>"+"<td>"+numero+"<td>"+obj+"</td>"+"</tr>";
			$(".informacion").append(insertar);
		});
	});
	event.preventDefault();

	
});

$('input[name="filtro"]').change(function(){
	$(".informacion").empty();
	var checkedEnable = []; //0,1,2,3
	var filterUrls = [" type:/music/", " type:/people/", " type:/book/", " type:/music/album", " type:/music/genre"];
	var filterString = "";
	$("input[name=filtro]:checked").each(function(){
		checkedEnable.push(this.value);
	});


	for (var i=0;i<checkedEnable.length;i++){
		filterString = filterString + filterUrls[checkedEnable[i]];
	};
	
	filterString = "(all"+filterString+")";
	var service_url = 'https://www.googleapis.com/freebase/v1/search';
	var params = {
		'query': busqueda,
		'filter': filterString,
		'limit': 10,
		'indent': true
	};
	$.getJSON(service_url + '?callback=?', params, function(response) {
		var numero = 0;
		$.each(response.result, function(i, result) {
			numero+=1;
			var obj = {text:result['name']}.text;
			var insertar = "<tr>"+"<td>"+numero+"<td>"+obj+"</td>"+"</tr>";
			$(".informacion").append(insertar);
		});
	});
	event.preventDefault();
});
 
var $conditionalInput = $('div.conditionally-loaded');
var $subscribeInput = $('input[id="fil"]');
$conditionalInput.hide();
$subscribeInput.on('click', function(){
    if ( $(this).is(':checked') )
        $conditionalInput.slideDown();

    else
        $conditionalInput.slideUp();
});