

$('document').ready(()=>{
    $("#signUp").click(()=>{
        console.log("posting");
        var id1=$("#id").val();
        console.log("id is"+id1);
        var FirstName1=$("#fName").val();
        var lastName1=$("#lName").val();
        var email1=$("#sEmail").val().toLowerCase();
        var password1=$("#sPassword").val();
        $.ajax({
            url:"http://localhost:3000/User",
            method:"POST",
            data:{
                "id":id1,
                "first_name":FirstName1,
                "last_name": lastName1,
                "password":password1,
                "email": email1
            },
            success:(x)=>{
                alert(x.first_name+" name posted");
            },
            error:(e)=>{
                alert("error");
            }
        });
        })  
})
