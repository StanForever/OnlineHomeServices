<%-- 
    Document   : fitness
    Created on : Oct 25, 2016, 9:11:24 AM
    Author     : Pranit Raje
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
  <title>Fitness Call an experienced Trainer to your home at your convenience!</title>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="bootstrap-3.3.7-dist/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
  <script src="bootstrap-3.3.7-dist/js/respond.js" type="text/javascript"></script>
</head>
<body>
<!-- Carousel
    ================================================== -->
    <div id="myCarousel" class="carousel slide" data-ride="carousel">
      <!-- Indicators -->
      <ol class="carousel-indicators">
        <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
        <li data-target="#myCarousel" data-slide-to="1"></li>
        <li data-target="#myCarousel" data-slide-to="2"></li>
      </ol>
      <div class="carousel-inner" role="listbox">
        <div class="item active">
          <img src="images/slide1.jpg" alt="First Slide"/>
          <!--<img class="first-slide" src="./images/slide1.jpg" alt="First slide">-->
          <div class="container">
            <div class="carousel-caption">
              <h1>"APPS has restored the Confidence I was losing."</h1>
              <p><h3>Shreya has lost 15 Kilos and regained an active lifestyle.</h3></p>
              <p><a class="btn btn-lg btn-primary" href="#" role="button">Register today</a></p>
              
            </div>
          </div>
        </div>
        <div class="item">
            <img src="images/slide2.jpg" alt="Slide 2"/>
          <!--<img class="second-slide" src="./images/slide2.jpg" alt="Second slide">-->
          <div class="container">
            <div class="carousel-caption">
              <h1>"Now I can run faster than my daughter can cycle."</h1>
              <p><h3>Kajal has lost 30 Kilos and is now a fitness role model</h3></p>
              <p><a class="btn btn-lg btn-primary" href="#" role="button">Register today</a></p>
            </div>
          </div>
        </div>
        <div class="item">
          <img src="images/slide3.jpg" alt="Slide 3"/>
          <!--<img class="third-slide" src="./images/slide3.jpg" alt="Third slide">-->
          <div class="container">
            <div class="carousel-caption">
              <h1>"APPS has brought living back to my life."</h1>
              <p><h3>Sanjay has overcome injuries and transformed into a fitness enthusiast</h3></p>
              <p><a class="btn btn-lg btn-primary" href="#" role="button">Register today</a></p>
            </div>
          </div>
        </div>
      </div>
      <a class="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
        <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="right carousel-control" href="#myCarousel" role="button" data-slide="next">
        <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div><!-- /.carousel -->
    <div class="container">
      <h2 style="text-align: center;"><b>Book a fitness trainer near your home</b></h2>
      <div class="container"; align="center">
          <div class="thumbnail">
            <form method="POST">
              <h2 align="center" style="background-color: #d3d3d3">Available Locations</h2>
                  <strong>Please select your location:</strong>
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
    </div><hr>
    <!--Price Box Starts-->
    <section class="container-fluid price-sec">
      <div class="container">
          <div class="row text-center"><h2>OUR PACKAGES</h2></div>
          <div class="row">
              <div class="col-sm-4">
                <div class="thumbnail">
                  <div class="price-box text-center"><div class="thumbnail"><h3 style="color: #ffa500">Starter</h3></div><strong><span style="color: #ffa500"><h2><b>Rs.7000</b></h2></span><p>12 workout sessions with a validity of 30 days.</p></strong>
                  </div>
                </div>
              </div>
              <div class="col-sm-4">
                <div class="thumbnail">
                  <div class="price-box text-center"><div class="thumbnail"><h3 style="color: #ffa500">Amateur</h3></div><strong><span style="color: #ffa500"><h2><b>Rs.18000</b></h2></span><p>36 workout sessions with a validity of 90 days.</p></strong>
                  </div>
                </div>
              </div>
              <div class="col-sm-4">
                <div class="thumbnail">
                  <div class="price-box text-center"><div class="thumbnail"><h3 style="color: #ffa500">Pro</h3></div><strong><span style="color: #ffa500"><h2><b>Rs.25000</b></h2></span><p>60 workout sessions with a validity of 150 days.</p></strong>
                  </div>
                </div>
              </div>
          </div>
      </div>
    </section>
    <!--Price Box Ends-->  
    <!--Reviews Starts-->
<section class="container-fluid reviews">
    <div class="container">

        <div class="row text-center"><h2>REVIEWS FROM OUR USERS</h2></div>

        <div class="row">

            <div class="col-sm-6 col-md-4">
              <div class="thumbnail">
                  <img src="images/user-mercy.jpg" alt="Mercy" class="img-circle" style="text-align: center"/>
                  <!--<img class="img-circle" src="./images/user-mercy.jpg" style="text-align: center;">-->
                  <p class="testiText"><em>I have been working out all my life (swimming, yoga, zumba etc) but have never lost weight till I joined Housejoy. Its been over 6 months and I have lost 7 kgs. I m proud to say I can now fit into 'S' size clothes!! Love U Housejoy and keep up the good work!!</em></p>
                  <h4> - Mercy Wheeler</h4>
              </div>
            </div>

            <div class="col-sm-6 col-md-4">
              <div class="thumbnail">
                <img src="images/user-hiral.jpg" class="img-circle" style="text-align: center;">
                <p class="testiText"><em>I was suffering from a critical knee injury. I was given surgery as the last resort by my Orthopedic Surgeon. After 11 sessions with Housejoy, I met him again. He was pleasantly surprised and said that I do not need the surgery and my knee is perfectly recovered!</em></p>
                <h4 class="userName"> - Hiran Kumar</h4>
              </div>
            </div>

            <div class="col-sm-6 col-md-4">
              <div class="thumbnail">
                <img src="images/user-nitika.jpg" class="img-circle" style="text-align: center;">
                <p class="testiText"><em>APPS has allowed me to build an exercise discipline in the comfort of my home. Highly recommended for anyone with crazy schedules, prone to injuries and of course wanting to lose weight . The perfect Sherpas for anyone willing to brave the climb.</em></p>
                <h4 class="userName"> - Nitika Goel</h4>
              </div>
            </div>
        </div>
    </div>
</section>
<!--Reviews Ends-->
</body>
</html>
