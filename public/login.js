var goback = "";



// function onSubmit() {
//     window.location.reload();
//     var zip = document.getElementById("zip").value;
//     var url = 'https://maps.googleapis.com/maps/api/geocode/json?&address=' + document.getElementById("zip").value + '&key=AIzaSyC7DCk1x1qnhX-z5aWICmzYN54_Zcrwu1w'
//     $.getJSON(url, function( data ) {
//         user_lat = data.results[0].geometry.location.lat;
//         user_lng = data.results[0].geometry.location.lng;
//         window.sessionStorage.setItem("user_lat", user_lat);
//         window.sessionStorage.setItem("user_lng", user_lng);
//         window.location.reload();
//     });
// }
function show_login(){

  // $("#login").on("click", function(){
    if($(".logindiv").is(":hidden")){
      if($(".map").is(":visible")){
        goback=".map"
        $(".map").slideUp(500, function() {
          $(".logindiv").slideDown(500);
        });
        
      } else if($(".doglist").is(":visible")){
        goback=".doglist"
        $(".doglist").slideUp(500, function() {
          $(".logindiv").slideDown(500);
        });
        
      }
    }
  // });
}
function login_goback(){
    $(".logindiv").slideUp(500, function() {
      $(goback).slideDown(500);
    });
}

function login(){
  if(status == 200){
    $("#lgnbtn").hide();
    $("#lgoutbtn").show();
  }
}

// function on_register(){
//   var fname = document.getElementById("f_name").value;
//   var lname = document.getElementById("l_name").value;
//   var email = document.getElementById("email").value;
//   var user = document.getElementById("user").value;
//   var pass = document.getElementById("pass").value;
//   var zip = document.getElementById("zip").value;
//   console.log(fname + lname + email + user + pass + zip);

   
// }