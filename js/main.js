$(document).ready(function(){

	function listCountries(){

		(function() {
		    var myajax_nonce = jQuery.now();
		    jQuery.ajaxSetup({
		        jsonp: "callback",
		        jsonpCallback: function() {
		            var callback = ( jQuery.expando.toLowerCase() + "_" + ( myajax_nonce++ ) );
		            this[ callback ] = true;
		            return callback;
		        }
		    });
		})();

		// Request Country
		$.ajax({
		    type: 'GET',
		    url: 'http://api.worldbank.org/countries?per_page=300&format=jsonP&prefix=?',
		    dataType: 'jsonp',
		    success: function(json) {
		        $.each(json[1], function(index, country ) {
		        	// console.log(country.id);
		        	$("#countryList").append( "<option value="+country.id+">"+country.name+"</option>" );
		        });
		        $(".spinner").hide();
		    	$("#infoBox").fadeIn();
		    },
			//other code
			error: function() {
			alert("The File could not be processed correctly.");
			}
		});

	};


	function requestData(){

		(function() {
		    var myajax_nonce = jQuery.now();
		    jQuery.ajaxSetup({
		        jsonp: "callback",
		        jsonpCallback: function() {
		            var callback = ( jQuery.expando.toLowerCase() + "_" + ( myajax_nonce++ ) );
		            this[ callback ] = true;
		            return callback;
		        }
		    });
		})();

		//Codes:
		// Male = MA, Female = FE
		var sex = $( 'input[name="sex"]:checked' ).val();
		console.log(sex);
		var	country = $("select").val();
		console.log(country);

		// Request data
		$.ajax({
		    type: 'GET',
		    url: 'http://api.worldbank.org/countries/'+country+'/indicators/SP.DYN.LE00.'+sex+'.IN?date=2012&format=jsonP&prefix=?',
		    dataType: 'jsonp',
		    success: function(json) {

		    	var year = $("#year").val();
		    	var month = $("#month").val()-1;
		    	var day = $("#day").val();
		    	var expectedLife = json[1][0].value;
		    	var deathDate = new Date(year,month,day);
		    	console.log(deathDate);
		    	deathDate.setFullYear(deathDate.getFullYear() + parseFloat(expectedLife));
		    	console.log(deathDate);				
		        console.log(json[1]);
		        $("#infoBox").fadeOut();

		        var death = setInterval(function() {
		        	timeLeft(deathDate)
		        }, 1000);

		    },
			//other code
			error: function() {
			alert("The File could not be processed correctly.");
			}
		});

	};

	function timeLeft(deathDate){

		// Calculate stuff and append to html

        var today = new Date();
        var difference = deathDate - today;
        console.log(difference);
        var timeLeft = convertMS(difference);
        console.log(timeLeft.d,timeLeft.h,timeLeft.m,timeLeft.s);

        $("#resultWrap").html("");
        $("#resultWrap").append("<h1>"+timeLeft.d+" : "+timeLeft.h+" : "+timeLeft.m+" : "+timeLeft.s+"</h1>")

	};

	function convertMS(ms) {
	  var d, h, m, s;
	  s = Math.floor(ms / 1000);
	  m = Math.floor(s / 60);
	  s = s % 60;
	  h = Math.floor(m / 60);
	  m = m % 60;
	  d = Math.floor(h / 24);
	  h = h % 24;
	  return { d: d, h: h, m: m, s: s };
	};

	// Init Stuff

	listCountries();
	$("#daysLeft").click(function(){ 
		requestData();
	});

});