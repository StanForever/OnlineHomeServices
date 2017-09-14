<%-- 
    Document   : plumbing
    Created on : Oct 25, 2016, 10:01:19 PM
    Author     : Pranit Raje
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<title>Book Online Appointment for Plumbing-services, Hire Plumber</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <link href="bootstrap-3.3.7-dist/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
        <!--<link href="./css/bootstrap.min.css" rel="stylesheet">-->
        <script src="bootstrap-3.3.7-dist/js/respond.js" type="text/javascript"></script>
	<!--<script type="text/javascript" src="./js/respond.js"></script>-->
</head>
<body>
	<div class="jumbotron">
		<div class="row">
			<div class="col-md-4">
				<img src="images/main-page.jpg" alt="plumbing-repair">
			</div>
			<div class="col-md-4 col-md-offset-1" style="font-family: Times, serif;">
				<h1 style="font-family: 'Righteous', sans-serif; color: white"><b>Find trusted plumbers.</b></h1>
				<h4 style="font-family: 'Righteous', sans-serif; color: white"><b>Relax! Get your plumbing problems fixed at your own convenient time...</h4>
			</div>
			<div class="col-md-4 col-md-offset-3">
				<div class="container"; align="center">
					<div class="thumbnail">
						<form method="POST">
							<h2 align="center" style="background-color: #d3d3d3">Find Plumber</h2>
					        Please select your location:
					        <select placeholder="Your location">
					        	<option>Mumbai</option>
					        	<option>Bangalore</option>
					        	<option>Delhi</option>
					        	<option>Pune</option>
					        </select><hr>
					        <button type="button" class="btn btn-big btn-danger btn-block">BOOK AN EXPERT PLUMBER  <span class="glyphicon glyphicon-play"></span></button>
						</form>	
					</div>
				</div>
			</div>
		</div>
	</div>
	<hr>
	<div class="container">
		<h2 style="text-align: center;"><u><strong>OUR UNIQUE FEATURES!</strong></u></h2><br>
		<div class="row">
			<div class="col-md-3">
				<img src="images/feature1.png" alt="feature1" class="img-responsive center-block">
				<p style="text-align: center;"><h4 style="color: #ff8c00">TRAINED AND CERTIFIED STAFF</h4>Get expert plumbers who follow strict quality standards</p>
			</div>
			<div class="col-md-3">
				<img src="images/feature2.png" alt="feature2" class="img-responsive center-block">
				<p style="text-align: center;"><h4 style="color: #ff8c00">BACKGROUND VERIFIED</h4>All your service providers are verified through criminal and address checks</p>
			</div>
			<div class="col-md-3">
				<img src="images/feature3.png" alt="feature3" class="img-responsive center-block">
				<p style="text-align: center;"><h4 style="color: #ff8c00">7-DAY REDO GUARANTEE</h4>Get work redone free of cost incase problem recurs within 7 days</p>
			</div>
			<div class="col-md-3">
				<img src="images/feature4.png" alt="feature4" class="img-responsive center-block">
				<p style="text-align: center;"><h4 style="color: #ff8c00">10000 RUPEES DAMAGE INSURANCE</h4>We take responsibility for any damages that you incur due to service provider error</p>
			</div>
		</div>
	</div>
	<hr>
	<div class="container">
		<h2 style="text-align: center;"><u><strong>CUSTOMER TESTIMONIALS</strong></u></h2><br>
		<div class="row">
			<div class="col-md-6">
				<div class="col-md-3">
					<img src="images/testm1.jpg" class="img-responsive img-circle">
				</div>
				<div class="col-md-9">
					<p><em>"Great job from the team. I had to get my kitchen pipes replaced and they did it within just 2 days. Very quick response and affordable. Cheers!!"</em></p>
					<hr><strong>Chandrashekhar, Mumbai</strong>
				</div>
			</div>
			<div class="col-md-6">
				<div class="col-md-3">
					<img src="images/testm2.jpg" class="img-responsive img-circle">
				</div>
				<div class="col-md-9">
					<p><em>"The plumbers from the company are highly qualified. The person who came to my house explained the issue to me very clearly and what had to be done. Appreciate the help."</em></p>
					<hr><strong>Srisanth, Bangalore</strong>
				</div>
			</div>
		</div>
	</div>
	<hr>
	<div class="jumbotron">
		<div class="row">
			<div class="col-md-7">
				<img src="images/our-service.jpg">
			</div>
			<div class="col-md-5">
				<h3 style="text-align: center;"><u><strong>OUR SERVICES</strong></u></h3>
				<div class="col-md-4">
					<img src="images/leak-detection.png" class="img-circle"><br>Leak<br>Detection
				</div>
				<div class="col-md-4">
					<img src="images/shower.png" class="img-circle"><br>Shower repair/<br>Replacement
				</div>
				<div class="col-md-4">
					<img src="images/faucet.png" class="img-circle"><br>Faucet repair/<br>Replacement
				</div><br>
				<div class="col-md-6">
					<img src="images/tap.png" class="img-circle"><br>Tap repair<br>Replacement
				</div>
				<div class="col-md-6">
					<img src="images/clogged.png" class="img-circle"><br>Clogged<br>drain pipe
				</div>
			</div>
		</div>
	</div>
	<div class="container">
		<div class="col-md-6">
			<p style="text-align: center;"><h4>TREAT YOUR HOME TO A WONDERFUL EXPERIENCE</h4>Get expert plumbers at your convenience</p>
		</div>
		<div class="col-md-6">
			<button type="button" class="btn btn-danger btn-lg">Book Now</button>
		</div>
	</div>
</body>
</html>