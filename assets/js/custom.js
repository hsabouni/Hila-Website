$(document).ready(function(){
	"use strict";
    
        /*==================================
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
			var target = $(anchor.attr('href'));
			if (!target.length) {
				return;
			}
			$('html, body').stop().animate({
				scrollTop: target.offset().top - 60
			}, 700,'swing');
		});
		
		$('body').scrollspy({
			target:'.navbar-collapse',
			offset:80
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
	if (window.ResizeObserver) {
		var experienceTimeline = document.querySelector('#experience .main-timeline');
		if (experienceTimeline) {
			new ResizeObserver(positionExperienceAxis).observe(experienceTimeline);
		}
	}

	// Fit each portfolio case-study axis exactly between its first and last dots.
	function positionPortfolioAxes() {
		$('.portfolio-one-page .main-timeline-task, .portfolio-one-page .main-timeline-study').each(function () {
			var timeline = $(this);
			var axis = timeline.children('.timeline-axis');
			var dots = timeline.find('.timeline-content .fa-circle');
			if (!axis.length || dots.length < 2) {return;}

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
		});
	}

	positionPortfolioAxes();
	$(window).on('load resize', positionPortfolioAxes);
	if (window.ResizeObserver) {
		document.querySelectorAll('.portfolio-one-page .main-timeline-task, .portfolio-one-page .main-timeline-study').forEach(function (timeline) {
			new ResizeObserver(positionPortfolioAxes).observe(timeline);
		});
	}

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
		if (document.body.classList.contains('home-page')) {
			var homeHero = document.querySelector('.welcome-hero');
			var homeSectionOrder = ['portfolio','publications','experience','education','contact'];
			var previousHomeSection = homeHero;
			homeSectionOrder.forEach(function(sectionId){
				var section = document.getElementById(sectionId);
				if (section && previousHomeSection) {
					previousHomeSection.insertAdjacentElement('afterend',section);
					previousHomeSection = section;
				}
			});
		}

		var phdCardFigure = document.querySelector('.phd-card-figure');
		if (phdCardFigure && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			var phdFigureVisible = false;
			function updatePhdFigureMotion(){
				phdCardFigure.classList.toggle('is-animating',phdFigureVisible && !document.hidden);
			}
			if ('IntersectionObserver' in window) {
				var phdFigureObserver = new IntersectionObserver(function(entries){
					phdFigureVisible = entries[0].isIntersecting;
					updatePhdFigureMotion();
				},{threshold:.35});
				phdFigureObserver.observe(phdCardFigure);
			} else {
				phdFigureVisible = true;
				updatePhdFigureMotion();
			}
			document.addEventListener('visibilitychange',updatePhdFigureMotion);
		}

		window.requestAnimationFrame(function(){
			$('.header-text').addClass('hero-animate');
		});

		var decisionField = document.querySelector('.decision-field');
		if (decisionField) {
			var decisionReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
			var decisionState = decisionField.querySelector('.decision-state');
			var decisionSources = decisionField.querySelectorAll('.decision-source');
			var decisionLines = decisionField.querySelectorAll('.influence-line');
			var outcomeFactors = decisionField.querySelectorAll('.outcome-factor');
			var influenceLabels = [
				'Experience leads; AI + teammate still contribute',
				'AI guides; you + teammate still contribute',
				'Social influence leads; you + AI still contribute'
			];
			function activateDecisionSource(strongest,isDemo){
				if (decisionReducedMotion) {return;}
				var weights = [.32,.32,.32];
				weights[strongest] = 1;
				decisionField.style.setProperty('--self-weight',weights[0].toFixed(2));
				decisionField.style.setProperty('--ai-weight',weights[1].toFixed(2));
				decisionField.style.setProperty('--group-weight',weights[2].toFixed(2));
				decisionSources.forEach(function(source,index){source.classList.toggle('is-dominant',index === strongest);});
				decisionLines.forEach(function(line,index){line.classList.toggle('is-dominant',index === strongest);});
				outcomeFactors.forEach(function(factor,index){factor.classList.toggle('is-emphasized',index === strongest);});
				decisionState.textContent = influenceLabels[strongest];
				decisionField.classList.add('is-active');
				if (!isDemo) {decisionField.classList.add('has-interacted');}
				decisionField.setAttribute('aria-label','Interactive group decision visualization. ' + influenceLabels[strongest] + '. Use Enter or Space to cycle the leading factor.');
			}
			function resetDecisionField(){
				decisionField.style.setProperty('--self-weight','.62');
				decisionField.style.setProperty('--ai-weight','.62');
				decisionField.style.setProperty('--group-weight','.62');
				decisionState.textContent = 'All three contribute';
				decisionSources.forEach(function(source){source.classList.remove('is-dominant');});
				decisionLines.forEach(function(line){line.classList.remove('is-dominant');});
				outcomeFactors.forEach(function(factor){factor.classList.remove('is-emphasized');});
				decisionField.classList.remove('is-active');
				decisionField.setAttribute('aria-label','Interactive group decision visualization. Your judgment, an AI recommendation, and a teammate\'s judgment all contribute. Use Enter or Space to cycle which factor carries more weight.');
			}
			if (!decisionReducedMotion) {
				var decisionCycleIndex = -1;
				var decisionIntroActive = true;
				var decisionIntroTimers = [];
				function finishDecisionIntro(){
					if (!decisionIntroActive) {return;}
					decisionIntroActive = false;
					decisionIntroTimers.forEach(window.clearTimeout);
					decisionField.classList.remove('is-intro','is-intro-drawing');
					resetDecisionField();
				}
				window.requestAnimationFrame(function(){
					window.requestAnimationFrame(function(){decisionField.classList.add('is-intro-drawing');});
				});
				decisionIntroTimers.push(window.setTimeout(function(){activateDecisionSource(0,true);},1400));
				decisionIntroTimers.push(window.setTimeout(function(){activateDecisionSource(1,true);},2900));
				decisionIntroTimers.push(window.setTimeout(function(){activateDecisionSource(2,true);},4400));
				decisionIntroTimers.push(window.setTimeout(resetDecisionField,5900));
				decisionIntroTimers.push(window.setTimeout(finishDecisionIntro,6800));
				decisionField.addEventListener('pointerenter',finishDecisionIntro,{once:true});
				decisionField.addEventListener('focusin',finishDecisionIntro,{once:true});
				decisionSources.forEach(function(source,index){
					source.addEventListener('mouseenter',function(){finishDecisionIntro();decisionCycleIndex=index;activateDecisionSource(index);});
				});
				decisionField.addEventListener('pointerleave',resetDecisionField);
				decisionField.addEventListener('pointerup',function(event){
					if (event.pointerType === 'mouse') {return;}
					finishDecisionIntro();
					decisionCycleIndex=(decisionCycleIndex+1)%3;
					activateDecisionSource(decisionCycleIndex);
				});
				decisionField.addEventListener('keydown',function(event){
					if (event.key === 'Enter' || event.key === ' ') {
						event.preventDefault();
						finishDecisionIntro();
						decisionCycleIndex=(decisionCycleIndex+1)%3;
						activateDecisionSource(decisionCycleIndex);
					}
				});
			} else {
				decisionField.classList.remove('is-intro');
			}
		}

	// 6. Reveal the page structure as it enters the viewport
		var revealSections = $('.home-page #publications, .home-page #portfolio, .home-page #contact, .portfolio-one-page #intro, .portfolio-one-page #method, .portfolio-one-page #task-design, .portfolio-one-page #study-design, .portfolio-one-page #analysis, .portfolio-one-page #about, .portfolio-one-page #lessons_learned, .portfolio-one-page #contact, .portfolio-two-page .case-study-section, .research-journal-page .journal-project-intro, .research-journal-page .journal-portfolio-section, .research-journal-page .journal-notes-intro, .research-journal-page .journal-note-section, .research-journal-page .project-navigation');
		var pacedHomeSections = $('.home-page #education, .home-page #experience');
		revealSections.addClass('scroll-reveal');
		pacedHomeSections.addClass('scroll-reveal');
		$('body').addClass('motion-ready');

		if ('IntersectionObserver' in window) {
			var revealObserver = new IntersectionObserver(function(entries){
				entries.forEach(function(entry){
					if (entry.isIntersecting) {
						$(entry.target).addClass('is-visible');
						revealObserver.unobserve(entry.target);
					}
				});
			},{threshold:.12,rootMargin:'0px 0px -10% 0px'});

			revealSections.each(function(){revealObserver.observe(this);});

			var pacedHomeObserver = new IntersectionObserver(function(entries){
				entries.forEach(function(entry){
					if (entry.isIntersecting) {
						$(entry.target).addClass('is-visible');
						pacedHomeObserver.unobserve(entry.target);
					}
				});
			},{threshold:.08,rootMargin:'0px 0px -50% 0px'});

			pacedHomeSections.each(function(){pacedHomeObserver.observe(this);});
		} else {
			revealSections.addClass('is-visible');
			pacedHomeSections.addClass('is-visible');
		}

		var experienceEntries = $('#experience .single-timeline-box').addClass('experience-reveal');
		var educationEntries = $('#education .single-horizontal-timeline, .portfolio-two-page .portfolio-two-method .single-horizontal-timeline').addClass('education-reveal');
		var researchEntries = $('.research-journal-page .research-phase, .research-journal-page .research-transition').addClass('research-entry-reveal');
		var portfolioTwoEntries = $('.portfolio-two-page .portfolio-two-meta-grid, .portfolio-two-page .portfolio-two-process-grid, .portfolio-two-page .portfolio-two-method-detail .portfolio-two-comparison-wrap, .portfolio-two-page .portfolio-two-content .portfolio-two-subsection-heading, .portfolio-two-page .portfolio-two-content .single-about-txt, .portfolio-two-page .portfolio-two-flow-wrap, .portfolio-two-page .portfolio-two-finding-grid, .portfolio-two-page .portfolio-two-content .portfolio-two-comparison-wrap, .portfolio-two-page .portfolio-two-constraint-map, .portfolio-two-page .portfolio-two-implication, .portfolio-two-page .portfolio-two-next-step').addClass('portfolio-two-entry-reveal');
		var portfolioOneEntries = $('.portfolio-one-page .case-study-meta-grid, .portfolio-one-page .case-study-process-grid, .portfolio-one-page .case-study-condition-grid, .portfolio-one-page #method .single-horizontal-timeline, .portfolio-one-page #task-design .single-timeline-box, .portfolio-one-page #study-design .single-timeline-box, .portfolio-one-page #analysis .single-about-txt, .portfolio-one-page #analysis .case-study-analysis-note, .portfolio-one-page #analysis .case-study-finding-grid, .portfolio-one-page #analysis .col-sm-8, .portfolio-one-page .case-study-implication, .portfolio-one-page .case-study-lesson-grid, .portfolio-one-page .case-study-next-step').addClass('portfolio-one-entry-reveal');
		if ('IntersectionObserver' in window) {
			var experienceObserver = new IntersectionObserver(function(entries){
				entries.forEach(function(entry){
					if (entry.isIntersecting) {
						$(entry.target).addClass('is-visible');
						experienceObserver.unobserve(entry.target);
					}
				});
			},{threshold:.18,rootMargin:'-6% 0px -28% 0px'});

			experienceEntries.each(function(){experienceObserver.observe(this);});

			var educationObserver = new IntersectionObserver(function(entries){
				entries.forEach(function(entry){
					if (entry.isIntersecting) {
						$(entry.target).addClass('is-visible');
						educationObserver.unobserve(entry.target);
					}
				});
			},{threshold:.2,rootMargin:'-5% 0px -28% 0px'});

			educationEntries.each(function(){educationObserver.observe(this);});

			var researchObserver = new IntersectionObserver(function(entries){
				entries.forEach(function(entry){
					if (entry.isIntersecting) {
						$(entry.target).addClass('is-visible');
						researchObserver.unobserve(entry.target);
					}
				});
			},{threshold:.16,rootMargin:'-4% 0px -8% 0px'});

			researchEntries.each(function(){researchObserver.observe(this);});

			var portfolioTwoObserver = new IntersectionObserver(function(entries){
				entries.forEach(function(entry){
					if (entry.isIntersecting) {
						$(entry.target).addClass('is-visible');
						portfolioTwoObserver.unobserve(entry.target);
					}
				});
			},{threshold:.16,rootMargin:'-4% 0px -8% 0px'});

			portfolioTwoEntries.each(function(){portfolioTwoObserver.observe(this);});

			var portfolioOneObserver = new IntersectionObserver(function(entries){
				entries.forEach(function(entry){
					if (entry.isIntersecting) {
						$(entry.target).addClass('is-visible');
						portfolioOneObserver.unobserve(entry.target);
					}
				});
			},{threshold:.16,rootMargin:'-4% 0px -8% 0px'});

			portfolioOneEntries.each(function(){portfolioOneObserver.observe(this);});
		} else {
			experienceEntries.addClass('is-visible');
			educationEntries.addClass('is-visible');
			researchEntries.addClass('is-visible');
			portfolioTwoEntries.addClass('is-visible');
			portfolioOneEntries.addClass('is-visible');
		}

		// Draw a changing relationship as one continuous curve through every factor.
		var relationshipCanvas = document.querySelector('.hero-about-sequence-curve');
		if (relationshipCanvas && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			var relationshipContext = relationshipCanvas.getContext('2d');
			var relationshipNodes = Array.prototype.slice.call(document.querySelectorAll('.hero-about-sequence-node'));
			var relationshipCycle = 9600;
			function drawRelationshipCurve(now) {
				var width = relationshipCanvas.clientWidth;
				var height = relationshipCanvas.clientHeight;
				var ratio = window.devicePixelRatio || 1;
				if (relationshipCanvas.width !== Math.round(width * ratio) || relationshipCanvas.height !== Math.round(height * ratio)) {
					relationshipCanvas.width = Math.round(width * ratio);
					relationshipCanvas.height = Math.round(height * ratio);
				}
				relationshipContext.setTransform(ratio,0,0,ratio,0,0);
				relationshipContext.clearRect(0,0,width,height);
				var phase = (now % relationshipCycle) / relationshipCycle;
				if (phase >= .82 && phase <= .995) {
					var progress = Math.min(1,(phase - .82) / .13);
					progress = progress * progress * (3 - 2 * progress);
					progress = Math.max(0,Math.min(1,progress + Math.sin(progress * Math.PI * 4) * .025));
					var curveOpacity = phase > .95 ? Math.max(0,1 - ((phase - .95) / .045)) : 1;
					var nodeAnchors = width <= 430 ? [.15217,.5,.84783] : [.26087,.5,.73913];
					var anchors = [0,nodeAnchors[0],nodeAnchors[1],nodeAnchors[2],1];
					var amplitudes = [-9,12,-12,10];
					var baseline = 20;
					var endX = width * progress;
					var startX = Math.max(0,endX - (width * .48));
					function curveY(x) {
						var normalizedX = x / width;
						var segment = 0;
						while (segment < anchors.length - 2 && normalizedX > anchors[segment + 1]) segment++;
						var start = anchors[segment];
						var finish = anchors[segment + 1];
						var local = Math.max(0,Math.min(1,(normalizedX - start) / (finish - start)));
						return baseline + amplitudes[segment] * Math.sin(Math.PI * local);
					}
					relationshipContext.beginPath();
					relationshipContext.moveTo(startX,curveY(startX));
					for (var x = startX + 2; x <= endX; x += 2) {
						relationshipContext.lineTo(x,curveY(x));
					}
					var movingFade = relationshipContext.createLinearGradient(startX,0,Math.max(startX + 1,endX),0);
					movingFade.addColorStop(0,'rgba(249,44,44,0)');
					movingFade.addColorStop(.35,'rgba(249,44,44,.42)');
					movingFade.addColorStop(1,'rgba(249,44,44,1)');
					relationshipContext.strokeStyle = movingFade;
					relationshipContext.globalAlpha = curveOpacity;
					relationshipContext.lineWidth = 2;
					relationshipContext.lineCap = 'round';
					relationshipContext.lineJoin = 'round';
					relationshipContext.stroke();
					relationshipContext.globalAlpha = 1;
					relationshipNodes.forEach(function(node,index){
						var nodePosition = nodeAnchors[index];
						var emphasis = Math.max(0,1 - Math.abs(progress - nodePosition) / .09);
						node.style.setProperty('--curve-emphasis',emphasis.toFixed(2));
					});
				} else {
					relationshipNodes.forEach(function(node){node.style.setProperty('--curve-emphasis','0');});
				}
				window.requestAnimationFrame(drawRelationshipCurve);
			}
			window.requestAnimationFrame(drawRelationshipCurve);
		}

});
