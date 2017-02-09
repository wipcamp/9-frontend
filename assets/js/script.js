$(document).ready(function(){
  var slideItems = $('div.slide');
  var orientationStatus, windowWidth, windowHeight;

  var carousel = new WipcampCarousel('.con');
  carousel.init();

  $(window).on('resize orientation', function(e){
    orientationStatus = e.orientation;
    windowWidth = $(window).width();
    windowHeight = $(window).height();
  });

  $('body').on('click', function(e) {
    if ((orientationStatus = 'landscape' && windowWidth < 300) || (orientationStatus = 'portrait' && windowHeight < 480)) {
      e.preventDefault();
    }
  });

  $('img').on('dragstart', function (e) {
    e.preventDefault();
  });

  $('.idle .slide a').on('click', function (e) {
    e.preventDefault();
  });

  $('[data-toggle="tooltip"]').tooltip({
    html: true
  });

  $('.ship-main').css({left: '-30em'});
  $('.ship-main').addClass('transition1');
  $('.ship').css({left: '-30em'});
  $('.ship').addClass('transition1');
  setTimeout(function(){
    $('.ship-main').css({"left": "-1em"});
  },3000);

  $('.card-btn-back-home').click(function (event) {
    $('.con').addClass('idle');
    $('.slide').addClass('animate');
    $('.ship-main').css({left: '110%'});
    $('.ship').removeClass('transition1');
    $('.ship').css({left: '-30em'});
    setTimeout(function(){
      $('.slide.active').css({"transform": "perspective(100px) translate3d(0, -100px, -50px)"});
      $('.slide.active').removeClass('active');
      setTimeout(function(){
        $('.slide:eq('+carousel.getCurrentSlide()+')').addClass('hover');
        $('.cloud1, .cloud2, .cloud3').addClass('pause');
        $('.wave1, .wave2, .wave3').addClass('pause');
        // $('.ship').addClass('pause');
        // $('.ship-main').addClass('pause');
        $('.ship-main').removeClass('transition1');
        $('.ship-main').css({left: '-30em'});
      },2000);
    },300);
    event.stopPropagation();
  });

  $('.card-btn-back').click(function (event) {
    $('.con').addClass('idle');
    $('.slide').addClass('animate');
    $('.ship:eq('+(carousel.getCurrentSlide()-1)+')').css({left: '110%'});
    $('.ship').not(':eq('+(carousel.getCurrentSlide()-1)+')').removeClass('transition1');
    $('.ship').not(':eq('+(carousel.getCurrentSlide()-1)+')').css({left: '-30em'});
    $('.ship-main').removeClass('transition1');
    $('.ship-main').css({left: '-30em'});
    setTimeout(function(){
      $('.slide.active').css({"transform": "perspective(100px) translate3d(0, -100px, -50px)"});
      $('.slide.active').removeClass('active');
      setTimeout(function(){
        $('.slide:eq('+carousel.getCurrentSlide()+')').addClass('hover');
        $('.cloud1, .cloud2, .cloud3').addClass('pause');
        $('.wave1, .wave2, .wave3').addClass('pause');
        // $('.ship').addClass('pause');
        // $('.ship-main').addClass('pause');
        $('.ship').removeClass('transition1');
        $('.ship').css({left: '-30em'});
      },2000);
    },300);
    event.stopPropagation();
  });

  $('div.slide').click(function(event) {
    var transitionTime = /((?:[0-9])+(?:\.(?:[0-9])+)?)(ms|s)/.exec($('.animate').css('transition-duration'));
    transitionTime.shift();
    transitionTime = transitionTime[1] == "s" ? transitionTime[0]*1000 : transitionTime[0];

    var beforeAnimate = function() {
      var r = $.Deferred();
      $('.slide:eq(' + carousel.getCurrentSlide() + ')').removeClass('hover');
      $(event.target).parents().filter('.slide').addClass('active');
      $('.con').removeClass('idle');
      $(event.target).parents().filter('.slide').css({"transform": "perspective(100px) translate3d(0, 0, 0)"});
      return r;
    };

    var afterAnimate = function() {
      setTimeout(function() {
        $('.slide').removeClass('animate');
      }, transitionTime);
    };

    beforeAnimate().done(afterAnimate());
    $('.slide').removeClass('animate');
    // $('.wave1, .wave2, .wave3').removeClass('pause');
    $('.cloud1, .cloud2, .cloud3').removeClass('pause');
    // $('.ship').removeClass('pause');
    // $('.ship-main').removeClass('pause');
    $('.ship-main').addClass('transition1');
    $('.ship').addClass('transition1');
    $('.ship-main').css({"left": "-1em"});
    $('.ship').css({"left": "-1em"});
  });
  countDown();

});

function getTransform(el) {
    var results = $(el).css('-webkit-transform');
    var resultTranform = results.split(", ");
    resultTranform[0] = resultTranform[0].replace("matrix3d(","");
    resultTranform[resultTranform.length - 1] = resultTranform[resultTranform.length - 1].replace(")","");
    var xyz = [resultTranform[12], resultTranform[13], resultTranform[14]];
    return xyz;
}

function countDown() {
  var d = new Date();
  if(d.getMonth() == 1 && d.getDate() >= 18 || d.getMonth() == 2 && d.getDate() < 19) {
    onTime(0);
  }
  else if(d.getMonth() == 2 && d.getDate() >= 19) {
    passTime(0);
    onTime(1);
  }
  else if(d.getMonth() == 2 && d.getDate() == 31 || d.getMonth() == 3 || d.getMonth() == 4 && d.getDate() < 24) {
    passTime(0);
    passTime(1);
    onTime(2);
  }
  else if(d.getMonth() == 4 && d.getDate() >= 24) {
    passTime(0);
    passTime(1);
    passTime(2);
    onTime(3);
  }
  else if(d.getMonth() == 4 && d.getDate() >= 30 || d.getMonth() > 4) {
    passTime(0);
    passTime(1);
    passTime(2);
    passTime(3);
  }
  function onTime(time){
    $('.status:eq('+time+') img').remove();
    $('.status:eq('+time+')').prepend('<img src="assets/img/object/shipInCircle2.svg" alt="">');
  }
  function passTime(time){
    $('.status:eq('+time+') img').remove();
    $('.status:eq('+time+')').prepend('<img src="assets/img/object/shipInCircle.svg" alt="">');
  }
}
