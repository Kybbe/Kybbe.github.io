var accessibility = false;
var allDrawerOpen = false;
var row = document.getElementById("backendContainer");
var word = document.getElementById("backend");
var barOpen = false;

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

function closeWindow() {
    document.getElementById("PB1").parentElement.style.display = "none";
}

function closeWindowTemp() {
    closeWindow();

    setTimeout(function () {
        document.getElementById("PB2").parentElement.style.display = "block";
      }, 3000);
}

function enlargeWindow() {
    const vw = document.documentElement.clientWidth;
    const vh = document.documentElement.clientHeight;
    var window = document.getElementById("programs");
    var list = window.innerHTML;

    window.parentElement.style.maxWidth = "1000px";
    window.style.maxWidth = "1000px";
    window.style.minHeight = "90vh";
    window.style.maxHeight = "91vh";
    window.innerHTML = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam metus orci, maximus aliquam ligula eu, placerat faucibus dolor. Phasellus pellentesque nulla in orci faucibus, eu convallis turpis bibendum. Pellentesque consequat risus tellus, sed lacinia urna maximus at. Nullam suscipit tortor quis pellentesque mattis. Morbi molestie dolor enim, et interdum urna egestas a. Sed facilisis ex fringilla, faucibus ligula vel, rhoncus magna. Cras ac semper sem. Nullam sed lacinia velit. Integer vestibulum erat ac condimentum sodales. Integer eget lectus sed sem pellentesque ultricies. Praesent mauris erat, rhoncus et ante ac, placerat viverra ante. Proin orci risus, convallis vitae cursus in, vulputate at urna. Quisque aliquet lorem et velit dictum suscipit.Fusce eget tortor ut odio cursus iaculis sit amet sed sem. Ut pellentesque, orci at porta convallis, turpis nisl viverra diam, eget feugiat urna ante quis ante. Etiam vestibulum, odio a interdum congue, tellus tortor consequat est, sit amet venenatis risus tellus eget libero. Suspendisse justo erat, cursus a velit vel, faucibus volutpat sapien. Sed egestas ut tellus eu sodales. Donec massa felis, posuere at interdum a, porttitor in ante. Donec eleifend mi pellentesque laoreet cursus. Cras hendrerit consequat faucibus. Maecenas malesuada dignissim pretium. In hac habitasse platea dictumst. Proin mollis lorem non vulputate sollicitudin.Vivamus malesuada fermentum magna nec sodales. Sed vitae augue nec nisi ultricies feugiat. Donec ex justo, tristique sed porta in, ullamcorper eu ligula. Sed ut velit ac mauris lacinia auctor. Aenean in augue ornare, pulvinar neque sed, luctus ante. Donec vehicula massa ipsum. Integer quis ante vel tortor pellentesque malesuada. Proin varius pharetra lorem, gravida lacinia dui efficitur sit amet. Nam vitae sapien eget dolor luctus consectetur nec ac turpis. Curabitur facilisis lobortis vulputate. In non elementum metus. Integer laoreet laoreet tortor, sed fringilla orci sagittis sit amet.Quisque non felis id mauris cursus vestibulum in quis turpis. Integer eget auctor lacus, in tempus turpis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam molestie ipsum a ullamcorper aliquet. Praesent sed mollis metus. Suspendisse dapibus volutpat auctor. Aenean mattis facilisis justo at faucibus. Proin semper interdum diam a ullamcorper.Nam mollis quam massa, vitae euismod nibh molestie sit amet. Maecenas tempus, quam bibendum lobortis varius, purus eros porttitor lacus, ac mollis neque mauris nec enim. Praesent a sagittis libero. Praesent eu faucibus enim. Nunc lacinia viverra sem, quis posuere quam eleifend eu. Maecenas quis pretium risus. Cras tempus porta nisl eget pretium. Vestibulum dignissim egestas ultrices. Donec at eros in mauris congue varius. Aenean nec eros non erat volutpat suscipit sit amet sed tortor. Duis fermentum sapien sit amet massa tincidunt, a scelerisque dolor interdum. Maecenas ac mollis tortor, id rhoncus ex. Suspendisse tristique, odio at mollis sagittis, elit risus venenatis urna, dictum iaculis dui arcu in enim. Vestibulum augue elit, pretium a convallis semper, porttitor nec dolor. Donec sem sapien, ultrices ac sapien non, vulputate bibendum nisi.Nunc sed dignissim lectus. Aenean dolor nunc, mollis quis vehicula sed, mattis et metus. Praesent quis diam blandit lectus imperdiet tristique. In condimentum id tellus ultricies lacinia. Donec quis tempor nisl, a rutrum eros. Ut interdum rutrum nunc nec volutpat. Aliquam erat volutpat. Nam ex lectus, blandit sit amet pharetra maximus, aliquam sit amet nisi. Proin aliquam vitae augue id mollis. Praesent interdum mauris ac elit molestie, sed blandit ante dictum. Aenean pellentesque quam eu vulputate vulputate. Maecenas a neque vitae turpis aliquam posuere.Nulla facilisi. Donec tempus ullamcorper dignissim. In convallis mauris eu sem viverra, in imperdiet leo tristique. In vel nisi eget mauris gravida ultricies. Vivamus quis ligula eu purus sagittis suscipit. Nam rutrum egestas libero, a ultrices tortor varius non. Phasellus porta vel dui a tincidunt. Nulla fringilla volutpat est quis egestas. Integer vel accumsan velit. Fusce in erat accumsan, porttitor augue eu, sagittis odio. Aenean pellentesque semper sem sed malesuada. Nullam egestas ut quam ac faucibus. Aliquam dictum mauris id posuere facilisis. Nam lobortis mauris dui, ut efficitur metus tempus vitae. Phasellus ultrices at felis quis vestibulum.Vestibulum ultrices tortor et congue laoreet. Donec a placerat est. Quisque sollicitudin nulla ut urna mollis, at euismod arcu ultrices. Proin iaculis quis ante gravida fermentum. Ut et rhoncus eros. Aliquam ac consequat turpis. Vivamus eget quam vitae diam aliquam porta. Duis congue euismod tincidunt. Etiam interdum nec elit a pulvinar.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae mauris eget lorem ornare congue in quis risus. Sed justo velit, elementum quis mattis eu, ullamcorper a arcu. Ut quis iaculis felis, sed faucibus lacus. Sed feugiat quis libero id pharetra. Sed commodo volutpat erat, ut eleifend nulla sodales eu. Praesent a enim mauris. Aliquam nec ante faucibus, pulvinar felis id, ultricies magna. Nam mattis iaculis enim vitae lobortis. Donec lectus massa, elementum eget ullamcorper sed, congue eu nibh. Nam lobortis justo vitae eros sodales, sed convallis libero vulputate. Morbi bibendum ante vitae ligula viverra rutrum.Aenean nec ipsum purus. Cras et felis vitae nulla mollis consectetur id vel ante. Sed consectetur mattis augue, auctor commodo enim varius non. Fusce a sapien diam. Nam vitae dolor ante. Aliquam erat volutpat. Aliquam erat volutpat.Phasellus sodales efficitur dui, sit amet imperdiet libero. Pellentesque luctus magna id lorem suscipit, in commodo nulla sagittis. Donec nec egestas orci, sit amet iaculis dui. Mauris lorem velit, maximus eget efficitur et, varius quis ante. Morbi sit amet mi aliquam, vehicula lacus eu, aliquet magna. Vestibulum finibus nibh lacus, nec viverra ex tristique sed. Maecenas a eros a odio vehicula facilisis vitae vel enim. Nam non lectus tortor. Nulla feugiat consequat vestibulum. Praesent dignissim diam dui, et tincidunt ex consectetur eu. Donec et finibus nibh. In sed lobortis tortor, ac blandit arcu. Mauris dapibus efficitur congue. Sed ut commodo nisl, eget scelerisque lacus. Vivamus lorem ante, feugiat eget felis non, interdum euismod lorem.Pellentesque luctus massa felis, vitae congue libero ultricies et. Sed iaculis metus in nisl ultricies pharetra. Pellentesque facilisis posuere quam laoreet semper. Pellentesque nisi tortor, vestibulum eu dictum ac, convallis quis urna. Quisque placerat dictum dolor, vel dictum nulla pulvinar in. Ut elit odio, consequat sit amet scelerisque sit amet"
    window.style.overflow = "hidden";
    if (vw >= "992") {
        document.getElementById("programTitle").style.marginLeft = "13vw";
    } else {
        document.getElementById("programTitle").style.marginLeft = "30vw";
    }

    setTimeout(function () {
        window.parentElement.style.maxWidth = "250px";
        window.style.maxWidth = "";
        window.style.minHeight = "";
        window.innerHTML = list;
        window.style.overflow = "";
        document.getElementById("programTitle").style.marginLeft = "";
      }, 3000);
}

