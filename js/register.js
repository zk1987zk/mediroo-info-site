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

function failure() {
  console.log("Server error.");
}

/*
function main() {
  for (checkboxId of ["android", "ios"]) {
    var checkbox = document.getElementById(checkboxId);
    checkbox.value = checkbox.checked;
  }
}
*/

function getData() {
  var data = {};
  data.name = document.getElementById("userName").value;
  data.email = document.getElementById("email").value;
  data.android = document.getElementById("android").checked;
  data.ios = document.getElementById("ios").checked;
  data.comment = document.getElementById("message").value;
  return data;
}

function success() {
  console.log("Success!");
}

function trySubmit() {
  if (validateForm()) {
    var data = getData();
    console.log("Sending:", data);
    $.ajax({
      data: JSON.stringify(data),
      error: failure,
      headers: {"Content-Type": "application/json"},
      success: success,
      url: "infoweb-backend/register",
      type: "POST",
    });
  }
}

//form validation
//TODO check injection attack
function validateForm() {
  return validateName() && validateEmail() && validateOS();
}

function validateEmail() {
  var regMail = /^([_a-zA-Z0-9-]+)(\.[_a-zA-Z0-9-]+)*@([a-zA-Z0-9-]+\.)+([a-zA-Z]{2,3})$/;
  var email = document.getElementById("email").value;
  var text = "";
  var valid = true;
  if (!regMail.test(email)) {
    text = "Email address is invalid";
    valid = false;
  }
  document.getElementById("emailErr").innerHTML = text;
  return valid;
}

function validateName() {
  var name = document.getElementById("userName").value;
  var text = "";
  var valid = true;
  if (name == "") {
    text = "Please enter your name";
    valid = false;
  } else if (!isNaN(name)) {
    text = "Your name must contain at least one letter";
    valid = false;
  } else if (!isNaN(name.charAt(0))) {
    text = "Your name must start with a letter";
    valid = false;
  }
  document.getElementById("errMsg").innerHTML = text;
  return valid;
}

function validateOS() {
  var text = "";
  var ios = document.getElementById("ios").checked;
  var android = document.getElementById("android").checked;

  //Need at least one of the two checked
  var valid = (ios || android);
  if (!valid) {
    text = "Must check one of iOS or Android!";
  }

  document.getElementById("osErr").innerHTML = text;
  return valid;
}
