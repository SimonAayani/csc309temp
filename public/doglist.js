/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function showDogList() {

	if ( $( ".doglist" ).is( ":hidden" )) {
		initlist({});
		$( ".doglist" ).slideDown()
					   .queue(function(){
							if ($(this).is("visible")){
								$(".map").hide().dequeue();}}
		)
		.dequeue()
		.show();
	  }
	else{
		if (event.target.matches('.dropbtn')) {
			initlist({});
		}
	}
}
//Assuming data is a JSON file
function initlist(data){
	//removes the previous contents of the doglist before adding new ones
	if ($('.doglist div li').length != 0){
		$( ".doglist ul li" ).remove();
	}
	var breed = $("#dropDownDest").val();
	var url = "https://dog.ceo/api/breed/"+breed+"/images";
	//placeholder to display list of registered user's dog profile
	//for now this function gets all random image from Dog API with selected breed and displays them
	$.get(url, function(data, status){
		for (var i = 0; i < data.message.length; i++) {
			var li_text = "<li>";
			li_text += "<img src=" + data.message[i] + ">";
			li_text += "<h3>Doggie "+ i + "</h3>";
			li_text += "<h4>Age: "+ (1 + Math.floor(Math.random() * 12)) + "</h4>"
			li_text += "</li>";
			$(".doglist ul").append(li_text);
		}}
		);
}

// Close the dropdown if the user clicks outside of it
function hideDogList() {
	if ($(".doglist").not(':hidden')){
		$(".logindiv").hide();
		$( ".doglist" ).slideUp();
		$(".map").show();
	}
}
//function that retrieves info from database based on usr selected breed and creates a sorted array of user objects with ascending distance order to usr
function getdoginfo(usr,sel_breed){
	var query_result = [];
	db.collection(name).find({breed:sel_breed})
					   .forEach((usr2)=>{
						   console.log(usr2.uid)
						   var lat1 = usr.location.lat
						   var lon1 = usr.location.lng
						   var lat2 = usr2.location.lat
						   var lon2 = usr2.location.lng
						   var dist = getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2)
						   query_result.push({user:usr2, distance:dist})
						   }
					   );
	query_result.sort(compare);
	return query_result;
}

function compare(usr1, usr2){
	  const dist1 = usr1.distance;
	  const dist2 = usr2.distance;
	  let comparison = 0;
	  if (dist1 > dist2) {
	    comparison = 1;
	  } else if (dist1 < dist2) {
	    comparison = -1;
	  }
	  return comparison;
}

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
	  var R = 6371; // Radius of the earth in km
	  var dLat = deg2rad(lat2-lat1);  // deg2rad below
	  var dLon = deg2rad(lon2-lon1);
	  var a =
	    Math.sin(dLat/2) * Math.sin(dLat/2) +
	    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
	    Math.sin(dLon/2) * Math.sin(dLon/2)
	    ;
	  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
	  var d = R * c; // Distance in km
	  return d;
	}

function deg2rad(deg) {
	return deg * (Math.PI/180)
}
