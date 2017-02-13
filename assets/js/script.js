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

  toDayToNight();
  islandDayNight();

  var c = false;
  $('.ship-main').css({left: '-50em'});
  $('.ship-main').addClass('transition1');
  $('.ship').css({left: '-30em'});
  $('.ship').addClass('transition1');
  setTimeout(function(){
    $('.ship-main').css({"left": "-1em"});
    setTimeout(function(){
      $('.ship-main').removeClass('transition1');
      $('.ship-main').addClass('transitionSpecial');
      $('.ship-main').css({left: '40%'});
      c = true;
    },3000);
  },1000);

  $('.card-btn-back-home').click(function (event) {
    if (c) {
      c = false;
      $('.con').addClass('idle');
      $('.slide').addClass('animate');
      $('.ship-main').addClass('transition1');
      $('.ship-main').removeClass('transitionSpecial');
      $('.ship-main').css({left: '110%'});
      setTimeout(function(){
        $('.slide.active').css({"transform": "perspective(100px) translate3d(0, -100px, -50px)"});
        $('.slide.active').removeClass('active');
        setTimeout(function(){
          $('.slide:eq('+ carousel.getCurrentSlide() +')').addClass('hover');
          $('.cloud1, .cloud2, .cloud3').addClass('pause');
          $('.wave1, .wave2, .wave3').addClass('pause');
          $('.ship').addClass('pause');
          $('.ship-main').addClass('pause');
          $('.ship-main').removeClass('transition1');
          $('.ship-main').css({left: '-30em'});
          c = true;
        },1500);
      },300);
    }
    event.stopPropagation();
  });

  $('.card-btn-back').click(function (event) {
    if (c) {
      c = false;
      $('.con').addClass('idle');
      $('.slide').addClass('animate');
      $('.ship:eq('+(carousel.getCurrentSlide()-1)+')').css({left: '110%'});
      setTimeout(function(){
        $('.slide.active').css({"transform": "perspective(100px) translate3d(0, -100px, -50px)"});
        $('.slide.active').removeClass('active');
        setTimeout(function(){
          $('.slide:eq('+carousel.getCurrentSlide()+')').addClass('hover');
          $('.cloud1, .cloud2, .cloud3').addClass('pause');
          $('.wave1, .wave2, .wave3').addClass('pause');
          $('.ship').addClass('pause');
          $('.ship-main').addClass('pause');
          $('.ship').removeClass('transition1');
          $('.ship').css({left: '-30em'});
          c = true;
        },1500);
      },300);
    }
    event.stopPropagation();
  });

  $('.card-btn-next').click(function (event) {
    if (c) {
      c = false;
      carousel.closeModalAfterSlide();
      $('.con').addClass('idle');
      $('.slide').addClass('animate');
      $('.ship:eq('+(carousel.getCurrentSlide()-1)+')').css({left: '110%'});
      setTimeout(function(){
        $('.slide.active').css({"transform": "perspective(100px) translate3d(0, -100px, -50px)"});
        $('.slide.active').removeClass('active');
        setTimeout(function(){
          carousel.next();
          setTimeout(function(){
            $('.slide:eq('+carousel.getCurrentSlide()+')').addClass('active');
            $('.con').removeClass('idle');
            $('.slide').removeClass('animate');
            $('.ship:eq('+(carousel.getCurrentSlide()-1)+')').addClass('transition1');
            $('.ship:eq('+(carousel.getCurrentSlide()-1)+')').css({"left": "-1em"});
            c = true;
          },300);
        },800);
      },300);
    }
    event.stopPropagation();
  });

  $('div.slide').click(function(event) {
    if (c) {
      c = false;
      $('.slide:eq(' + carousel.getCurrentSlide() + ')').removeClass('hover');
      setTimeout(function(){
        $('.slide:eq(' + carousel.getCurrentSlide() + ')').addClass('active');
        $('.con').removeClass('idle');
        $('.slide').removeClass('animate');
        $('.wave1, .wave2, .wave3').removeClass('pause');
        $('.cloud1, .cloud2, .cloud3').removeClass('pause');
        $('.ship').removeClass('pause');
        $('.ship-main').removeClass('pause');
        if(carousel.getCurrentSlide() === 0) {
          $('.ship-main').addClass('transition1');
          $('.ship-main').css({"left": "-1em"});
          setTimeout(function(){
            $('.ship-main').removeClass('transition1');
            $('.ship-main').addClass('transitionSpecial');
            $('.ship-main').css({left: '40%'});
            c = true;
          },3300);
        }
        else {
          $('.ship:eq('+(carousel.getCurrentSlide()-1)+')').addClass('transition1');
          $('.ship:eq('+(carousel.getCurrentSlide()-1)+')').css({"left": "-1em"});
          c = true;
        }
      },300);
    }
  });
  countDown();

  switch (getMobileOperatingSystem()) {
    case "Windows Phone" :
      $('#where-map #navigator').attr('href', 'bingmaps:?cp=13.6525851~100.49361');
      break;

    case "Android" :
      $('#where-map #navigator').attr('href', 'geo:13.6525851,100.49361');
      break;

    case "iOS" :
      $('#where-map #navigator').attr('href', 'http://maps.apple.com/?ll=13.6525851,100.49361');
      break;

    default :
      $('#where-map #navigator').attr('href', 'https://www.google.com/maps/place/WIP+Camp/@13.6525851,100.49361,19z/data=!4m8!1m2!3m1!2sWIP+Camp!3m4!1s0x0:0x5e0d31f39f400b1e!8m2!3d13.6525851!4d100.49361');
      $('.prev-container img').attr('title', 'ก่อนหน้า<br><span id=\'carousel-accessibility-prev\'>(แป้นลูกศรซ้าย)</span>');
      $('.next-container img').attr('title', 'ถัดไป<br><span id=\'carousel-accessibility-next\'>(แป้นลูกศรขวา)</span>');
      break;
  }

  $('[data-toggle="tooltip"]').tooltip({
    html: true
  });
});

