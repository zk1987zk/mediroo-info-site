<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>MediRoo</title>

    <!-- Bootstrap core CSS -->
    <link href="vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom fonts for this template -->
    <link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet">
    <link rel="stylesheet" href="vendor/simple-line-icons/css/simple-line-icons.css">
    <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Catamaran:100,200,300,400,500,600,700,800,900" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Muli" rel="stylesheet">

    <!-- Plugin CSS -->
    <link rel="stylesheet" href="device-mockups/device-mockups.min.css">

    <!-- Custom styles for this template -->
    <link href="css/style.css" rel="stylesheet">

    <!-- UQ Single Sign-on -->
    <?php
      require_once "uq/auth.php";
      auth_require();
    ?>

  </head>

  <body id="page-top">

    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
      <div class="container">
        <a class="navbar-brand js-scroll-trigger" href="index.html">Home</a>
        <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          Menu
          <i class="fas fa-bars"></i>
        </button>
      </div>
    </nav>

    <section class="text-center">
      <h2 class="section-heading">Data Visualisations</h2>
      <div class="row">
        <div id='dataButton' class="mx-auto btn-group btn-group-toggle" data-toggle="buttons">
          <label class="btn btn-primary active" onclick="showUserClicks()">
            <input type="radio" name="options"  autocomplete="off" checked> Purchase Clicks
          </label>
          <label class="btn btn-primary" onclick="showRegisteredUsers()">
            <input type="radio" name="options"  autocomplete="off"> Registered Users
          </label>
          <label class="btn btn-primary" onclick="showUserOSes()">
            <input type="radio" name="options"  autocomplete="off"> User Mobile OS
          </label>
        </div>
      </div>
        <div class="column">
          <div class="col-lg-5 mx-auto">
            <div id="graph"></div>
            <h3 id="info"></h3>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="column">
          <h2 class="section-heading">User Comments</h2>
        </div>
	<div>
        <table class="table" id="commentTable"></table>
	</div>
      </div>
    </section>

    <footer>
      <div class="container">
        <p>&copy; Team Zantech 2018. All Rights Reserved.</p>
        <p>All plots are drawn using <a href="http://www.jqplot.com/index.php">jqPlot</a>, under the <a href="http://www.jqplot.com/docs/files/MIT-LICENSE-txt.html">MIT license</a></p>
      </div>
    </footer>

    <!-- Bootstrap core JavaScript -->
    <script src="vendor/jquery/jquery.js"></script>
    <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

    <!-- Plugin JavaScript -->
    <script src="vendor/jquery-easing/jquery.easing.min.js"></script>

    <!-- Custom scripts for this template -->
    <script src="js/admin.js"></script>

    <!-- Jplot script for Piegraph-->
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
    <script type="text/javascript" src="vendor/jplot/jquery.jqplot.js"></script>
    <script type="text/javascript" src="vendor/jplot/jqplot.pieRenderer.js"></script>
    <link rel="stylesheet" type="text/css" href="vendor/jplot/jquery.jqplot.css" />

    <!-- Jplot script for linegraph-->
    <script type="text/javascript" src="vendor/jplot/linegraph/jqplot.logAxisRenderer.js"></script>
    <script type="text/javascript" src="vendor/jplot/linegraph/jqplot.canvasTextRenderer.js"></script>
    <script type="text/javascript" src="vendor/jplot/linegraph/jqplot.canvasAxisLabelRenderer.js"></script>
    <script type="text/javascript" src="vendor/jplot/linegraph/jqplot.canvasAxisTickRenderer.js"></script>
    <script type="text/javascript" src="vendor/jplot/linegraph/jqplot.dateAxisRenderer.js"></script>
    <script type="text/javascript" src="vendor/jplot/linegraph/jqplot.categoryAxisRenderer.js"></script>
    <script type="text/javascript" src="vendor/jplot/linegraph/jqplot.barRenderer.js"></script>
    <link rel="stylesheet" type="text/css" href="vendor/jplot/jquery.jqplot.css" />
    <script type = "text/javascript">
    //change div id to show different graphs
    $(document).ready(function() {
      main();
    });
    </script>
  </body>
</html>
