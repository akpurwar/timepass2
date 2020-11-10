//Active link js
var selector = "#nav li";
$(selector).on("click", function () {
  $(selector).removeClass("active");
  $(this).addClass("active");
});

//new_blog nav bar
$("#new_blog").click(function () {
  $("#main_body").load("new_blog.html");
});

//default load of API Get method both index and home page
$(document).ready(function () {
  $.getJSON("http://localhost:3000/posts", function (data) {
    //getting multiple objects
    $.each(data, function (index, obj) {
      //separating objects by its index
      var title = obj.title; //object.property
      var blog_id = obj.id;
      $("#blog_id").append(
        '<img src="images/blog-4.jpg" width="60px" height="60px" />&nbsp;&nbsp;<b>Blog Title:</b>&nbsp;' +
          title +
          '</br></br> <button onclick="blogfunction(' +
          blog_id +
          ')" id=' +
          blog_id +
          ">Read More </button> <hr></br>"
      );
    });
  });
});

//Read more button blog view function
function blogfunction(id) {
  url = "http://localhost:3000/posts/" + id;
  $.getJSON(url, function (data) {
    var msg = data.body;
    var title = data.title;
    $("#main_body").html(
      '<img src="images/blog-4.jpg" width="100px" height="100px" /><br><br><b>Blog Title:</b></b>&nbsp;' +
        title +
        "<br><br><b>Blog</b>:&nbsp;" +
        msg +
        '<br><br><button onclick="returnfunction()" >Back </button>&nbsp;&nbsp;&nbsp;&nbsp;<button onclick="deletefunction(' +
        id +
        ')" id="' +
        id +
        '">Delete</button>'
    );
  });
}

//home click
function indexfunction() {
  $("#main_body").load("home.html");
}

//Back button
function returnfunction() {
  $("#main_body").load("home.html");
}

//New blog post function
function myfunction() {
  url = "http://localhost:3000/posts";
  var head = $("#title").val();
  var msg = $("#container").val();
  var category = $("#category").val();
  //var cat = document.getElementById("category").value;
  $.ajax({
    url: url,
    type: "POST",
    data: JSON.stringify({
      title: head,
      body: msg,
      cat: category,
    }),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    async: false,
    success: function (msg) {
      console.log("New post Added Successfully");
      $("#main_body").load("home.html");
    },
  });
}

//Blog Delete function
function deletefunction(val) {
  url = "https://jsonprovider.herokuapp.com/posts/?id=" + val;
  $.ajax({
    url: url,
    type: "DELETE",
    contentType: "application/json",
    success: function (result) {
      console.log("post deleted successfully");
      $("#main_body").load("home.html");
    },
  });
}

/////editor top ....
function chooseColor() {
  var mycolor = document.getElementById("myColor").value;
  document.execCommand("foreColor", false, mycolor);
}

function changeFont() {
  var myFont = document.getElementById("input-font").value;
  document.execCommand("fontName", false, myFont);
}

function changeSize() {
  var mysize = document.getElementById("fontSize").value;
  document.execCommand("fontSize", false, mysize);
}

function checkDiv() {
  var editorText = document.getElementById("editor1").innerHTML;
  if (editorText === "") {
    document.getElementById("editor1").style.border = "5px solid red";
  }
}

function removeBorder() {
  document.getElementById("editor1").style.border = "1px solid transparent";
}

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
});
