const vw = document.documentElement.clientWidth;
const vh = document.documentElement.clientHeight;

function openDrawer(drawer){
    alert('Clicked ' + drawer + '!');
}

if (vh <= 730) {
    document.getElementById("firstRow").style.paddingTop = "5vh";
}

if (vw <= 330) {
    document.getElementById("headline").style.paddingLeft = "0";
    document.getElementById("headline").style.paddingRight = "0";
    document.getElementById("headline").style.marginLeft = "25px";
}