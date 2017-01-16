function WipcampCarousel(element) {
  var self = this;
  element = $(element);

  var slide = $(element).find('.slide');
  var slideControl = $(element).find('.slide-control');
  var slideCount = slide.length;
  var currentSlide = 0;
  var pageTransform = {};

  this.init = function () {
    slideControl.append('<div class="prev-container" style="color: black">prev</div>');
    slideControl.append('<div class="bullet-container"></div>');
    slideControl.append('<div class="next-container" style="color: black">next</div>');

    for (i = 0; i < slideCount; i++) {
      $('.bullet-container').append('<div class="bullet"></div>');
    }

    $(window).on("load resize orientationchange", function () {
      setSlideDemensions();
      self.showSlide(currentSlide);
    });

    $(document).keydown(function(event) {
      if(event.which == 39 && element.hasClass('idle')) {
        self.next();
      }
      if(event.which == 37 && element.hasClass('idle')) {
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

  this.getTransform = function (idx) {
    var results = slide.filter(':eq(' + idx + ')').css('-webkit-transform');
    var resultTranform = results.split(", ");
    resultTranform[0] = resultTranform[0].replace("matrix3d(","");
    resultTranform[resultTranform.length - 1] = resultTranform[resultTranform.length - 1].replace(")","");
    var xyz = [parseFloat(resultTranform[12]), parseFloat(resultTranform[13]), parseFloat(resultTranform[14])];
    return xyz;
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

   function outOfBound() {
     isLeftOut = currentSlide === 0 && self.getTransform(0)[0] > 0;
     isRightOut = currentSlide === slideCount - 1 && self.getTransform(slideCount - 1)[0] < 0;
     return isLeftOut || isRightOut;
   }

  function eventDetection(e) {
    switch (e.type) {
      case 'panleft':
      case 'panright':
        console.log(outOfBound());
        if (outOfBound()) {
          e.deltaX *= 0.2;
        }
        $.each($('div.slide'), function (idx, val) {
          $(val).css({"transform": "perspective(100px) translate3d(" + (self.getTransform(idx)[0] + e.deltaX) + "px, -100px, -50px)"});
        });
        break;
      case 'panend':
      case 'pancancel':
        if (Math.abs(e.deltaX) > $('.slide')[0] * 0.25) {
          if (e.deltaX > 0) {
            self.prev();
          } else {
            self.next();
          }
        }
        else {
          self.showSlide(currentSlide, true);
        }
        break;
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

  new Hammer(element[0], {dragLockToAxis: true}).on("panleft panright panend pancancel swipeleft swiperight", eventDetection);
}