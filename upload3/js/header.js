$(document).ready(function(){

    $("#about").on('click',()=>{
      $("#postArea").empty();
      $("#postArea").load("aboutUs.html");
    })

    $("#services").on('click',()=>{
      $("#postArea").empty();
      $("#postArea").load("services.html");
    })

    $("#contact").on('click',()=>{
      $("#postArea").empty();
      $("#postArea").load("contact.html");
    })
});