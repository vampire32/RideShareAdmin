"use strict";

// document.querySelector(window).addEventListener("load", function () {
// 	document.querySelector(".loader").fadeOut("slow");
// });

// feather.replace();
// // Global
document.querySelector(function () {
	let sidebar_nicescroll_opts = {
			cursoropacitymin: 0,
			cursoropacitymax: 0.8,
			zindex: 892,
		},
		now_layout_class = null;

	var sidebar_sticky = function () {
		if (document.body.classList.contains("layout-2")) {
			document.querySelector("body.layout-2 #sidebar-wrapper").stick_in_parent({
				parent: document.body,
			});
			document
				.querySelector("body.layout-2 #sidebar-wrapper")
				.stick_in_parent({ recalc_every: 1 });
		}
	};
	sidebar_sticky();

	var sidebar_nicescroll;
	var update_sidebar_nicescroll = function () {
		let a = setInterval(function () {
			if (sidebar_nicescroll != null) sidebar_nicescroll.resize();
		}, 10);

		setTimeout(function () {
			clearInterval(a);
		}, 600);
	};

	var sidebar_dropdown = function () {
		if (document.querySelector(".main-sidebar").length) {
			document
				.querySelector(".main-sidebar")
				.niceScroll(sidebar_nicescroll_opts);
			sidebar_nicescroll = document
				.querySelector(".main-sidebar")
				.getNiceScroll();

			document
				.querySelector(".main-sidebar .sidebar-menu li a.has-dropdown")
				.removeEventListener("click")
				.addEventListener("click", function () {
					var me = document.querySelector(this);

					me.parent()
						.querySelector("> .dropdown-menu")
						.slideToggle(500, function () {
							update_sidebar_nicescroll();
							return false;
						});
					return false;
				});
		}
	};
	sidebar_dropdown();

	if (document.querySelector("#top-5-scroll").length) {
		document
			.querySelector("#top-5-scroll")
			.css({
				height: 315,
			})
			.niceScroll();
	}
	if (document.querySelector("#scroll-new").length) {
		document
			.querySelector("#scroll-new")
			.css({
				height: 200,
			})
			.niceScroll();
	}

	document.querySelector(".main-content").css({
		minHeight: document.querySelector(window).outerHeight() - 95,
	});

	document.querySelector(".nav-collapse-toggle").click(function () {
		document
			.querySelector(this)
			.parent()
			.querySelector(".navbar-nav")
			.classList.toggle("show");
		return false;
	});

	document.querySelector(document).addEventListener("click", function (e) {
		document
			.querySelector(".nav-collapse .navbar-nav")
			.classList.remove("show");
	});

	var toggle_sidebar_mini = function (mini) {
		let body = document.body;

		if (!mini) {
			body.classList.remove("sidebar-mini");
			document.querySelector(".main-sidebar").css({
				overflow: "hidden",
			});
			setTimeout(function () {
				document
					.querySelector(".main-sidebar")
					.niceScroll(sidebar_nicescroll_opts);
				sidebar_nicescroll = document
					.querySelector(".main-sidebar")
					.getNiceScroll();
			}, 500);
			document
				.querySelector(".main-sidebar .sidebar-menu > li > ul .dropdown-title")
				.remove();
			document
				.querySelector(".main-sidebar .sidebar-menu > li > a")
				.removeAttr("data-toggle");
			document
				.querySelector(".main-sidebar .sidebar-menu > li > a")
				.removeAttr("data-original-title");
			document
				.querySelector(".main-sidebar .sidebar-menu > li > a")
				.removeAttr("title");
		} else {
			body.classList.add("sidebar-mini");
			body.classList.remove("sidebar-show");
			sidebar_nicescroll.remove();
			sidebar_nicescroll = null;
			document
				.querySelector(".main-sidebar .sidebar-menu > li")
				.each(function () {
					let me = document.querySelector(this);

					if (me.querySelector("> .dropdown-menu").length) {
						me.querySelector("> .dropdown-menu").hide();
						me.querySelector("> .dropdown-menu").prepend(
							'<li class="dropdown-title pt-3">' +
								me.querySelector("> a").text() +
								"</li>"
						);
					} else {
						me.querySelector("> a").attr("data-toggle", "tooltip");
						me.querySelector("> a").attr(
							"data-original-title",
							me.querySelector("> a").text()
						);
						document.querySelector("[data-toggle='tooltip']").tooltip({
							placement: "right",
						});
					}
				});
		}
	};

	// sticky header toggle function
	var toggle_sticky_header = function (sticky) {
		if (!sticky) {
			document.querySelector(".main-navbar")[0].classList.remove("sticky");
		} else {
			document.querySelector(".main-navbar")[0].classList += " sticky";
		}
	};

	document
		.querySelector(".menu-toggle")
		.addEventListener("click", function (e) {
			var $this = document.querySelector(this);
			$this.classList.toggle("toggled");
		});

	$.each(
		document.querySelector(".main-sidebar .sidebar-menu li.active"),
		function (i, val) {
			var $activeAnchors = document.querySelector(val).querySelector("a:eq(0)");

			$activeAnchors.classList.add("toggled");
			$activeAnchors.nextElementSibling.show();
		}
	);

	document.querySelector("[data-toggle='sidebar']").click(function () {
		var body = document.body,
			w = document.querySelector(window);

		if (w.outerWidth() <= 1024) {
			body.classList.remove("search-show search-gone");
			if (body.classList.contains("sidebar-gone")) {
				body.classList.remove("sidebar-gone");
				body.classList.add("sidebar-show");
			} else {
				body.classList.add("sidebar-gone");
				body.classList.remove("sidebar-show");
			}

			update_sidebar_nicescroll();
		} else {
			body.classList.remove("search-show search-gone");
			if (body.classList.contains("sidebar-mini")) {
				toggle_sidebar_mini(false);
			} else {
				toggle_sidebar_mini(true);
			}
		}

		return false;
	});

	var toggleLayout = function () {
		var w = document.querySelector(window),
			layout_class = document.body.className || "",
			layout_classes =
				layout_class.trim().length > 0 ? layout_class.split(" ") : "";

		if (layout_classes.length > 0) {
			layout_classes.forEach(function (item) {
				if (item.indexOf("layout-") != -1) {
					now_layout_class = item;
				}
			});
		}

		if (w.outerWidth() <= 1024) {
			if (document.body.classList.contains("sidebar-mini")) {
				toggle_sidebar_mini(false);
				document
					.querySelector(".main-sidebar")
					.niceScroll(sidebar_nicescroll_opts);
				sidebar_nicescroll = document
					.querySelector(".main-sidebar")
					.getNiceScroll();
			}

			document.body.classList.add("sidebar-gone");
			document.body.classList.remove(
				"layout-2 layout-3 sidebar-mini sidebar-show"
			);
			document.body
				.removeEventListener("click")
				.addEventListener("click", function (e) {
					if (
						document
							.querySelector(e.target)
							.classList.contains("sidebar-show") ||
						document.querySelector(e.target).classList.contains("search-show")
					) {
						document.body.classList.remove("sidebar-show");
						document.body.classList.add("sidebar-gone");
						document.body.classList.remove("search-show");

						update_sidebar_nicescroll();
					}
				});

			update_sidebar_nicescroll();

			if (now_layout_class == "layout-3") {
				let nav_second_classes =
						document.querySelector(".navbar-secondary").className,
					nav_second = document.querySelector(".navbar-secondary");

				nav_second.attr("data-nav-classes", nav_second_classes);
				nav_second.removeAttr("class");
				nav_second.classList.add("main-sidebar");

				let main_sidebar = document.querySelector(".main-sidebar");
				main_sidebar
					.querySelector(".container")
					.classList.add("sidebar-wrapper")
					.classList.remove("container");
				main_sidebar
					.querySelector(".navbar-nav")
					.classList.add("sidebar-menu")
					.classList.remove("navbar-nav");
				main_sidebar
					.querySelector(".sidebar-menu .nav-item.dropdown.show a")
					.click();
				main_sidebar.querySelector(".sidebar-brand").remove();
				main_sidebar.querySelector(".sidebar-menu").before(
					document
						.querySelector("<div>", {
							class: "sidebar-brand",
						})
						.insertAdjacentHTML(
							"beforeend",
							document
								.querySelector("<a>", {
									href: document.querySelector(".navbar-brand").attr("href"),
								})
								.html(document.querySelector(".navbar-brand").html())
						)
				);
				setTimeout(function () {
					sidebar_nicescroll = main_sidebar.niceScroll(sidebar_nicescroll_opts);
					sidebar_nicescroll = main_sidebar.getNiceScroll();
				}, 700);

				sidebar_dropdown();
				document.querySelector(".main-wrapper").classList.remove("container");
			}
		} else {
			document.body.classList.remove("sidebar-gone sidebar-show");
			if (now_layout_class) document.body.classList.add(now_layout_class);

			let nav_second_classes = document
					.querySelector(".main-sidebar")
					.attr("data-nav-classes"),
				nav_second = document.querySelector(".main-sidebar");

			if (
				now_layout_class == "layout-3" &&
				nav_second.classList.contains("main-sidebar")
			) {
				nav_second
					.querySelector(".sidebar-menu li a.has-dropdown")
					.removeEventListener("click");
				nav_second.querySelector(".sidebar-brand").remove();
				nav_second.removeAttr("class");
				nav_second.classList.add(nav_second_classes);

				let main_sidebar = document.querySelector(".navbar-secondary");
				main_sidebar
					.querySelector(".sidebar-wrapper")
					.classList.add("container")
					.classList.remove("sidebar-wrapper");
				main_sidebar
					.querySelector(".sidebar-menu")
					.classList.add("navbar-nav")
					.classList.remove("sidebar-menu");
				main_sidebar.querySelector(".dropdown-menu").hide();
				main_sidebar.removeAttr("style");
				main_sidebar.removeAttr("tabindex");
				main_sidebar.removeAttr("data-nav-classes");
				document.querySelector(".main-wrapper").classList.add("container");
				// if(sidebar_nicescroll != null)
				//   sidebar_nicescroll.remove();
			} else if (now_layout_class == "layout-2") {
				document.body.classList.add("layout-2");
			} else {
				update_sidebar_nicescroll();
			}
		}
	};
	toggleLayout();
	document.querySelector(window).resize(toggleLayout);

	document.querySelector("[data-toggle='search']").click(function () {
		var body = document.body;

		if (body.classList.contains("search-gone")) {
			body.classList.add("search-gone");
			body.classList.remove("search-show");
		} else {
			body.classList.remove("search-gone");
			body.classList.add("search-show");
		}
	});

	// tooltip
	document.querySelector("[data-toggle='tooltip']").tooltip();

	// popover
	document.querySelector('[data-toggle="popover"]').popover({
		container: "body",
	});

	// Select2
	if (jQuery().select2) {
		document.querySelector(".select2").select2();
	}

	// Selectric
	if (jQuery().selectric) {
		document.querySelector(".selectric").selectric({
			disableOnMobile: false,
			nativeOnMobile: false,
		});
	}

	document.querySelector(".notification-toggle").dropdown();
	document
		.querySelector(".notification-toggle")
		.parent()
		.addEventListener("shown.bs.dropdown", function () {
			document.querySelector(".dropdown-list-icons").niceScroll({
				cursoropacitymin: 0.3,
				cursoropacitymax: 0.8,
				cursorwidth: 7,
			});
		});

	document.querySelector(".message-toggle").dropdown();
	document
		.querySelector(".message-toggle")
		.parent()
		.addEventListener("shown.bs.dropdown", function () {
			document.querySelector(".dropdown-list-message").niceScroll({
				cursoropacitymin: 0.3,
				cursoropacitymax: 0.8,
				cursorwidth: 7,
			});
		});

	if (jQuery().summernote) {
		document.querySelector(".summernote").summernote({
			dialogsInBody: true,
			minHeight: 250,
		});
		document.querySelector(".summernote-simple").summernote({
			dialogsInBody: true,
			minHeight: 150,
			toolbar: [
				["style", ["bold", "italic", "underline", "clear"]],
				["font", ["strikethrough"]],
				["para", ["paragraph"]],
			],
		});
	}

	// Dismiss function
	document.querySelector("[data-dismiss]").each(function () {
		var me = document.querySelector(this),
			target = me.data("dismiss");

		me.click(function () {
			document.querySelector(target).fadeOut(function () {
				document.querySelector(target).remove();
			});
			return false;
		});
	});

	// Collapsable
	document.querySelector("[data-collapse]").each(function () {
		var me = document.querySelector(this),
			target = me.data("collapse");

		me.click(function () {
			document.querySelector(target).collapse("toggle");
			document
				.querySelector(target)
				.addEventListener("shown.bs.collapse", function () {
					me.html('<i class="fas fa-minus"></i>');
				});
			document
				.querySelector(target)
				.addEventListener("hidden.bs.collapse", function () {
					me.html('<i class="fas fa-plus"></i>');
				});
			return false;
		});
	});

	// Background
	document.querySelector("[data-background]").each(function () {
		var me = document.querySelector(this);
		me.css({
			backgroundImage: "url(" + me.data("background") + ")",
		});
	});

	// Custom Tab
	document.querySelector("[data-tab]").each(function () {
		var me = document.querySelector(this);

		me.click(function () {
			if (!me.classList.contains("active")) {
				var tab_group = document.querySelector(
						'[data-tab-group="' + me.data("tab") + '"]'
					),
					tab_group_active = document.querySelector(
						'[data-tab-group="' + me.data("tab") + '"].active'
					),
					target = document.querySelector(me.attr("href")),
					links = document.querySelector('[data-tab="' + me.data("tab") + '"]');

				links.classList.remove("active");
				me.classList.add("active");
				target.classList.add("active");
				tab_group_active.classList.remove("active");
			}
			return false;
		});
	});

	// Bootstrap 4 Validation
	document.querySelector(".needs-validation").submit(function () {
		var form = document.querySelector(this);
		if (form[0].checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		}
		form.classList.add("was-validated");
	});

	// alert dismissible
	document.querySelector(".alert-dismissible").each(function () {
		var me = document.querySelector(this);

		me.querySelector(".close").click(function () {
			me.alert("close");
		});
	});

	if (document.querySelector(".main-navbar").length) {
	}

	// Image cropper
	document.querySelector("[data-crop-image]").each(function (e) {
		document.querySelector(this).css({
			overflow: "hidden",
			position: "relative",
			height: document.querySelector(this).data("crop-image"),
		});
	});

	// Slide Toggle
	document.querySelector("[data-toggle-slide]").click(function () {
		let target = document.querySelector(this).data("toggle-slide");

		document.querySelector(target).slideToggle();
		return false;
	});

	// Dismiss modal
	document.querySelector("[data-dismiss=modal]").click(function () {
		document.querySelector(this).closest(".modal").modal("hide");

		return false;
	});

	// Width attribute
	document.querySelector("[data-width]").each(function () {
		document.querySelector(this).css({
			width: document.querySelector(this).data("width"),
		});
	});

	// Height attribute
	document.querySelector("[data-height]").each(function () {
		document.querySelector(this).css({
			height: document.querySelector(this).data("height"),
		});
	});

	// Chocolat
	if (document.querySelector(".chocolat-parent").length && jQuery().Chocolat) {
		document.querySelector(".chocolat-parent").Chocolat();
	}

	// Sortable card
	if (document.querySelector(".sortable-card").length && jQuery().sortable) {
		document.querySelector(".sortable-card").sortable({
			handle: ".card-header",
			opacity: 0.8,
			tolerance: "pointer",
		});
	}

	// Daterangepicker
	if (jQuery().daterangepicker) {
		if (document.querySelector(".datepicker").length) {
			document.querySelector(".datepicker").daterangepicker({
				locale: { format: "YYYY-MM-DD" },
				singleDatePicker: true,
			});
		}
		if (document.querySelector(".datetimepicker").length) {
			document.querySelector(".datetimepicker").daterangepicker({
				locale: { format: "YYYY-MM-DD hh:mm" },
				singleDatePicker: true,
				timePicker: true,
				timePicker24Hour: true,
			});
		}
		if (document.querySelector(".daterange").length) {
			document.querySelector(".daterange").daterangepicker({
				locale: { format: "YYYY-MM-DD" },
				drops: "down",
				opens: "right",
			});
		}
	}

	// Timepicker
	if (jQuery().timepicker && document.querySelector(".timepicker").length) {
		document.querySelector(".timepicker").timepicker({
			icons: {
				up: "fas fa-chevron-up",
				down: "fas fa-chevron-down",
			},
		});
	}

	document
		.querySelector("#mini_sidebar_setting")
		.addEventListener("change", function () {
			var _val = document.querySelector(this).is(":checked")
				? "checked"
				: "unchecked";
			if (_val === "checked") {
				toggle_sidebar_mini(true);
			} else {
				toggle_sidebar_mini(false);
			}
		});
	document
		.querySelector("#sticky_header_setting")
		.addEventListener("change", function () {
			if (
				document.querySelector(".main-navbar")[0].classList.contains("sticky")
			) {
				toggle_sticky_header(false);
			} else {
				toggle_sticky_header(true);
			}
		});

	document
		.querySelector(".theme-setting-toggle")
		.addEventListener("click", function () {
			if (
				document.querySelector(".theme-setting")[0].classList.contains("active")
			) {
				document.querySelector(".theme-setting")[0].classList.remove("active");
			} else {
				document.querySelector(".theme-setting")[0].classList += " active";
			}
		});

	// full screen call

	document
		.querySelector(document)
		.addEventListener("click", ".fullscreen-btn", function (e) {
			if (
				!document.fullscreenElement && // alternative standard method
				!document.mozFullScreenElement &&
				!document.webkitFullscreenElement &&
				!document.msFullscreenElement
			) {
				// current working methods
				if (document.documentElement.requestFullscreen) {
					document.documentElement.requestFullscreen();
				} else if (document.documentElement.msRequestFullscreen) {
					document.documentElement.msRequestFullscreen();
				} else if (document.documentElement.mozRequestFullScreen) {
					document.documentElement.mozRequestFullScreen();
				} else if (document.documentElement.webkitRequestFullscreen) {
					document.documentElement.webkitRequestFullscreen(
						Element.ALLOW_KEYBOARD_INPUT
					);
				}
			} else {
				if (document.exitFullscreen) {
					document.exitFullscreen();
				} else if (document.msExitFullscreen) {
					document.msExitFullscreen();
				} else if (document.mozCancelFullScreen) {
					document.mozCancelFullScreen();
				} else if (document.webkitExitFullscreen) {
					document.webkitExitFullscreen();
				}
			}
		});

	// setting sidebar

	document
		.querySelector(".settingPanelToggle")
		.addEventListener("click", function () {
			document
				.querySelector(".settingSidebar")
				.classList.toggle("showSettingPanel");
		}),
		document
			.querySelector(".page-wrapper")
			.addEventListener("click", function () {
				document
					.querySelector(".settingSidebar")
					.classList.remove("showSettingPanel");
			});

	// close right sidebar when click outside
	var mouse_is_inside = false;
	document.querySelector(".settingSidebar").hover(
		function () {
			mouse_is_inside = true;
		},
		function () {
			mouse_is_inside = false;
		}
	);

	document.body.mouseup(function () {
		if (!mouse_is_inside)
			document
				.querySelector(".settingSidebar")
				.classList.remove("showSettingPanel");
	});

	document.querySelector(".settingSidebar-body").niceScroll();

	// theme change event
	document
		.querySelector(".choose-theme li")
		.addEventListener("click", function () {
			var bodytag = document.body,
				selectedTheme = document.querySelector(this),
				prevTheme = document
					.querySelector(".choose-theme li.active")
					.attr("title");

			document.querySelector(".choose-theme li").classList.remove("active"),
				selectedTheme.classList.add("active");
			document.querySelector(".choose-theme li.active").data("theme");

			bodytag.classList.remove("theme-" + prevTheme);
			bodytag.classList.add(
				"theme-" + document.querySelector(this).attr("title")
			);
		});

	// dark light sidebar button setting
	document.querySelector(".sidebar-color input:radio").change(function () {
		if (document.querySelector(this).value == "1") {
			document.body.classList.remove("dark-sidebar");
			document.body.classList.add("light-sidebar");
		} else {
			document.body.classList.remove("light-sidebar");
			document.body.classList.add("dark-sidebar");
		}
	});

	// dark light layout button setting
	document.querySelector(".layout-color input:radio").change(function () {
		if (document.querySelector(this).value == "1") {
			document.body.classList.remove();
			document.body.classList.add("light");
			document.body.classList.add("light-sidebar");
			document.body.classList.add("theme-white");

			document.querySelector(".choose-theme li").classList.remove("active");
			document
				.querySelector(".choose-theme li[title|='white']")
				.classList.add("active");
			document
				.querySelector(".selectgroup-input[value|='1']")
				.prop("checked", true);
		} else {
			document.body.classList.remove();
			document.body.classList.add("dark");
			document.body.classList.add("dark-sidebar");
			document.body.classList.add("theme-black");

			document.querySelector(".choose-theme li").classList.remove("active");
			document
				.querySelector(".choose-theme li[title|='black']")
				.classList.add("active");
			document
				.querySelector(".selectgroup-input[value|='2']")
				.prop("checked", true);
		}
	});

	// restore default to dark theme
	document
		.querySelector(".btn-restore-theme")
		.addEventListener("click", function () {
			//remove all class from body
			document.body.classList.remove();
			jQuery("body").classList.add("light");
			jQuery("body").classList.add("light-sidebar");
			jQuery("body").classList.add("theme-white");

			// set default theme
			document.querySelector(".choose-theme li").classList.remove("active");
			document
				.querySelector(".choose-theme li[title|='white']")
				.classList.add("active");

			document
				.querySelector(".select-layout[value|='1']")
				.prop("checked", true);
			document
				.querySelector(".select-sidebar[value|='2']")
				.prop("checked", true);
			toggle_sidebar_mini(false);
			document.querySelector("#mini_sidebar_setting").prop("checked", false);
			document.querySelector("#sticky_header_setting").prop("checked", true);
			toggle_sticky_header(true);
		});

	//start up class add

	//add default class on body tag
	jQuery("body").classList.add("light");
	jQuery("body").classList.add("light-sidebar");
	jQuery("body").classList.add("theme-white");
	// set theme default color
	document.querySelector(".choose-theme li").classList.remove("active");
	document
		.querySelector(".choose-theme li[title|='white']")
		.classList.add("active");
	//set default dark or light layout(1=light, 2=dark)
	document.querySelector(".select-layout[value|='1']").prop("checked", true);
	//set default dark or light sidebar(1=light, 2=dark)
	document.querySelector(".select-sidebar[value|='1']").prop("checked", true);
	// sticky header default set to true
	document.querySelector("#sticky_header_setting").prop("checked", true);
});
