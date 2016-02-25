$( document ).ready(function() {
	requestData("");

    $("#songname").keyup(function(event) {
    	if ( event.which == 13 ) {
     		var keyword = $(this).val();
    		requestData(keyword);
  		}
  	});

  	$('#btn-search').click(function(){
  		var keyword = $("#songname").val();
  		requestData(keyword);
  	});

  	$('#songs').on('click', '.esong span.toogleBtn', function() {
  		var parentID = $(this).parent().attr('id');
  		$('#'+parentID+' .toogleBtn').removeClass('toogleactive');
  		$(this).addClass('toogleactive');
	});

	function requestData(kw) { 
		$.ajax({
	         type: "GET",
	         url: "http://localhost:3000/songs?q="+kw,
	         contentType: "application/json; charset=utf-8",
	         dataType: "json",
	         success: function (data, status, jqXHR) {
	         	$('#songs').html("");
	         	if (data.length > 0){
		            $.each(data, function(i, item) {
		            	var wclass = (i % 2) == 0 ? 'even' : 'odd'; 
					    $("#songs").append('<div class="esong '+wclass+'" id="song-'+i+'"><span class="playBtn"><i class="fa fa-play"></i></span><span class="songTitle">'+data[i].songname+'</span><span class="artistName">'+data[i].artistname+'</span><span class="toogleBtn today">Today</span><span class="toogleBtn friday">Friday</span></div>');
					})
				}
				else{
					$("#songs").append('<div class="esong even"><span class="songTitle">There is not results for your search ..</span></div>');
				}
	         },

	         error: function (jqXHR, status) {
	             alert("We have no connection to the data source!");
	         }
		});
	};
	
});