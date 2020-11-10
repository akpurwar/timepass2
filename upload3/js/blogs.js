
$(document).ready(()=>{
  $(()=>{
    var categories=['Nature','Technology','Luck','Motivation','Life','Sports','Happiness','travel'];
    $('#category').autocomplete({
        source: categories
    });
});
  // #editor{
  //   display:none;
  // }
  // #logout{
  //   display: none;
  // }
  if(sessionStorage.getItem("isActive")==1)
  {
    console.log("when loading");
    $("#login").css("display","none");
    $("#signup").css("display","none");
  }
  if(sessionStorage.getItem("isActive")!=1)
  {
    $("#logout").css("display","none");
    $("#editor").css("display","none");
  }
    $.ajax({
      url:"http://localhost:3000/Blog",
      method:"GET",
      data:{get_param :'value'},
      success:(blogs) =>{
          
        for(let i=0;i<blogs.length;i++)
        {
            createView(blogs[i]);
        }
      }
    })
    
$('#Go').click(()=>{
    console.log("clicked");
    $("#postArea").load("blank.html");
    var category=$("#category").val().toLowerCase();
        console.log(category);
    $.ajax({
        url:"http://localhost:3000/Blog",
        method:"GET",
        data:{get_param :'value'},
        success:(blogs) =>{
            
          for(i=0;i<blogs.length;i++)
          {
            if(blogs[i].category===category)
              createView(blogs[i]);
          }
        }
      })
})

$("#logout").click(()=>{
  console.log("in logout");
  sessionStorage.removeItem("user");
  sessionStorage.removeItem("isActive");
  $("#logout").css("display","none");
  $("#login").css({"display":"flex"},{"flex-direction":"row"});
  $("#signup").css({"display":"flex"},{"flex-direction":"row"});
  sessionStorage.removeItem("currentPostId");
  location.replace("http://127.0.0.1:5500/html/index.html");
})

})

function createButton(v)
{

  let editBtn =document.createElement('a');
   editBtn.textContent="read more..";
    editBtn.setAttribute('target','_self');
    editBtn.className = "read"
    
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
      var filterDescription=descriptionData.slice(0,300);
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

function showPost()
{
  console.log("in show post function");
  location.assign("http://127.0.0.1:5500/html/readMore.html?id="+sessionStorage.getItem("currentPostId"));
}

