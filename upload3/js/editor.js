
$(document).ready(function () {
  var category = [
    " ",
    "All",
    "Nature",
    "Motivation",
    "Travel",
    "Skills",
    "technology",
  ];
  $("#categories").select2({
    data: category,
  });
});

function myfunction() {
  var url = "http://localhost:3000/Blog";
  var d = new Date();
  var date = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();
  var head = $("#title").val();
  var msg = $("#editor1").html();
  var category = $("#categories").val().toLowerCase();
  console.log(category);
    console.log("in post");
  $.ajax({
    url: url,
    type: "POST",
    data: JSON.stringify({  
      "title": head,
      "description": msg,
      "category": category,
      "date": date,
    }),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    async: false,
    success: function (msg) {
      console.log("New post Added Successfully");
    },
  });
}
