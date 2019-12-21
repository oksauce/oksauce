

$.getJSON('/js/circuitous.json').done(function(data){
        window.circuitous = data;
        //console.log(window.questionnaire);
        RandomCircuitous();
        CountCircuitous();

});

function pickRandomCircuitous(){
	console.clear();
	RandomCircuitous();
}

function RandomCircuitous(){
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

window.onload=function(){

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
      pickRandomCircuitous();
    }

    detectswipe('circuitous',randomfunction);
}