function toggleAccessibilityBar() {
  var vw = document.documentElement.clientWidth;
  var bar = document.getElementById("accessibilityBar");
  var btn = document.getElementById("accessibilityBtn");
  if (barOpen == false) {
    if(vw <= 400) {
      bar.style.width = "100%";
    } else {
      bar.style.width = "300px";
    }
    btn.style.boxShadow = "none";
    btn.style.right = "10px";
    btn.style.top = "10px";
    document.getElementById("navbarSettings").style.width = "100%";
    barOpen = true;
  } else if (barOpen == true) {
    bar.style.width = "0px";
    btn.style.boxShadow = "black 2px 2px 2px";
    btn.style.right = "20px";
    btn.style.top = "20px";
    document.getElementById("navbarSettings").style.width = "0";
    barOpen = false;
  } else {

  }

}

function accessibilityButtonCheck() {
  if (accessibility == false) {
    var check = ifExists("email");

    document.body.setAttribute('style', 'color:black !important');
    document.getElementById("pinkText").setAttribute('style', 'color:black !important');

    if (check == true) {
      document.getElementById("email").setAttribute('style', 'color:blue !important');
      document.getElementById("number").setAttribute('style', 'color:blue !important');
    } else {
      document.getElementById("pinkText2").setAttribute('style', 'color:black !important');
      document.getElementById("contactMe").setAttribute('style', 'color:black !important');
      document.getElementsByClassName("rgbText")[0].setAttribute('style', 'color:black !important');
      document.getElementsByClassName("rgbText")[1].setAttribute('style', 'color:black !important');
      document.getElementsByClassName("rgbText")[2].setAttribute('style', 'color:black !important');
      document.getElementsByClassName("rgbText")[3].setAttribute('style', 'color:black !important');
      
      var collapses = document.querySelectorAll('div[data-toggle="collapse"]');
      for(i = 0; i < collapses.length; i++) {
        collapses[i].setAttribute('style', 'background-image:none !important');
      }
      
      openCloseAllDrawers();
    }
    accessibility = true;
  } else if (accessibility == true) {
    var check = ifExists("email");

    document.body.setAttribute('style', 'none');
    document.getElementById("pinkText").setAttribute('style', 'none');
    
    if (check == true) {
      document.getElementById("email").setAttribute('style', 'none');
      document.getElementById("number").setAttribute('style', 'none');
    } else {
      document.getElementById("pinkText2").setAttribute('style', 'none');
      document.getElementById("contactMe").setAttribute('style', 'none');
      document.getElementsByClassName("rgbText")[0].setAttribute('style', 'none');
      document.getElementsByClassName("rgbText")[1].setAttribute('style', 'none');
      document.getElementsByClassName("rgbText")[2].setAttribute('style', 'none');
      document.getElementsByClassName("rgbText")[3].setAttribute('style', 'none');
      
      var collapses = document.querySelectorAll('div[data-toggle="collapse"]');
      for(i = 0; i < collapses.length; i++) {
        collapses[i].setAttribute('style', 'none');
      }
      
      openCloseAllDrawers();
    }
    accessibility = false;
  } else {

  }
}

