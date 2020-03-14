/*! http://mths.be/noselect v1.0.3 by @mathias */

jQuery.fn.noSelect = function() {

	// Since the string 'none' is used three times, storing it in a variable gives better results after minification
	var none = 'none';

	// onselectstart and ondragstart for WebKit & IE
	// onmousedown for WebKit & Opera
	return this.bind('selectstart dragstart mousedown', function() {
		return false;
	}).css({
		'MozUserSelect': none,
		'msUserSelect': none,
		'webkitUserSelect': none,
		'userSelect': none
	});

};

(function(d, a, e) {

var b = {};
var g = function(h) {
	return b[h] || (b[h] = e(h))
};
var c = !! d.history && history.pushState;
var f = d.location.hash;

e.fn.t = function () {
	var h = "active";
	return this.each(function () {
		var j = e(this),
			k = e("a", j),
			i = k.map(function () {
				return a.getElementById(this.hash.slice(1))
			}).first().addClass(h).end();
		k.click(function (l) {
			i.add(k).removeClass(h);
			this.className = h;
			g(this.hash).addClass(h);
			c && history.pushState({}, this.innerHTML, this.hash);
			l.preventDefault()
		});
		if (f) {
			k.filter(function () {
				return this.hash == f
			}).click()
		}
	})
};

e(function () {
	var j = e("#combos, #keyboard").noSelect(),
		i = {};

	function h(k) {
		return e(a.getElementById("key-" + k), j); 
	}
	e("[data-keys]").mouseenter(function() {
	        /* testing if else here */
	        if (activeKeyboard == "Mac") {
		    var keys = (this.getAttribute("data-keys") || '')
			.replace(/shift($|,)/, "shiftleft$1")
			.replace("alt", "altleft")
			.replace("control", "controlleft")
			.replace("option", "optionleft")
			.replace("command", "commandleft")
			}
			else {
			var keys = (this.getAttribute("pc-keys") || '')
			.replace(/shift($|,)/, "shiftleft$1")
			.replace("control", "controlleft")	
			}			
		    e.each(
			keys.split(","),
			function(k, l) {
				h(l).attr({ fill: lightsOn })
			}
		);
	});
	e("[data-keys]").mouseleave(function() {
			if (activeKeyboard == "Mac") {
		    var keys = (this.getAttribute("data-keys") || '')
			.replace(/shift($|,)/, "shiftleft$1")
			.replace("alt", "altleft")
			.replace("control", "controlleft")
			.replace("option", "optionleft")
			.replace("command", "commandleft")
			}
			else {
			var keys = (this.getAttribute("pc-keys") || '')
			.replace(/shift($|,)/, "shiftleft$1")
			.replace("control", "controlleft")			
			}			
		    e.each(
			keys.split(","),
			function(k, l) {
				h(l).attr({ fill: lightsOff })
			}
		);
	});
	e(".tt-dropdown-menu").on('mouseenter', '#myresult', function() {
			if (activeKeyboard == "Mac") {
		    var keys = (this.getAttribute("data-keys") || '')		 
			.replace(/shift($|,)/, "shiftleft$1")
			.replace("alt", "altleft")
			.replace("control", "controlleft")
			.replace("option", "optionleft")
			.replace("command", "commandleft")
			}
			else {
			var keys = (this.getAttribute("pc-keys") || '')
			.replace(/shift($|,)/, "shiftleft$1")
			.replace("control", "controlleft")			}			
		    e.each(
			keys.split(","),
			function(k, l) {
				h(l).attr({ fill: lightsOn })
			}
		);
	});
	e(".tt-dropdown-menu").on('mouseleave', '#myresult', function() {
			if (activeKeyboard == "Mac") {
		     var keys = (this.getAttribute("data-keys") || '')
			.replace(/shift($|,)/, "shiftleft$1")
			.replace("alt", "altleft")
			.replace("control", "controlleft")
			.replace("option", "optionleft")
			.replace("command", "commandleft")	
			}	
			else {
			var keys = (this.getAttribute("pc-keys") || '')
			.replace(/shift($|,)/, "shiftleft$1")
			.replace("control", "controlleft")			}	
		    e.each(
			keys.split(","),
			function(k, l) {
				h(l).attr({ fill: lightsOff })
			}
		);
	});
});

}(this, document, jQuery));