<%-- 
    Document   : resetPass
    Created on : Oct 28, 2016, 1:09:53 PM
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
        <title>Reset Password</title>

        <!-- Bootstrap core CSS -->
        <link href="bootstrap-3.3.7-dist\css\bootstrap.min.css" rel="stylesheet">
        <link href="bootstrap-3.3.7-dist\css\ie10-viewport-bug-workaround.css" rel="stylesheet">
        <link href="bootstrap-3.3.7-dist\css\signin.css" rel="stylesheet">
        <script src="bootstrap-3.3.7-dist\js\ie-emulation-modes-warning.js"></script>
    </head>

    <body background="./images/1033.jpg">
        <div class="container">
            <div class="row">
                <h1 style="text-align: center;">Please Fill Up The Fields to Reset Your Password</h1><br><hr><br>
                <div class="col-md-4">

                </div>
                <div class="col-md-4">
                    <div class="thumbnail"><br>
                        <form method="post" action="../ResetPasswordServlet.do">
                            <input type="text" name="otp" id="inputOtp" class="form-control" placeholder="Enter otp here" required title="Just to check you're a legitimate user..."><br>
                            <p><strong> Set New Password: </strong></p>
                            <input type="password" name="password" id="inputPassword" class="form-control" placeholder="Set Password" required title="It's advisable to set a strong Password...">
                            <div class="checkbox">
                                <p><strong> Reconfirm Your New Password: </strong></p>
                                <input type="password" name="" id="inputPassword" class="form-control" placeholder="Re-Enter Password" required title="It doesn't harm to re-check the Password...">
                                <div class="checkbox">
                                    <button type="submit" class="btn btn-danger btn-lg btn-block">Reset New Password</button>
                                </div>
                            </div>
                        </form>
                    </div> 
                </div>
                <div class="col-md-4">

                </div>
            </div>
        </div>
    </body>
</html>
