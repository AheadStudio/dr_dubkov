(function($) {
	var DR_DUBKOV = (function() {

		var $sel = {};
		$sel.window = $(window);
		$sel.html = $("html");
		$sel.body = $("body", $sel.html);

		return {

			slider: {

				init: function() {
					var self = this;

					if ($(window).width() > 1000) {
						Reveal.initialize({
							width: "100%",
							height: "100%",
							margin: 0,
							slideNumber: false,
							progress: false,
							controls: false,
							history: true,
							help: false,
							transition: "fade",
							transitionSpeed: "slow",
							loop: false,
							keyboard: true
						});

						Reveal.addEventListener("ready", function(event) {
							var countSlider = Reveal.getTotalSlides(),
								currentSlide = Number($(Reveal.getCurrentSlide()).attr("id").replace("slide_", "")),
								$pointContainer = $(".slider-point");

							for (var i = 1; i <= countSlider; i++) {
								if (currentSlide == i) {
									var $newPoint = $("<button type='button' class='slider-point-item active' data-slide='slide_"+i+"'></button>");
									$pointContainer.append($newPoint);
								} else {
									var $newPoint = $("<button type='button' class='slider-point-item' data-slide='slide_"+i+"'></button>");
									$pointContainer.append($newPoint);
								}
								$newPoint.on("click", function() {
									var el = $(this),
										numberSlide = Number(el.data("slide").replace("slide_", ""));

									Reveal.slide(1, numberSlide-1);

									Reveal.addEventListener("slidechanged", function( event ) {
										var firstSlide = Reveal.isFirstSlide(),
											lastSlide = Reveal.isLastSlide();

										if (lastSlide) {
											$(".slider-arrow").css("transform", "rotate(180deg)")
											$(".slider-arrow").addClass("back");
										}
										if (firstSlide) {
											$(".slider-arrow").css("transform", "rotate(0)")
											$(".slider-arrow").removeClass("back");
										}
									});
								});
							}


							Reveal.addEventListener("slidechanged", function( event ) {
								var currentSlide = $(Reveal.getCurrentSlide()).attr("id"),
									$pointContainer = $(".slider-point"),
									$point = $pointContainer.find(".slider-point-item");

								$point.removeClass("active");

								$point.each(function() {
									var item = $(this),
										data = item.data("slide");

									if (data == currentSlide) {
										item.addClass("active");
									}
								})

							});

							$(".slider-arrow").on("click", function() {
								var button = $(this);

								Reveal.addEventListener("slidechanged", function( event ) {
									var firstSlide = Reveal.isFirstSlide(),
										lastSlide = Reveal.isLastSlide();

									if (lastSlide) {
										button.css("transform", "rotate(180deg)")
										button.addClass("back");
									}
									if (firstSlide) {
										button.css("transform", "rotate(0)")
										button.removeClass("back");
									}
								});

								if (button.hasClass("back")) {
									Reveal.prev();
								} else {
									Reveal.next();
								}

							});

							$sel.window.mousewheel(function(event) {
								if (event.deltaY == "-1") {
									Reveal.next();
								}
								if (event.deltaY == "1") {
									Reveal.prev();
								}
							});
							
						});
					} else {
						var $mainBlock = $(".reveal");

						$mainBlock.removeClass("reveal");
					}
				}

			},

			map: {
				googleMap: function() {
					$("#mapGoogle", $sel.body).each(function() {
						var $map = $(this),
							lng = parseFloat($map.data("lng"), 10) || 0,
							lat = parseFloat($map.data("lat"), 10) || 0,
							zoom = parseInt($map.data("zoom"));

						var options = {
							center: new google.maps.LatLng(lat, lng),
							zoom: zoom,
							mapTypeControl: false,
							panControl: false,
							zoomControl: true,
							zoomControlOptions: {
								style: google.maps.ZoomControlStyle.LARGE,
								position: google.maps.ControlPosition.TOP_RIGHT
							},
							scaleControl: true,
							streetViewControl: true,
							streetViewControlOptions: {
								position: google.maps.ControlPosition.TOP_RIGHT
							},
							mapTypeId: google.maps.MapTypeId.ROADMAP,
							/*styles: [
								{"featureType": "landscape", "stylers": [
									{"saturation": -100},
									{"lightness": 0},
									{"visibility": "on"}
								]},
								{"featureType": "poi", "stylers": [
									{"saturation": -300},
									{"lightness": -10},
									{"visibility": "simplified"}
								]},
								{"featureType": "road.highway", "stylers": [
									{"saturation": -100},
									{"visibility": "simplified"}
								]},
								{"featureType": "road.arterial", "stylers": [
									{"saturation": -100},
									{"lightness": 0},
									{"visibility": "on"}
								]},
								{"featureType": "road.local", "stylers": [
									{"saturation": -100},
									{"lightness": 0},
									{"visibility": "on"}
								]},
								{"featureType": "transit", "stylers": [
									{"saturation": -100},
									{"visibility": "simplified"}
								]},
								{"featureType": "administrative.province", "stylers": [
									{"visibility": "off"}
								]},
								{"featureType": "water", "elementType": "labels", "stylers": [
									{"visibility": "on"},
									{"lightness": -25},
									{"saturation": -100}
								]},
								{"featureType": "water", "elementType": "geometry", "stylers": [
									{"hue": "#ffff00"},
									{"lightness": -25},
									{"saturation": -97}
								]}
							]*/
						};

						var iconMap= {
							url: $map.data("icon"),
							size: new google.maps.Size(45, 65),
						};
						var api = new google.maps.Map($map[0], options);
						var point = new google.maps.Marker({
							position: new google.maps.LatLng(lat, lng),
							map: api
						});

					});
				},

			}

		};

	})();

	DR_DUBKOV.slider.init();
	DR_DUBKOV.map.googleMap();
})(jQuery);
