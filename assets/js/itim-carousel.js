function WipcampCarousel(element) {
  var self = this;
  element = $(element);

  var slide = $(element).find('.slide');
  var slideCount = slide.length;
  var currentSlide = 0;
  var pageTransform = {};

  this.init = function() {
    $(window).on("load resize orientationchange", function () {
      setSlideDemensions();
      this.showSlide(currentSlide);
    });
  };

  this.getCurrentSlide = function () {
    return this.currentSlide;
  }

  function setSlideDemensions() {
    for (var i = - (slideCount - 1); i < slideCount; i++) {
      pageTransform[i] = i * diffSlide();
    }
    $.each($('div.slide'), function (idx, val) {
      $(val).css({"transform": "perspective(100px) translate3d(" + pageTransform[idx - currentSlide] + "px, -100px, -50px)"});
    });
  }

  function getLeftDistance(elEach, elAll) {
    var windowWidth = $(window).width();
    var index = $(elAll).index(elEach);
    return index * diffSlide();
  }

  function diffSlide(){
    var windowWidth = $(window).width();
    return windowWidth * 1.15625;
  }

  this.showSlide = function(skipto, animate) {
    skipto = Math.max(0, Math.min(skipto, slideCount-1));
    currentSlide = skipto;
    animation(animate);
    setSlideDemensions();
  };

  function animation(animate) {
    slide.removeClass('animate');

    if (animate) {
      slide.addClass('animate');
    }
  }

   this.next = function() {
     return this.showSlide(currentSlide + 1, true);
   };

   this.prev = function() {
     return this.showSlide(currentSlide - 1, true);
   };

  function eventDetection(e) {
    switch (e.type) {
      case 'swipeleft':
        self.next();
        break;

      case 'swiperight':
        self.prev();
        break;
    }
  }

  new Hammer(element[0], {dragLockToAxis: true}).on("swipeleft swiperight", eventDetection);

  $(document).keydown(function(event) {
    if(event.which == 39 && element.hasClass('idle')) {
      self.next();
    }
    if(event.which == 37 && element.hasClass('idle')) {
      self.prev();
    }
  });
}