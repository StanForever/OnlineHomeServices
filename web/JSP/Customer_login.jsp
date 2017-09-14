<%-- 
    Document   : login
    Created on : 25 Oct, 2016, 1:17:24 PM
    Author     : Paritosh
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http equiv="Cache-Control" content="private , max-age=0, no-cache">
        <meta http-equiv="Pragma" content="no-cache">
        <meta http-equiv="Expires" content="0">

        <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
        <meta name="description" content="">
        <meta name="author" content="">
        <meta name="google-signin-client_id" content="389349408164-8fiqpkdksmghe8pi7g1qpgaknahkjkpc.apps.googleusercontent.com">
        <link rel="icon" href="assets/ico/favicon.ico">
        <link rel="stylesheet" href="bootstrap-3.3.7-dist\css\footer-distributed-with-address-and-phones.css">
        <title>Sign in</title>

        <!-- Bootstrap core CSS -->
        <link href="bootstrap-3.3.7-dist\css\bootstrap.min.css" rel="stylesheet">
        <link href="bootstrap-3.3.7-dist\css\ie10-viewport-bug-workaround.css" rel="stylesheet">
        <link href="bootstrap-3.3.7-dist\css\signin.css" rel="stylesheet">
        <script src="bootstrap-3.3.7-dist\js\ie-emulation-modes-warning.js"></script>
        <script>
            function validateNonEmpty(inputField, helpText)
            {
                if (inputField.value.length === 0)
                {
                    //Value entered is empty
                    if (helpText !== null)
                        helpText.innerHTML = "Please enter a value";
                    return false;
                }
                else
                {
                    //Value entered is not empty
                    if (helpText !== null)
                        helpText.innerHTML = "";
                    return true;
                }
            }
            function validateRegEx(regex, inputStr, helpText, helpMessage)
            {
                if (!regex.test(inputStr))
                {
                    if (helpText !== null)
                        helpText.innerHTML = helpMessage;
                    return false;
                }
                else
                {
                    if (helpText !== null)
                        helpText.innerHTML = "";
                    return true;
                }
            }


            function validateEmail(inputField, helpText)
            {
                if (!validateNonEmpty(inputField, helpText))
                    return false;
                else
                    return validateRegEx(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, inputField.value, helpText, "Please enter an email address (for eg. paritoshshirodkar@gmail.com)");


            }

            function validateUserName(inputField, helpText)
            {
                if (!validateNonEmpty(inputField, helpText))
                    return false;
                else
                    return validateRegEx(/^[a-zA-Z0-9]$/, inputField.value, helpText, "Please enter appropriate username eg. paritosh19")
            }
        </script>
    </head>

    <body onload="DrawCaptcha()">

        <form method="post" action="../LoginCustomerServlet.do">


            <div class="jumbotron">
                <div class="container">
                    <h1>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp;Online Home Services</h1>
                </div>
            </div>

            <div class="container">

                <form class="form-signin">
                    <h2 class="form-signin-heading">Please sign in</h2>
                    <label for="inputEmail" class="sr-only">Enter username</label>
                    <input type="text" name="email" id="inputEmail" class="form-control" placeholder="Username" onblur="validateUserName(this, document.getElementById('email_help'))" required autofocus>
                    <span id="email_help"></span>
                    <label for="inputPassword" class="sr-only">Password</label>
                    <input type="password" name="password" id="inputPassword" class="form-control" placeholder="Password" onBlur="validateNonEmpty(this, document.getElementById('password_help'))" required>
                    <span id="password_help"></span>
                    <div>
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
                                document.getElementById("txtCaptcha").value = code
                            }

                            // Validate the Entered input aganist the generated security code function   
                            function ValidCaptcha() {
                                var str1 = removeSpaces(document.getElementById('txtCaptcha').value);
                                var str2 = removeSpaces(document.getElementById('txtInput').value);
                                if (str1 == str2)
                                    return "Login Successful!";
                                return "Wrong CAPTCHA. Please Try Again!";

                            }

                            // Remove the spaces from the entered and generated code
                            function removeSpaces(string)
                            {
                                return string.split(' ').join('');
                            }


                        </script>





                        <table>

                            <tr>
                                <td>
                                    <input type="text" id="txtCaptcha" 
                                           style="background-image:url(images/capnum.JPG); text-align:center; border:none;
                                           font-weight:bold; font-family:Modern"; disabled="true" />     
                                <td><button class="btn btn-lg btn-primary btn-block" id="btnrefresh" value="New Captcha" onclick="DrawCaptcha();" /></td>    
                            </tr>
                            <tr>
                                <td>
                                    <input type="text" id="txtInput" class="form-signin" placeholder="Enter Captcha"/>    
                                </td>
                            </tr>

                        </table>
                    </div>
                    <div class="checkbox">
                        <label>
                            <input type="checkbox" value="remember-me"> Remember me
                        </label>

                    </div>
                    <button class="btn btn-lg btn-primary btn-block" type="submit" onclick="alert(ValidCaptcha());">Sign in</button>
                    <div><h3>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspOR</h3></div>
                    <div id="my-signin2"></div>
                    <fb:login-button scope="public_profile,email" onlogin="checkLoginState();">
                    </fb:login-button>
                    <script>
                        function onSuccess(googleUser) {
                            console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
                            var profile = googleUser.getBasicProfile();
                            console.log("inside signin");
                            console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
                            console.log('Name: ' + profile.getName());
                            console.log('Image URL: ' + profile.getImageUrl());
                            console.log('Email: ' + profile.getEmail());
                            window.location = "localhost:8080/OnlineHomeServices/JSP/index.jsp";
                        }
                        function onFailure(error) {
                            console.log(error);
                        }
                        function renderButton() {
                            gapi.signin2.render('my-signin2', {
                                'scope': 'profile email',
                                'width': 240,
                                'height': 50,
                                'longtitle': true,
                                'theme': 'dark',
                                'onsuccess': onSuccess,
                                'onfailure': onFailure
                            });
                        }
                    </script>

                    <script src="https://apis.google.com/js/platform.js?onload=renderButton" async defer></script>
                    <script>
                        function signOut() {
                            var auth2 = gapi.auth2.getAuthInstance();
                            auth2.signOut().then(function () {
                                console.log('User signed out.');
                            });
                        }
                        console.log("Out of function.");
                        function onSignIn(googleUser) {
                            var profile = googleUser.getBasicProfile();
                            console.log("inside signin");
                            console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
                            console.log('Name: ' + profile.getName());
                            console.log('Image URL: ' + profile.getImageUrl());
                            console.log('Email: ' + profile.getEmail());
                        }
                    </script>
                    <script>
                        // This is called with the results from from FB.getLoginStatus().
                        function statusChangeCallback(response) {
                            console.log('statusChangeCallback');
                            console.log(response);
                            // The response object is returned with a status field that lets the
                            // app know the current login status of the person.
                            // Full docs on the response object can be found in the documentation
                            // for FB.getLoginStatus().
                            if (response.status === 'connected') {
                                // Logged into your app and Facebook.
                                testAPI();
                            } else if (response.status === 'not_authorized') {
                                // The person is logged into Facebook, but not your app.
                                document.getElementById('status').innerHTML = 'Please log ' +
                                        'into this app.';
                            } else {
                                // The person is not logged into Facebook, so we're not sure if
                                // they are logged into this app or not.
                                document.getElementById('status').innerHTML = 'Please log ' +
                                        'into Facebook.';
                            }
                        }

                        // This function is called when someone finishes with the Login
                        // Button.  See the onlogin handler attached to it in the sample
                        // code below.
                        function checkLoginState() {
                            FB.getLoginStatus(function (response) {
                                statusChangeCallback(response);
                            });
                        }

                        window.fbAsyncInit = function () {
                            FB.init({
                                appId: '124664721339259',
                                cookie: true, // enable cookies to allow the server to access 
                                // the session
                                xfbml: true, // parse social plugins on this page
                                version: 'v2.5' // use graph api version 2.5
                            });

                            // Now that we've initialized the JavaScript SDK, we call 
                            // FB.getLoginStatus().  This function gets the state of the
                            // person visiting this page and can return one of three states to
                            // the callback you provide.  They can be:
                            //
                            // 1. Logged into your app ('connected')
                            // 2. Logged into Facebook, but not your app ('not_authorized')
                            // 3. Not logged into Facebook and can't tell if they are logged into
                            //    your app or not.
                            //
                            // These three cases are handled in the callback function.

                            FB.getLoginStatus(function (response) {
                                statusChangeCallback(response);
                            });

                        };

                        // Load the SDK asynchronously
                        (function (d, s, id) {
                            var js, fjs = d.getElementsByTagName(s)[0];
                            if (d.getElementById(id))
                                return;
                            js = d.createElement(s);
                            js.id = id;
                            js.src = "//connect.facebook.net/en_US/sdk.js";
                            fjs.parentNode.insertBefore(js, fjs);
                        }(document, 'script', 'facebook-jssdk'));

                        // Here we run a very simple test of the Graph API after login is
                        // successful.  See statusChangeCallback() for when this call is made.
                        function testAPI() {
                            console.log('Welcome!  Fetching your information.... ');
                            FB.api('/me', function (response) {
                                console.log('Successful login for: ' + response.name);
                                document.getElementById('status').innerHTML =
                                        'Thanks for logging in, ' + response.name + '!';
                            });
                        }
                    </script>

                    <br><a href="Otp_email.jsp">Forgot Password</a>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp;<a href="Otp_email.jsp">Reset Password</a>
                </form>




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
