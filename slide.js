/*
    _____________________________________________________
   /                                                     |
  /    _____  __     ____ ____   ______         _____    |
 /    / ___/ / /    /  _// __ \ / ____/  _   __|__  /    |
|     \__ \ / /     / / / / / // __/    | | / / /_ <     |
|    ___/ // /___ _/ / / /_/ // /___    | |/ /___/ /     |
|   /____//_____//___//_____//_____/    |___//____/     /
|                                                      /
|_____________________________________________________/
								                                 
(c) 2013 Max King Reice | m3r5designs.com*/
;(function( $, window ){
/*This is SLIDE!*/
$.fn.slideIt = function(opts){
/*this holds SLIDE's default settings*/
var defaults = {
	height: '50%',
	thumbnails: false,
	navigation: false,
	overlayer: false,
	autoPlay: false,
	pausePlayOnClick: false,
	easing: 'easeInOutExpo',
	time: 5000,
	transitionTime: 1000,
}
/*this creates SLIDE's options variable (opts), and a variable to give SLIDE context (element)*/
var opts = $.extend({}, defaults, opts),
element = $(this);
/*activates SLIDE*/
$('.aSlide:first-child').addClass('slideActive');
/*compensates for transition time values in delay times*/
opts.time = opts.time+opts.transitionTime;
/*this loop calculates SLIDE's height*/
/*first statement is to calculate a percent of width height*/
if (opts.height.indexOf('%')!=-1) {
	var w = element.width(),
	h = parseFloat(opts.height)/100;
	w = w*h;	
	element.css({"height":w});
	$(window).resize(function(){
		var w = element.width(),
		h = parseFloat(opts.height)/100;
		w = w*h;	
		element.css({"height":w});
	});
}
/*second statement is if the height is set as 'window'*/
else if (opts.height == 'window') {
/*this compensates for the height of the thumbnail container*/
	if (opts.thumbnails==true) {
		h = $(window).height();
		h = h-80;
	}
	else {
		h = $(window).height();
	}
	element.css({"height":h});
	$(window).resize(function(){
		if (opts.thumbnails==true) {
			h = $(window).height();
			h = h-80;
		}
		else {
			h = $(window).height();
		}
		element.css({"height":h});
	});
}
/*third statement is if height is set as 'auto'*/
else if (opts.height == 'auto') {
	element.css({"height":'100%'});
}
/*and the last statement is for a px value height*/
else {
	h = opts.height;
	element.css({"height":h});
}
/*this pulls the images from the data-imgSrc attribute and creates the slides*/
$(".aSlide").each(function(){
	var backImg = this.getAttribute('data-imgSrc');
	$(this).css({
		'background-image': 'url('+backImg+')',
		'background-position':'center',
		'background-size':'cover'
	});
});
/*this creates the thumbnail container (via .after) and then the thumbnails (by cloning the slides and placing the clones in the thumbnail container)*/
if (opts.thumbnails==true) {
	element.after('<div class="thumbnails" />');
	var thumbContainer = element.next();
	element.children(".aSlide").each(function(){
		$(this).clone().removeClass('aSlide').removeClass('slideActive').addClass('thumbs').css({
			'background-size': 'cover',
			'background-repeat': 'no-repeat'
		}).appendTo(thumbContainer);});
	element.next('.thumbnails').children(".thumbs:first").addClass("thumbsActive");
}
/*this creates the navigation buttons and enables swipe navigation*/
if (opts.navigation==true) {
	element.prepend('<div class="nextButton" /><div class="prevButton" />');
	$(function(){
		element.on( "swipeleft", swipeleftHandler );
		element.on( "swiperight", swiperightHandler );
/*this is the handler for a right to left swipe*/
		function swipeleftHandler( event ){
			var theActive = element.children('.slideActive'),
			slide = element.children('.slideActive').index();
/*if SLIDE is playing we need to jump to the end*/
			if( element.children('.progress').children().is(':animated') ) {
				element.children('.progress').children().finish();
			}
/*check if SLIDE is in the middle of an animation*/
			else if( element.children('.aSlide').is(':animated') ) {}
/*move to the next slide*/
			else {
/*pass the current slide, the transition timing and the easing function to .nextSlide*/
				theActive.nextSlide(opts.transitionTime, opts.easing);
				/*highlights the thumbnail of the active slide (the delay ensures that the thumbnail highlighted is that of the currently display slide)*/
				highlightThumb(opts.transitionTime+50);	
			}
		}
/*this is the handler for a left to right swipe*/
		function swiperightHandler( event ){
			var theActive = element.children('.slideActive'),
			slide = element.children('.slideActive').index();
/*if SLIDE is playing, we need to stop and switch slides before resuming*/
			if( element.children('.progress').children().is(':animated') ) {
				element.children('.progress').children().stop();
				progressBar.css({'width':'','opacity':''})
				theActive.prevSlide(opts.transitionTime, opts.easing);
/*highlights the thumbnail of the active slide (the delay ensures that the thumbnail highlighted is that of the currently display slide)*/
				highlightThumb(opts.transitionTime+50);
			}
/*check if SLIDE is in the middle of an animation*/
			else if( element.children('.aSlide').is(':animated') ) {}
/*move to the previous slide*/
			else {
/*pass the current slide, the transition timing and the easing function to .prevSlide*/
				theActive.prevSlide(opts.transitionTime, opts.easing);
				/*highlights the thumbnail of the active slide (the delay ensures that the thumbnail highlighted is that of the currently display slide)*/
				highlightThumb(opts.transitionTime+50);	
			}
		}
	});
}
/*this creates the overlayer*/
if (opts.overlayer==true) {
	element.prepend('<div class="overlayer" />');
}
/*this creates the progress bar and shuffles the navigation buttons up to make space for it*/
if (opts.autoPlay==true || opts.pausePlayOnClick==true) {
	element.children('.nextButton, .prevButton').css('bottom','11px');
	element.prepend('<div class="progress"><div class="progressBar" /></div');
}
/*this activates the autoplay functionality by creating a setInterval function */
if (opts.autoPlay==true) {
	var theActive = element.children('.slideActive'),
	slide = element.children('.slideActive').index(),
	progressBar = element.children('.progress').children();
/*this first animation compensates for the delay before the setInterval function kicks in*/
	progressBar.animate({width: '100%', opacity:1}, opts.time, 'easeInOutCubic', function(){
/*move to the next slide*/
/*pass the current slide, the transition timing and the easing function to .nextSlide*/
		theActive.nextSlide(opts.transitionTime, opts.easing);
		/*highlights the thumbnail of the active slide (the delay ensures that the thumbnail highlighted is that of the currently display slide)*/
highlightThumb(opts.transitionTime+50);	
		progressBar.css({'width':'','opacity':''})
	});
/*and this is the setInterval function*/
	var int = setInterval(function(){
		progressBar.animate({width: '100%', opacity:1}, opts.time, 'easeInOutCubic', function(){
			var theActive = element.children('.slideActive'),
			slide = element.children('.slideActive').index();
/*move to the next slide*/
/*pass the current slide, the transition timing and the easing function to .nextSlide*/
			theActive.nextSlide(opts.transitionTime, opts.easing);
			/*highlights the thumbnail of the active slide (the delay ensures that the thumbnail highlighted is that of the currently display slide)*/
highlightThumb(opts.transitionTime+50);	
			progressBar.css({'width':'','opacity':''})
		});
	}, opts.time);
}
/*creates the function by which the setInterval is interrupted when SLIDE is clicked, and then playing is resumed when SLIDE is clicked again*/
if (opts.pausePlayOnClick==true) {
/*oddClick is there to allow differentiation between alternating clicks (i.e. toggling)*/
	var oddClick,
	progressBar = element.children('.progress').children();
	if (opts.autoPlay==true) {
		oddClick = true;
	}
	else {
		oddClick = false;
	}
	element.children().not('.nextButton, .prevButton').click(function() {
/*stop playing*/
    	if (oddClick==true) {
			progressBar.stop();
			progressBar.css({'width':'','opacity':'0'});
			int = window.clearInterval(int);
			oddClick = false;
		}
/*start playing*/
		else {
			var theActive = element.children('.slideActive'),
			slide = element.children('.slideActive').index();
			progressBar.animate({width: '100%', opacity:1}, opts.time, 'easeInOutCubic', function(){
/*move to the next slide*/
/*pass the current slide, the transition timing and the easing function to .nextSlide*/
				theActive.nextSlide(opts.transitionTime, opts.easing);
/*highlights the thumbnail of the active slide (the delay ensures that the thumbnail highlighted is that of the currently display slide)*/
highlightThumb(opts.transitionTime+50);	
				progressBar.css({'width':'','opacity':''})
			});
			int = setInterval(function(){
				progressBar.animate({width: '100%', opacity:1}, opts.time, 'easeInOutCubic', function(){
					var theActive = element.children('.slideActive'), slide = element.children('.slideActive').index();
/*move to the next slide*/
/*pass the current slide, the transition timing and the easing function to .nextSlide*/
					theActive.nextSlide(opts.transitionTime, opts.easing);
/*highlights the thumbnail of the active slide (the delay ensures that the thumbnail highlighted is that of the currently display slide)*/
highlightThumb(opts.transitionTime+50);	
					progressBar.css({'width':'','opacity':''})
				})
			}, opts.time);
			oddClick = true;
		}
});
}
/*this is the function by which SLIDE switches to the slide of a clicked thumbnail*/
$(".thumbs").click(function(){
	var element = $(this).parent().prev('.slideIt'),
	clicked = element.children('.aSlide').eq($(this).index()),
	theActive =  element.children('.slideActive'),
	slide = element.children('.slideActive').index(),
	progressBar = element.children('.progress').children();
/*checks if the thumb is already active*/
	if ($(this).hasClass('thumbsActive')) {
		return false
	}
/*checks if SLIDE is in the midst of an animation*/
	if (element.children('.aSlide:animated').length) {
		return false;
	}
/*checks if SLIDE is playing*/
	if (progressBar.parent().children('.progressBar:animated').length != 0) {
/*stops playing*/
	progressBar.stop();
	progressBar.css({'width':'','opacity':'0'});
	int = window.clearInterval(int);
/*switches slides*/
	theActive.fadeOut(opts.transitionTime, function(){
		theActive.removeClass('slideActive');
	});
	clicked.fadeIn(opts.transitionTime, function(){
		clicked.addClass('slideActive');
/*starts playing again*/
		if(opts.pausePlayOnClick == true ||	opts.autoPlay == true) {
			var theActive = element.children('.slideActive'),
			slide = element.children('.slideActive').index();
			progressBar.animate({width: '100%', opacity:1}, opts.time, 'easeInOutCubic', function(){
/*move to the next slide*/
/*pass the current slide, the transition timing and the easing function to .nextSlide*/
				theActive.nextSlide(opts.transitionTime, opts.easing);
/*highlights the thumbnail of the active slide (the delay ensures that the thumbnail highlighted is that of the currently display slide)*/
highlightThumb(opts.transitionTime+50);	
				progressBar.css({'width':'','opacity':''})
			});
			int = setInterval(function(){
				progressBar.animate({width: '100%', opacity:1}, opts.time, 'easeInOutCubic', function(){
					var theActive = element.children('.slideActive'),
					slide = element.children('.slideActive').index();
/*move to the next slide*/
/*pass the current slide, the transition timing and the easing function to .nextSlide*/
					theActive.nextSlide(opts.transitionTime, opts.easing);
/*highlights the thumbnail of the active slide (the delay ensures that the thumbnail highlighted is that of the currently display slide)*/
					highlightThumb(opts.transitionTime+50);	
					progressBar.css({'width':'','opacity':''})
				})
			}, opts.time);
			oddClick = true;
		}
	});
	}
/*if SLIDE isn't playing, it's ok to just go ahead and switch slides*/
	else {
	theActive.fadeOut(opts.transitionTime, function(){
		theActive.removeClass('slideActive')
	});
	clicked.fadeIn(opts.transitionTime, function(){clicked.addClass('slideActive')
	});
	}
/*highlights the thumbnail of the active slide (the delay ensures that the thumbnail highlighted is that of the currently display slide)*/
	highlightThumb(opts.transitionTime+50);
});
/*this function is triggered when the next or right side navigation button is clicked*/
$(".nextButton").click(function(){
	var element = $(this).parent(),
	theActive = element.children('.slideActive'),
	slide = element.children('.slideActive').index();
/*if SLIDE is playing, we just need to skip to the end*/
	if( element.children('.progress').children().is(':animated') ) {
		element.children('.progress').children().finish();
	}
/*check if SLIDE is in the middle of an animation*/
	else if( element.children('.aSlide').is(':animated') ) {}
/*move to the next slide*/
	else {
/*pass the current slide, the transition timing and the easing function to .nextSlide*/
	theActive.nextSlide(opts.transitionTime, opts.easing);
/*highlights the thumbnail of the active slide (the delay ensures that the thumbnail highlighted is that of the currently display slide)*/
highlightThumb(opts.transitionTime+50);	
	}
});
$(".prevButton").click(function(){
	var element = $(this).parent(), theActive = element.children('.slideActive'), slide = element.children('.slideActive').index();
/*if SLIDE is playing, we need to stop and switch slides before resuming*/
	if( element.children('.progress').children().is(':animated') ) {
		element.children('.progress').children().stop();
		progressBar.css({'width':'','opacity':''})
		theActive.prevSlide(opts.transitionTime, opts.easing);
/*highlights the thumbnail of the active slide (the delay ensures that the thumbnail highlighted is that of the currently display slide)*/
		highlightThumb(opts.transitionTime+50);
		}
/*check if SLIDE is in the middle of an animation*/
	else if( element.children('.aSlide').is(':animated') ) {}
/*move to the previous slide*/
	else {
/*pass the current slide, the transition timing and the easing function to .prevSlide*/
		theActive.prevSlide(opts.transitionTime, opts.easing);
/*highlights the thumbnail of the active slide (the delay ensures that the thumbnail highlighted is that of the currently display slide)*/
		highlightThumb(opts.transitionTime+50);	
	}
});
/*this function handles the highlighting of the thumbnails*/
function highlightThumb(delay) {
/*a setTimeout delay is in place to allow SLIDE to complete the transition between slides before highlighting the thumbnail*/
	setTimeout(function(){
		element.next('.thumbnails').children('.thumbsActive').removeClass('thumbsActive');
/*the function simply finds the thumbnail of the current slide by referencing its index, and then swaps the class of the thummbnails to match
transition animations are handled by the CSS3 transition attribute*/
		element.next('.thumbnails').children().eq(element.children('.slideActive').index()-element.children().not('.aSlide').length).addClass('thumbsActive');
	},delay);
}
/*SLIDE calls this function whenever it needs to switch to the next (right side) slide*/
$.fn.nextSlide = function(time, elementEasing) {
	var theActive = $(this),
	element = $(this).parent(),
	theFirst = element.children(".aSlide:first"),
	slide = theActive.index()-element.children().not('.aSlide').length,
	thumb = element.next('.thumbnails').children('.thumbsActive').index(),
	slidesNum = element.children('.aSlide').length,
	next = theActive.next();
/*first case checks if you have reached the end of the slides
this is in place in order to ensure slid loops*/
	if (slide===slidesNum-1) {
/*the slides are then animated by placing the upcoming slide to the left and sliding it in to the right*/
		theFirst.show().css({'right':'-100%'});
		theActive.animate({'right': '100%'}, time, elementEasing, function(){
			theActive.removeClass("slideActive").hide().css({'right':0})
		});
		theFirst.animate({right: 0}, time, elementEasing, function(){
			theFirst.addClass("slideActive");
		});
	}
/*second case handles all the other transitions*/
	else {
/*the slides are then animated by placing the upcoming slide to the left and sliding it in to the right*/
		next.show().css({'right':'-100%'});
		theActive.animate({'right': '100%'}, time, elementEasing, function(){
			theActive.removeClass('slideActive').hide().css({'right':0})
		});
		next.animate({right: 0}, time, elementEasing, function(){
			next.addClass('slideActive');
		});	
	}
}
/*SLIDE calls this function whenever it needs to switch to the previous (left side) slide*/
$.fn.prevSlide = function(time, elementEasing) {
	var theActive = $(this),
	element = $(this).parent(),
	theLast = element.children(".aSlide:last"),
	slide = theActive.index()-element.children().not('.aSlide').length,
	thumb = element.next('.thumbnails').children('.thumbsActive').index(),
	previous = theActive.prev();
/*first case checks if you have reached the beginning of the slides
this is in place in order to ensure slid loops*/
	if (slide===0) {
/*the slides are then animated by placing the upcoming slide to the right and sliding it in to the left*/
		theLast.show().css({'right':'100%'});
		theActive.animate({'right': '-100%'}, time, elementEasing, function(){
			theActive.removeClass("slideActive").hide().css({'right':0})
		});
		theLast.animate({right: 0}, time, elementEasing, function(){
			theLast.addClass("slideActive");
		});
	}
/*second case handles all other transitions*/
	else {
/*the slides are then animated by placing the upcoming slide to the right and sliding it in to the left*/
		previous.show().css({'right':'100%'});
		theActive.animate({'right': '-100%'}, time, elementEasing, function(){
			theActive.removeClass('slideActive').hide().css({'right':0})
		});
		previous.animate({right: 0}, time, elementEasing, function(){
			previous.addClass('slideActive');
		});	
	}
}
};
}( jQuery, window ));
