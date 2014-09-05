SLIDE is a web-slider that employs HTML5, CSS3, JQuery, and JQuery Mobile.<br>
SLIDE is made to be light weight and simple.<br>
SLIDE includes image protection to keep people from easily stealing your images<br>
SLIDE requires JQuery, JQuery Mobile, & JQuery UI to run.<br>

SLIDE is deployed by adding this code between the head tags of your webpage.

	<link rel="stylesheet" href="slide.css"> 
	<script src='http://ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js'>   </script> 
	<script src="http://code.jquery.com/mobile/1.3.2/jquery.mobile-1.3.2.min.js">   </script> 
	<script src="http://code.jquery.com/ui/1.10.3/jquery-ui.js">   </script> 
	<script src="scripts/slide.min.js">   </script> 
	<script> 
	   $(document).ready(function(){ 
	      $('#firstSlider').slideIt({ 
	      thumbnails: true, 
	      overlayer: true, 
	      navigation: true, 
	      pausePlayOnClick: true, 
	      time: 2000, 
	      transitionTime: 1200 
	   }); 
	}); 
	</script>
	
And this code into the div where you'd like SLIDE to display.

	<div id="firstSlider" class="slideIt"> 
	   <div class="aSlide" data-imgSrc="/*yourimage*/"></div> 
	   <div class="aSlide" data-imgSrc="/*yourimage*/"></div> 
	</div>


SLIDE's Options<br><br>
HEIGHT<br>
You can set either a percent of the width, a pixel value, or window which sets the height to the size of the window and is there to allow you to set SLIDE as a background for your webpage. (Check out SLIDE Full Screen to see the window option in action)<br>

THUMBNAILS TRUE/FALSE<br>
Enable or disable the thumbnails tray underneath SLIDE.<br>

NAVIGATION TRUE/FALSE<br>
Include or remove the navigation buttons.<br>

OVERLAYER TRUE/FALSE<br>
Adds an overlayer that prevents people from easily stealing the images in your SLIDE.<br>

AUTO PLAY TRUE/FALSE<br>
Sets SLIDE to start playing as soon as it is loaded.<br>

PAUSE OR PLAY ON CLICK TRUE/FALSE<br>
Allows SLIDE to be paused or played by clicking on it.<br>

EASING, LINEAR, SWING, EASEINSINE,   EASEOUTSINE,   EASEINOUTSINE,   EASEINQUAD,   EASEOUTQUAD,   EASEINOUTQUAD,   EASEINCUBIC,   EASEOUTCUBIC,   EASEINOUTCUBIC,   EASEINQUART,   EASEOUTQUART,   EASEINOUTQUART,   EASEINQUINT,   EASEOUTQUINT,   EASEINOUTQUINT,   EASEINEXPO,   EASEOUTEXPO,   EASEINOUTEXPO,   EASEINCIRC,   EASEOUTCIRC,   EASEINOUTCIRC,   EASEINELASTIC,   EASEOUTELASTIC,   EASEINOUTELASTIC,   EASEINBACK,   EASEOUTBACK,   EASEINOUTBACK,   EASEINBOUNCE,   EASEOUTBOUNCE,   EASEINOUTBOUNCE<br>
Any of the easing functions can be enabled as part of SLIDE's transition from one image to another, check out easings.net to see a demonstration or to learn more about the easing functions.

TIME 1 - ∞<br>
Sets the time delay before switching images while SLIDE is playing.<br>

TRANSITION TIME 1 - ∞<br>
Sets the time it takes to complete the image switching animation.<br>


	                                 
SLIDE(c) V3 2013 Max King Reice | m3r5designs.com
This plugin is being shared under the MIT License

SLIDE is opensource and free to all.

Any use of SLIDE constitutes an acceptance of risk
Max Reice/M3R5 Designs cannot be held liable for any data loss, theft,
or system failure caused by the employment of SLIDE or its functions
