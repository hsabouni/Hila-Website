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

	// 6. Interactive education story
		$('.education-toggle').on('click',function(){
			var selectedStory = $(this).closest('.education-story');
			var allStories = selectedStory.closest('.row').find('.education-story');

			allStories.removeClass('is-open');
			allStories.find('.education-toggle').attr('aria-expanded','false');
			allStories.find('.education-panel').attr('aria-hidden','true');

			selectedStory.addClass('is-open');
			selectedStory.find('.education-toggle').attr('aria-expanded','true');
			selectedStory.find('.education-panel').attr('aria-hidden','false');
		});

	// 7. Reveal the page structure as it enters the viewport
		var revealSections = $('#about,#education,#experience,#publications,#portfolio,#contact');
		revealSections.addClass('scroll-reveal');
		$('body').addClass('motion-ready');

		if ('IntersectionObserver' in window) {
			var revealObserver = new IntersectionObserver(function(entries,observer){
				entries.forEach(function(entry){
					if (entry.isIntersecting) {
						$(entry.target).addClass('is-visible');
						observer.unobserve(entry.target);
					}
				});
			},{threshold:.12,rootMargin:'0px 0px -10% 0px'});

			revealSections.each(function(){revealObserver.observe(this);});
		} else {
			revealSections.addClass('is-visible');
		}

		var experienceEntries = $('#experience .single-timeline-box').addClass('experience-reveal');
		if ('IntersectionObserver' in window) {
			var experienceObserver = new IntersectionObserver(function(entries){
				entries.forEach(function(entry){
					$(entry.target).toggleClass('is-visible',entry.isIntersecting);
				});
			},{threshold:.18,rootMargin:'-6% 0px -8% 0px'});

			experienceEntries.each(function(){experienceObserver.observe(this);});
		} else {
			experienceEntries.addClass('is-visible');
		}

});
