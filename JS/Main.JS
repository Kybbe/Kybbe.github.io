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


var row = document.getElementById("backendContainer")
var word = document.getElementById("backend")
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

var barOpen = false;

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
    bar.style.padding = "20px";
    document.getElementById("navbarSettings").style.width = "100%";
    barOpen = true;
  } else if (barOpen == true) {
    bar.style.width = "0px";
    btn.style.boxShadow = "black 2px 2px 2px";
    btn.style.right = "20px";
    btn.style.top = "20px";
    bar.style.padding = "0px";
    document.getElementById("navbarSettings").style.width = "0";
    barOpen = false;
  } else {

  }

}

var accessibilityOn = false;
var allDrawerOpen = false;

function accessibilityButtonCheck() {
  if (accessibilityOn == false) {
    document.body.setAttribute('style', 'color:black !important');
    document.getElementById("pinkText").setAttribute('style', 'color:black !important');
    document.getElementById("pinkText2").setAttribute('style', 'color:black !important');
    document.getElementById("contactMe").setAttribute('style', 'color:black !important');
    document.getElementsByClassName("rgbText")[0].setAttribute('style', 'color:black !important');
    document.getElementsByClassName("rgbText")[1].setAttribute('style', 'color:black !important');
    document.getElementsByClassName("rgbText")[2].setAttribute('style', 'color:black !important');
    document.getElementsByClassName("rgbText")[3].setAttribute('style', 'color:black !important');
    document
    openCloseAllDrawers();
    accessibilityOn = true;
  } else if (accessibilityOn == true) {
    document.body.setAttribute('style', 'none');
    document.getElementById("pinkText").setAttribute('style', 'none');
    document.getElementById("pinkText2").setAttribute('style', 'none');
    document.getElementById("contactMe").setAttribute('style', 'none');
    document.getElementsByClassName("rgbText")[0].setAttribute('style', 'none');
    document.getElementsByClassName("rgbText")[1].setAttribute('style', 'none');
    document.getElementsByClassName("rgbText")[2].setAttribute('style', 'none');
    document.getElementsByClassName("rgbText")[3].setAttribute('style', 'none');
    openCloseAllDrawers();
    accessibilityOn = false;
  } else {

  }
}

function openCloseAllDrawers() {
var message = document.getElementById("messageDrawerState")

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