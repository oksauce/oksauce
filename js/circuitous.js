

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

/*! A fix for the iOS orientationchange zoom bug.
 Script by @scottjehl, rebound by @wilto.
 MIT / GPLv2 License.
*/
(function(w){

    // This fix addresses an iOS bug, so return early if the UA claims it's something else.
    var ua = navigator.userAgent;
    if( !( /iPhone|iPad|iPod/.test( navigator.platform ) && /OS [1-5]_[0-9_]* like Mac OS X/i.test(ua) && ua.indexOf( "AppleWebKit" ) > -1 ) ){
        return;
    }

    var doc = w.document;

    if( !doc.querySelector ){ return; }

    var meta = doc.querySelector( "meta[name=viewport]" ),
        initialContent = meta && meta.getAttribute( "content" ),
        disabledZoom = initialContent + ",maximum-scale=1",
        enabledZoom = initialContent + ",maximum-scale=10",
        enabled = true,
        x, y, z, aig;

    if( !meta ){ return; }

    function restoreZoom(){
        meta.setAttribute( "content", enabledZoom );
        enabled = true;
    }

    function disableZoom(){
        meta.setAttribute( "content", disabledZoom );
        enabled = false;
    }

    function checkTilt( e ){
        aig = e.accelerationIncludingGravity;
        x = Math.abs( aig.x );
        y = Math.abs( aig.y );
        z = Math.abs( aig.z );

        // If portrait orientation and in one of the danger zones
        if( (!w.orientation || w.orientation === 180) && ( x > 7 || ( ( z > 6 && y < 8 || z < 8 && y > 6 ) && x > 5 ) ) ){
            if( enabled ){
                disableZoom();
            }           
        }
        else if( !enabled ){
            restoreZoom();
        }
    }

    w.addEventListener( "orientationchange", restoreZoom, false );
    w.addEventListener( "devicemotion", checkTilt, false );

})( this );

