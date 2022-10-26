
$(function () {
    $(window).on("load", function () {
        $(".loader-image").fadeOut("hide");


    });

    $(document).on("scroll", window, function () {
        if ($(window).scrollTop() > 100) {
            $(".nav-menu").css({
                "position": "fixed",
                "background-color": "white",
                "height": "80px",
                "z-index": "999",
                "left": "0",
                "top": "0",
                "right": "0"


            });
            $("#up").css({
                "background": "linear-gradient(135deg, #1A153A 0%, #565178 100%)",

            })
        } else {
            $(".nav-menu").css({
                "position": "absolute",
                "background-color": "transparent",
                "height": "100px",
                "z-index": "999",
                "left": "0",
                "top": "0",
                "right": "0"
            });
            $("#up").css({
                "background": "#1A153A"
            });
          
        }


    });

    if ($(".nav-menu a.hamburger").length !== 0) {
        $(document).on("click", ".nav-menu a.hamburger", function () {
            if ($(this).find("span.regular").hasClass("active1")) {
                $(".nav-menu .hamburgerIcon span.regular").removeClass("active1");
                $(".nav-menu .hamburgerIcon span.after").removeClass("active1");
                $(".nav-menu .hamburgerIcon span.before").removeClass("active1");
            }
            else {
                $(".nav-menu .hamburgerIcon span.regular").addClass("active1");
                $(".nav-menu .hamburgerIcon span.after").addClass("active1");
                $(".nav-menu .hamburgerIcon span.before").addClass("active1");
            }
        })
    }

  
    if ($(".nav-item.dropdown").length !== 0) {
        $(document).on("click", ".nav-menu button.navbar-toggler", function () {
            $("header nav ul.navbar-nav li.dropdown .dropdown-menu.breakPoint").removeClass("navbarHoverBlock");
            if (window.matchMedia('(max-width: 375px)').matches) {
                $("header nav ul.navbar-nav li.dropdown .dropdown-menu.breakPoint").removeClass("navbarHoverBlock");
            }
            else if (window.matchMedia('(max-width: 768px)').matches) {
                $("header nav ul.navbar-nav li.dropdown .dropdown-menu.breakPoint").removeClass("navbarHoverBlock");
            }
            else if (window.matchMedia('(max-width: 812px)').matches) {
                $("header nav ul.navbar-nav li.dropdown .dropdown-menu.breakPoint").removeClass("navbarHoverBlock");
            }
        })
    }

    if ($("#design a.designList").length != 0) {
        $(document).on("mouseenter", "#design a.designList", function () {



            if (!$(this).hasClass("active2")) {
                $(this).addClass("active")
            }
        })
        $(document).on("mouseleave", "#design a.designList", function () {
            if (!$(this).hasClass("active2")) {
                $(this).removeClass("active")
            }
        })
    };


    if ($("#features a.designList").length != 0) {
        $(document).on("mouseenter", "#features a.designList", function () {


            if (!$(this).hasClass("active2")) {
                $(this).addClass("active")
            }
        })
        $(document).on("mouseleave", "#features a.designList", function () {
            if (!$(this).hasClass("active2")) {
                $(this).removeClass("active")
            }
        })
    };

    $(document).on("mouseenter", "#our-team .card", function () {
        $(this).find(".cardImage .image img").addClass("active3");
    })

    $(document).on("mouseleave", "#our-team .card", function () {
        $(this).find(".cardImage .image img").removeClass("active3");
    })

    //counter

    if ($("#ParallaxCounter").length) {
        $('.timer').countTo();
    }


    $(document).on("click", ".card-header", function(){
        $(this).parent().siblings().find(".card-body").slideUp();
        $(this).next().slideToggle();
       
    })

    if ($(window).scrollTop() > 100) {
        $(".nav-menu").css({
            "position": "fixed",
            "background-color": "white"
        })
    };

    new WOW().init();

    $(".parallax-image").parallax("50%", 0.5)
});
$(window).on("load", function () {
    $(".loader-image").fadeOut("slow");
});

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // CommonJS
        factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
  var CountTo = function (element, options) {
    this.$element = $(element);
    this.options  = $.extend({}, CountTo.DEFAULTS, this.dataOptions(), options);
    this.init();
  };

  CountTo.DEFAULTS = {
    from: 0,               // the number the element should start at
    to: 0,                 // the number the element should end at
    speed: 1000,           // how long it should take to count between the target numbers
    refreshInterval: 100,  // how often the element should be updated
    decimals: 0,           // the number of decimal places to show
    formatter: formatter,  // handler for formatting the value before rendering
    onUpdate: null,        // callback method for every time the element is updated
    onComplete: null       // callback method for when the element finishes updating
  };

  CountTo.prototype.init = function () {
    this.value     = this.options.from;
    this.loops     = Math.ceil(this.options.speed / this.options.refreshInterval);
    this.loopCount = 0;
    this.increment = (this.options.to - this.options.from) / this.loops;
  };

  CountTo.prototype.dataOptions = function () {
    var options = {
      from:            this.$element.data('from'),
      to:              this.$element.data('to'),
      speed:           this.$element.data('speed'),
      refreshInterval: this.$element.data('refresh-interval'),
      decimals:        this.$element.data('decimals')
    };

    var keys = Object.keys(options);

    for (var i in keys) {
      var key = keys[i];

      if (typeof(options[key]) === 'undefined') {
        delete options[key];
      }
    }

    return options;
  };

  CountTo.prototype.update = function () {
    this.value += this.increment;
    this.loopCount++;

    this.render();

    if (typeof(this.options.onUpdate) == 'function') {
      this.options.onUpdate.call(this.$element, this.value);
    }

    if (this.loopCount >= this.loops) {
      clearInterval(this.interval);
      this.value = this.options.to;

      if (typeof(this.options.onComplete) == 'function') {
        this.options.onComplete.call(this.$element, this.value);
      }
    }
  };

  CountTo.prototype.render = function () {
    var formattedValue = this.options.formatter.call(this.$element, this.value, this.options);
    this.$element.text(formattedValue);
  };

  CountTo.prototype.restart = function () {
    this.stop();
    this.init();
    this.start();
  };

  CountTo.prototype.start = function () {
    this.stop();
    this.render();
    this.interval = setInterval(this.update.bind(this), this.options.refreshInterval);
  };

  CountTo.prototype.stop = function () {
    if (this.interval) {
      clearInterval(this.interval);
    }
  };

  CountTo.prototype.toggle = function () {
    if (this.interval) {
      this.stop();
    } else {
      this.start();
    }
  };

  function formatter(value, options) {
    return value.toFixed(options.decimals);
  }

  $.fn.countTo = function (option) {
    return this.each(function () {
      var $this   = $(this);
      var data    = $this.data('countTo');
      var init    = !data || typeof(option) === 'object';
      var options = typeof(option) === 'object' ? option : {};
      var method  = typeof(option) === 'string' ? option : 'start';

      if (init) {
        if (data) data.stop();
        $this.data('countTo', data = new CountTo(this, options));
      }

      data[method].call(data);
    });
  };
}));