<%-- 
    Document   : genOTP
    Created on : Oct 28, 2016, 1:09:00 PM
    Author     : Pranit Raje
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
        <meta name="description" content="">
        <meta name="author" content="">
        <link rel="icon" href="assets/ico/favicon.ico">
        <link rel="stylesheet" href="bootstrap-3.3.7-dist\css\footer-distributed-with-address-and-phones.css">
        <title>Generate OTP</title>

        <!-- Bootstrap core CSS -->
        <link href="bootstrap-3.3.7-dist\css\bootstrap.min.css" rel="stylesheet">
        <link href="bootstrap-3.3.7-dist\css\ie10-viewport-bug-workaround.css" rel="stylesheet">
        <link href="bootstrap-3.3.7-dist\css\signin.css" rel="stylesheet">
        <script src="bootstrap-3.3.7-dist\js\ie-emulation-modes-warning.js"></script>
    </head>
    <body background="./images/1033.jpg">
        <form method="post" action="../ResetPasswordOtpServlet.do"
              <div class="container">
                <h1 style="text-align: center;">Please Fill Up The Fields to Generate OTP</h1><br><hr><br>
                <div class="row">
                    <div class="col-md-4">

                    </div>
                    <div class="col-md-4">
                        <div class="thumbnail"  style="text-align: center;"><br>
                            <p><strong>Enter your Email:</strong></p>
                            <input type="email" name="email" id="inputEmail" class="form-control" placeholder="Email Address" required autofocus title="Check your Email to get the OTP..."><br>
                            <div class="checkbox">
                                <button type="submit" class="btn btn-danger btn-lg btn-block">Generate OTP</button>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4s">

                    </div>	
                </div>
            </div>
        </form>
    </body>
</html>