/*
 * Javascript for right popup
 */

(function ($) {

	// use strict
	"use strict";

	$.gm_side_popup_opened = false;

	$.fn.extend({
		gm_side_popup: function (opts) {

			opts = $.extend({
				before: function () {
				},
				done: function () {
				},
				beforeClose: function () {
				},
				closed: function () {
				},

				duration: 600
			}, opts);

			$(this).on("click", function (e) {
				e.preventDefault();

				$.popup_opts = opts;

				var obj = $(this);
				$.popup_opts.before(obj);

				$(".gm--side-popup-wrap").show();
				setTimeout(function () {
					$("body").addClass("gm--side-popup-open");
				}, 10);

				setTimeout(function () {
					$.popup_opts.done(obj);

					$.gm_side_popup_opened = true;
				}, $.popup_opts.duration + 10);
			});
		}
	});

	$.gm_side_popup_close = function () {
		if ($.gm_side_popup_opened && $("body").hasClass("gm--side-popup-open")) {
			$.popup_opts.beforeClose();

			$("body").removeClass("gm--side-popup-open");

			setTimeout(function () {
				$(".gm--side-popup-wrap").hide();
				$.popup_opts.closed();

				$.gm_side_popup_opened = false;
			}, $.popup_opts.duration);
		}
	};

	$(document).on("click", function (event) {
		if (!$(event.target).closest(".gm--side-popup-wrap .gm--side-popup-container").length) {
			$.gm_side_popup_close();
		}
	});

	$(document).on("click", ".gm--side-popup-close", function (e) {
		e.preventDefault();
		$.gm_side_popup_close();
	});

	$(document).on('ready', function () {

		if (!$(".gm--side-popup-wrap").length) {
			$("body").append("\
				<div class=\"gm--side-popup-wrap\">\
					<div class=\"gm--side-popup-container\"></div>\
				</div>\
			");
		}
		$(".open-gm--side-popup").each(function () {
			// get link
			// var link = $(this).attr("href");
			// if (link != "" && link.indexOf("teammember_profile") !== -1) {
				// if link has ajax url, need popup
				$(this).gm_side_popup({
					before: function ($this) {
						// clear previous html content
						// $(".gm--side-popup-container").html('');
						// show pre-loader
						// var preloader = $.ajaxPreloader($(".gm--side-popup-container")).show();
						// get link
						// var url = $this.attr("href");

						// $.get(url).done(function (response) {
						// 	$(".gm--side-popup-container").html(response);
						// });
					},
					done: function ($this) {
					},
					beforeClose: function () {
					},
					closed: function () {
					}
				});
			// }
		});
	});
})(jQuery);