
$('document').ready(()=>{
    $('.login').click(()=>{
        console.log("in login");
        var email1=$("#email").val().toLowerCase();
        var password1=$("#password").val();
    $.ajax({
        url:`http://localhost:3000/User?email=${email1}&password=${password1}`,
        method:"GET",
        success:(x)=>{
            if(x.length > 0){
                console.log("in login success");
                sessionStorage.setItem("isActive",1);
                $('.moretext').slideToggle();
                $(".moreless-button").css("display","none");
                sessionStorage.setItem("user",x[0].email);
                $("#logout").css("display","inline");
                $("#editor").css("display","inline");
                $("#signup").css("display","none");
                $("#login").css("display","none");
                $("#myModal").css("display","none");
                $("#editor").css({"display":"flex"},{"flex-direction":"row"});
                if(sessionStorage.getItem("currentPostId"))
                {
                    location.assign("http://127.0.0.1:5501/html/readMore.html?id="+sessionStorage.getItem("currentPostId"));
                }
            }else{
                console.log("Login Failed")
            }
                        // flag=1;
                        // for(i=0;i<x.length;i++)
                        // {
                        //     console.log("in for loop")
                        //     if(x[i].email===email1 && x[i].password===password1)
                        //     {
                        //         console.log("Login successful");
                        //         flag=0;
                        //         sessionStorage.setItem("isActive",1);
                        //         if((sessionStorage.getItem("isActive"))==1)
                        //         {
                        //             $('.moretext').slideToggle();
                        //         }
                        //         $(".moreless-button").css("display","none");
                        //         sessionStorage.setItem("user",x[i].email);
                        //         $("#logout").css("visibility","visible");
                        //         $("#signup").css("display","none");
                        //         $("#login").css("display","none");
                        //         $("#myModal").css("display","none");
                        //         $("#editor").css({"display":"flex"},{"flex-direction":"row"});
                        //         if(sessionStorage.getItem("currentPostId"))
                        //         {
                        //             location.assign("http://127.0.0.1:5500/html/abc.html?id="+sessionStorage.getItem("currentPostId"));
                        //         }
                                
                        //         break;
                        //     }
                        // }
                        // if(flag)
                        // {
                        //     console.log("login Failed");
                        // }
                     },
        error : (e) =>{
                        console.log("Data Not Available");
                    }
             })
    })
})  

