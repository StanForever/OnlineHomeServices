<%-- 
    Document   : custRegister
    Created on : Oct 27, 2016, 10:07:01 PM
    Author     : Pranit Raje
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
        <meta name="description" content="">
        <meta name="author" content="">
        <link rel="icon" href="assets/ico/favicon.ico">
        <link rel="stylesheet" href="bootstrap-3.3.7-dist\css\footer-distributed-with-address-and-phones.css">
        <title>Register as Customer</title>

        <!-- Bootstrap core CSS -->
        <link href="bootstrap-3.3.7-dist\css\bootstrap.min.css" rel="stylesheet">
        <link href="bootstrap-3.3.7-dist\css\ie10-viewport-bug-workaround.css" rel="stylesheet">
        <link href="bootstrap-3.3.7-dist\css\signin.css" rel="stylesheet">
        <script src="bootstrap-3.3.7-dist\js\ie-emulation-modes-warning.js"></script>
        <script type="text/javascript">

            //Created / Generates the captcha function    
            function DrawCaptcha()
            {
                var a = Math.ceil(Math.random() * 10) + '';
                var b = Math.ceil(Math.random() * 10) + '';
                var c = Math.ceil(Math.random() * 10) + '';
                var d = Math.ceil(Math.random() * 10) + '';
                var e = Math.ceil(Math.random() * 10) + '';
                var f = Math.ceil(Math.random() * 10) + '';
                var g = Math.ceil(Math.random() * 10) + '';
                var code = a + ' ' + b + ' ' + ' ' + c + ' ' + d + ' ' + e + ' ' + f + ' ' + g;
                document.getElementById("txtCaptcha").value = code;
            }

            // Validate the Entered input aganist the generated security code function   
            function ValidCaptcha() {
                var str1 = removeSpaces(document.getElementById('txtCaptcha').value);
                var str2 = removeSpaces(document.getElementById('txtInput').value);
                if (str1 === str2)
                    return "Login Successful!";
                return "Wrong CAPTCHA. Please Try Again!";

            }

            // Remove the spaces from the entered and generated code
            function removeSpaces(string)
            {
                return string.split(' ').join('');
            }


        </script>
    </head>

    <body onload="DrawCaptcha();" background="./images/1033.jpg">



        <div class="jumbotron">
            <div class="container">
                <h1 style="text-align: center; font-family: Times">Welcome to Online Home Services</h1>
                <h3 style="text-align: center;">Kindly register here as a Customer and give us an opportunity to serve you :)</h3>
            </div>
        </div>

        <div class="container">
        <div class="thumbnail">     
            <form class="form-signin" method="post" action="../RegisterCustomerServlet.do">
                <h2 class="form-signin-heading">Please Register Here: </h2><hr>
                <p><strong> Enter Your First Name: </strong></p>
                <input type="text" name="firstName" id="inputName" class="form-control" placeholder="First Name" required="autofocus" title="Your Fist Name goes here..."><br>
                <p><strong> Enter Your Last Name: </strong></p>
                <input type="text" name="lastName" id="inputName" class="form-control" placeholder="Last Name" required="autofocus" title="Your Last Name goes here..."><br>
                <p><strong> Your Email Address: </strong></p>
                <label for="inputEmail" class="sr-only">Email address</label>
                <input type="email" name="email" id="inputEmail" class="form-control" placeholder="Email Address" required autofocus title="Way to reach to you through Email..."><br>
                <p><strong> Enter Your Contact Number: </strong></p>
                <input type="tel" name="phone" id="inputNumber" class="form-control" placeholder="Contact Number" maxlength="10" title="Way to Contact you..."><br>
                <p><strong> Enter Your Username: </strong></p>
                <input type="text" name="username" id="inputUserName" class="form-control" placeholder="Username" maxlength="20" title="You will be known by this name on our website..."><br>
                <p><strong> Enter Your City: </strong></p>
                <input type="text" name="city" id="inputCity" class="form-control" placeholder="City" title="So you can choose Professionals near your location..."><br>
                <p><strong> Enter Your Password: </strong></p>
                <label for="inputPassword" class="sr-only">Password</label>
                <input type="password" name="password" id="inputPassword" class="form-control" placeholder="Password" required title="Because Security is at the TOP..."><br>
                <p><strong> Reconfirm Your Password: </strong></p>
                <input type="password"  id="inputPassword" class="form-control" placeholder="Re-Enter Password" required title="It doesn't harm to re-check the Password...">
                <div class="checkbox">
                    <div>
                        <tr>
                            <td>
                                Enter the Captcha<br />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="text" id="txtCaptcha" 
                                       style="background-image:url(./images/capnum.JPG); text-align:center; border:none;
                                       font-weight:bold; font-family:Modern"; disabled="true" />&nbsp
                                <input type="button" id="btnrefresh" value="Refresh" onclick="DrawCaptcha();" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="text" id="txtInput" class="form-control" placeholder="CAPTCHA" title="Just to prevent spambots/adbots from signing up" />    
                            </td>
                        </tr>
                    </div>
                    <label>
                        <input type="checkbox" value="remember-me"> Remember me
                    </label>

                </div>
                <button class="btn btn-lg btn-primary btn-block" type="submit" onclick="alert(ValidCaptcha());">Register</button><br>
            </form>
        </div>
        </div>



        <!-- Bootstrap core JavaScript
        ================================================== -->
        <!-- Placed at the end of the document so the pages load faster -->


        <script type="text/javascript" src="bootstrap-3.3.7-dist\js\bootstrap.min.js"></script>
        <script type="text/javascript" src="ootstrap-3.3.7-dist\js\retina.js"></script>
        <script type="text/javascript" src="bootstrap-3.3.7-dist\js\jquery.easing.1.3.js"></script>
        <script type="text/javascript" src="bootstrap-3.3.7-dist\js\smoothscroll.js"></script>
        <script type="text/javascript" src="bootstrap-3.3.7-dist\js\jquery-func.js"></script>
        <script src="bootstrap-3.3.7-dist\js\ie10-viewport-bug-workaround.js"></script>
    </body>
</html>