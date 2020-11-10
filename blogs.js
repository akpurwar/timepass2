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
  $("#category").select2({
    data: category,
  });

  function myfunctions() {
    alert("in my function");
    url = "http://localhost:3000/comments";
    var d = new Date();
    var date = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();
    var name = $("#comment_author").val();
    console.log(name);
    var comment = $("#comment").val();
    console.log(comment);
    $.ajax({
      url: url,
      type: "POST",
      data: JSON.stringify({
        name: name,
        comment: comment,
        Date: date,
      }),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      async: false,
      success: function (msg) {
        console.log("New post Added Successfully");
      },
    });
  }
});

function myfunction() {
  url = "http://localhost:3000/posts";
  var d = new Date();
  var date = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();
  var head = $("#title").val();
  var msg = $("#editor1").html();
  var category = $("#category").val();

  $.ajax({
    url: url,
    type: "POST",
    data: JSON.stringify({
      title: head,
      body: msg,
      cat: category,
      Date: date,
    }),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    async: false,
    success: function (msg) {
      console.log("New post Added Successfully");
    },
  });
}
