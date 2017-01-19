function WipcampCarousel(element) {
  var self = this;
  element = $(element);

  var slide = $(element).find('.slide');
  var slideControl = $(element).find('.slide-control');
  var slideCount = slide.length;
  var currentSlide = 0;
  var pageTransform = {};

  this.init = function () {
    /*slideControl.append('<div class="prev-container" style="color: black">prev</div>');
    slideControl.append('<div class="bullet-container"></div>');
    slideControl.append('<div class="next-container" style="color: black">next</div>');

    for (i = 0; i < slideCount; i++) {
      $('.bullet-container').append('<div class="bullet"></div>');
    }*/

    $(window).on("load resize orientationchange", function () {
      setSlideDemensions();
      self.showSlide(currentSlide);
      $('.next').css({"transform": "perspective(100px) translate3d(" + pageTransform[1] + "px, -100px, -50px)"});
      $('.prev').css({"transform": "perspective(100px) translate3d(" + pageTransform[-1] + "px, -100px, -50px)"});
    });

    $(".next").click(function(){
      self.next();
    });
    $(".prev").click(function(){
      self.prev();
    });

    $(document).keydown(function(event) {
      if(event.which == 39 && element.hasClass('idle')) {
        self.next();
      }
      if(event.which == 37 && element.hasClass('idle')) {
        self.prev();
      }
    });

    $(window).on('mousewheel DOMMouseScroll', function (e) {
      var direction = (function () {
        var delta = (e.type === 'DOMMouseScroll' ? e.originalEvent.detail * -40 : e.originalEvent.wheelDelta);
        return delta > 0 ? 0 : 1;
      }());

      if(direction === 1 && element.hasClass('idle')) {
          self.next();
      }
      if(direction === 0 && element.hasClass('idle')) {
         self.prev();
      }
    });

    $('.slide-control .bullet').on('click', function(event) {
      var idx =  $('.slide-control .bullet').index(event.target);
      self.showSlide(idx, true);
    });

    $('.slide-control .next-container').on('click', function() {
      self.next();
    });

    $('.slide-control .prev-container').on('click', function() {
      self.prev();
    });
  };

  this.getCurrentSlide = function () {
    return currentSlide;
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

  this.showSlide = function(skipto, animate) {
    skipto = Math.max(0, Math.min(skipto, slideCount-1));
    currentSlide = skipto;
    $('.bullet-container').children().removeClass('current').empty();
    $('.bullet-container').children().filter(':eq(' + currentSlide + ')').addClass('current').text(currentSlide + 1);

    animation(animate);
    setSlideDemensions();
  };

  function animation(animate) {
    slide.removeClass('animate');

    if (animate) {
      slide.addClass('animate');
    }
  }

   this.next = function () {
     return this.showSlide(currentSlide + 1, true);
   };

   this.prev = function () {
     return this.showSlide(currentSlide - 1, true);
   };

  function eventDetection(e) {
    switch (e.type) {
      case 'swipeleft':
        if (element.hasClass('idle')) {
          self.next();
        }
        break;
      case 'swiperight':
        if (element.hasClass('idle')) {
          self.prev();
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
}
