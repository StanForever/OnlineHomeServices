(function($){
	 var BASE_URL = window.location.origin;
	 var params= {};
	 params.track='click';
	$.ajax({
                        
						type: 'get',
                        url: BASE_URL+'/semTracking',
                        dataType: 'json',
                        data: params,
            			async:false,
                        success: function (data) {
						
						}
	});		
                    
})(jQuery);