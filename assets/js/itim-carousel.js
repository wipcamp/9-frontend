function WipcampCarousel(element) {
  var self = this;
  element = $(element);

  var slide = $(element).find('.slide');
  var slideControl = $(element).find('.slide-control');
  var slideCount = slide.length;
  var currentSlide = 0;
  var pageTransform = {};

  this.init = function () {
    $(window).on("load resize orientationchange", function () {
      setSlideDemensions();
      self.showSlide(currentSlide);
      $('.next').css({"transform": "perspective(100px) translate3d(" + pageTransform[1] + "px, -100px, -50px)"});
      $('.prev').css({"transform": "perspective(100px) translate3d(" + pageTransform[-1] + "px, -100px, -50px)"});
    });

    $(".next").click(function(){
      $('.slide:eq('+self.getCurrentSlide()+')').removeClass('hover');
      self.next();
      $('.slide:eq('+self.getCurrentSlide()+')').addClass('hover');
    });
    $(".prev").click(function(){
      $('.slide:eq('+self.getCurrentSlide()+')').removeClass('hover');
      self.prev();
      setTimeout($('.slide:eq('+self.getCurrentSlide()+')').addClass('hover'),500);
    });

    $(document).keydown(function(event) {
      if(event.which == 39) {
        if (element.hasClass('idle')) {
          $('.slide:eq('+self.getCurrentSlide()+')').removeClass('hover');
          self.next();
          $('.slide:eq('+self.getCurrentSlide()+')').addClass('hover');
        }
        else {
          slideActiveNext()
        }
      }
      if(event.which == 37) {
        if (element.hasClass('idle')) {
          $('.slide:eq('+self.getCurrentSlide()+')').removeClass('hover');
          self.prev();
          setTimeout($('.slide:eq('+self.getCurrentSlide()+')').addClass('hover'),500);
        }
        else {
          slideActivePrev()
        }
      }
      if(event.which == 27) {
        if (!element.hasClass('idle')) {
          $('.slide').addClass('animate');
          $('.wave1, .wave2, .wave3').addClass('pause');
          $('.cloud1, .cloud2, .cloud3').addClass('pause');
          $('.ship').addClass('pause');
          $('.slide.active').css({"transform": "perspective(100px) translate3d(0, -100px, -50px)"});
          $('.slide.active').removeClass('active');
          $('.slide:eq('+self.getCurrentSlide()+')').addClass('hover');
        }
      }
    });

    $(window).on('mousewheel DOMMouseScroll', function (e) {
      var direction = (function () {
        var delta = (e.type === 'DOMMouseScroll' ? e.originalEvent.detail * -40 : e.originalEvent.wheelDelta);
        return delta > 0 ? 0 : 1;
      }());

      if(direction === 1) {
        if (element.hasClass('idle')) {
          $('.slide:eq('+self.getCurrentSlide()+')').removeClass('hover');
          self.next();
          $('.slide:eq('+self.getCurrentSlide()+')').addClass('hover');
        }
        else {
          slideActiveNext()
        }
      }
      if(direction === 0) {
        if (element.hasClass('idle')) {
          $('.slide:eq('+self.getCurrentSlide()+')').removeClass('hover');
          self.prev();
          setTimeout($('.slide:eq('+self.getCurrentSlide()+')').addClass('hover'),500);
        }
        else {
          slideActivePrev()
        }
      }
    });

    $('.slide-control .bullet').on('click', function(event) {
      $('.slide:eq('+self.getCurrentSlide()+')').removeClass('hover');
      var idx =  $('.slide-control .bullet').index(event.target);
      self.showSlide(idx, true);
      $('.slide:eq('+self.getCurrentSlide()+')').addClass('hover');
    });

    $('.slide-control .next-container').on('click', function() {
      $('.slide:eq('+self.getCurrentSlide()+')').removeClass('hover');
      self.next();
      $('.slide:eq('+self.getCurrentSlide()+')').addClass('hover');
    });

    $('.slide-control .prev-container').on('click', function() {
      $('.slide:eq('+self.getCurrentSlide()+')').removeClass('hover');
      self.prev();
      setTimeout($('.slide:eq('+self.getCurrentSlide()+')').addClass('hover'),500);
    });
  };

  //public int getCurrentSlide()
  this.getCurrentSlide = function () {
    return currentSlide;
  };

  /**
   * @public
   * Determine what slide want to show.
   * @param {number} skipto - Determine the index of carousel slide.
   * @param {boolean} animate - Determine to use animation while changing carousel slide.
   */
  this.showSlide = function(skipto, animate) {
    skipto = Math.max(0, Math.min(skipto, slideCount-1));
    currentSlide = skipto;
    $('.bullet-container').children().removeClass('current');
    $('.bullet-container').children().filter(':eq(' + currentSlide + ')').addClass('current');

    bullet = $('.bullet-container .bullet');
    bulletDiff = slideCount - (currentSlide + 1);
    bullet.removeClass('step');
    bullet.splice(-bulletDiff, bulletDiff);
    bullet.addClass('step');

    animation(animate);
    setSlideDemensions();
  };

  //public void showPrev()
  this.prev = function () {
    return this.showSlide(currentSlide - 1, true);
  };

  //public void showNext()
  this.next = function () {
     return this.showSlide(currentSlide + 1, true);
  };

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

  function animation(animate) {
    slide.removeClass('animate');

    if (animate) {
      slide.addClass('animate');
    }
  }

  function eventDetection(e) {
    switch (e.type) {
      case 'swipeleft':
        if (element.hasClass('idle')) {
          $('.slide:eq('+self.getCurrentSlide()+')').removeClass('hover');
          self.next();
          $('.slide:eq('+self.getCurrentSlide()+')').addClass('hover');
        }
        else {
          slideActiveNext()
        }
        break;
      case 'swiperight':
        if (element.hasClass('idle')) {
          $('.slide:eq('+self.getCurrentSlide()+')').removeClass('hover');
          self.prev();
          setTimeout($('.slide:eq('+self.getCurrentSlide()+')').addClass('hover'),500);
        }
        else {
          slideActivePrev()
        }
        break;
    }
  }

  new Hammer(element[0], {dragLockToAxis: true}).on("swipeleft swiperight", eventDetection);

  function getTransform(el) {
      var results = $(el).css('-webkit-transform');
      var resultTranform = results.split(", ");
      resultTranform[0] = resultTranform[0].replace("matrix3d(","");
      resultTranform[resultTranform.length - 1] = resultTranform[resultTranform.length - 1].replace(")","");
      var xyz = [resultTranform[12], resultTranform[13], resultTranform[14]];
      return xyz;
  }

  function slideActiveNext() {
    $('.slide').addClass('animate');
    $('.wave1, .wave2, .wave3').addClass('pause');
    $('.cloud1, .cloud2, .cloud3').addClass('pause');
    $('.ship').addClass('pause');
    $('.slide.active').css({"transform": "perspective(100px) translate3d(0, -100px, -50px)"});
    $('.slide.active').removeClass('active');
    $('.con').removeClass('idle');
    setTimeout(function() { self.next(); }, 500);
    setTimeout(function() { $('.slide:eq('+currentSlide+')').addClass('active'); }, 1000);
    setTimeout(function() { $('.slide:eq('+currentSlide+')').css({"transform": "perspective(100px) translate3d(0, 0, 0)"}); }, 1500);
    setTimeout(function() {
      $('.wave1, .wave2, .wave3').removeClass('pause');
      $('.cloud1, .cloud2, .cloud3').removeClass('pause');
      $('.ship').removeClass('pause');
    }, 1500);
    $('.slide').removeClass('animate');
  }
  function slideActivePrev() {
    $('.slide').addClass('animate');
    $('.wave1, .wave2, .wave3').addClass('pause');
    $('.cloud1, .cloud2, .cloud3').addClass('pause');
    $('.ship').addClass('pause');
    $('.slide.active').css({"transform": "perspective(100px) translate3d(0, -100px, -50px)"});
    $('.slide.active').removeClass('active');
    $('.con').removeClass('idle');
    setTimeout(function() { self.prev(); }, 500);
    setTimeout(function() { $('.slide:eq('+currentSlide+')').addClass('active'); }, 1000);
    setTimeout(function() { $('.slide:eq('+currentSlide+')').css({"transform": "perspective(100px) translate3d(0, 0, 0)"}); }, 1500);
    setTimeout(function() {
      $('.wave1, .wave2, .wave3').removeClass('pause');
      $('.cloud1, .cloud2, .cloud3').removeClass('pause');
      $('.ship').removeClass('pause');
    }, 1500);
    $('.slide').removeClass('animate');
  }
}
