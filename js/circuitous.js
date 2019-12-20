

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

/*
var mobile_timer = false;
if(navigator.userAgent.match(/iPhone/i)) {$('#viewport').attr('content','width=device-width,minimum-scale=1.0,maximum-scale=1.0,initial-scale=1.0');
   $(window).bind('gesturestart',function () {clearTimeout(mobile_timer);$('#viewport').attr('content','width=device-width,minimum-scale=1.0,maximum-scale=10.0');
    }).bind('touchend',function () {clearTimeout(mobile_timer); mobile_timer = setTimeout(function () {$('#viewport').attr('content','width=device-width,minimum-scale=1.0,maximum-scale=1.0,initial-scale=1.0');},1000);
});}
*/