function openCloseAllDrawers() {
var message = document.getElementById("messageDrawerState")
  if(document.getElementsByClassName("collapse")[0] != undefined){
    if(allDrawerOpen == false) {
      $(".collapse").collapse("show");
    
      message.innerHTML = "Opened!"
      message.style.color = "green";
      setTimeout(function () {
        message.innerHTML = "";
        message.style.color = "black";
      }, 1500);
    
      allDrawerOpen = true;
    } else if (allDrawerOpen == true) {
      $(".collapse").collapse("hide");
      message.innerHTML = "Closed!"
      message.style.color = "green";
      setTimeout(function () {
        message.innerHTML = "";
        message.style.color = "black";
      }, 1500);
    
      allDrawerOpen = false;
    }
  } else {
    message.innerHTML = "No drawers!"
      message.style.color = "red";
    setTimeout(function () {
      message.innerHTML = "";
      message.style.color = "black";
    }, 1500);
  }

}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

function checkIfTab(event, id) {
  if (event.keyCode === 13) {
    $("#" + id).click();
  }
}

$(function () {
  var includes = $('[data-include]')
  $.each(includes, function () {
    var file = './' + $(this).data('include') + '.html'
    $(this).load(file)
  })
})

function delay(URL) {
  topFunction();
  setTimeout( function() { window.location = URL }, 500 );
}

function onloadTextChange() {
  const vw = document.documentElement.clientWidth;
  setTimeout( function() {
    document.getElementById("introText2").innerHTML = "My email is ";
    document.getElementById("introText2").innerHTML += "<span id='email'>Jacob.klaren@me.com</span>,";
    document.getElementById("email").onclick = function() { copy('jacob.klaren@me.com') };

    document.getElementById("introText3").innerHTML = "All my projects go on GitHub <a id='github'>Kybbe</a>.";
    document.getElementById("github").href ='https://github.com/Kybbe';

    document.getElementById("introText4").remove();

    document.getElementById("contactMe").remove();
  }, 3700 );
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

function updateClock() {
  var today = new Date();
  
  if(today.getMinutes() <= "9"){
    var time = today.getHours() + ":0" + today.getMinutes();
  } else {
    var time = today.getHours() + ":" + today.getMinutes();
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
      var currentTemp = Math.round(result.main.temp);
      var currentMaxTemp = Math.round(result.main.temp_max).toString();
      var currentMinTemp = Math.round(result.main.temp_min).toString();
      document.getElementById("Temp").innerHTML = currentTemp += "°";

      var highLow = document.getElementById("highLow");
      highLow.innerHTML = "<i class='fas fa-angle-up'></i>" + currentMaxTemp + "° " + "<i class='fas fa-angle-down'></i>" + currentMinTemp + "°";

      document.getElementById("highLow").innerHTML = "<i class='fas fa-angle-up'></i>" + currentMaxTemp + "° " + "<i class='fas fa-angle-down'></i> " + currentMinTemp + "°";
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
          document.getElementsByClassName("weatherContainer")[0].style.backgroundColor = "lightgrey";
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


var makeItRain = function() {

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