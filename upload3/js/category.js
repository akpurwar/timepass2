$(document).ready(() => {
    // $("#search-button").click(function () {
    //   var data = $("#input-search").val();
    //   $("#main").html("");
  
    //   $.ajax({
    //     url: "http://localhost:3000/Blog",
    //     method: "GET",
    //     success: (x) => {
    //       for (var i = 0; i < x.length; i++) {
    //         if (
    //           data === x[i].category ||
    //           data === x[i].title ||
    //           data === x[i].author
    //         ) {
    //           //append to div
    //           $("#main").append(
    //             '<div class="blog-div">' +
    //               "<span>" +
    //               x[i].title +
    //               "</span> <br>" +
    //               "<span>" +
    //               x[i].date +
    //               "</span><br>" +
    //               "<p>" +
    //               x[i].description +
    //               "</p><br>" +
    //               '<button class="btn-primary" id="' +
    //               x[i].title +
    //               '">readmore</button>' +
    //               "</div>"
    //           );
    //         }
    //       }
    //     },
    //     error: (e) => {
    //       console.log("not available");
    //     },
    //   });
    // });
  
    $(".link-search").click(function () {
      console.log("clicked on link");
      var element = $(this).html().toLowerCase();
      $("#postArea").empty();
      console.log("clicked on link" + element);
      $.ajax({
        url: "http://localhost:3000/Blog",
        method: "GET",
        success: (x) => {
          console.log("suc");
          for(let i=0;i<x.length;i++)
          {
                if (x[i].category == element) {
                createView(x[i]);
            }
          }
  
        //   for (var j = 0; j < x.length; j++) {
        //     console.log("element"+element);
  
        //     if (x[j].category == element) {
        //       console.log("if");
  
        //       //append to div
        //       $("#postArea").append(
        //         '<div class="blog-div">' +
        //           "<span>" +
        //           x[j].title +
        //           "</span> <br>" +
        //           "<span>" +
        //           x[j].category +
        //           "</span><br>" +
        //           "<p>" +
        //           x[j].description +
        //           "</p><br>" +
        //           '<button class="btn-primary" id="' +
        //           x[j].title +
        //           '">readmore</button>' +
        //           "</div>"
           //    );
            }, 
        error: (e) => {
          console.log("not available");
        },
      });
    });
  
  
  // const getPost = () => {
  //     console.log("clicked on link");
  //     var element = $(this).html();
  //     $("#main").load("blank.html");
  //     console.log("clicked on link" + element);
  //     $.ajax({
  //       url: "http://localhost:3000/blogs",
  //       method: "GET",
  //       success: (x) => {
        
  //         console.log("suc");
  
  //         for (var j = 0; j < x.length; j++) {
  //           console.log("for");
  
  //           if (x[j].category == element) {
  //             console.log("if");
  
  //             //append to div
  //             $("#main").append(
  //               '<div class="blog-div">' +
  //                 "<span>" +
  //                 x[j].title +
  //                 "</span> <br>" +
  //                 "<span>" +
  //                 x[j].author +
  //                 "</span><br>" +
  //                 "<p>" +
  //                 x[j].content +
  //                 "</p><br>" +
  //                 '<button class="btn-primary" id="' +
  //                 x[j].title +
  //                 '">readmore</button>' +
  //                 "</div>"
  //             );
  //           }
  //         }
  
  //         }})    };
        });


function createButton(v)
{

  let editBtn =document.createElement('a');
   editBtn.textContent="read more..";
    editBtn.setAttribute('target','_self');
    
    
    // editBtn.setAttribute('href','abc.html?id='+v.id);
    if(sessionStorage.getItem("currentPostId")==undefined)
    {
      editBtn.setAttribute('data-target','#myModal');
      editBtn.setAttribute('data-toggle','modal');
    }
    else
    {
      editBtn.setAttribute("href","javascript:showPost()");
    }
  
  
   
    editBtn.onclick = function(){
    console.log(v.id);
    sessionStorage.setItem("currentPostId",v.id);
     
  }
  return editBtn;
}


        function createView(record){   
            let colDiv =document.createElement('div');
            colDiv.className = "col-md-4 mt-4";
            let cardDiv=document.createElement('div');
          
                cardDiv.className = "card text-center cardData";
                colDiv.appendChild(cardDiv);
          
                let div1 =document.createElement('div');
                div1.className = "card-body cardPostData";
          
                let title =document.createElement('h4');
                title.className='card-title';
              
                let category =document.createElement('p');
                category.className='card-text';
          
                let date =document.createElement('p');
                date.className='card-text';
          
                let description =document.createElement('p');
                description.className='card-text';
          
                var descriptionData= record.description;
                var filterDescription=descriptionData.slice(0,100);
                description.innerHTML = filterDescription;
                var head= record.title;
                var cate = record.category;
                var blogDate = record.date;
          
                title.innerHTML = head;
                category.innerHTML = "Category: " + cate;
                date.innerHTML = "Date: "+blogDate;
                let link=createButton(record);
                div1.appendChild(title);
                div1.appendChild(category);
                div1.appendChild(date);
                div1.appendChild(description);
                div1.appendChild(link);
          
                var content = document.getElementById("postArea");
                cardDiv.appendChild(div1);
                content.appendChild(colDiv);
                    return content;
          }