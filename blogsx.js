$(document).ready(function () {
  $("#Submit").click(function () {
    alert("in my function");
    url = "http://localhost:3001/comments";
    var d = new Date();
    var date = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();
    var name = $("#Name").val();
    console.log(name);

    comment = $("#Comment").val();
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
  });

//   $("#Edit").click(function () {
//     alert("in update");
//     $.ajax({
//       url: "http://localhost:3000/comments",
//       type: "GET",

//       success: function (x) {
//         for (var i = 0; i < x.length; i++) {
//           var a = x[i].comment;
//           var b = x[i].Date;

//           $("#Comment").append(a + "" + b);
//         }
//         console.log("New post Added Successfully");
//       },
//     });
//   });

$("#Edit").click(function () {
      alert("in update");
           var name = $("#Name").val();
           console.log(name);
       
           comment = $("#Comment").val();
           console.log(comment);
           
          $.ajax({
           url: "http://localhost:3001/comments/2",
           type: "PUT",
           data: JSON.stringify({
             name: name,
             comment: comment,
             //Date: date,
           }),
          
           contentType: "application/json; charset=utf-8",
           dataType: "json",
           async: false,
          
           success: function (data) {
             
             console.log(data)
             console.log("New post Added Successfully");
           },
         });
      });

    });