var accessibility = false;
var row = document.getElementById("backendContainer");
var word = document.getElementById("backend");
var barOpen = false;
const vw = document.documentElement.clientWidth;
const vh = document.documentElement.clientHeight;
var currentTemp;
var currentMaxTemp;
var currentMinTemp;
var metric = "C";
var lipsum;
var list;

//For hacker text in Backend smallCard

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomLetter() {
 var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
 return alphabet[rand(0,alphabet.length - 1)]
}

function getRandomWord(word) {
  var text = word.innerHTML
  
  var finalWord = ''
  for(var i=0;i<text.length;i++) {
    finalWord += text[i] == ' ' ? ' ' : getRandomLetter()
  }
 
  return finalWord
}

if(word != null) {
  var interv = 'undefined'
  var canChange = false
  var globalCount = 0
  var count = 0
  var INITIAL_WORD = word.innerHTML;
  var isGoing = false
  row.addEventListener('click', init)
}

function init() {
 if(isGoing) return;
 
 isGoing = true
 var randomWord = getRandomWord(word)
 word.innerHTML = randomWord

 interv = setInterval(function() {
  var finalWord = ''
  for(var x=0;x<INITIAL_WORD.length;x++) {
   if(x <= count && canChange) {
    finalWord += INITIAL_WORD[x]
   } else {
    finalWord += getRandomLetter()
   }
  }
  word.innerHTML = finalWord
  if(canChange) {
    count++
  }
  if(globalCount >= 20) {
   canChange = true
  }
  if(count>=INITIAL_WORD.length) {
   clearInterval(interv)
   count = 0
   canChange = false
   globalCount = 0
   isGoing = false
  }
  globalCount++
 },5)
 
}

// For "Programs" SmallCard buttons

function closeWindow() {
    document.getElementById("PB1").parentElement.style.display = "none";
    document.getElementById("PB1").parentElement.parentElement.style.marginBottom = "0";
}

function closeWindowTemp() {
    closeWindow();

    setTimeout(function () {
        document.getElementById("PB2").parentElement.style.display = "block";
        document.getElementById("PB1").parentElement.parentElement.style.marginBottom = "10px";
      }, 3000);
}

fetch('loremIpsumText.txt')
    .then(response => response.text())
    .then(data => {
      lipsum = data;
});

function enlargeWindow() {
  var languagesContainer = document.getElementById("languages")
  $(languagesContainer).removeClass("aos-init aos-animate");
  $(languagesContainer).removeAttr("data-aos")
  const vw = document.documentElement.clientWidth;
  const vh = document.documentElement.clientHeight;
  var window = document.getElementById("programs");
  var windowContainer = window.parentElement;

  $(windowContainer).addClass("test");
  if(!$(windowContainer).hasClass("big")) {
    
    $(windowContainer).addClass("big");
    $(window).addClass("big2");
    list = window.innerHTML;
    window.innerHTML = lipsum;

    setTimeout(function () {
      enlargeWindow()
    }, 2000);

  } else {
    $(languagesContainer).addClass("aos-init aos-animate");
    $(languagesContainer).attr("data-aos", "fade-up")
    $(windowContainer).removeClass("big");
    $(window).removeClass("big2");
    languagesContainer.style = null;
    window.innerHTML = list;
  }

}

//To open navbar

function toggleAccessibilityBar() {
  var bar = document.getElementById("accessibilityBar");
  var btn = document.getElementById("accessibilityBtn");
  if (barOpen == false) {
    if(vw <= 400) {
      bar.style.width = "100%";
    } else {
      bar.style.width = "300px";
    }
    btn.style.boxShadow = "none";
    btn.style.backgroundColor = "#fff";
    btn.style.right = "10px";
    btn.style.top = "10px";
    document.getElementById("navbarSettings").style.width = "100%";
    barOpen = true;
  } else if (barOpen == true) {
    bar.style.width = "0px";
    btn.style.boxShadow = "black 2px 2px 2px";
    btn.style.backgroundColor = "#cfcfcf4b";
    btn.style.right = "20px";
    btn.style.top = "20px";
    document.getElementById("navbarSettings").style.width = "0";
    barOpen = false;
  } else {

  }

}

//For navbar's Accessibility button / checkbox

//Check if accessibility has been turned on in the past and turns it on if needed.
if(localStorage.getItem('accessibility') == "True"){
  accessibility = false;
  //So accessibility looks turned off, and makes accessiblity mode turn on.
  var check = ifExists("oldText");

  //check so delay is only on contact site, and immediate on normal site.
  if(check == true){
    setTimeout(accessibilityButtonCheck, 4200);
  } else {
    window.onload = function () {
      accessibilityButtonCheck();
    };
  }
}

