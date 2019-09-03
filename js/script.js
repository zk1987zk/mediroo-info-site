(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 48)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 54
  });

  // Collapse Navbar
  var navbarCollapse = function() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

})(jQuery); // End of use strict

//script for features icon
document.getElementById("PillBoxIcon").onclick = function() {
    document.getElementById("phone").src = "img/pillbox.jpg";
}
document.getElementById("SymptomsIcon").onclick = function() {
    document.getElementById("phone").src = "img/Feelings.png";
}
document.getElementById("VisualIcon").onclick = function() {
    document.getElementById("phone").src = "img/Report.png";
}
document.getElementById("ReminderIcon").onclick = function() {
    document.getElementById("phone").src = "img/Reminders.png";
}

//form validation
//TODO check injection attack
function validateName() {
    var name, text;
    name = document.getElementById("userName").value;

    if (name == "") {
        text = "Please enter your name";
    } else if(!(isNaN(name))) {
        text = "Your name must contain at least an alphabet";
    } else if(!(isNaN(name.charAt(0)))) {
        text = "Your name must start with an alphabet";
    } else {
        text = "";
    }
    document.getElementById("errMsg").innerHTML = text;
}

function validatePw() {
    firstPw = document.getElementById("firstPw").value;
    secondPw = document.getElementById("retypedPw").value;
    if (firstPw != secondPw){
      text = "Password does not match";
    } else {
      text = "";
    }
    document.getElementById("differPW").innerHTML = text;
}

function validateEmail(email) {
  console.log("emailchecked");
  var regMail = /^([_a-zA-Z0-9-]+)(\.[_a-zA-Z0-9-]+)*@([a-zA-Z0-9-]+\.)+([a-zA-Z]{2,3})$/;

  if(regMail.test(email) == false){
    text = "Email address is invalid";
  } else {
    text = "";
  }
  document.getElementById("emailErr").innerHTML = text;
}

//graph for user clicks
function userClick() {
  if (document.getElementById("graph")) {
    document.getElementById("graph").innerHTML ='';
    document.getElementById("heading").innerHTML ='Purchase Clicks';
    document.getElementById("info").innerHTML ='Total clicks: 120';

    var line = [['1/1/2008', 42], ['2/14/2008', 56], ['3/7/2008', 39], ['4/22/2008', 81]];
    var plot2 = $.jqplot('graph', [line], {
      axes: {
        xaxis: {
          renderer: $.jqplot.DateAxisRenderer,
          label: 'Date',
          labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
          tickRenderer: $.jqplot.CanvasAxisTickRenderer,
          tickOptions: {
              // labelPosition: 'middle',
              angle: 15
          }

        },
        yaxis: {
          label: 'Numbers of Clicks',
          labelRenderer: $.jqplot.CanvasAxisLabelRenderer
        }
      }
    });
  }
}
// plot script for piegraph
function userOs() {
  if (document.getElementById("graph")) {
    document.getElementById("graph").innerHTML ='';
    document.getElementById("heading").innerHTML ='User OS';
    document.getElementById("info").innerHTML ='ios: 25 android: 14 both: 7';
    var plot = $.jqplot('graph', [[['ios',25],['android',14],['both',7]]], {
        gridPadding: {top:0, bottom:38, left:0, right:0},
        seriesDefaults:{
            renderer:$.jqplot.PieRenderer,
            trendline:{ show:false },
            rendererOptions: { padding: 8, showDataLabels: true }
        },
        legend:{
            show:true,
            placement: 'outside',
            rendererOptions: {
                numberRows: 1
            },
            location:'s',
            marginTop: '15px'
        }
      });
    }
  }

  //graph for registered users
  function regUser() {
    if (document.getElementById("graph")) {
      document.getElementById("graph").innerHTML ='';
      document.getElementById("heading").innerHTML ='Registered Users';
      document.getElementById("info").innerHTML ='Total Registered Users: 100';
      var line = [['1/1/2008', 32], ['2/14/2008', 26], ['3/7/2008', 29], ['4/22/2008', 61]];

      var plot2 = $.jqplot('graph', [line], {
        axes: {
          xaxis: {
            renderer: $.jqplot.DateAxisRenderer,
            label: 'Date',
            labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
            tickRenderer: $.jqplot.CanvasAxisTickRenderer,
            tickOptions: {
                // labelPosition: 'middle',
                angle: 15
            }

          },
          yaxis: {
            label: 'Numbers of Users',
            labelRenderer: $.jqplot.CanvasAxisLabelRenderer
          }
        }
      });
    }
  }
