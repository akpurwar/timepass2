
$(document).ready(()=>{
    $(".header").load("../html/readMoreHeader.html");
   // $(".header").load("/home/sunbeam/a/Dipali-main/upload3/html/readMore.html");

    $("#back").click(()=>{
        history.back();
    })

    $("#post").click(()=>{
        var comment=$('#comment').val();
        console.log(sessionStorage.getItem("user"));
        var blogId = (location.search).slice(4);
        var user=sessionStorage.getItem("user");
        $.ajax({
            url:"http://localhost:3000/Comments",
            method:"post",
            data:{
                "blogId":blogId,
                "userEmail":user,
                "cmt":comment
            },
            success:()=>{
                console.log("data posted");
            },
            error:()=>{
                console.log("error")
            }
        })
    })

    // "userEmail":"patu@gmail.com",
    //   "like":"yes",
    //   "blogId":"1",
    //   "id":"1"

    $('#like').click(()=>{
        $.ajax({
            url:"http://localhost:3000/Likes",
            method:"get",
            success:(like)=>{
                var count=0;
                            console.log("blog id is "+(location.search).slice(4));
                            for(i=0;i<like.length;i++)
                            {
                                if(like[i].blogId==(location.search).slice(4))
                                {
                                    console.log("in first for");
                                    ++count;
                                    console.log("+1");
                                }
                            }
                            var id=(location.search).slice(4);
                            var flag=0;
                            for(i=0;i<like.length;i++)
                            {
                                if((like[i].blogId==id))
                                {
                                    if(like[i].userEmail==sessionStorage.getItem("user"))
                                    {
                                        console.log("user has liked it");
                                        flag=1;
                                    }
                                }
                            }
                            if(flag==0)
                            {
                                console.log("new user let him like post");
                                ++count;
                                $.ajax({
                                    url:"http://localhost:3000/Likes",
                                    method:"post",
                                    data:{
                                        "userEmail":sessionStorage.getItem("user"),
                                        "likes":"yes",
                                        "blogId":id
                                    },
                                    success:()=>{
                                        console.log("like posted");
                                        alert("existing likes : "+count);   
                                        alert("new likes"+count);
                                        sessionStorage.setItem(id,count);
                                    },
                                    error:()=>{
                                        console.log("error in liking");
                                    }
                                })
                                console.log(count);
                            }
            },
            error:()=>{
                console.log("error");
            }
        });
        
    })






        $.ajax({
            url:"http://localhost:3000/Comments",
            method:"get",
            success:(cmt)=>{
                for(i=0;i<cmt.length;i++)
                {
                    var data;
                    if(cmt[i].blogId==(location.search).slice(4))
                    {
                    if(cmt[i].userEmail==sessionStorage.getItem("user"))
                    {
                        
                        console.log(JSON.stringify(cmt[i]));
                        data="<div class='border' style='width:100%'>"+
                        "<h6>Comment : "+cmt[i].cmt+"</h6>"+
                        "<p>By :"+cmt[i].userEmail+"</p>"+
                        
                        "<a class='btn btn-danger' onclick='deletee("+JSON.stringify(cmt[i])+")'>Delete</a>"+
                        "<a class='btn btn-success' onclick='Edit("+JSON.stringify(cmt[i])+")'>Edit</a>"+
                        "<input type='text' id='comment' placeholder='Write comment here...'>"+
                        "</div>";
                    }
                    else
                    {
                        data="<div class='border' style='width:100%'>"+
                        "<h6>Comment : "+cmt[i].cmt+"</h6>"+
                        "<p>By :"+cmt[i].userEmail+"</p>"+
                        "</div>";
                    }
                    $("#commentSection").prepend(data);
                }
                console.log(data);
            }
            $.ajax({
                url:"http://localhost:3000/Likes",
                method:"get",
                success:(like)=>{
                    var initialCount=0;
                    for(i=0;i<like.length;i++)
                    {
                        if(like[i].blogId==(location.search).slice(4))
                        {
                            console.log(initialCount);
                            ++initialCount;
                            if(like[i].userEmail==sessionStorage.getItem("user"))
                            {
                                console.log(like[i].userEmail);
                            $("#like").css("color","blue");
                            }
                        }
                    }
                    $("#likeCount").append(initialCount);
                }
            })
            },
            error:()=>{
                console.log("error")
            }
        })
    

    // blogs[0].comments[1].name
    
    var blogId = location.search;
    $.ajax({
    url:"http://localhost:3000/Blog"+blogId,
    method:"GET",
    success:(blogs) =>{
          console.log(blogs);
          console.log(blogs[0].title);
          $("#show").prepend("<div class='card blogCard'><h2 class='card-header read-more-title text-center'>"
          +blogs[0].title+"</h2><div class='card-body'><p class='card-text text-center'><label>Category:&nbsp</label>"
          +blogs[0].category+"</p><p class='card-text text-center'><label>Date:&nbsp</label>"+blogs[0].date+"</p><p class='card-text'>"+blogs[0].description+"</p></div></div>");
        }
    })

    // $.ajax({
    //     url:"http://localhost:3000/Blog"+blogId,
    //     method:"GET",
    //     success:(blog)=>{
    //         for(i=0;i<blog[0].comments.length;i++)
    //         $("#show").append(blog[0].comments[i].name+blog[0].comments[i].cmt)
    //     }
    // })
    $("#unlike").click(()=>{
        var id=(location.search).slice(4);
        $.ajax({
            url:"http://localhost:3000/Likes",
            method:"get",
            success:(like)=>{
                for(var i=0;i<like.length;i++)
                {
                    if((like[i].blogId==id) && (like[i].userEmail==sessionStorage.getItem("user")))
                    {
                        var likeId=like[i].id;
                        console.log("like id is "+likeId);
                        $.ajax({
                            url:"http://localhost:3000/Likes/"+likeId,
                            method:"delete",
                            success:()=>{
                               
                       
                          
                            },
                            error:()=>{
                                alert("error");
                            }
                        })
    
                    }
                }
            }
        })
    })


})
function deletee() {
    var id=(location.search).slice(4);
    console.log("id is  : "+id);
    alert("in delete");
    $.ajax({
  
      url: "http://localhost:3000/Comments",
      type: "GET",
      success: function (comment) {
          for(var i=0;i<comment.length;i++)
          {
            if((comment[i].blogId==id)&&(comment[i].userEmail==sessionStorage.getItem("user")))
            {
                var cmtId=comment[i].id;
                alert(" id is : "+cmtId);
                $.ajax({
                    url: "http://localhost:3000/Comments/"+cmtId,
                    type: "DELETE",
                    success:()=>{
                        alert("deleted");
                    },
                    error:()=>{
                        alert("error");
                    }

                })
            }
          }
      },
      error:(e)=>{
          alert("error"+e);
      }
        
    })

}
    function Edit() {
        var id=(location.search).slice(4);
        console.log("id is  : "+id);
        alert("in Edit");
        

        comment = $("#comment").val();
        console.log(comment);
        $.ajax({
      
          url: "http://localhost:3000/Comments",
          type: "GET",
          success: function (comment) {
              for(var i=0;i<comment.length;i++)
              {
                if((comment[i].blogId==id)&&(comment[i].userEmail==sessionStorage.getItem("user")))
                {
                    var cmtId=comment[i].id;
                    alert(" id is : "+cmtId);
                    $.ajax({
                        url: "http://localhost:3000/Comments/"+cmtId,
                        type: "PUT",
                        data: JSON.stringify({
                            
                            cmt: comment
                        
                          }),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        async: false,
                     
                        success:()=>{
                            
                            alert("updated");
                        },
                        error:()=>{
                            alert("error");
                        }
    
                    })
                }
              }
          },
          error:(e)=>{
              alert("error"+e);
          }
            
        })
    

}