function accessibilityButtonCheck() {
  if (accessibility == false) {
    var check = ifExists("oldText");

    document.body.style.color = "#000000";
    document.getElementById("pinkText").style.color = "#000000";
    document.getElementsByClassName("fa-angle-up")[0].style.color = "red";
    document.getElementsByClassName("fa-angle-down")[0].style.color = "blue";
    document.getElementsByClassName("fa-location-arrow")[0].style.color = "blue";

    if(check == true) {
        document.getElementById("email").style.color = "blue";
        document.getElementById("github").style.color = "blue";
        document.getElementById("linkedIn").style.color = "blue";
        document.getElementById("Facebook").style.color = "blue";
    } else {
      document.getElementById("contactMe").style.color = "#000000";
      document.getElementById("pinkText2").style.color = "#000000";
    }

    accessibility = true;
    localStorage.setItem('accessibility', 'True');
  } else if (accessibility == true) {
      var check = ifExists("oldText");

      document.body.style.color = null;
      document.getElementById("pinkText").style.color = null;
      document.getElementsByClassName("fa-angle-up")[0].style.color = null;
      document.getElementsByClassName("fa-angle-down")[0].style.color = null;
      document.getElementsByClassName("fa-location-arrow")[0].style.color = null;
      
      if (check == true) {
        document.getElementById("email").style.color = null;
        document.getElementById("github").style.color = null;
        document.getElementById("linkedIn").style.color = null;
        document.getElementById("Facebook").style.color = null;
      } else {
        document.getElementById("contactMe").style.color = null;
        document.getElementById("pinkText2").style.color = null;
      }

      accessibility = false;
      localStorage.setItem('accessibility', 'False');
  } else {

  }
}

function closeSpeechBubble() {
  document.getElementById("speechBubble").style.display = "none";
  localStorage.setItem('closedSpeechBubble', 'True');
}

function autoCloseSpeechBubble() {
  //dont show textbubble if accessibility is already on AND if user hasnt already close speechbubble
  if(localStorage.getItem('accessibility') != "True" && localStorage.getItem('closedSpeechBubble') != "True") {
    //wait 5 seconds before showing it
    setTimeout( function() {
      document.getElementById("speechBubble").style.display = "block";
      
      //wait 3 seconds beofre making it slowly dissapear
      setTimeout( function() {
        document.getElementById("speechBubble").style.opacity = "0";

        //wait for 10 second animation to finish, then display none so it dissapears
        setTimeout( function() {
          document.getElementById("speechBubble").style.display = "none";
        }, 10000 );

      }, 3000 );
  
    }, 5000 );
  }
}

//Go to top of site

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

//onClick() but for Enter button

function checkIfTab(event, id) {
  if (event.keyCode === 13) {
    $("#" + id).click();
  }
}

//Load in widget .html files

$(function () {
  var includes = $('[data-include]')
  $.each(includes, function () {
    var file = './' + $(this).data('include') + '.html'
    $(this).load(file)
  })
})

//Delay Contact me button redirect so screen can scroll up correctly

function delay(URL) {
  topFunction();
  setTimeout( function() { window.location = URL }, 500 );
}

//For contact site 

function onloadTextChange() {
  var headlines = $("#oldText")[0].children;
  for(i = 0; i < headlines.length; i++) {
    $(headlines[i]).addClass("fade-out");
  }

  //Wait for animation to end, then change text at last second.
  setTimeout( function() {
    var confettiX;
    var confettiY;
    if(vw < 751) { //Mobile  
      confettiX = 0.5
      confettiY = 0.15
    } else { //Larger screens
      confettiX = 0.2
      confettiY = 0.4
    }

    document.getElementById("oldText").style.display = "none";
    document.getElementById("newText").style.display = "";

    confetti({
      particleCount: 400,
      spread: 360,
      startVelocity: 30,
      origin: {
        x: confettiX, y: confettiY
      },
      ticks: 400
    });

  }, 3950 );
};

function copy(text) {
  const el = document.createElement('textarea');
  el.value = text;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  alert("Copied " + text + "!")
}
 
function ifExists(id) {
  var element = document.getElementById(id);

  if(typeof(element) != 'undefined' && element != null){
    return true;
  } else{
    return false;
  } 
}

//Get date and weather for widgets

function getDate() {
  Date.prototype.getWeek = function () {
    var target  = new Date(this.valueOf());
    var dayNr   = (this.getDay() + 6) % 7;
    target.setDate(target.getDate() - dayNr + 3);
    var firstThursday = target.valueOf();
    target.setMonth(0, 1);
    if (target.getDay() != 4) {
        target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
    }
    return 1 + Math.ceil((firstThursday - target) / 604800000);
  }
  
  var d= new Date();

  document.getElementById("week").innerHTML = "Week " + d.getWeek();

  var today = new Date();

  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

  document.getElementById("date").innerHTML = today.getDate() + " " + monthNames[today.getMonth()] + " - " + today.getFullYear();
}

var today;
var time;
function updateClock() {
  today = new Date();
  
  if(today.getMinutes() <= "9"){
    time = today.getHours() + ":0" + today.getMinutes();
  } else {
    time = today.getHours() + ":" + today.getMinutes();
  }

  document.getElementById("time").innerHTML = time;
  
  setTimeout(updateClock, 10000);
}

