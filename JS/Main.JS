var accessibility = false;
var row = document.getElementById("backendContainer");
var word = document.getElementById("backend");
var barOpen = false;
var vw;
var vh;
var currentTemp;
var currentMaxTemp;
var currentMinTemp;
var metric = "C";
var lipsum;
var list;
var today;
var time;
var timeMode = "24H"
var formSent = false;
var theme = "light"
const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
const userPrefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;


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
// "Close" programContainer.
function closeWindow() {
    document.getElementById("PB1").parentElement.style.display = "none";
    document.getElementById("PB1").parentElement.parentElement.style.marginBottom = "0";
}

// "Close" programContainer temporarily.
function closeWindowTemp() {
    closeWindow();

    setTimeout(function () {
        document.getElementById("PB2").parentElement.style.display = "block";
        document.getElementById("PB1").parentElement.parentElement.style.marginBottom = "10px";
      }, 3000);
}

// Fetch loremIpsum file and set its content as var lipsum.
fetch('loremIpsumText.txt')
    .then(response => response.text())
    .then(data => {
      lipsum = data;
});

// Make programsContainer 100% of window.
function enlargeWindow() {
  var languagesContainer = document.getElementById("languages")
  $(languagesContainer).removeClass("aos-init aos-animate");
  $(languagesContainer).removeAttr("data-aos")
  var window = document.getElementById("programs");
  var windowContainer = window.parentElement;

  $(windowContainer).addClass("test");
  if(!$(windowContainer).hasClass("big")) {
    
    $(windowContainer).addClass("big");
    $(window).addClass("big2");
    list = window.innerHTML;
    window.innerHTML = lipsum; // Uses previous fetch to replace list as lorem ipsum

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

// To open navbar.
function toggleNavbar() {
  vw = document.documentElement.clientWidth;
  var bar = document.getElementById("navbar");
  var btn = document.getElementById("navBtn");
  if (barOpen == false) {
    if(vw <= 500) {
      $('body').css('overflowY', 'hidden');
    }
    $('#navbar').addClass("opened");
    btn.style.boxShadow = "none";
    btn.style.backgroundColor = "#fff"; 
    btn.style.right = "10px";
    btn.style.top = "10px";
    barOpen = true;
  } else if (barOpen == true) {
    $('body').css('overflowY', 'auto');
    $('#navbar').removeClass("opened");
    btn.style.boxShadow = "black 2px 2px 2px";
    btn.style.backgroundColor = "#cfcfcf4b";
    btn.style.right = "20px";
    btn.style.top = "20px";
    barOpen = false;
  } else {

  }

}

// When user clicks x on speechbubble to close it.
function closeSpeechBubble() {
  document.getElementById("speechBubble").style.display = "none";
  localStorage.setItem('closedSpeechBubble', 'True');
}

// Open and auto close speech bubble after some time.
function autoCloseSpeechBubble() {
  if(localStorage.getItem('closedSpeechBubble') != 'True') {
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

//Go to top of site.
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

// OnClick() but for Enter button.
function checkIfTab(event, id) {
  if (event.keyCode === 13) {
    $("#" + id).click();
  }
}

// Load in component .html files.
$(function () {
  var includes = $('[data-include]')
  $.each(includes, function () {
    var file = '../components/' + $(this).data('include') + '.html'
    $(this).load(file)
  })
})

// Delay Contact me button redirect so screen can scroll up correctly.
function delay(URL) {
  topFunction();
  setTimeout( function() { window.location = URL }, 500 );
}

// For contact site to fade out text.
function onloadTextChange() {
  var headlines = $("#oldText")[0].children;
  for(i = 0; i < headlines.length; i++) {
    $(headlines[i]).addClass("fade-out");
  }

  setTimeout( function() {
    topFunction();
   }, 3450 );
  // Wait for animation to end, then change text at last second.
  setTimeout( function() {
    vw = document.documentElement.clientWidth;
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

// Copy email on click to clipboard.
function copy(text) {
  const el = document.createElement('textarea');
  el.value = text;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  alert("Copied " + text + "!")
}
 
// Check if specified element is on current page.
function ifExists(id) {
  var element = document.getElementById(id);

  if(typeof(element) != 'undefined' && element != null){
    return true;
  } else{
    return false;
  } 
}

// Get date and weather for widgets.
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

// Get time and update every 10 seconds.
function updateClock() {
  today = new Date();

  if(timeMode == "24H") {
    if(today.getMinutes() <= "9"){
      time = today.getHours() + ":0" + today.getMinutes();
    } else {
      time = today.getHours() + ":" + today.getMinutes();
    }

    document.getElementById("time").innerHTML = time; 
  } else {
    var hours = today.getHours();
    var minutes = today.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
  
    document.getElementById("time").innerHTML = strTime;
  }  
  
  setTimeout(updateClock, 10000);
}

// Convert time to AmPm and back to 24Hour.
function convertTime() {
  if(timeMode == "24H"){
    timeMode = "12H";
    updateClock();
  } else {
    timeMode = "24H";
    updateClock();
  }
}

// One function to change both temperature and time modes.
function changeToMetric() {
  convertTime();
  convertTemp();
}

// Check if user wants or has opted-in to darkmode.
function checkDarkMode(page) { // (page) is a string containing the name of the current page ( ie. index or contactMe for example)
  if(localStorage.getItem('darkMode') == 'True'){ // if user has already chosen darkmode
    changeTheme(page);
  } else if(userPrefersDark) { // if user hasnt chosen darkmode, but has it as prefered in system, change it anyway.
    changeTheme(page);
  } // if neither changed to darkmode, or preferred in system, keep it light.
}

// To make website dark or lightmode.
function changeTheme(page) {
  // Page = which site calls the function
  
  if(theme == "light"){ // Make it dark mode :)
    //On all sites
    document.getElementById("darkModeBtn").innerHTML = "Change to light mode: ";

    document.body.style.backgroundColor = "black";
    document.body.style.color = "white";

    localStorage.setItem('darkMode', 'True');
    theme = "dark";
    
    bar = document.getElementById("navbar");
    bar.style.boxShadow = "-8px 0 10px -6px darkgrey";
    barAs = bar.getElementsByTagName("a");
    for(i = 0; i <= barAs.length - 1; i++){
      barAs[i].style.color = "white";
    }
    bar.getElementsByTagName("h2")[0].style.borderBottom = "2px solid darkgrey";
    document.getElementById("navbarSettings").style.boxShadow = "0px -3px 3px 3px rgba(90, 90, 90, 0.5)";
    document.getElementById("navbarSettings").style.backgroundColor = "rgba(155, 155, 155, .15)";
    document.getElementById("footer").style.backgroundColor = "#1B191F";


    if(page == "" || page == "index"){ // On index site,

      document.getElementsByClassName("dateContainer")[0].style.backgroundColor = "#1B191F";
      document.getElementById("picCol").getElementsByTagName("img")[0].style.filter = "drop-shadow(5px 5px 5px rgba(90, 90, 90, 0.5)";
      document.getElementById("contactMe").style.color = "white";
      document.getElementById("workExp").style.boxShadow = "0px -10px 10px 3px rgba(90, 90, 90, 0.2)";
      cards = document.getElementsByClassName("card");
      for(i = 0; i <= cards.length - 1; i++){
        cards[i].style.backgroundColor = "#1B191F";
        cards[i].style.boxShadow = "5px 5px 5px rgba(155, 155, 155, 0.5)";
      }
      document.getElementsByClassName("dateContainer")[0].style.boxShadow = "5px 5px 5px rgba(90, 90, 90, 0.5)";
      document.getElementsByClassName("weatherContainer")[0].style.boxShadow = "5px 5px 5px rgba(90, 90, 90, 0.5)";

    } else if(page == "contactMe") { // contact,

      document.getElementById("picCol").getElementsByTagName("img")[0].style.filter = "drop-shadow(5px 5px 5px rgba(90, 90, 90, 0.5)";
      document.getElementById("contactMe").style.color = "white";
      document.getElementById("contactFormContainer").style.backgroundColor = "#1B191F";
      formInputs = document.getElementById("contactForm").children;
      for(i = 0; i <= formInputs.length - 1; i++){
        formInputs[i].style.backgroundColor = "#302d38";
        formInputs[i].style.color = "white";
      }
    
    } else if(page == "photoPortfolio") { // photos.
    
    } else { // Really just for testing, it should never go here.
      console.log("SOMETHING WRONG, current page name is: " + page)
    }
    
    
  } else {
    
    document.getElementById("darkModeBtn").innerHTML = "Change to dark mode: ";
    
    document.body.style.backgroundColor = null;
    document.body.style.color = null;

    localStorage.setItem('darkMode', 'False');
    theme = "light";

    bar = document.getElementById("navbar");
    bar.style.boxShadow = null;
    barAs = bar.getElementsByTagName("a");
    for(i = 0; i <= barAs.length - 1; i++){
      barAs[i].style.color = null;
    }
    bar.getElementsByTagName("h2")[0].style.borderBottom = null;
    document.getElementById("navbarSettings").style.boxShadow = null;
    document.getElementById("navbarSettings").style.backgroundColor = null;
    document.getElementById("footer").style.backgroundColor = null;
    
    if(page == "" || page == "index"){
    
      document.getElementById("picCol").children[0].style.filter = null;
      document.getElementById("contactMe").style.color = null;
      document.getElementsByClassName("dateContainer")[0].style.backgroundColor = null;
      document.getElementById("workExp").style.boxShadow = null;
      cards = document.getElementsByClassName("card");
      for(i = 0; i <= cards.length - 1; i++){
        cards[i].style.backgroundColor = null;
        cards[i].style.boxShadow = null;
      }
      document.getElementsByClassName("dateContainer")[0].style.boxShadow = null;
      document.getElementsByClassName("weatherContainer")[0].style.boxShadow = null;
    
    } else if(page == "contactMe") {
    
      document.getElementById("picCol").children[0].style.filter = null;
      document.getElementById("contactMe").style.color = null;
      document.getElementById("contactFormContainer").style.backgroundColor = null;
      formInputs = document.getElementById("contactForm").children;
      for(i = 0; i <= formInputs.length - 1; i++){
        formInputs[i].style.backgroundColor = null;
        formInputs[i].style.color = null;
      }
    
    } else if(page == "photoPortfolio") {
    
      
    
    } else { 
      console.log("SOMETHING WRONG, current page name is: " + page)
    }  
  }
}

// Get location of user.
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getWeather);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

// Get current weather using getlocation() and then change weatherContainer accordingly.
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

// Start clock and date.
function dateWidgetLiveUpdate() {
  updateClock();
  getDate();
}

// Change from C to F and back.
function convertTemp() {
  //if celsius is shown when clicking
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

// Start raining if getWeather() predicts rain.
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

// To start Animate on scroll.
document.addEventListener('DOMContentLoaded', function() {
  AOS.init({
    duration: 1200
  });
});

// Submit form with api to Google docs document.
function subForm() {
  confirmationText = document.getElementById("formSubmitionReturn")
  btn = document.getElementById("formBtn")
  if(formValidation() == undefined) {
    if(formSent == false) {
      $.ajax({
          url:'https://api.apispreadsheets.com/data/15051/',
          type:'post',
          data:$("#contactForm").serializeArray(),
          success: function(){
            confirmationText.innerHTML = "Form submitted :)";
            confirmationText.style.color = "green";

            formSent = true;

            $(btn).addClass("disabledBtn");
          },
          error: function(){
            confirmationText.innerHTML = "There was an error :(";
            confirmationText.style.color = "red";
          }
      });
    }
  }
}

// For validating form.
function formValidation() {
  form = document.getElementById("contactForm")
  var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  for(var i=0; i < form.elements.length; i++){
    if(form.elements[i].value === '' && form.elements[i].hasAttribute('required')){
      return false;
    }
  }
  if(!form[2].value.match(mailformat)) {
    return false;
  }
}


// For the "opening" of a imgbar and collapsable content / album 
var oldClicked;
$(".imgBar").on("click", function(event){
  var barId = 'barText' + $(this).attr('barId')

  if(oldClicked != undefined) { // if this IS NOT the first time 
    if(this === oldClicked){ // if you clicked the already open one
      $(this).attr('id', '');
      
      // To hide the old text and then do nothing
      var oldBarId = 'barText' + $(oldClicked).attr('barId')
      document.getElementById(oldBarId).style.display = "none";
      document.getElementById("barText").children[0].style.display = "block";
      
      oldClicked = undefined;
      return true;
    } // if u clicked another pic while one is open, just close old one before opening new one
    var oldBarId = 'barText' + $(oldClicked).attr('barId')
    document.getElementById(oldBarId).style.display = "none";

      $(oldClicked).attr('id', '');
    }// Does this everytime ( so just show the clicked images things ) EXCEPT when u click the same pic twice
  $(this).attr('id', 'largeImgBar');
  this.scrollIntoView({behavior: "smooth"});
  oldClicked = this;

  document.getElementById(barId).style.display = "block";
  document.getElementById("barText").children[0].style.display = "none";
});