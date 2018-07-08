(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var artworkViewer = function artworkViewer(items) {

    var seed = 0;
    var nav;
    var caption;
    var viewer;
    var left;
    var right;
    var closeDeepZoom;
    var zoom;
    var iframe;
    var viewerPosition;
    var elements = Array.from(items);

    var swapImage = function swapImage(seed) {
        var imageData = extractMeta(elements[seed]);
        if (caption) {
            caption.innerHTML = imageData.caption;
        }
        viewer.src = imageData.src;

        if (imageData.aspect === 'portrait') {
            viewer.parentNode.classList.add('col-12', 'md-col-7');
        } else {
            viewer.parentNode.classList.remove('col-12', 'md-col-7');
        }

        if (viewerPosition && elements.length > 1) {
            viewerPosition.innerHTML = 'Image ' + (seed + 1) + '/' + elements.length;
        } else {
            viewerPosition.innerHTML = '&nbsp';
        }

        if (imageData.zoomSrc) {
            zoomToggle(true);
        } else {
            zoomToggle(false);
        }
    };

    var createIframe = function createIframe(src) {
        iframe = window.document.createElement('iframe');
        iframe.id = 'iframeViewer';
        iframe.src = src + '&k=' + ikey;
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.className = 'fixed top-0 bottom-0 border-0 left-0 right-0 z1';
        // append iframe and add body overflow to rm scrollbars
        window.document.body.appendChild(iframe);
        window.document.body.classList.add('overflow-hidden');

        // show button
        closeDeepZoom.classList.remove('display-none');
        // closeDeepZoom.parentNode.style.top = (Math.ceil(window.innerHeight) - Math.ceil(closeDeepZoom.parentNode.clientHeight)) + 'px';
        bindKeyPress();
    };

    var removeIframe = function removeIframe() {
        iframe.parentNode.removeChild(iframe); // remove iframe
        closeDeepZoom.classList.add('display-none'); // hide button
        window.document.body.classList.remove('overflow-hidden'); // remove overflow
    };

    var zoomToggle = function zoomToggle(show) {
        if (!zoom) {
            return;
        }
        if (show) {
            zoom.classList.remove('display-none');
            return;
        }
        zoom.classList.add('display-none');
    };

    var navigationToggle = function navigationToggle(show) {
        if (show) {
            if (nav) {
                nav.classList.remove('display-none');
            }
            left.classList.remove('display-none');
            right.classList.remove('display-none');
        }
    };

    var bindLeft = function bindLeft(e) {
        e.stopImmediatePropagation();

        if (seed <= 0) {
            right.classList.remove('opacity-4', 'events-none');
            return false;
        }
        seed--;
        right.classList.remove('opacity-4', 'events-none');
        swapImage(seed);

        return false;
    };

    var bindRight = function bindRight(e) {
        e.stopImmediatePropagation();

        if (seed >= elements.length - 1) {
            right.classList.add('opacity-4', 'events-none');
            return false;
        }
        seed++;
        left.classList.remove('opacity-4', 'events-none');
        swapImage(seed);

        return false;
    };

    var bindKeyPress = function bindKeyPress() {
        document.onkeydown = function (evt) {
            var evt = evt || window.event;
            var isEscape = false;
            if ("key" in evt) {
                isEscape = evt.key === "Escape" || evt.key === "Esc";
            } else {
                isEscape = evt.keyCode === 27;
            }
            if (isEscape) {
                removeIframe();
                document.onkeydown = null;
            }
        };
    };

    var bindZoom = function bindZoom(e) {
        e.preventDefault();
        var imageData = extractMeta(elements[seed]);
        createIframe(imageData.zoomSrc);
    };

    var bindControls = function bindControls() {
        var parent = elements[0].parentNode.parentNode;
        nav = parent.querySelector('.viewer-nav');
        left = parent.querySelector('.left');
        right = parent.querySelector('.right');
        zoom = parent.querySelector('.zoom');
        caption = parent.querySelector('.caption');
        viewer = parent.parentNode.querySelector('.viewer');
        closeDeepZoom = document.getElementById('closeDeepZoom');
        viewerPosition = parent.parentNode.querySelector('.viewer-position');

        left.classList.add('opacity-4', 'events-none');
        left.onclick = bindLeft;
        right.onclick = bindRight;

        if (zoom) {
            zoom.onclick = bindZoom;
        }
        if (closeDeepZoom) {
            closeDeepZoom.onclick = removeIframe;
        }
        if (elements.length > 1) {
            navigationToggle(true);
        }
    };

    var extractMeta = function extractMeta(el) {
        var src = el.getAttribute('href');
        var imageCaption = el.getAttribute('data-caption');
        var imageZoom = el.getAttribute('data-zoom') ? el.getAttribute('data-zoom') : null;
        var cdnPath = el.getAttribute('data-cdnpath');
        var w = parseInt(el.getAttribute('data-width'));
        var h = parseInt(el.getAttribute('data-height'));
        var aspect = 'landscape';

        if (h > w || parseInt(h) > 1000) {
            aspect = 'portrait';
        }

        return {
            'src': src,
            'caption': imageCaption,
            'zoomSrc': imageZoom,
            'cdnPath': cdnPath,
            'aspect': aspect
        };
    };

    if (elements.length > 0) {
        bindControls();
        swapImage(0);
    }
};

module.exports.init = function () {
    var items = document.querySelectorAll('.artwork-image');
    if (items) {
        artworkViewer(items);
    }
};

},{}],2:[function(require,module,exports){
'use strict';

var vendorPrefix = require('./utilities').getVendorPrefix().js;

// Carousel:
var Carousel = function Carousel(el) {
    this.carousel = el.querySelector('ul'); //the container that will be scrolled
    this.items = el.querySelectorAll('li'); //all items within the container
    this.width = this.items // total length of carousel
    ? this.items[0].clientWidth * this.items.length : this.items.length;
    this.next = el.querySelector('.carousel-button-next'); // next button
    this.prev = el.querySelector('.carousel-button-prev'); // prev button
    this.pager = el.querySelector('.carousel-pager') || false; // container for appending page number
    this.transformAmount = 0; // amount by which we are transforming
    this.setup();
};

Carousel.prototype = {
    // sets up the carousel with event listeners
    setup: function setup() {
        var _this = this;

        var containerWidth = this.carousel.parentNode.offsetWidth;
        var itemWidth = this.items[0].offsetWidth;
        this.itemsShown = Math.ceil(containerWidth / itemWidth);

        this.prev.addEventListener('click', this.scrollCarousel.bind(this));
        this.next.addEventListener('click', this.scrollCarousel.bind(this));

        this.getBounds();
        this.getPageNumber();

        window.addEventListener('resize', function () {
            _this.getBounds();
            containerWidth = _this.carousel.parentNode.offsetWidth;
            itemWidth = _this.items[0].offsetWidth;
            _this.itemsShown = Math.ceil(containerWidth / itemWidth);
        });
    },
    // get page number for pagination
    getPageNumber: function getPageNumber() {
        if (this.pager) {
            var pageNumber = Math.abs(this.transformAmount / 100) + 1;
            var pageTotal = Math.ceil(this.items.length / this.itemsShown);
            var pageString = pageNumber + '/' + pageTotal;
            this.pager.innerHTML = pageString;
        }
    },
    // calculate bounds within which to scroll
    getBounds: function getBounds() {
        this.floor = Math.ceil(Math.abs(this.transformAmount)) <= 0;
        this.ceiling = Math.abs(this.transformAmount) >= Math.ceil(100 / this.itemsShown * (this.items.length - this.itemsShown));

        this.handleButtonState();
        return { floor: this.floor, ceiling: this.ceiling };
    },
    // handle the state of the buttons
    handleButtonState: function handleButtonState() {
        if (this.floor) {
            this.prev.classList.add('opacity-4', 'events-none');
            this.next.classList.remove('opacity-4', 'events-none');
        } else if (this.ceiling) {
            this.prev.classList.remove('opacity-4', 'events-none');
            this.next.classList.add('opacity-4', 'events-none');
        } else {
            this.next.classList.remove('opacity-4', 'events-none');
            this.prev.classList.remove('opacity-4', 'events-none');
        }
    },
    // scroll the carousel in specified direction
    scrollCarousel: function scrollCarousel(e) {
        var direction = e ? e.currentTarget : this.buttons.next;
        if (direction === this.prev && !this.floor) {
            this.transformAmount += 100;
        } else if (direction === this.next && !this.ceiling) {
            this.transformAmount -= 100;
        }

        this.getBounds(this.transformAmount);
        this.getPageNumber();

        var transformString = 'translate3d(' + this.transformAmount + '%, 0, 0)';
        this.carousel.style[vendorPrefix + 'Transform'] = transformString;
    }

    // creates carousel for each instance on page
};module.exports = {
    new: Carousel,
    init: function init() {
        var carousels = Array.from(document.querySelectorAll('.carousel-container'));
        if (document && carousels) {
            carousels.forEach(function (el) {
                return new Carousel(el);
            });
        }
    }
};

},{"./utilities":10}],3:[function(require,module,exports){
'use strict';

var createDisclosure = function createDisclosure(el, i) {

    var disclosure;
    var className = el.getAttribute('data-bind');
    var active = el.getAttribute('data-active');
    var activeClass = el.getAttribute('data-class');
    var target = document.querySelector('.' + className);
    var allowAll = Boolean(el.classList.contains('allow-all'));
    var keyBind = Boolean(el.classList.contains('key-bind'));
    var toggleRevealClass = el.getAttribute('data-toggleclass') ? el.getAttribute('data-toggleclass') : 'hide';

    if (!className) {
        return false;
    }

    // Locate our disclosure element
    disclosure = document.querySelector('.' + className);
    disclosure.handle = el;

    var handleKeyPress = function handleKeyPress() {
        document.onkeydown = function (evt) {
            evt = evt || window.event;
            var isEscape = false;
            if ("key" in evt) {
                isEscape = evt.key == "Escape" || evt.key == "Esc";
            } else {
                isEscape = evt.keyCode == 27;
            }
            if (isEscape) {
                disclosure.toggle();
                document.onkeydown = null;
            }
        };
    };

    var handleClick = function handleClick(e) {
        e.preventDefault();
        var target = e.target;

        target.onblur = null;
        disclosure.toggle();

        if (keyBind) {
            handleKeyPress();
        }
    };

    var handleBlur = function handleBlur(e) {
        var currentTarget = e.currentTarget;
        setTimeout(function () {
            if (!currentTarget.contains(document.activeElement) && !allowAll) {
                this.classList.add(toggleRevealClass);
            }
        }.bind(this), 0);

        if (activeClass && !allowAll) {
            this.handle.querySelector('i:first-of-type').classList.toggle(activeClass);
        }
    };

    disclosure.toggle = function () {
        this.classList.toggle(toggleRevealClass);
        this.focus();
        this.onblur = handleBlur;
        if (activeClass) {
            el.querySelector('i:first-of-type').classList.toggle(activeClass);
        }
    };

    disclosure.setAttribute('tabindex', i);
    disclosure.onblur = handleBlur;

    // handle click event for trigger
    el.touchstart = handleClick;
    el.onmousedown = handleClick;
    el.onclick = function (e) {
        e.preventDefault();
    };

    if (active) {
        disclosure.toggle();
    }
};

module.exports.init = function () {
    var disclosures = Array.from(document.querySelectorAll('.disclosure'));
    disclosures.forEach(function (el, i) {
        createDisclosure(el, i);
    });
};

},{}],4:[function(require,module,exports){
'use strict';

require('whatwg-fetch');

var polyfills = require('./polyfills.js');
var disclosure = require('./disclosures.js');
var artworkViewer = require('./artwork-viewer.js');
var carousel = require('./carousel.js');
var map = require('./maps/map.js');
var newsletter = require('./newsletter.js');
var main = require('./main.js');

polyfills.init();
disclosure.init();
artworkViewer.init();
carousel.init();
map.init();
newsletter.init();
main.init();

},{"./artwork-viewer.js":1,"./carousel.js":2,"./disclosures.js":3,"./main.js":5,"./maps/map.js":6,"./newsletter.js":8,"./polyfills.js":9,"whatwg-fetch":13}],5:[function(require,module,exports){
'use strict';

/**
*
*  @desc:    	Main js instantiation script
*  @package:  	Mr Glyn Thomas
*  @author:  	Original editor andrew roberts, updated by yours truly!
*  @since:    	11.11.17
*
*/
// $(function(){
//
// 	//
// 	// Init plugins
// 	$('.carousel').Carousel();
// 	// $('.show-hide').Expanda();
// 	$('.sound .jp-play').IAudio();
// 	// $('#viewer').ArtworkViewer();
// 	$('.autosubmit').AutoSubmit();
// 	$('.remove').hide();	// remove fallback links eg watch this video
// 	$('#recent-search').RecentSearchResults();
// 	$('.circle').Dotify();
// 	$('.login, .save-item').Login();
// 	$('input[data-hint]').Hint();
// 	$('.disclaimer-video input').VideoDisclaimer();
// 	$('#search-catalogue').SearchAccord();
// 	CatalogueHeights();
//
// 	// we need to hide this if we have JS
// 	//$('.catalogue-submit').hide()
//
// });

function CatalogueHeights() {
	//
	// Set the catalogue aside to be the same size as the results
	var $catSide = $('.catalogue-aside');
	var $catList = $('.category-listings');
	var $catResults = $('.catalogue-content');
	var catResHeight = $('.catalogue-content').height() - 1;
	var catListHeight = $('.catalogue-content').height() - 95;

	$catSide.height(catResHeight);
	$catList.height(catListHeight);
}

//
// Main carousel plugin.
$.fn.Carousel = function () {

	var $BODY = $('body');
	this.each(function (i) {

		var $car = $(this);
		var $carwrap = $('.carousel-wrap > ul', $car);
		var $header = $('h2', $car);
		var $controls = $('<div class="buttons"></div>');
		var prev = $('\n\t\t\t<div class="circle left cursor-pointer">\n\t\t\t\t<i class="icon white icon-chevron-left"></i>\n\t\t\t</div>\n\t\t');
		var next = $('\n\t\t\t<div class="circle right cursor-pointer">\n\t\t\t\t<i class="icon white icon-chevron-right"></i>\n\t\t\t</div>\n\t\t');
		var current = 0;
		var autoh = true;

		if ($car.hasClass('works') || $car.hasClass('content')) {
			autoh = false;
		}

		//
		// Get previous image if presant
		var parentImage = $car.prev();
		if (parentImage.hasClass("image") && !$car.hasClass('works')) {
			var li = $('<li></li>');
			li.append(parentImage.html());
			$carwrap.prepend(li);
			parentImage.remove();
		}

		var items = $('li', $carwrap);

		//if(autoh)
		//$carwrap.css({ width: items.length * (items.eq(0).outerWidth()+1) });

		if (items.length > 1) {
			$controls.append(prev, next);
			$carwrap.parent().before($controls);
		} else {
			// no items
			return;
		}

		$header.append('<span> (1/' + items.length + ')</span>');

		function moveToItem(i) {

			var it = items.eq(i),
			    pos = it.position(),
			    $img = it.find('img');

			$('.counter', $car).html(i + 1 + '/' + items.length);

			$carwrap.animate({ left: -pos.left }, 400, "easeOutQuad");

			if (autoh && it.find('img').length > 0) {

				//$img.load(function(){
				$carwrap.parent().animate({ height: $img.outerHeight() + 20 }, 300);
				//}).attr("src",$img.attr("src"));
			}
		}

		//
		// Click handlers
		nextClickHandler = function nextClickHandler(e) {
			e.preventDefault();

			var c = items.length * (items.eq(0).outerWidth() + 1) - Math.abs(parseInt($carwrap.css('left')) - items.eq(0).outerWidth());

			if (current === items.length - 1) {
				current = 0;
				items.animate({ opacity: 1 }, 300);
				moveToItem(current);
				return;
			}

			if (c < $car.width()) {
				//alert('hell no');
				return;
			}

			if (current < items.length - 1) {
				current++;
				items.eq(current - 1).animate({ opacity: 0 }, 300);
				moveToItem(current);
			}
		};

		prevClickHandler = function prevClickHandler(e) {
			e.preventDefault();
			if (current > 0) {
				current--;
				items.eq(current).animate({ opacity: 1 }, 300);
				moveToItem(current);
			}
		};

		$('.left', $car).unbind("click").bind("click", prevClickHandler);
		$('.right', $car).unbind("click").bind("click", nextClickHandler);
		moveToItem(0);
	});
};

//
// Init audio component
$.fn.IAudio = function () {

	this.each(function (i) {
		"use strict";

		var pButton = $(this);
		var audiowrap = pButton.parent();
		var tpl = $('\n\t\t\t<div class="jp-audio">\n\t\t\t\t<div class="jp-type-single">\n\t\t\t\t\t<div class="jp-gui jp-interface">\n\t\t\t\t\t\t<a class="jp-control play" href="#"></a>\n\t\t\t\t\t\t<div class="jp-progress">\n\t\t\t\t\t\t\t<div class="jp-seek-bar">\n\t\t\t\t\t\t\t\t<div class="jp-play-bar"></div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="jp-time">\n\t\t\t\t\t\t\t<span class="jp-current-time"></span>\n\t\t\t\t\t\t\t<span class="jp-duration"></span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="jp-volume">\n\t\t\t\t\t\t\t<div class="jp-volume-bar">\n\t\t\t\t\t\t\t\t<div class="jp-volume-bar-value" style="width: 80%;"></div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class="jp-volume-loud"></div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="cp-jplayer"></div>\n\t\t');

		audiowrap.append(tpl);
		audiowrap.addClass('idle');

		var audioplayer = audiowrap.find('.cp-jplayer'),
		    controls = audiowrap.find('.jp-audio'),
		    altplay = audiowrap.find('.jp-control');

		controls.attr('id', 'jp_container_' + (parseInt(i, 10) + 1));

		var aPath = pButton.attr("href");

		audioplayer.jPlayer({
			ready: function ready() {
				$(this).jPlayer("setMedia", {
					mp3: aPath
				});
			},
			wmode: "window",
			solution: "flash, html",
			supplied: "mp3",
			swfPath: "/layout/js/jQuery.jPlayer.2.1.0"
		});

		altplay.click(function () {
			pButton.trigger("click");
		});

		pButton.click(function (e) {
			e.preventDefault();

			if (pButton.hasClass('jp-play')) {
				audioplayer.jPlayer("play");
				$(this).removeClass('jp-play').addClass('jp-pause');
				altplay.addClass('pause');
			} else {
				audioplayer.jPlayer("pause");
				$(this).removeClass('jp-pause').addClass('jp-play');
				altplay.removeClass('pause');
			}
		});
	});
};

//
// Auto submit on form selects
$.fn.AutoSubmit = function () {
	this.each(function () {

		var $select = $(this);
		var $form = $select.closest('form');
		var $submit = $form.find('input.hideme').hide();

		$select.bind("change", function () {
			$form.submit();
		});
	});
};

//
// Query search results pannel and load dyanmically
$.fn.RecentSearchResults = function () {
	this.each(function () {

		var wrap = $(this);
		var section_heading = $(this).prev();
		var currentPage = 1;
		var listing = wrap.find('.items');
		var buttonwrap = $('<div class="col-right my2 mr4 buttons"></div>');

		var template = function template(props) {
			return '<div class="col col-6 sm-col-4 md-col-3 relative ' + props.hideClass + '">\n\t\t\t\t<div class="item clearfix">\n\t\t\t\t\t<div class="item-text mt4 pb3 mx3 truncate">\n\t\t\t\t\t\t<a class="item-link border-bottom border-blue" href="' + props.link + '">\n\t\t\t\t\t\t\t<span>' + props.title + '</span>\n\t\t\t\t\t\t</a>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="item-image px1 pb1">\n\t\t\t\t\t\t<a class="item-link" href="' + props.link + '">\n\t\t\t\t\t\t\t<img class="col-12 block" src="' + props.thumbnail + '" alt=""/>\n\t\t\t\t\t\t</a>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>';
		};

		function searchNextClick(e) {
			e.preventDefault();
			currentPage++;

			var pointer = $('li.r_' + currentPage);

			if (pointer.length > 0) {
				// simply move to
				//slideTo('r_' + currentPage);
			} else {
				// Get Results then move to
				GetListing(currentPage);
			}
		}

		function searchPrevClick(e) {
			e.preventDefault();

			if (currentPage < 2) return;
			currentPage--;

			var pointer = $('li.r_' + currentPage);

			if (pointer.length > 0) {
				// simply move to
				//slideTo('r_' + currentPage);
			} else {
				// Get Results then move to
				GetListing(currentPage);
			}
		}

		function slideTo(el) {
			var pos = $("li." + el).position();
			listing.animate({ left: -pos.left }, 400, "easeOutQuad");
		}

		function Destroy() {
			wrap.remove();
			section_heading.remove();
		}

		function DisplayResults(data, p) {

			if (null == data[0]) {
				Destroy();
				return;
			}

			//
			// Purge
			$('.buttons', section_heading).remove();

			var count = data[0].count,
			    prev = data[0].prev,
			    next = data[0].next,
			    items = data[1];

			//
			//var w = count*194;
			//listing.css({ width: w + 'px'});


			if (currentPage == 1 && items.length < 2) {
				Destroy();
			}
			listing.html('');

			for (var i = 0; i < items.length; i++) {
				var thumb = item[i].thumb ? '/images/hirstimage/' + item[i].thumb : '/layout/images/placeholders/item_landscape.jpg';

				var hideClass = i % 3 === 0 ? 'sm-show' : '';
				hideClass = i % 4 === 0 ? 'md-show' : hideClass;

				var props = {
					hideClass: hideClass,
					title: item[i].title,
					link: item[i].href,
					thumbnail: thumb
				};

				var el = document.createElement('div');
				el.innerHTML = template(props);
				el.className = i === 0 ? 'r_' + p : '';

				listing.append(el);
			}

			section_heading.find('h1').html('Your search results (' + count + ')');

			var bw = buttonwrap.clone();
			var prevButton = $('<a href="/results?p=' + prev + '" class="circle bg-blue white left">\n\t\t\t\t\t<i class="icon-chevron-left"><i>\n\t\t\t\t</a>');
			var nextButton = $('<a href="/results?p=' + next + '" class="circle bg-blue white right ml2">\n\t\t\t\t\t<i class="icon-chevron-right"><i>\n\t\t\t\t</a>');
			bw.append(prevButton);
			bw.append(nextButton);
			//
			// Build navigation buttons
			if (prev !== "") {
				prevButton.click(searchPrevClick);
			} else {
				prevButton.addClass('opacity-4 events-none');
			}

			if (next !== "") {
				nextButton.click(searchNextClick);
			} else {
				nextButton.addClass('opacity-4 events-none');
			}

			section_heading.append(bw);
			//slideTo(mrk);
			$('#recent-search .circle').Dotify();
		}

		function GetListing(p) {
			//
			// Get results
			$.ajax({
				url: "/artworks/catalogue/results",
				data: "p=" + p,
				success: function success(data) {
					DisplayResults(jQuery.parseJSON(data), p);
					//$("#results").append(html);
				}
			});
		}

		GetListing(1);
	});
};

//
// Randomly assign colour variations to dots
/*
$.fn.Dotify = function () {

	var variation_count = 56,
	    dots = this,
	    dots_count = dots.length,
	    inuse = new Array();

	function randomSort() {
		return Math.round(Math.random()) - 0.5;
	}

	function randomFromInterval(from, to) {
		return Math.floor(Math.random() * (to - from + 1) + from);
	}

	var avail = [],
	    havail = [];
	for (var g = 1; g < variation_count + 1; g++) {
		avail.push('bg-' + g);
		havail.push('bg-hover-' + g);
	}
	avail.sort(randomSort);
	havail.sort(randomSort);

	dots.each(function (n) {
		var $el = $(this),
		    hClass = havail[dots_count + n],
		    bClass = avail[n];

		$el.addClass(avail[n]);

		$el.mouseenter(function () {

			if (bClass) $el.removeClass(bClass);

			if (hClass) $el.removeClass(hClass);

			var r = Math.floor(Math.random() * variation_count) + 1;
			hClass = havail[r];
			bClass = avail[r];
			$el.addClass(hClass).addClass(bClass);
		});

		//$el.addClass(havail[dots_count+n]);
	});
};
*/

//
// Login / register ajax prompt.
// Directs user to dashboard
$.fn.Login = function () {
	this.each(function () {

		var handle = $(this),
		    lnk = handle.attr("href");

		// strip last slash
		var lnk_elements = lnk.split('/'),
		    lnk_end = lnk_elements[lnk_elements.length - 1],
		    type_add = '';

		// check if we have a ?
		if (lnk_end.indexOf('?') > 0) {
			var where = lnk_end.indexOf('?');
			type_add = '&' + lnk_end.substring(where + 1);
			lnk_end = lnk_end.substring(0, where);
		}

		lnk = lnk.substring(0, lnk.lastIndexOf('/'));
		handle.click(function (e) {
			e.preventDefault();
			$.ajax({
				url: lnk + ".ajax?item_id=" + lnk_end + type_add,
				data: "method=ajax",
				success: function success(data) {

					var $body = $('body'),
					    $mask = $('<div id="mask"></div>'),
					    $data = $(data),
					    $closeme = $data.find('a.close');

					$closeme.click(function (e) {
						$mask.fadeOut(500, function () {
							$(this).remove();
						});
						$('.popup').fadeOut(500, function () {
							$(this).remove();
						});
						//handle.parent().remove();
					});

					$body.append($mask);
					$body.append($data);
				}
			});
		});
	});
};

//
// Hint field looks for data-hint attr on input fields
$.fn.Hint = function () {

	this.each(function () {
		var el = $(this),
		    tip = el.attr('data-hint'),
		    form = el.closest('form');

		el.val(tip);

		el.bind("focus", function () {
			if (el.val() == tip) el.val("");
		}).bind("blur", function () {
			if (el.val() == "") el.val(tip);
		});

		form.bind("submit", function () {
			if (el.val() == tip) {
				alert('Please enter a search value');
				return false;
			}
		});
	});
};

//
// Video Disclaimer
$.fn.VideoDisclaimer = function () {

	this.each(function () {
		var $btn = $(this);
		$btn.click(function () {
			var isrc = $btn.attr('data-video'),
			    iheight = $btn.attr('data-height'),
			    $iframe = $('<iframe src="' + isrc + '" width="558" height="' + iheight + '" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>');
			$btn.closest('.disclaimer').html($iframe);
		});
	});
};

//
// Search accordion
$.fn.SearchAccord = function () {
	this.each(function () {

		// vars
		$el = $(this), $SearchPane = $('.catalogue-search'), search_val = $SearchPane.find('#title_description').val();

		if (search_val === "" || search_val === "Enter search text") {
			$SearchPane.hide();
		}

		$el.click(function (e) {
			e.preventDefault();
			$el.toggleClass('active');
			$SearchPane.slideToggle(200, function () {
				CatalogueHeights();
			});
		});
	});
};

//
// Easing
$.extend($.easing, {
	easeOutQuad: function easeOutQuad(x, t, b, c, d) {
		return -c * (t /= d) * (t - 2) + b;
	} });

module.exports.init = function () {

	console.log('hello :)');

	$('.carousel').Carousel();
	// $('.show-hide').Expanda();
	$('.sound .jp-play').IAudio();
	// $('#viewer').ArtworkViewer();
	$('.autosubmit').AutoSubmit();
	$('.remove').hide(); // remove fallback links eg watch this video
	$('#recent-search').RecentSearchResults();
	//$('.circle').Dotify();
	$('.login, .save-item').Login();
	$('input[data-hint]').Hint();
	$('.disclaimer-video input').VideoDisclaimer();
	$('#search-catalogue').SearchAccord();
	CatalogueHeights();

	// we need to hide this if we have JS
	// $('.catalogue-submit').hide()
};

},{}],6:[function(require,module,exports){
'use strict';

var template = require('./template.js');
var Carousel = require('../carousel.js').new;
var isMobile = require('ismobilejs').any;

var Map = function Map(container, markers) {
    this.container = container;
    this.el = this.container.querySelector('#map-canvas');
    this.points = markers;
    this.activeMarker = {};
    this.locale = 'global'; // default json marker object
    this.zoom = this.points[this.locale].zoom || 5;
    this.center = new google.maps.LatLng(51.516939, -0.128410); // London
    this.setup();
};

Map.prototype = {
    // initialise map
    setup: function setup() {
        this.createMap();
        this.createMarkers(this.points[this.locale].markers);
        this.bindControls();
    },
    // bind the controls
    bindControls: function bindControls() {
        var _this = this;

        var zoomIn = this.container.querySelector('.js-zoom-in');
        var zoomOut = this.container.querySelector('.js-zoom-out');
        var dropDown = this.container.querySelector('.js-dropdown');

        // bind zoom buttons
        zoomIn.onclick = function (e) {
            e.preventDefault();
            _this.zoom += 1;
            _this.map.setZoom(_this.zoom);
        };

        zoomOut.onclick = function (e) {
            e.preventDefault();
            _this.zoom -= 1;
            _this.map.setZoom(_this.zoom);
        };

        // handle dropdown for selecting local
        dropDown.onclick = function (e) {
            return _this.handleDropdown(e);
        };

        // listen for resize
        window.onresize = function () {
            if (_this.activeMarker.infobox) {
                var center = _this.activeMarker.marker.getPosition();
                google.maps.event.trigger(_this.map, 'resize');
                _this.map.setCenter(center);
            }
        };
    },
    // create a map
    createMap: function createMap() {
        var options = {
            zoom: this.zoom,
            scrollwheel: false,
            center: this.center, //London
            clickableIcons: false,
            backgroundColor: 'none',
            streetViewControl: false,
            disableDefaultUI: true,
            mapTypeControl: true,
            mapTypeControlOptions: {
                mapTypeIds: [],
                style: 'HORIZONTAL_BAR'
            },
            gestureHandling: 'greedy',
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        this.map = new google.maps.Map(this.el, options);
        return this.map;
    },
    // create the markers
    createMarkers: function createMarkers(markers) {
        var _this2 = this;

        var InfoBox = require('../vendor/infobox.js');
        this.markers = [];

        markers.forEach(function (point, i) {
            if (point !== null) {

                // create an infobox object with custom markup from ./template.js
                var html = template(point, i);
                var width = (_this2.el.clientHeight - 6 / 12 * 100) / 2;

                // format coordinates
                var coordinates = new google.maps.LatLng(Number(point.geo.lat), Number(point.geo.lng));

                // initialise the infobox
                var infobox = new InfoBox({
                    content: html,
                    boxStyle: {
                        width: 'auto'
                    },
                    disableAutoPan: false,
                    pixelOffset: new google.maps.Size(10, 10),
                    enableEventPropagation: false
                });

                // create a google maps marker object
                var marker = new google.maps.Marker({
                    position: coordinates,
                    map: _this2.map,
                    title: i.toString(),
                    icon: {
                        url: '/assets/img/marker.png',
                        scaledSize: new google.maps.Size(25, 25)
                    }
                });

                // initialise individual carousels on infobox load
                google.maps.event.addListener(infobox, 'domready', function () {
                    // shorthand node selector function
                    var select = function select(s) {
                        return infobox.getContent().querySelector(s);
                    };
                    // create a carousel if a container is present
                    _this2.carousel = select('.carousel-container') ? new Carousel(_this2.el) : null;
                    // add click event to close button
                    select('.icon-cross').onclick = function () {
                        return infobox.close();
                    };
                    // set active marker
                    _this2.activeMarker = { marker: marker, infobox: infobox };
                });

                // add custom event to trigger the closing of all other boxes on marker click
                google.maps.event.addListener(_this2.map, 'closeAllInfoboxes', function () {
                    _this2.activeMarker = null;
                    infobox.close();
                });

                // trigger closeAllInfoboxes, then open targeted infobox
                marker.addListener('click', function () {
                    google.maps.event.trigger(this.map, 'closeAllInfoboxes');
                    infobox.open(this.map, marker);
                    this.map.setCenter(marker.getPosition());
                });

                // keep track of all markers
                _this2.markers.push(marker);
            }
        });
    },
    // switch between global and london markers
    updateMarkers: function updateMarkers(newLocale) {
        this.el.classList.add('opacity-0'); // fade out
        this.markers.forEach(function (m) {
            return m.setMap(null);
        }); // remove markers from map
        this.createMarkers(newLocale.markers); // create new markers
        if (this.activeMarker.infobox) {
            this.activeMarker.infobox.close();
        } // close open infobox
        this.map.setCenter(this.center); // recenter map
        this.zoom = newLocale.zoom; //adjust zoom
        this.map.setZoom(this.zoom);
        this.el.classList.remove('opacity-0'); // fade out
    },
    // handle dropdown
    handleDropdown: function handleDropdown(e) {
        var select = e.target.dataset.select || false;
        var dropdown = this.container.querySelector('.js-dropdown-active');
        if (select && select !== this.locale) {
            this.locale = select;
            dropdown.innerHTML = this.locale;
            this.updateMarkers(this.points[this.locale]);
        }
    }
};

module.exports.init = function () {
    var mapEl = document.getElementById('map-container');
    if (mapEl) {
        // parse the structurally unsound json returned by php on the map page
        var get = function get(l) {
            return JSON.parse(document.getElementById(l).innerHTML);
        };
        var markers = {
            'global': { zoom: 5, markers: get('global') },
            'london': { zoom: 12, markers: get('london') }
        };

        return new Map(mapEl, markers);
    }
};

},{"../carousel.js":2,"../vendor/infobox.js":11,"./template.js":7,"ismobilejs":12}],7:[function(require,module,exports){
'use strict';

module.exports = function (marker, index) {

    var template = document.createElement('div');
    var listItems = [];

    // a simple image component
    var image = function image(imageURL) {
        return '<img\n            class="block object-fit absolute"\n            src="/images/hirstimage/' + imageURL + '">';
    };

    // looping over the content of works array
    if (marker.works && marker.works.length > 1) {
        marker.works.forEach(function (work, i) {
            listItems.push('<li class="clearfix inline-block align-top col-12">\n                    <div class="col-12">\n                        <div class="px3">\n                            <a class="white-space-reset" target="_blank" href="/' + marker.url + '">\n                                <span class="border-bottom border-blue">' + work.title + '</span>\n                            </a>\n                        </div>\n                        <div class="p3">\n                            <div class="aspect-1-1">\n                                <a target="_blank" href="/' + marker.url + '">\n                                ' + image(work.image) + '\n                                </a>\n                            </div>\n                        </div>\n                    </div>\n                </li>');
        });
    }

    // output a carousel, single image,
    // or nothing depending on ouput of works array
    var content;
    if (marker.image) {
        content = '<div class="px3 pb3">\n                <a class="white-space-reset" target="_blank" href="/' + marker.url + '">\n                    <div class="aspect-1-1">\n                        <a target="_blank" href="/' + marker.url + '">\n                            <img\n                                class="block object-fit absolute"\n                                src="' + marker.image + '">\n                        </a>\n                    </div>\n                </a>\n            </div>';
    } else if (marker.works && marker.works.length === 1) {
        content = '<div class="px3 pb3">\n                <div class="pb3">\n                    <a class="white-space-reset" target="_blank" href="/' + marker.url + '">\n                        <span class="border-bottom border-blue">\n                            ' + marker.works[0].title + '\n                        </span>\n                    </a>\n                </div>\n                <div class="aspect-1-1">\n                    <a target="_blank" href="/' + marker.url + '">\n                        ' + image(marker.works[0].image) + '\n                    </a>\n                </div>\n            </div>';
    } else if (marker.works && marker.works.length > 1) {
        content = '<div class="carousel-container relative clearfix">\n                <div class="overflow-hidden">\n                    <ul class="list-reset m0 nowrap">\n                        ' + listItems.join('') + '\n                    </ul>\n                </div>\n                <div class="col col-12 border-top border-grey">\n                    <div class="carousel-pager inline-block left p3"></div>\n                    <div class="right relative">\n                        <div class="absolute left-0 top-0 bottom-0 col-6 border-left border-right border-grey"></div>\n                        <div class="my2 line-height-3">\n                            <i class="relative z1 carousel-button-prev icon-chevron-left blue px3 cursor-pointer"></i>\n                            <i class="relative z1 carousel-button-next icon-chevron-right blue px3 cursor-pointer"></i>\n                        </div>\n                    </div>\n                </div>\n            </div>';
    } else {
        content = '';
    }

    var location = marker.country ? marker.city + ', ' + marker.country : marker.city;

    template.className = 'marker-' + index;
    template.innerHTML = '<div class="item bg-white relative col-9-vw sm-col-6-vw md-col-3-vw">\n            <div class="p3">\n                <div>\n                    ' + marker.institution + '\n                </div>\n                <div>\n                    ' + location + '\n                </div>\n            </div>\n            <i class="absolute top-0 right-0 icon-cross cursor-pointer right blue pt2 pr2"></i>\n            ' + content + '\n        </div>';

    return template;
};

},{}],8:[function(require,module,exports){
'use strict';

var createNewsletter = function createNewsletter(el) {
    var message = el.querySelector('#newsletter-message');
    var form = el.querySelector('#newsletter-form');

    var displayMessage = function displayMessage(string) {
        if (!message.innerHTML) {
            message.className = 'pl4 pt3 h5';
            message.innerHTML = string;
        }
    };

    el.onsubmit = function (e) {
        e.preventDefault();
        var emailIsValid = form.querySelector('input[name="email"]').checkValidity();

        if (emailIsValid) {
            fetch('/saved-items', {
                method: 'POST',
                body: new FormData(form)
            }).then(function (response) {
                if (response.status >= 200 && response.status < 300) {
                    response.json().then(function (data) {
                        displayMessage(data);
                    }).catch(function (err) {
                        displayMessage('An error occured!');
                    });
                }
            }).catch(function (err) {
                throw err;
            });
        }
    };
};

module.exports.init = function () {
    var el = document.getElementById('newsletter-container');
    if (el) {
        createNewsletter(el);
    }
};

},{}],9:[function(require,module,exports){
'use strict';

/**
 * Polyfills for internet explorerqqq
 */

module.exports.init = function () {

    /**
     * Array.forEach polyfill
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
     */
    if (!Array.prototype.forEach) {

        Array.prototype.forEach = function (callback /*, thisArg*/) {

            var T, k;

            if (this == null) {
                throw new TypeError('this is null or not defined');
            }

            // 1. Let O be the result of calling toObject() passing the
            // |this| value as the argument.
            var O = Object(this);

            // 2. Let lenValue be the result of calling the Get() internal
            // method of O with the argument "length".
            // 3. Let len be toUint32(lenValue).
            var len = O.length >>> 0;

            // 4. If isCallable(callback) is false, throw a TypeError exception.
            // See: http://es5.github.com/#x9.11
            if (typeof callback !== 'function') {
                throw new TypeError(callback + ' is not a function');
            }

            // 5. If thisArg was supplied, let T be thisArg; else let
            // T be undefined.
            if (arguments.length > 1) {
                T = arguments[1];
            }

            // 6. Let k be 0
            k = 0;

            // 7. Repeat, while k < len
            while (k < len) {

                var kValue;

                // a. Let Pk be ToString(k).
                //    This is implicit for LHS operands of the in operator
                // b. Let kPresent be the result of calling the HasProperty
                //    internal method of O with argument Pk.
                //    This step can be combined with c
                // c. If kPresent is true, then
                if (k in O) {

                    // i. Let kValue be the result of calling the Get internal
                    // method of O with argument Pk.
                    kValue = O[k];

                    // ii. Call the Call internal method of callback with T as
                    // the this value and argument list containing kValue, k, and O.
                    callback.call(T, kValue, k, O);
                }
                // d. Increase k by 1.
                k++;
            }
            // 8. return undefined
        };
    }

    /**
     * Array.from polyfill
     * https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/from
     */
    if (!Array.from) {
        Array.from = function () {
            var toStr = Object.prototype.toString;
            var isCallable = function isCallable(fn) {
                return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
            };
            var toInteger = function toInteger(value) {
                var number = Number(value);
                if (isNaN(number)) {
                    return 0;
                }
                if (number === 0 || !isFinite(number)) {
                    return number;
                }
                return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
            };
            var maxSafeInteger = Math.pow(2, 53) - 1;
            var toLength = function toLength(value) {
                var len = toInteger(value);
                return Math.min(Math.max(len, 0), maxSafeInteger);
            };

            // The length property of the from method is 1.
            return function from(arrayLike /*, mapFn, thisArg */) {
                // 1. Let C be the this value.
                var C = this;

                // 2. Let items be ToObject(arrayLike).
                var items = Object(arrayLike);

                // 3. ReturnIfAbrupt(items).
                if (arrayLike == null) {
                    throw new TypeError('Array.from requires an array-like object - not null or undefined');
                }

                // 4. If mapfn is undefined, then let mapping be false.
                var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
                var T;
                if (typeof mapFn !== 'undefined') {
                    // 5. else
                    // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
                    if (!isCallable(mapFn)) {
                        throw new TypeError('Array.from: when provided, the second argument must be a function');
                    }

                    // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
                    if (arguments.length > 2) {
                        T = arguments[2];
                    }
                }

                // 10. Let lenValue be Get(items, "length").
                // 11. Let len be ToLength(lenValue).
                var len = toLength(items.length);

                // 13. If IsConstructor(C) is true, then
                // 13. a. Let A be the result of calling the [[Construct]] internal method
                // of C with an argument list containing the single item len.
                // 14. a. Else, Let A be ArrayCreate(len).
                var A = isCallable(C) ? Object(new C(len)) : new Array(len);

                // 16. Let k be 0.
                var k = 0;
                // 17. Repeat, while k < lenâ€¦ (also steps a - h)
                var kValue;
                while (k < len) {
                    kValue = items[k];
                    if (mapFn) {
                        A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
                    } else {
                        A[k] = kValue;
                    }
                    k += 1;
                }
                // 18. Let putStatus be Put(A, "length", len, true).
                A.length = len;
                // 20. Return A.
                return A;
            };
        }();
    }
};

},{}],10:[function(require,module,exports){
'use strict';

module.exports = {
    getVendorPrefix: function getVendorPrefix() {
        var styles = window.getComputedStyle(document.documentElement, '');
        var pre = (Array.prototype.slice.call(styles).join('').match(/-(moz|webkit|ms)-/) || styles.OLink === '' && ['', 'o'])[1];
        var dom = 'WebKit|Moz|MS|O'.match(new RegExp('(' + pre + ')', 'i'))[1];

        return {
            dom: dom,
            lowercase: pre,
            css: '-' + pre + '-',
            js: pre[0].toUpperCase() + pre.substr(1)
        };
    }
};

},{}],11:[function(require,module,exports){
"use strict";

/**
 * @name InfoBox
 * @version 1.1.13 [March 19, 2014]
 * @author Gary Little (inspired by proof-of-concept code from Pamela Fox of Google)
 * @copyright Copyright 2010 Gary Little [gary at luxcentral.com]
 * @fileoverview InfoBox extends the Google Maps JavaScript API V3 <tt>OverlayView</tt> class.
 *  <p>
 *  An InfoBox behaves like a <tt>google.maps.InfoWindow</tt>, but it supports several
 *  additional properties for advanced styling. An InfoBox can also be used as a map label.
 *  <p>
 *  An InfoBox also fires the same events as a <tt>google.maps.InfoWindow</tt>.
 */

/*!
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*jslint browser:true */
/*global google */

/**
 * @name InfoBoxOptions
 * @class This class represents the optional parameter passed to the {@link InfoBox} constructor.
 * @property {string|Node} content The content of the InfoBox (plain text or an HTML DOM node).
 * @property {boolean} [disableAutoPan=false] Disable auto-pan on <tt>open</tt>.
 * @property {number} maxWidth The maximum width (in pixels) of the InfoBox. Set to 0 if no maximum.
 * @property {Size} pixelOffset The offset (in pixels) from the top left corner of the InfoBox
 *  (or the bottom left corner if the <code>alignBottom</code> property is <code>true</code>)
 *  to the map pixel corresponding to <tt>position</tt>.
 * @property {LatLng} position The geographic location at which to display the InfoBox.
 * @property {number} zIndex The CSS z-index style value for the InfoBox.
 *  Note: This value overrides a zIndex setting specified in the <tt>boxStyle</tt> property.
 * @property {string} [boxClass="infoBox"] The name of the CSS class defining the styles for the InfoBox container.
 * @property {Object} [boxStyle] An object literal whose properties define specific CSS
 *  style values to be applied to the InfoBox. Style values defined here override those that may
 *  be defined in the <code>boxClass</code> style sheet. If this property is changed after the
 *  InfoBox has been created, all previously set styles (except those defined in the style sheet)
 *  are removed from the InfoBox before the new style values are applied.
 * @property {string} closeBoxMargin The CSS margin style value for the close box.
 *  The default is "2px" (a 2-pixel margin on all sides).
 * @property {string} closeBoxURL The URL of the image representing the close box.
 *  Note: The default is the URL for Google's standard close box.
 *  Set this property to "" if no close box is required.
 * @property {Size} infoBoxClearance Minimum offset (in pixels) from the InfoBox to the
 *  map edge after an auto-pan.
 * @property {boolean} [isHidden=false] Hide the InfoBox on <tt>open</tt>.
 *  [Deprecated in favor of the <tt>visible</tt> property.]
 * @property {boolean} [visible=true] Show the InfoBox on <tt>open</tt>.
 * @property {boolean} alignBottom Align the bottom left corner of the InfoBox to the <code>position</code>
 *  location (default is <tt>false</tt> which means that the top left corner of the InfoBox is aligned).
 * @property {string} pane The pane where the InfoBox is to appear (default is "floatPane").
 *  Set the pane to "mapPane" if the InfoBox is being used as a map label.
 *  Valid pane names are the property names for the <tt>google.maps.MapPanes</tt> object.
 * @property {boolean} enableEventPropagation Propagate mousedown, mousemove, mouseover, mouseout,
 *  mouseup, click, dblclick, touchstart, touchend, touchmove, and contextmenu events in the InfoBox
 *  (default is <tt>false</tt> to mimic the behavior of a <tt>google.maps.InfoWindow</tt>). Set
 *  this property to <tt>true</tt> if the InfoBox is being used as a map label.
 */

/**
 * Creates an InfoBox with the options specified in {@link InfoBoxOptions}.
 *  Call <tt>InfoBox.open</tt> to add the box to the map.
 * @constructor
 * @param {InfoBoxOptions} [opt_opts]
 */

function InfoBox(opt_opts) {

  opt_opts = opt_opts || {};

  google.maps.OverlayView.apply(this, arguments);

  // Standard options (in common with google.maps.InfoWindow):
  //
  this.content_ = opt_opts.content || "";
  this.disableAutoPan_ = opt_opts.disableAutoPan || false;
  this.maxWidth_ = opt_opts.maxWidth || 0;
  this.pixelOffset_ = opt_opts.pixelOffset || new google.maps.Size(0, 0);
  this.position_ = opt_opts.position || new google.maps.LatLng(0, 0);
  this.zIndex_ = opt_opts.zIndex || null;

  // Additional options (unique to InfoBox):
  //
  this.boxClass_ = opt_opts.boxClass || "infoBox";
  this.boxStyle_ = opt_opts.boxStyle || {};
  this.closeBoxMargin_ = opt_opts.closeBoxMargin || "2px";
  this.closeBoxURL_ = opt_opts.closeBoxURL || "http://www.google.com/intl/en_us/mapfiles/close.gif";
  if (opt_opts.closeBoxURL === "") {
    this.closeBoxURL_ = "";
  }
  this.infoBoxClearance_ = opt_opts.infoBoxClearance || new google.maps.Size(1, 1);

  if (typeof opt_opts.visible === "undefined") {
    if (typeof opt_opts.isHidden === "undefined") {
      opt_opts.visible = true;
    } else {
      opt_opts.visible = !opt_opts.isHidden;
    }
  }
  this.isHidden_ = !opt_opts.visible;

  this.alignBottom_ = opt_opts.alignBottom || false;
  this.pane_ = opt_opts.pane || "floatPane";
  this.enableEventPropagation_ = opt_opts.enableEventPropagation || false;

  this.div_ = null;
  this.closeListener_ = null;
  this.moveListener_ = null;
  this.contextListener_ = null;
  this.eventListeners_ = null;
  this.fixedWidthSet_ = null;
}

/* InfoBox extends OverlayView in the Google Maps API v3.
 */
InfoBox.prototype = new google.maps.OverlayView();

/**
 * Creates the DIV representing the InfoBox.
 * @private
 */
InfoBox.prototype.createInfoBoxDiv_ = function () {

  var i;
  var events;
  var bw;
  var me = this;

  // This handler prevents an event in the InfoBox from being passed on to the map.
  //
  var cancelHandler = function cancelHandler(e) {
    e.cancelBubble = true;
    if (e.stopPropagation) {
      e.stopPropagation();
    }
  };

  // This handler ignores the current event in the InfoBox and conditionally prevents
  // the event from being passed on to the map. It is used for the contextmenu event.
  //
  var ignoreHandler = function ignoreHandler(e) {

    e.returnValue = false;

    if (e.preventDefault) {

      e.preventDefault();
    }

    if (!me.enableEventPropagation_) {

      cancelHandler(e);
    }
  };

  if (!this.div_) {

    this.div_ = document.createElement("div");

    this.setBoxStyle_();

    if (typeof this.content_.nodeType === "undefined") {
      this.div_.innerHTML = this.getCloseBoxImg_() + this.content_;
    } else {
      this.div_.innerHTML = this.getCloseBoxImg_();
      this.div_.appendChild(this.content_);
    }

    // Add the InfoBox DIV to the DOM
    this.getPanes()[this.pane_].appendChild(this.div_);

    this.addClickHandler_();

    if (this.div_.style.width) {

      this.fixedWidthSet_ = true;
    } else {

      if (this.maxWidth_ !== 0 && this.div_.offsetWidth > this.maxWidth_) {

        this.div_.style.width = this.maxWidth_;
        this.div_.style.overflow = "auto";
        this.fixedWidthSet_ = true;
      } else {
        // The following code is needed to overcome problems with MSIE

        bw = this.getBoxWidths_();

        this.div_.style.width = this.div_.offsetWidth - bw.left - bw.right + "px";
        this.fixedWidthSet_ = false;
      }
    }

    this.panBox_(this.disableAutoPan_);

    if (!this.enableEventPropagation_) {

      this.eventListeners_ = [];

      // Cancel event propagation.
      //
      // Note: mousemove not included (to resolve Issue 152)
      events = ["mousedown", "mouseover", "mouseout", "mouseup", "click", "dblclick", "touchstart", "touchend", "touchmove"];

      for (i = 0; i < events.length; i++) {

        this.eventListeners_.push(google.maps.event.addDomListener(this.div_, events[i], cancelHandler));
      }

      // Workaround for Google bug that causes the cursor to change to a pointer
      // when the mouse moves over a marker underneath InfoBox.
      this.eventListeners_.push(google.maps.event.addDomListener(this.div_, "mouseover", function (e) {
        this.style.cursor = "default";
      }));
    }

    this.contextListener_ = google.maps.event.addDomListener(this.div_, "contextmenu", ignoreHandler);

    /**
     * This event is fired when the DIV containing the InfoBox's content is attached to the DOM.
     * @name InfoBox#domready
     * @event
     */
    google.maps.event.trigger(this, "domready");
  }
};

/**
 * Returns the HTML <IMG> tag for the close box.
 * @private
 */
InfoBox.prototype.getCloseBoxImg_ = function () {

  var img = "";

  if (this.closeBoxURL_ !== "") {

    img = "<img";
    img += " src='" + this.closeBoxURL_ + "'";
    img += " align=right"; // Do this because Opera chokes on style='float: right;'
    img += " style='";
    img += " position: relative;"; // Required by MSIE
    img += " cursor: pointer;";
    img += " margin: " + this.closeBoxMargin_ + ";";
    img += "'>";
  }

  return img;
};

/**
 * Adds the click handler to the InfoBox close box.
 * @private
 */
InfoBox.prototype.addClickHandler_ = function () {

  var closeBox;

  if (this.closeBoxURL_ !== "") {

    closeBox = this.div_.firstChild;
    this.closeListener_ = google.maps.event.addDomListener(closeBox, "click", this.getCloseClickHandler_());
  } else {

    this.closeListener_ = null;
  }
};

/**
 * Returns the function to call when the user clicks the close box of an InfoBox.
 * @private
 */
InfoBox.prototype.getCloseClickHandler_ = function () {

  var me = this;

  return function (e) {

    // 1.0.3 fix: Always prevent propagation of a close box click to the map:
    e.cancelBubble = true;

    if (e.stopPropagation) {

      e.stopPropagation();
    }

    /**
     * This event is fired when the InfoBox's close box is clicked.
     * @name InfoBox#closeclick
     * @event
     */
    google.maps.event.trigger(me, "closeclick");

    me.close();
  };
};

/**
 * Pans the map so that the InfoBox appears entirely within the map's visible area.
 * @private
 */
InfoBox.prototype.panBox_ = function (disablePan) {

  var map;
  var bounds;
  var xOffset = 0,
      yOffset = 0;

  if (!disablePan) {

    map = this.getMap();

    if (map instanceof google.maps.Map) {
      // Only pan if attached to map, not panorama

      if (!map.getBounds().contains(this.position_)) {
        // Marker not in visible area of map, so set center
        // of map to the marker position first.
        map.setCenter(this.position_);
      }

      bounds = map.getBounds();

      var mapDiv = map.getDiv();
      var mapWidth = mapDiv.offsetWidth;
      var mapHeight = mapDiv.offsetHeight;
      var iwOffsetX = this.pixelOffset_.width;
      var iwOffsetY = this.pixelOffset_.height;
      var iwWidth = this.div_.offsetWidth;
      var iwHeight = this.div_.offsetHeight;
      var padX = this.infoBoxClearance_.width;
      var padY = this.infoBoxClearance_.height;
      var pixPosition = this.getProjection().fromLatLngToContainerPixel(this.position_);

      if (pixPosition.x < -iwOffsetX + padX) {
        xOffset = pixPosition.x + iwOffsetX - padX;
      } else if (pixPosition.x + iwWidth + iwOffsetX + padX > mapWidth) {
        xOffset = pixPosition.x + iwWidth + iwOffsetX + padX - mapWidth;
      }
      if (this.alignBottom_) {
        if (pixPosition.y < -iwOffsetY + padY + iwHeight) {
          yOffset = pixPosition.y + iwOffsetY - padY - iwHeight;
        } else if (pixPosition.y + iwOffsetY + padY > mapHeight) {
          yOffset = pixPosition.y + iwOffsetY + padY - mapHeight;
        }
      } else {
        if (pixPosition.y < -iwOffsetY + padY) {
          yOffset = pixPosition.y + iwOffsetY - padY;
        } else if (pixPosition.y + iwHeight + iwOffsetY + padY > mapHeight) {
          yOffset = pixPosition.y + iwHeight + iwOffsetY + padY - mapHeight;
        }
      }

      if (!(xOffset === 0 && yOffset === 0)) {

        // Move the map to the shifted center.
        //
        var c = map.getCenter();
        map.panBy(xOffset, yOffset);
      }
    }
  }
};

/**
 * Sets the style of the InfoBox by setting the style sheet and applying
 * other specific styles requested.
 * @private
 */
InfoBox.prototype.setBoxStyle_ = function () {

  var i, boxStyle;

  if (this.div_) {

    // Apply style values from the style sheet defined in the boxClass parameter:
    this.div_.className = this.boxClass_;

    // Clear existing inline style values:
    this.div_.style.cssText = "";

    // Apply style values defined in the boxStyle parameter:
    boxStyle = this.boxStyle_;
    for (i in boxStyle) {

      if (boxStyle.hasOwnProperty(i)) {

        this.div_.style[i] = boxStyle[i];
      }
    }

    // Fix for iOS disappearing InfoBox problem.
    // See http://stackoverflow.com/questions/9229535/google-maps-markers-disappear-at-certain-zoom-level-only-on-iphone-ipad
    this.div_.style.WebkitTransform = "translateZ(0)";

    // Fix up opacity style for benefit of MSIE:
    //
    if (typeof this.div_.style.opacity !== "undefined" && this.div_.style.opacity !== "") {
      // See http://www.quirksmode.org/css/opacity.html
      this.div_.style.MsFilter = "\"progid:DXImageTransform.Microsoft.Alpha(Opacity=" + this.div_.style.opacity * 100 + ")\"";
      this.div_.style.filter = "alpha(opacity=" + this.div_.style.opacity * 100 + ")";
    }

    // Apply required styles:
    //
    this.div_.style.position = "absolute";
    this.div_.style.visibility = 'hidden';
    if (this.zIndex_ !== null) {

      this.div_.style.zIndex = this.zIndex_;
    }
  }
};

/**
 * Get the widths of the borders of the InfoBox.
 * @private
 * @return {Object} widths object (top, bottom left, right)
 */
InfoBox.prototype.getBoxWidths_ = function () {

  var computedStyle;
  var bw = { top: 0, bottom: 0, left: 0, right: 0 };
  var box = this.div_;

  if (document.defaultView && document.defaultView.getComputedStyle) {

    computedStyle = box.ownerDocument.defaultView.getComputedStyle(box, "");

    if (computedStyle) {

      // The computed styles are always in pixel units (good!)
      bw.top = parseInt(computedStyle.borderTopWidth, 10) || 0;
      bw.bottom = parseInt(computedStyle.borderBottomWidth, 10) || 0;
      bw.left = parseInt(computedStyle.borderLeftWidth, 10) || 0;
      bw.right = parseInt(computedStyle.borderRightWidth, 10) || 0;
    }
  } else if (document.documentElement.currentStyle) {
    // MSIE

    if (box.currentStyle) {

      // The current styles may not be in pixel units, but assume they are (bad!)
      bw.top = parseInt(box.currentStyle.borderTopWidth, 10) || 0;
      bw.bottom = parseInt(box.currentStyle.borderBottomWidth, 10) || 0;
      bw.left = parseInt(box.currentStyle.borderLeftWidth, 10) || 0;
      bw.right = parseInt(box.currentStyle.borderRightWidth, 10) || 0;
    }
  }

  return bw;
};

/**
 * Invoked when <tt>close</tt> is called. Do not call it directly.
 */
InfoBox.prototype.onRemove = function () {

  if (this.div_) {

    this.div_.parentNode.removeChild(this.div_);
    this.div_ = null;
  }
};

/**
 * Draws the InfoBox based on the current map projection and zoom level.
 */
InfoBox.prototype.draw = function () {

  this.createInfoBoxDiv_();

  var pixPosition = this.getProjection().fromLatLngToDivPixel(this.position_);

  this.div_.style.left = pixPosition.x + this.pixelOffset_.width + "px";

  if (this.alignBottom_) {
    this.div_.style.bottom = -(pixPosition.y + this.pixelOffset_.height) + "px";
  } else {
    this.div_.style.top = pixPosition.y + this.pixelOffset_.height + "px";
  }

  if (this.isHidden_) {

    this.div_.style.visibility = "hidden";
  } else {

    this.div_.style.visibility = "visible";
  }
};

/**
 * Sets the options for the InfoBox. Note that changes to the <tt>maxWidth</tt>,
 *  <tt>closeBoxMargin</tt>, <tt>closeBoxURL</tt>, and <tt>enableEventPropagation</tt>
 *  properties have no affect until the current InfoBox is <tt>close</tt>d and a new one
 *  is <tt>open</tt>ed.
 * @param {InfoBoxOptions} opt_opts
 */
InfoBox.prototype.setOptions = function (opt_opts) {
  if (typeof opt_opts.boxClass !== "undefined") {
    // Must be first

    this.boxClass_ = opt_opts.boxClass;
    this.setBoxStyle_();
  }
  if (typeof opt_opts.boxStyle !== "undefined") {
    // Must be second

    this.boxStyle_ = opt_opts.boxStyle;
    this.setBoxStyle_();
  }
  if (typeof opt_opts.content !== "undefined") {

    this.setContent(opt_opts.content);
  }
  if (typeof opt_opts.disableAutoPan !== "undefined") {

    this.disableAutoPan_ = opt_opts.disableAutoPan;
  }
  if (typeof opt_opts.maxWidth !== "undefined") {

    this.maxWidth_ = opt_opts.maxWidth;
  }
  if (typeof opt_opts.pixelOffset !== "undefined") {

    this.pixelOffset_ = opt_opts.pixelOffset;
  }
  if (typeof opt_opts.alignBottom !== "undefined") {

    this.alignBottom_ = opt_opts.alignBottom;
  }
  if (typeof opt_opts.position !== "undefined") {

    this.setPosition(opt_opts.position);
  }
  if (typeof opt_opts.zIndex !== "undefined") {

    this.setZIndex(opt_opts.zIndex);
  }
  if (typeof opt_opts.closeBoxMargin !== "undefined") {

    this.closeBoxMargin_ = opt_opts.closeBoxMargin;
  }
  if (typeof opt_opts.closeBoxURL !== "undefined") {

    this.closeBoxURL_ = opt_opts.closeBoxURL;
  }
  if (typeof opt_opts.infoBoxClearance !== "undefined") {

    this.infoBoxClearance_ = opt_opts.infoBoxClearance;
  }
  if (typeof opt_opts.isHidden !== "undefined") {

    this.isHidden_ = opt_opts.isHidden;
  }
  if (typeof opt_opts.visible !== "undefined") {

    this.isHidden_ = !opt_opts.visible;
  }
  if (typeof opt_opts.enableEventPropagation !== "undefined") {

    this.enableEventPropagation_ = opt_opts.enableEventPropagation;
  }

  if (this.div_) {

    this.draw();
  }
};

/**
 * Sets the content of the InfoBox.
 *  The content can be plain text or an HTML DOM node.
 * @param {string|Node} content
 */
InfoBox.prototype.setContent = function (content) {
  this.content_ = content;

  if (this.div_) {

    if (this.closeListener_) {

      google.maps.event.removeListener(this.closeListener_);
      this.closeListener_ = null;
    }

    // Odd code required to make things work with MSIE.
    //
    if (!this.fixedWidthSet_) {

      this.div_.style.width = "";
    }

    if (typeof content.nodeType === "undefined") {
      this.div_.innerHTML = this.getCloseBoxImg_() + content;
    } else {
      this.div_.innerHTML = this.getCloseBoxImg_();
      this.div_.appendChild(content);
    }

    // Perverse code required to make things work with MSIE.
    // (Ensures the close box does, in fact, float to the right.)
    //
    if (!this.fixedWidthSet_) {
      this.div_.style.width = this.div_.offsetWidth + "px";
      if (typeof content.nodeType === "undefined") {
        this.div_.innerHTML = this.getCloseBoxImg_() + content;
      } else {
        this.div_.innerHTML = this.getCloseBoxImg_();
        this.div_.appendChild(content);
      }
    }

    this.addClickHandler_();
  }

  /**
   * This event is fired when the content of the InfoBox changes.
   * @name InfoBox#content_changed
   * @event
   */
  google.maps.event.trigger(this, "content_changed");
};

/**
 * Sets the geographic location of the InfoBox.
 * @param {LatLng} latlng
 */
InfoBox.prototype.setPosition = function (latlng) {

  this.position_ = latlng;

  if (this.div_) {

    this.draw();
  }

  /**
   * This event is fired when the position of the InfoBox changes.
   * @name InfoBox#position_changed
   * @event
   */
  google.maps.event.trigger(this, "position_changed");
};

/**
 * Sets the zIndex style for the InfoBox.
 * @param {number} index
 */
InfoBox.prototype.setZIndex = function (index) {

  this.zIndex_ = index;

  if (this.div_) {

    this.div_.style.zIndex = index;
  }

  /**
   * This event is fired when the zIndex of the InfoBox changes.
   * @name InfoBox#zindex_changed
   * @event
   */
  google.maps.event.trigger(this, "zindex_changed");
};

/**
 * Sets the visibility of the InfoBox.
 * @param {boolean} isVisible
 */
InfoBox.prototype.setVisible = function (isVisible) {

  this.isHidden_ = !isVisible;
  if (this.div_) {
    this.div_.style.visibility = this.isHidden_ ? "hidden" : "visible";
  }
};

/**
 * Returns the content of the InfoBox.
 * @returns {string}
 */
InfoBox.prototype.getContent = function () {

  return this.content_;
};

/**
 * Returns the geographic location of the InfoBox.
 * @returns {LatLng}
 */
InfoBox.prototype.getPosition = function () {

  return this.position_;
};

/**
 * Returns the zIndex for the InfoBox.
 * @returns {number}
 */
InfoBox.prototype.getZIndex = function () {

  return this.zIndex_;
};

/**
 * Returns a flag indicating whether the InfoBox is visible.
 * @returns {boolean}
 */
InfoBox.prototype.getVisible = function () {

  var isVisible;

  if (typeof this.getMap() === "undefined" || this.getMap() === null) {
    isVisible = false;
  } else {
    isVisible = !this.isHidden_;
  }
  return isVisible;
};

/**
 * Shows the InfoBox. [Deprecated; use <tt>setVisible</tt> instead.]
 */
InfoBox.prototype.show = function () {

  this.isHidden_ = false;
  if (this.div_) {
    this.div_.style.visibility = "visible";
  }
};

/**
 * Hides the InfoBox. [Deprecated; use <tt>setVisible</tt> instead.]
 */
InfoBox.prototype.hide = function () {

  this.isHidden_ = true;
  if (this.div_) {
    this.div_.style.visibility = "hidden";
  }
};

/**
 * Adds the InfoBox to the specified map or Street View panorama. If <tt>anchor</tt>
 *  (usually a <tt>google.maps.Marker</tt>) is specified, the position
 *  of the InfoBox is set to the position of the <tt>anchor</tt>. If the
 *  anchor is dragged to a new location, the InfoBox moves as well.
 * @param {Map|StreetViewPanorama} map
 * @param {MVCObject} [anchor]
 */
InfoBox.prototype.open = function (map, anchor) {

  var me = this;

  if (anchor) {

    this.position_ = anchor.getPosition();
    this.moveListener_ = google.maps.event.addListener(anchor, "position_changed", function () {
      me.setPosition(this.getPosition());
    });
  }

  this.setMap(map);

  if (this.div_) {

    this.panBox_();
  }
};

/**
 * Removes the InfoBox from the map.
 */
InfoBox.prototype.close = function () {

  var i;

  if (this.closeListener_) {

    google.maps.event.removeListener(this.closeListener_);
    this.closeListener_ = null;
  }

  if (this.eventListeners_) {

    for (i = 0; i < this.eventListeners_.length; i++) {

      google.maps.event.removeListener(this.eventListeners_[i]);
    }
    this.eventListeners_ = null;
  }

  if (this.moveListener_) {

    google.maps.event.removeListener(this.moveListener_);
    this.moveListener_ = null;
  }

  if (this.contextListener_) {

    google.maps.event.removeListener(this.contextListener_);
    this.contextListener_ = null;
  }

  this.setMap(null);
};

module.exports = InfoBox;

},{}],12:[function(require,module,exports){
/**
 * isMobile.js v0.4.1
 *
 * A simple library to detect Apple phones and tablets,
 * Android phones and tablets, other mobile devices (like blackberry, mini-opera and windows phone),
 * and any kind of seven inch device, via user agent sniffing.
 *
 * @author: Kai Mallea (kmallea@gmail.com)
 *
 * @license: http://creativecommons.org/publicdomain/zero/1.0/
 */
(function (global) {

    var apple_phone         = /iPhone/i,
        apple_ipod          = /iPod/i,
        apple_tablet        = /iPad/i,
        android_phone       = /(?=.*\bAndroid\b)(?=.*\bMobile\b)/i, // Match 'Android' AND 'Mobile'
        android_tablet      = /Android/i,
        amazon_phone        = /(?=.*\bAndroid\b)(?=.*\bSD4930UR\b)/i,
        amazon_tablet       = /(?=.*\bAndroid\b)(?=.*\b(?:KFOT|KFTT|KFJWI|KFJWA|KFSOWI|KFTHWI|KFTHWA|KFAPWI|KFAPWA|KFARWI|KFASWI|KFSAWI|KFSAWA)\b)/i,
        windows_phone       = /Windows Phone/i,
        windows_tablet      = /(?=.*\bWindows\b)(?=.*\bARM\b)/i, // Match 'Windows' AND 'ARM'
        other_blackberry    = /BlackBerry/i,
        other_blackberry_10 = /BB10/i,
        other_opera         = /Opera Mini/i,
        other_chrome        = /(CriOS|Chrome)(?=.*\bMobile\b)/i,
        other_firefox       = /(?=.*\bFirefox\b)(?=.*\bMobile\b)/i, // Match 'Firefox' AND 'Mobile'
        seven_inch = new RegExp(
            '(?:' +         // Non-capturing group

            'Nexus 7' +     // Nexus 7

            '|' +           // OR

            'BNTV250' +     // B&N Nook Tablet 7 inch

            '|' +           // OR

            'Kindle Fire' + // Kindle Fire

            '|' +           // OR

            'Silk' +        // Kindle Fire, Silk Accelerated

            '|' +           // OR

            'GT-P1000' +    // Galaxy Tab 7 inch

            ')',            // End non-capturing group

            'i');           // Case-insensitive matching

    var match = function(regex, userAgent) {
        return regex.test(userAgent);
    };

    var IsMobileClass = function(userAgent) {
        var ua = userAgent || navigator.userAgent;

        // Facebook mobile app's integrated browser adds a bunch of strings that
        // match everything. Strip it out if it exists.
        var tmp = ua.split('[FBAN');
        if (typeof tmp[1] !== 'undefined') {
            ua = tmp[0];
        }

        // Twitter mobile app's integrated browser on iPad adds a "Twitter for
        // iPhone" string. Same probable happens on other tablet platforms.
        // This will confuse detection so strip it out if it exists.
        tmp = ua.split('Twitter');
        if (typeof tmp[1] !== 'undefined') {
            ua = tmp[0];
        }

        this.apple = {
            phone:  match(apple_phone, ua),
            ipod:   match(apple_ipod, ua),
            tablet: !match(apple_phone, ua) && match(apple_tablet, ua),
            device: match(apple_phone, ua) || match(apple_ipod, ua) || match(apple_tablet, ua)
        };
        this.amazon = {
            phone:  match(amazon_phone, ua),
            tablet: !match(amazon_phone, ua) && match(amazon_tablet, ua),
            device: match(amazon_phone, ua) || match(amazon_tablet, ua)
        };
        this.android = {
            phone:  match(amazon_phone, ua) || match(android_phone, ua),
            tablet: !match(amazon_phone, ua) && !match(android_phone, ua) && (match(amazon_tablet, ua) || match(android_tablet, ua)),
            device: match(amazon_phone, ua) || match(amazon_tablet, ua) || match(android_phone, ua) || match(android_tablet, ua)
        };
        this.windows = {
            phone:  match(windows_phone, ua),
            tablet: match(windows_tablet, ua),
            device: match(windows_phone, ua) || match(windows_tablet, ua)
        };
        this.other = {
            blackberry:   match(other_blackberry, ua),
            blackberry10: match(other_blackberry_10, ua),
            opera:        match(other_opera, ua),
            firefox:      match(other_firefox, ua),
            chrome:       match(other_chrome, ua),
            device:       match(other_blackberry, ua) || match(other_blackberry_10, ua) || match(other_opera, ua) || match(other_firefox, ua) || match(other_chrome, ua)
        };
        this.seven_inch = match(seven_inch, ua);
        this.any = this.apple.device || this.android.device || this.windows.device || this.other.device || this.seven_inch;

        // excludes 'other' devices and ipods, targeting touchscreen phones
        this.phone = this.apple.phone || this.android.phone || this.windows.phone;

        // excludes 7 inch devices, classifying as phone or tablet is left to the user
        this.tablet = this.apple.tablet || this.android.tablet || this.windows.tablet;

        if (typeof window === 'undefined') {
            return this;
        }
    };

    var instantiate = function() {
        var IM = new IsMobileClass();
        IM.Class = IsMobileClass;
        return IM;
    };

    if (typeof module !== 'undefined' && module.exports && typeof window === 'undefined') {
        //node
        module.exports = IsMobileClass;
    } else if (typeof module !== 'undefined' && module.exports && typeof window !== 'undefined') {
        //browserify
        module.exports = instantiate();
    } else if (typeof define === 'function' && define.amd) {
        //AMD
        define('isMobile', [], global.isMobile = instantiate());
    } else {
        global.isMobile = instantiate();
    }

})(this);

},{}],13:[function(require,module,exports){
(function(self) {
  'use strict';

  if (self.fetch) {
    return
  }

  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob: 'FileReader' in self && 'Blob' in self && (function() {
      try {
        new Blob()
        return true
      } catch(e) {
        return false
      }
    })(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  }

  if (support.arrayBuffer) {
    var viewClasses = [
      '[object Int8Array]',
      '[object Uint8Array]',
      '[object Uint8ClampedArray]',
      '[object Int16Array]',
      '[object Uint16Array]',
      '[object Int32Array]',
      '[object Uint32Array]',
      '[object Float32Array]',
      '[object Float64Array]'
    ]

    var isDataView = function(obj) {
      return obj && DataView.prototype.isPrototypeOf(obj)
    }

    var isArrayBufferView = ArrayBuffer.isView || function(obj) {
      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
    }
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name)
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value)
    }
    return value
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function() {
        var value = items.shift()
        return {done: value === undefined, value: value}
      }
    }

    if (support.iterable) {
      iterator[Symbol.iterator] = function() {
        return iterator
      }
    }

    return iterator
  }

  function Headers(headers) {
    this.map = {}

    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value)
      }, this)
    } else if (Array.isArray(headers)) {
      headers.forEach(function(header) {
        this.append(header[0], header[1])
      }, this)
    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name])
      }, this)
    }
  }

  Headers.prototype.append = function(name, value) {
    name = normalizeName(name)
    value = normalizeValue(value)
    var oldValue = this.map[name]
    this.map[name] = oldValue ? oldValue+','+value : value
  }

  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)]
  }

  Headers.prototype.get = function(name) {
    name = normalizeName(name)
    return this.has(name) ? this.map[name] : null
  }

  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  }

  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = normalizeValue(value)
  }

  Headers.prototype.forEach = function(callback, thisArg) {
    for (var name in this.map) {
      if (this.map.hasOwnProperty(name)) {
        callback.call(thisArg, this.map[name], name, this)
      }
    }
  }

  Headers.prototype.keys = function() {
    var items = []
    this.forEach(function(value, name) { items.push(name) })
    return iteratorFor(items)
  }

  Headers.prototype.values = function() {
    var items = []
    this.forEach(function(value) { items.push(value) })
    return iteratorFor(items)
  }

  Headers.prototype.entries = function() {
    var items = []
    this.forEach(function(value, name) { items.push([name, value]) })
    return iteratorFor(items)
  }

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true
  }

  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result)
      }
      reader.onerror = function() {
        reject(reader.error)
      }
    })
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsArrayBuffer(blob)
    return promise
  }

  function readBlobAsText(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsText(blob)
    return promise
  }

  function readArrayBufferAsText(buf) {
    var view = new Uint8Array(buf)
    var chars = new Array(view.length)

    for (var i = 0; i < view.length; i++) {
      chars[i] = String.fromCharCode(view[i])
    }
    return chars.join('')
  }

  function bufferClone(buf) {
    if (buf.slice) {
      return buf.slice(0)
    } else {
      var view = new Uint8Array(buf.byteLength)
      view.set(new Uint8Array(buf))
      return view.buffer
    }
  }

  function Body() {
    this.bodyUsed = false

    this._initBody = function(body) {
      this._bodyInit = body
      if (!body) {
        this._bodyText = ''
      } else if (typeof body === 'string') {
        this._bodyText = body
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString()
      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
        this._bodyArrayBuffer = bufferClone(body.buffer)
        // IE 10-11 can't handle a DataView body.
        this._bodyInit = new Blob([this._bodyArrayBuffer])
      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
        this._bodyArrayBuffer = bufferClone(body)
      } else {
        throw new Error('unsupported BodyInit type')
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8')
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type)
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
        }
      }
    }

    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this)
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob)
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(new Blob([this._bodyArrayBuffer]))
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      }

      this.arrayBuffer = function() {
        if (this._bodyArrayBuffer) {
          return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
        } else {
          return this.blob().then(readBlobAsArrayBuffer)
        }
      }
    }

    this.text = function() {
      var rejected = consumed(this)
      if (rejected) {
        return rejected
      }

      if (this._bodyBlob) {
        return readBlobAsText(this._bodyBlob)
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as text')
      } else {
        return Promise.resolve(this._bodyText)
      }
    }

    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode)
      }
    }

    this.json = function() {
      return this.text().then(JSON.parse)
    }

    return this
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

  function normalizeMethod(method) {
    var upcased = method.toUpperCase()
    return (methods.indexOf(upcased) > -1) ? upcased : method
  }

  function Request(input, options) {
    options = options || {}
    var body = options.body

    if (input instanceof Request) {
      if (input.bodyUsed) {
        throw new TypeError('Already read')
      }
      this.url = input.url
      this.credentials = input.credentials
      if (!options.headers) {
        this.headers = new Headers(input.headers)
      }
      this.method = input.method
      this.mode = input.mode
      if (!body && input._bodyInit != null) {
        body = input._bodyInit
        input.bodyUsed = true
      }
    } else {
      this.url = String(input)
    }

    this.credentials = options.credentials || this.credentials || 'omit'
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers)
    }
    this.method = normalizeMethod(options.method || this.method || 'GET')
    this.mode = options.mode || this.mode || null
    this.referrer = null

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests')
    }
    this._initBody(body)
  }

  Request.prototype.clone = function() {
    return new Request(this, { body: this._bodyInit })
  }

  function decode(body) {
    var form = new FormData()
    body.trim().split('&').forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=')
        var name = split.shift().replace(/\+/g, ' ')
        var value = split.join('=').replace(/\+/g, ' ')
        form.append(decodeURIComponent(name), decodeURIComponent(value))
      }
    })
    return form
  }

  function parseHeaders(rawHeaders) {
    var headers = new Headers()
    rawHeaders.split(/\r?\n/).forEach(function(line) {
      var parts = line.split(':')
      var key = parts.shift().trim()
      if (key) {
        var value = parts.join(':').trim()
        headers.append(key, value)
      }
    })
    return headers
  }

  Body.call(Request.prototype)

  function Response(bodyInit, options) {
    if (!options) {
      options = {}
    }

    this.type = 'default'
    this.status = 'status' in options ? options.status : 200
    this.ok = this.status >= 200 && this.status < 300
    this.statusText = 'statusText' in options ? options.statusText : 'OK'
    this.headers = new Headers(options.headers)
    this.url = options.url || ''
    this._initBody(bodyInit)
  }

  Body.call(Response.prototype)

  Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    })
  }

  Response.error = function() {
    var response = new Response(null, {status: 0, statusText: ''})
    response.type = 'error'
    return response
  }

  var redirectStatuses = [301, 302, 303, 307, 308]

  Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code')
    }

    return new Response(null, {status: status, headers: {location: url}})
  }

  self.Headers = Headers
  self.Request = Request
  self.Response = Response

  self.fetch = function(input, init) {
    return new Promise(function(resolve, reject) {
      var request = new Request(input, init)
      var xhr = new XMLHttpRequest()

      xhr.onload = function() {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
        }
        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL')
        var body = 'response' in xhr ? xhr.response : xhr.responseText
        resolve(new Response(body, options))
      }

      xhr.onerror = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.ontimeout = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.open(request.method, request.url, true)

      if (request.credentials === 'include') {
        xhr.withCredentials = true
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob'
      }

      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value)
      })

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
    })
  }
  self.fetch.polyfill = true
})(typeof self !== 'undefined' ? self : this);

},{}]},{},[4]);
