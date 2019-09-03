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

cached = {};

function main() {
  //Download all data here
  fetchBuyInfo();
  fetchRegInfo();
}

function fetchBuyInfo() {
  var site = "infoweb-backend/getBuyInfo";
  $.getJSON(site, function(data) {
    console.log("Received BuyInfo:", data);

    //Process all data and store in cache
    processUserClicks(data);
    showUserClicks();
  });

}

function fetchRegInfo() {
  var site = "infoweb-backend/getRegInfo";
  $.getJSON(site, function(data) {
    console.log("Received RegInfo:", data);

    //Process all data and store in cache
    processRegisteredUsers(data);
    processUserOSes(data);
    processComments(data);

    //Display starting data
    showComments();
  });
}

function processComments(data) {
  var comments = [];
  comments.push({
    regDate: "Date",
    name: "Name",
    email: "Email Address",
    platform: "Platform",
    comment: "Comment", 
    header: true
  });
  for (entry of data.registeredPeople) {
    if (entry.android && entry.ios) {
      entry.platform = "Both";
    } else if (entry.android) {
      entry.platform = "Android";
    } else if (entry.ios) {
      entry.platform = "iOS";
    }
    comments.push(entry);
  }
  cached.comments = comments;
}

function processRegisteredUsers(data) {
  var total = 0;
  var counts = {};
  var dates = [];
  for (entry of data.registeredPeople) {
    //Need to change date format from YY-MM-DD to MM-DD-YY
    //Achieve by two swaps: indices 0, 1 and then 1, 2.
    var date = swapDate(entry.regDate, 0, 1);
    date = swapDate(date, 1, 2);
    if (counts[date] === undefined) {
      dates.push(date);
    }
    counts[date] = ++total;
  }
  
  var users = [];
  for (date of dates) {
    users.push([date, counts[date]]);
  }

  cached.registeredUsers = users;
  cached.totalRegistered = total;
}

function processUserClicks(data) {
  var total = 0;
  var userClicks = [];
  for (entry of data.buyCountList) {
    //Need to swap from DD-MM-YY to MM-DD-YY (indices 0 and 1)
    var date = swapDate(entry.date, 0, 1);
    var count = entry.count;
    total += count;
    userClicks.push([date, count]);
  }

  cached.userClicks = userClicks;
  cached.totalClicks = total;
}

function processUserOSes(data) {
  var counts = {};
  types = ["Android", "iOS", "Both"];
  for (type of types) {
    counts[type] = 0;
  }

  var total = 0;
  for (user of data.registeredPeople) {
    if (user.android && user.ios) {
      counts["Both"]++;
    } else if (user.android) {
      counts["Android"]++;
    } else if (user.ios) {
      counts["iOS"]++;
    }
    total++;
  }
  
  var result = [];
  for (type of types) {
    result.push([type, counts[type]/total]);
  }
  cached.osCounts = counts;
  cached.osCountPercentages = result;
}

function showComments() {
  var comments = cached.comments;
  var table = document.getElementById("commentTable");
  for (comment of comments) {
    var values = [
      comment.regDate,
      comment.name,
      comment.email, 
      comment.platform,
      comment.comment,
    ];
    
    var row = document.createElement("tr");
    for (value of values) {
      var elementType = (comment.header) ? "th" : "td";
      var column = document.createElement(elementType);
      column.appendChild(document.createTextNode(value));
      row.appendChild(column);
    }
    table.appendChild(row);
  }
}

//graph for registered users
function showRegisteredUsers() {
  var data = cached.registeredUsers;
  var total = cached.totalRegistered;
  if (document.getElementById("graph")) {
    document.getElementById("graph").innerHTML = '';
    document.getElementById("info").innerHTML = "Total Registered Users: " + total;
    var plot = $.jqplot('graph', [data], {
      axes: {
        xaxis: {
          renderer: $.jqplot.DateAxisRenderer,
          label: 'Date',
          labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
          tickRenderer: $.jqplot.CanvasAxisTickRenderer,
          tickOptions: {
            angle: 15,
            // labelPosition: 'middle',
          },
        },
        yaxis: {
          label: 'Numbers of Users',
          labelRenderer: $.jqplot.CanvasAxisLabelRenderer
        },
      },
    });
  }
}

//graph for user clicks
function showUserClicks() {
  var data = cached.userClicks;
  var total = cached.totalClicks;

  if (document.getElementById("graph")) {
    document.getElementById("graph").innerHTML = '';
    document.getElementById("info").innerHTML = "Total clicks: " + total;
    var plot = $.jqplot('graph', [data], {
      axes: {
        xaxis: {
          label: 'Date',
          labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
          renderer: $.jqplot.DateAxisRenderer,
          tickOptions: {
            angle: 15,
            // labelPosition: 'middle',
          },
          tickRenderer: $.jqplot.CanvasAxisTickRenderer,
        },
        yaxis: {
          label: 'Number of Clicks',
          labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
        },
      }
    });
  }
}

// plot script for pie graph
function showUserOSes() {
  var data = cached.osCountPercentages;
  var counts = cached.osCounts;
  var displayString = "";
  for (entry of data) {
    if (displayString != "") {
      //Separator for between counts
      displayString += ", ";
    }
    var type = entry[0];
    var count = counts[type];
    displayString += type + ": " + count;
  }
  if (document.getElementById("graph")) {
    document.getElementById("graph").innerHTML = '';
    document.getElementById("info").innerHTML = displayString;

    var plot = $.jqplot('graph', [data], {
      gridPadding: {top: 0, bottom: 38, left: 0, right: 0},
      seriesDefaults: {
        renderer:$.jqplot.PieRenderer,
        rendererOptions: {padding: 8, showDataLabels: true},
        trendline:{show: false},
      },
      legend: {
        location: 's',
        marginTop: '15px',
        placement: 'outside',
        rendererOptions: {numberRows: 1},
        show: true,
      }
    });
  }
}

function swapDate(date, index1, index2) {
  //Swaps the elements in the two indices
  var date = date.split("-");
  var temp = date[index1];
  date[index1] = date[index2];
  date[index2] = temp;
  return date[0] + '-' + date[1] + '-' + date[2];
}
