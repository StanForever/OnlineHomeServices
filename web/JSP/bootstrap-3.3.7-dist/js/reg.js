$(document).ready(function () {
    $("#realPerson").realperson();

    $("#userinput").keyup(function () {
        var username = $("#userinput").val();
        console.log("var username = " + username);
        if (username.length < 5) {
            document.getElementById("userspan").innerHTML = "Username too short";
            return;
        }
        //maybe some flag setting code here
        else
            document.getElementById("userspan").innerHTML = "";
        //POST request
        $.post("CheckUsernameServlet", {username: username/*, other: true*/}, function (data, status, xhr) {
            console.log("data = " + data);
            if (data == "true") //IS this OK? We SHOULD change it. But it works. -_-
                document.getElementById("userspan").innerHTML = "Username OK!";
            //maybe some flag setting code here
            else
                document.getElementById("userspan").innerHTML = "Username already taken!";
        });
    }); //FOR most of the fields, do client side validation.
});