function getTransform(el) {
    var results = $(el).css('-webkit-transform');
    var resultTranform = results.split(", ");
    resultTranform[0] = resultTranform[0].replace("matrix3d(","");
    resultTranform[resultTranform.length - 1] = resultTranform[resultTranform.length - 1].replace(")","");
    var xyz = [resultTranform[12], resultTranform[13], resultTranform[14]];
    return xyz;
}


var d = new Date();
function countDown() {
  // For set img of WHEN card
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
    $('.status:eq('+time+')').prepend('<img src="assets/img/object/whenNow.svg" alt="">');
  }
  function passTime(time){
    $('.status:eq('+time+') img').remove();
    $('.status:eq('+time+')').prepend('<img src="assets/img/object/whenPast.svg" alt="">');
  }
}
function toDayToNight() {
  if (d.getHours() < 6 || d.getHours() >= 20) {
    $('.slide').css({background: 'linear-gradient(#141123, #1d3c5c)'});
  }
  else if (d.getHours() < 12) {
    $('.slide').css({background: 'linear-gradient(#9acbd8, #ade0ee)'});
  }
  else if (d.getHours() < 18) {
    $('.slide').css({background: 'linear-gradient(#9acbd8, #ade0ee)'});
  }
  else if (d.getHours() < 20) {
    $('.slide').css({background: 'linear-gradient(#9acbd8, #ade0ee)'});
  }
}
function islandDayNight() {
  if (d.getHours() >= 6 && d.getHours() < 18) {
    $('.slide:eq(4) .cisland').prepend('<img src="assets/img/object/wholecake-island-day.svg" alt="island" class="img-responsive">');
  }
  else {
    $('.slide:eq(4) .cisland').prepend('<img src="assets/img/object/wholecake-island-night.svg" alt="island" class="img-responsive">');
  }
}

function getMobileOperatingSystem() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

  if (/windows phone/i.test(userAgent)) {
      return "Windows Phone";
  }

  if (/android/i.test(userAgent)) {
      return "Android";
  }

  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      return "iOS";
  }

  return "unknown";
}