//get location
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getWeather);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function getWeather(position) {
  lat = position.coords.latitude;
  lon = position.coords.longitude;
  var customMadeUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=metric&appid=0a4ba3e35b0c860a7c2361fc8b79a523"
  $.ajax({
    url: customMadeUrl,
    type: "GET",
    success: function (result) {
      currentTemp = Math.round(result.main.temp);
      currentMaxTemp = Math.round(result.main.temp_max).toString();
      currentMinTemp = Math.round(result.main.temp_min).toString();
      document.getElementById("Temp").innerHTML = currentTemp + "<sup>C</sup>";

      var highLow = document.getElementById("highLow");
      highLow.innerHTML = "<i class='fas fa-angle-up'></i>" + currentMaxTemp + " " + "<i class='fas fa-angle-down'></i>" + currentMinTemp + "<sup>C</sup>";

      document.getElementById("highLow").innerHTML = "<i class='fas fa-angle-up'></i>" + currentMaxTemp + "<sup>C</sup> " + "<i class='fas fa-angle-down'></i> " + currentMinTemp + "<sup>C</sup>";
      document.getElementById("Condition").innerHTML = "<i class='fas fa-sun'></i>" + result.weather[0].main;
      document.getElementById("Location").innerHTML = "<i class='fas fa-location-arrow'></i> " + result.name + ", " + result.sys.country;
      
      if(result.weather[0].main == "Rain"){
          makeItRain();
          document.getElementById("Circle1").style.display = "none";
          document.getElementById("Circle2").style.display = "none";
          document.getElementById("Circle3").style.display = "none";
          document.getElementsByClassName("weatherContainer")[0].style.backgroundColor = "black";
          document.getElementsByClassName("weatherContainer")[0].style.background = "black";
          document.getElementById("Condition").innerHTML = "<i class='fas fa-cloud-showers-heavy'></i> " + result.weather[0].main;
          
          weatherText = document.getElementsByClassName("weatherContent")[0].children;
          for( i= 0; i < weatherText.length - 1; i ++) {
            weatherText[i].style.color = "grey";
          }
      
        } else if (result.weather[0].main == "Clouds") {
          document.getElementById("Circle1").style.display = "none";
          document.getElementById("Circle2").style.display = "none";
          document.getElementById("Circle3").style.display = "none";
          document.getElementsByClassName("weatherContainer")[0].style.background = "lightgrey";
          document.getElementById("Cloud1").style.display = "block";
          document.getElementById("Cloud2").style.display = "block";
          document.getElementById("Cloud3").style.display = "block";
          document.getElementById("Cloud4").style.display = "block";
          document.getElementById("Cloud5").style.display = "block";
          document.getElementById("Condition").innerHTML = "<i class='fas fa-cloud'></i> " + result.weather[0].main;
      }
    },
    error: function (error) {
      console.log(error.responseText);
    }
  })
}

function dateWidgetLiveUpdate() {
  updateClock();
  getDate();
}

function convertTemp() {
  //if celcius is shown when clicking
  if(metric == "C") {
    var currentTempF = Math.round(currentTemp * 9/5 + 32)
    var currentMaxTempF = Math.round(currentMaxTemp * 9/5 + 32)
    var currentMinTempF = Math.round(currentMinTemp * 9/5 + 32)
    
    document.getElementById("Temp").innerHTML = currentTempF += "<sup>F</sup>";
    highLow.innerHTML = "<i class='fas fa-angle-up'></i>" + currentMaxTempF + "<sup>F</sup> " + "<i class='fas fa-angle-down'></i>" + currentMinTempF + "<sup>F</sup>";
    metric = "F";
  } else {
    document.getElementById("Temp").innerHTML = currentTemp + "<sup>C</sup>";
    highLow.innerHTML = "<i class='fas fa-angle-up'></i>" + currentMaxTemp + "<sup>C</sup> " + "<i class='fas fa-angle-down'></i>" + currentMinTemp + "<sup>C</sup>";
    metric = "C"
  }

  if(accessibility == true) {
    document.getElementsByClassName("fa-angle-up")[0].style.color = "red";
    document.getElementsByClassName("fa-angle-down")[0].style.color = "blue";
  }
}

function makeItRain() {

  var increment = 0;
  var drops = "";
  var backDrops = "";

  while (increment < 100) {
    //couple random numbers to use for various randomizations
    //random number between 98 and 1
    var randoHundo = (Math.floor(Math.random() * (98 - 1 + 1) + 1));
    //random number between 5 and 2
    var randoFiver = (Math.floor(Math.random() * (5 - 2 + 1) + 2));
    //increment
    increment += randoFiver;
    //add in a new raindrop with various randomizations to certain CSS properties
    drops += '<div class="drop" style="left: ' + increment + '%; bottom: ' + (randoFiver + randoFiver - 1 + 100) + '%; animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"><div class="stem" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div><div class="splat" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div></div>';
    backDrops += '<div class="drop" style="right: ' + increment + '%; bottom: ' + (randoFiver + randoFiver - 1 + 100) + '%; animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"><div class="stem" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div><div class="splat" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div></div>';
  }

  $('.weatherContainer').append(drops);
  $('.weatherBackground').append(backDrops);
}

document.addEventListener('DOMContentLoaded', function() {
  AOS.init({
    duration: 1200
  });
});