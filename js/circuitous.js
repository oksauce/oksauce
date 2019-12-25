
$.getJSON('/☰/circuitous.json').done(function(data){
  window.circuitous = data;

  RandomCircuitous();
  CountCircuitous();
  CheckCookie();

  console.log(isMobile);
  if (isMobile == true) {$("#circuitous").removeAttr('onclick')}
});

var isMobile = false; //initiate as false
var obj_key_count = 0;
var interval = null;

// device detection
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
    isMobile = true;
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
            c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
      }
  }
  return "";
}

function pickRandomCircuitous(){
	console.clear();
	if (!isMobile) {RandomCircuitous()}
}

function swipeRandomCircuitous(){
	console.clear();
	RandomCircuitous();
}

function pickCircuitousInfo(){
  $.getJSON('/☰/circuitousinfo.json').done(function(data){
  window.circuitousinfo = data;

  InfoCircuitous();

  setTimeout(function(){ InfoCircuitous(); }, 3000);

  if (isMobile == true) {$("#circuitous").removeAttr('onclick')}
  });
}

function InfoCircuitous(){
  $("#content").css("text-align", "left");
  if (obj_key_count == (Object.keys(window.circuitousinfo).length) -1) {
      $("#circuitous").attr("onclick","pickRandomCircuitous()");
  } 

  var obj_keys = Object.keys(window.circuitousinfo);

  window.ran_key_select = obj_keys[obj_key_count];
  window.selectedcircuitous = window.circuitousinfo[ran_key_select];

  //console.log(Object.keys(window.circuitousinfo).length);
  //console.log(obj_key_count);

  if (obj_key_count != (Object.keys(window.circuitousinfo).length)) {    
      window.selectedcircuitous = window.circuitousinfo[ran_key_select];
 
  } else {
      obj_key_count = 0;
      window.ran_key_select = obj_keys[obj_key_count];
      window.selectedcircuitous = window.circuitousinfo[ran_key_select];
      //$("#circuitous").attr("onclick","pickRandomCircuitous()");
      //pickRandomCircuitous();
  }

  window.selectedcircuitous = window.circuitousinfo[ran_key_select];
  //console.log(window.ran_key_select);
  document.getElementById("circuitous").innerHTML = (JSON.stringify(window.selectedcircuitous.circuitousinfo)).replace(/\"/g, "").replace(/\"/g, "");
  document.getElementById("cowabunga").innerHTML = window.ran_key_select;
  console.info(ran_key_select + ' ' + JSON.stringify(window.selectedcircuitous.circuitousinfo).replace(/\"/g, "").replace(/\"/g, ""));
  
  obj_key_count = obj_key_count + 1;
}

function RandomCircuitous(){
  $("#content").css("text-align", "center");
  var obj_keys = Object.keys(window.circuitous);
  window.ran_key_select = obj_keys[Math.floor(Math.random() *obj_keys.length)];
  window.selectedcircuitous = window.circuitous[ran_key_select];
  document.getElementById("circuitous").innerHTML = (JSON.stringify(window.selectedcircuitous.circuitous)).replace(/\"/g, "").replace(/\"/g, "");
  document.getElementById("cowabunga").innerHTML = window.ran_key_select;
  console.info(ran_key_select + ' ' + JSON.stringify(window.selectedcircuitous.circuitous).replace(/\"/g, "").replace(/\"/g, ""));
}

function CountCircuitous(){
  var obj_keys = Object.keys(window.circuitous);
  var ran_key = (obj_keys.length);
  //document.getElementById("cow").innerHTML = ran_key;
  $('span.cow').text(ran_key);
  console.info(ran_key);
}

function CheckCookie(){

  if (getCookie("darkmode")=="enable") {
      cardColor('rgb(36, 36, 38)');
  //} else if (getCookie("darkmode")=="disable") {setCookie ("darkmode","disable",365);cardColorDefault();
  } else if (getCookie("darkmode")=="auto") {
      setCookie ("darkmode","auto",365);
  } else if (getCookie("darkmode")=="notset") {
  	  cardColorDefault();
  }
/*
  if (getCookie("darkmode")=="enable" || getCookie("darkmode")=="disable"){
      setCookie ("darkmode","disable",365);cardColorDefault();
  } else {getCookie("darkmode")=="enable";cardColor('rgb(36, 36, 38)');}
*/
}

function createMailtoLinks(){
  $('a[data-u][href=""]').each(function(){
    var i = $(this);
        i.attr('href', 'mai'+'lto:'+i.data('u')+'@'+i.data('d'));
        if (i.html()==''){ i.html(i.data('u')+'@'+i.data('d')); }
  });
}

/* $(function(){createMailtoLinks();}); */

/* change favicons */
document.head = document.head || document.getElementsByTagName('head')[0];

function changeFavicon(src) {
  var link = document.createElement('link'),
      oldLink = document.getElementById('dynamic-favicon'),
      srtLink = document.getElementById('short-icon');
  link.id = 'dynamic-favicon';
  link.rel = 'shortcut icon';
  link.href = src;
  if (srtLink) {document.head.removeChild(srtLink);}
  if (oldLink) {document.head.removeChild(oldLink);}
  document.head.appendChild(link);
}

var url = window.location.href;

  //console.log(url);
  //console.log(window.location.hostname);

function clickSauce(){ 
  setTimeout(function(){ changeFavicon('/img/circuitous-16x16.png'); }, 100);
  setTimeout(function(){ changeFavicon('/img/sauce-16x16.png'); }, 500);
  setTimeout(function(){ changeFavicon('/img/+sauce-16x16.png'); }, 1000);
}

function clickCard(){ 
  setTimeout(function(){ changeFavicon('/img/+sauce-16x16.png'); }, 100);
  setTimeout(function(){ changeFavicon('/img/sauce-16x16.png'); }, 500);
  setTimeout(function(){ changeFavicon('/img/circuitous-16x16.png'); }, 1000);

  $("#circuitous").attr("onclick","pickCircuitousInfo()");
  pickCircuitousInfo();

  //if (getCookie("darkmode")=="disable") {setCookie ("darkmode","auto",365)}
  //$("#circuitous").html("inspired by Brian Eno and Peter Schmidt,circuitous cards are developing to inspire and build new processes for creative electronic music production");
}

function cardColor(backcolor){

  //console.log('cardColor');
  //console.log($("#cardcolor").css('background-color'));
  //console.log($("#header").css('color'));

  if ($("#cardcolor").css('background-color') == "rgba(0, 0, 0, 0)") {
      $("#cardcolor").css("background-color", backcolor);
      //$("#cowabunger").css("color", "rgb(36,36,38)");
      $("#header").css("color", "rgba(255, 255, 255, 255)");
      $("#circuitous").css("color", "rgba(255, 255, 255, 255)");
      $("#circuitous a").css("color", "rgba(255, 255, 255,255)");
      $("#circuitous p").css("color", "rgba(255, 255, 255,255)");
      $("#footer a").css("color", "rgba(255, 255, 255, 255)");

      setCookie ("darkmode","enable",365);
      clearInterval(interval); // stop the interval

  } else if ($("#cardcolor").css('background-color') == backcolor.replace(/'/g, '"')) {
      $("#cardcolor").css("background-color", "rgba(0, 0, 0, 0)");
      //$("#cowabunger").css("color", "rgba(0, 0, 0, 0)");
      $("#header").css("color", "rgba(0, 0, 0, 1)");
      $("#circuitous").css("color", "rgba(0, 0, 0, 1)");
      $("#circuitous a").css("color", "rgba(0, 0, 0, 1)");
      $("#circuitous p").css("color", "rgba(0, 0, 0, 1)");
      $("#footer a").css("color", "rgba(0, 0, 0, 1)");

      //setCookie ("darkmode","disable",365);
      setCookie ("darkmode","auto",365);
      interval = setInterval(time, 3000);

  }

}

function cardColorDefault() {

  $("#cardcolor").css("background-color", "rgba(0, 0, 0, 0)");
  $("#header").css("color", "rgba(0, 0, 0, 1)");
  $("#circuitous").css("color", "rgba(0, 0, 0, 1)");
  $("#footer a").css("color", "rgba(0, 0, 0, 1)");
}

function cardColorDark() {

  $("#cardcolor").css("background-color", "rgb(36, 36, 38)");
  $("#header").css("color", "rgba(255, 255, 255, 255)");
  $("#circuitous").css("color", "rgba(255, 255, 255, 255)");
  $("#circuitous a").css("color", "rgba(255, 255, 255,255)");
  $("#circuitous p").css("color", "rgba(255, 255, 255,255)");
  $("#footer a").css("color", "rgba(255, 255, 255, 255)");
}


if (url == 'http://'+window.location.hostname+'/') {
  setTimeout(function(){ changeFavicon('/img/circuitous-16x16.png'); }, 100);
  setTimeout(function(){ changeFavicon('/img/sauce-16x16.png'); }, 500);
  setTimeout(function(){ changeFavicon('/img/+sauce-16x16.png'); }, 1000);
} else {
  setTimeout(function(){ changeFavicon('/img/+sauce-16x16.png'); }, 100);
  setTimeout(function(){ changeFavicon('/img/sauce-16x16.png'); }, 500);
  setTimeout(function(){ changeFavicon('/img/circuitous-16x16.png'); }, 1000);
}

function time() {
  var d = new Date();
  var s = d.getSeconds();
  //var m = d.getMinutes();
  var h = d.getHours();

  // console.log(h);
  // console.log(s);

  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      if (getCookie("darkmode")=="notset" || getCookie("darkmode")=="auto"){cardColorDark()}
  } else if (h > 18) {
      if (getCookie("darkmode")=="notset" || getCookie("darkmode")=="auto"){cardColorDark()}
  } else if (h < 18 && h < 7) {
      if (getCookie("darkmode")=="notset" || getCookie("darkmode")=="auto"){cardColorDark()}
  } else if (h < 18 && h > 7) {
      if (getCookie("darkmode")=="notset" || getCookie("darkmode")=="auto"){cardColorDefault()}
  } 
  /*
  if (s > 55) {$("#plus").css("color", "rgba(255, 0, 0, 1)") } else { $("#plus").css("color", "") }
  if (s > 10 && s < 15) {$("#tailcard").css("color", "rgba(255, 0, 0, 1)") } else { $("#tailcard").css("color", "") }
  */
}


window.onload=function(){

  if (getCookie("darkmode")==""){
      setCookie ("darkmode","notset",365);
      cardColorDefault();
  }

  interval = setInterval(time, 3000);

  function detectswipe(el,func) {
    swipe_det = new Object();
    swipe_det.sX = 0;
    swipe_det.sY = 0;
    swipe_det.eX = 0;
    swipe_det.eY = 0;
    var min_x = 20;  //min x swipe for horizontal swipe
    var max_x = 40;  //max x difference for vertical swipe
    var min_y = 40;  //min y swipe for vertical swipe
    var max_y = 50;  //max y difference for horizontal swipe
    var direc = "";
    ele = document.getElementById(el);
    ele.addEventListener('touchstart',function(e){
    var t = e.touches[0];
    swipe_det.sX = t.screenX; 
    swipe_det.sY = t.screenY;
    },false);
    ele.addEventListener('touchmove',function(e){
    e.preventDefault();
    var t = e.touches[0];
    swipe_det.eX = t.screenX; 
    swipe_det.eY = t.screenY;    
    },false);
    ele.addEventListener('touchend',function(e){
    //horizontal detection
    if ((((swipe_det.eX - min_x > swipe_det.sX) || (swipe_det.eX + min_x < swipe_det.sX)) && ((swipe_det.eY < swipe_det.sY + max_y) && (swipe_det.sY > swipe_det.eY - max_y)))) {
        if(swipe_det.eX > swipe_det.sX) direc = "r";
          else direc = "l";
        }
    //vertical detection
    if ((((swipe_det.eY - min_y > swipe_det.sY) || (swipe_det.eY + min_y < swipe_det.sY)) && ((swipe_det.eX < swipe_det.sX + max_x) && (swipe_det.sX > swipe_det.eX - max_x)))) {
        if(swipe_det.eY > swipe_det.sY) direc = "d";
          else direc = "u";
        }
    
        if (direc != "") {
          if(typeof func == 'function') func(el,direc);
        }
        direc = "";
      },false);  
    }

    function randomfunction(el,d) {
      //alert("you swiped on element with id '"+el+"' to "+d+" direction");
      swipeRandomCircuitous();
    }

    detectswipe('circuitous',randomfunction);
}

