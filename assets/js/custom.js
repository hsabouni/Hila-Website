$(document).ready(function(){
	"use strict";
    
        /*==================================
* Author        : "ThemeSine"
* Template Name : Khanas HTML Template
* Version       : 1.0
==================================== */



/*=========== TABLE OF CONTENTS ===========
1. Scroll To Top 
2. Smooth Scroll spy
3. Progress-bar
4. owl carousel
5. welcome animation support
======================================*/

    // 1. Scroll To Top 
		$(window).on('scroll',function () {
			if ($(this).scrollTop() > 600) {
				$('.return-to-top').fadeIn();
			} else {
				$('.return-to-top').fadeOut();
			}
		});
		$('.return-to-top').on('click',function(){
				$('html, body').animate({
				scrollTop: 0
			}, 1500);
			return false;
		});
	
	
	
	// 2. Smooth Scroll spy
		
		$('.header-area').sticky({
           topSpacing:0
        });
		
		//=============

		$('li.smooth-menu a').bind("click", function(event) {
			event.preventDefault();
			var anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $(anchor.attr('href')).offset().top - 60
			}, 1200,'easeInOutExpo');
		});
		
		$('body').scrollspy({
			target:'.navbar-collapse',
			offset:0
		});

	// Keep the experience axis centered between its first and last markers.
	function positionExperienceAxis() {
		var timeline = $('#experience .main-timeline');
		var axis = timeline.find('.timeline-axis');
		var dots = timeline.find('.timeline-content .fa-circle');

		if (!timeline.length || !axis.length || dots.length < 2) {
			return;
		}

		var timelineOffset = timeline.offset();
		var firstDot = dots.first();
		var lastDot = dots.last();
		var firstCenterY = firstDot.offset().top - timelineOffset.top + (firstDot.outerHeight() / 2);
		var lastCenterY = lastDot.offset().top - timelineOffset.top + (lastDot.outerHeight() / 2);
		var centerX = firstDot.offset().left - timelineOffset.left + (firstDot.outerWidth() / 2);

		axis.css({
			left: centerX,
			top: firstCenterY,
			height: Math.max(0, lastCenterY - firstCenterY)
		});
	}

	positionExperienceAxis();
	$(window).on('load resize', positionExperienceAxis);

	// 3. Progress-bar
	
		var dataToggleTooTip = $('[data-toggle="tooltip"]');
		var progressBar = $(".progress-bar");
		if (progressBar.length) {
			progressBar.appear(function () {
				dataToggleTooTip.tooltip({
					trigger: 'manual'
				}).tooltip('show');
				progressBar.each(function () {
					var each_bar_width = $(this).attr('aria-valuenow');
					$(this).width(each_bar_width + '%');
				});
			});
		}
	
	// 4. owl carousel
	
		// i. client (carousel)
		
			$('#client').owlCarousel({
				items:7,
				loop:true,
				smartSpeed: 1000,
				autoplay:true,
				dots:false,
				autoplayHoverPause:true,
				responsive:{
						0:{
							items:2
						},
						415:{
							items:2
						},
						600:{
							items:4

						},
						1199:{
							items:4
						},
						1200:{
							items:7
						}
					}
				});
				
				
				$('.play').on('click',function(){
					owl.trigger('play.owl.autoplay',[1000])
				})
				$('.stop').on('click',function(){
					owl.trigger('stop.owl.autoplay')
				})


    // 5. Homepage entrance and research-theme navigation

		window.requestAnimationFrame(function(){
			$('.header-text').addClass('hero-animate');
		});

		$('.hero-topic[href^="#"]').on('click',function(event){
			var target = $($(this).attr('href'));
			if (target.length) {
				event.preventDefault();
				$('html, body').stop().animate({
					scrollTop: target.offset().top - 75
				}, 900, 'easeInOutExpo');
			}
		});

});
