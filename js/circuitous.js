

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

