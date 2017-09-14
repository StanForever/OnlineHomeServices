<%-- 
    Document   : appliances
    Created on : Oct 25, 2016, 9:10:41 AM
    Author     : Pranit Raje
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
	<title>Home Appliance Services, book online, price list, pay after work is done</title>
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
				<img src="images/appliance-repair.jpg" alt="appliance-repair">
			</div>
			<div class="col-md-4 col-md-offset-1" style="font-family: Times, serif;">
				<h2 style="font-family: 'Righteous', sans-serif;"><b>Get your appliances fixed at home</b></h2>
				<h4><span class="glyphicon glyphicon-star"></span>  Hassle Free<br/></h4>
				<h4><span class="glyphicon glyphicon-star"></span>  1 Month Warranty</h4>
			</div>
			<div class="col-md-4 col-md-offset-3">
				<div class="container"; align="center">
					<div class="thumbnail">
						<form method="POST">
							<h2 align="center" style="background-color: #d3d3d3">Find Professional</h2>
					        Please select your location:
					        <select placeholder="Your location">
					        	<option>Mumbai</option>
					        	<option>Bangalore</option>
					        	<option>Delhi</option>
					        	<option>Pune</option>
					        </select><hr>
					        <button type="button" class="btn btn-big btn-danger btn-block">Submit  <span class="glyphicon glyphicon-play"></span></button>
						</form>	
					</div>
				</div>
			</div>
		</div>
	</div>
	<hr>
	<section>
		<div class="container">
			<h2 style="text-align: center;"><b>WE CAN HELP YOU FIX</b></h2>
			<div class="row">
				<div class="col-md-4">
					<img src="images/air-conditioner.png" alt="air-conditioner">
					<p>AIR-CONDITIONER</p>
				</div>
				<div class="col-md-4">
					<img src="images/refrigerator.png" alt="refrigerator">
					<p>REFRIGERATOR</p>
				</div>
				<div class="col-md-4">
					<img src="images/washing-machine.png" alt="washing-machine">
					<p>WASHING MACHINE</p>
				</div>
			</div>
		</div>
	</section><hr>
	<div class="container">
		<h3>Customer Testimonials</h3>
		<div class="col-md-6">
			<div class="col-md-3">
				<img src="images/review1.jpg">
			</div>
			<div class="col-md-9">
				<p><em>"This is an excellent service. The guys were absolutely on time, well dressed and polite. They checked two ACs, however, only one could be repaired and they charged accordingly.The repair guys were ex-employes from Samsung, Videocon, Hitachi. Hence, best skilled in their work. ."</em></p>
				<small class="font-fade"><strong>Rohit Gupta,</strong> Mumbai</small><br>
				<img src="images/rating4.gif">
			</div>
		</div>
		<div class="col-md-6">
			<div class="col-md-3">
				<img src="images/review2.jpg">
			</div>
			<div class="col-md-9">
				<p><em>"I had called for Split AC water leakage. APPS emailed me with the Technician's photograph and mobile number.Technician Subhash Kirte visited at right time and did his job very professionally and very neat and clean.Here after I will call only Housejoy instead of calling any stranger."</em></p>
				<small class="font-fade"><strong>Mohini Makhija,</strong> Pune</small><br>
				<img src="images/rating3.gif">
			</div>
		</div>
	</div>
</body>
</html>
