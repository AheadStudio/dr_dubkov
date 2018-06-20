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
					Reveal.initialize({
						width: "100%",
						height: "100%",
						margin: 0,
						autoPlayMedia: true,
						slideNumber: false,
						progress: false,
						controls: false,
						history: true,
						help: false,

						loop: false,
						keyboard: true
					});
				}

			}

		};

	})();

	DR_DUBKOV.slider.init();
})(jQuery);
