var darkMode = localStorage.getItem("darkMode");

toggleDarkMode();

function toggleDarkMode() {
  darkMode = localStorage.getItem("darkMode");
  var stylesheet = $('link[href="css/darkStyles.css"]');
  if (darkMode === "enabled") {
    stylesheet.removeAttr('disabled');
  } else {
    stylesheet.attr('disabled', 'disabled');
  }
}

$("#toggleDarkMode").click(function() {
  if (darkMode === "enabled") {
    localStorage.setItem("darkMode", "disabled");
  } else {
    localStorage.setItem("darkMode", "enabled");
  }

  toggleDarkMode();
});

$(function() {
  $(window).resize(function() {
      if ($(this).width() <= 991) {
        localStorage.setItem("darkMode", "disabled");
        toggleDarkMode();
        $(".header img").attr("src", "/images/mobileHeaderImg.jpg");
      } else {
        $(".header img").attr("src", "images/desktopHeaderImg.jpeg");
      }
    })
    .resize(); //trigger resize on page load
});

$("#submitPassword-button").click(function() {
  $.ajax({
    type: "POST",
    url: "/login",
    data: {
      password: $("#password").val()
    },
    dataType: "json",
    success: function(data, textStatus) {
      if (data.success) {
        $("#password").removeClass("is-invalid");
        $("#password").addClass("is-valid");
        setTimeout(function() {
          window.location.href = "/edit-posts";
        }, (750));
      } else {
        $("#password").addClass("is-invalid");
      }
    }
  })
});

function scrollToCard(cardNumber) {
  const id = 'card' + cardNumber;
  const yOffset = -100;
  const element = document.getElementById(id);
  const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

  window.scrollTo({
    top: y,
    behavior: 'smooth'
  });
}

$(document).ready(function() {
  var url = window.location.pathname;
  var navLinks = ($(".navbar ul a"));

  for (i = 0; i < navLinks.length; i++) {
    console.log(navLinks.eq(i).attr('href'))
    if (navLinks.eq(i).attr('href') == url) {
      console.log(url)
      navLinks.eq(i).parent().addClass("active");
    }
  }
});

//1 - ee
//2 - ce
function changeConstitution(constitutionNumber){
  if (constitutionNumber === 1){
    $("#constitution").attr("src", "ee.pdf");
    $(".constitution-dropdown").text("Electrical Engineering Constitution");
    $(".constitution-text").text("The Constitutions of the University of Toronto Electrical Engineering Undergraduate Club");
  }else{
    $("#constitution").attr("src", "ce.pdf");
    $(".constitution-dropdown").text("Computer Engineering Constitution");
    $(".constitution-text").text("The Constitutions of the University of Toronto Computer Engineering Undergraduate Club");
  }
}