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
      carousel.setReady(1);
    },3000);
  },1000);

  $('.card-btn-back-home').click(function (event) {
    if (carousel.isReady()) {
      carousel.setReady(0);
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
        },1500);
      },300);
    }
    setTimeout(function(){
      carousel.setReady(1);
    },5000);
    event.stopPropagation();
  });

  $('.card-btn-back').click(function (event) {
    if (carousel.isReady()) {
      carousel.setReady(0);
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
        },1500);
      },300);
    }
    setTimeout(function(){
      carousel.setReady(1);
    },5000);
    event.stopPropagation();
  });

  $('.card-btn-next').click(function (event) {
    if (carousel.isReady()) {
      carousel.setReady(0);
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
          },300);
        },800);
      },300);
    }
    setTimeout(function(){
      carousel.setReady(1);
    },5000);
    event.stopPropagation();
  });

  $('div.slide').click(function(event) {
    if (carousel.isReady()) {
      carousel.setReady(0);
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
          },3300);
        }
        else {
          $('.ship:eq('+(carousel.getCurrentSlide()-1)+')').addClass('transition1');
          $('.ship:eq('+(carousel.getCurrentSlide()-1)+')').css({"left": "-1em"});
        }
      },300);
      setTimeout(function(){
        carousel.setReady(1);
      },5000);
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
    $('a#reg').on('click', function (e) {
      e.preventDefault();
    });
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
  if (d.getHours() < 6 || d.getHours() >= 19) {
    $('.slide').css({'background': 'linear-gradient(#141123, #1d3c5c)'});
  }
  else if (d.getHours() < 12) {
    $('.slide').css({'background': 'linear-gradient(#9acbd8, #ade0ee)'});
  }
  else if (d.getHours() < 17) {
    $('.slide').css({'background': 'linear-gradient(#56DAE8, #5cceee)'});
  }
  else if (d.getHours() < 19) {
    $('.slide').css({'background': 'linear-gradient(#643047, #a23c4a, #f3603f, #fd972b)'});
  }
}
function islandDayNight() {
  if (d.getHours() >= 6 && d.getHours() < 17) {
    $('link#timeBasedStyle').attr('href','assets/css/style-day.css');
    $('.star').css({'display': 'none'});
    $('.wave.wave1').addClass('wave1-day');
    $('.wave.wave2').addClass('wave2-day');
    $('.wave.wave3').addClass('wave3-day');
    $('.cloud1').addClass('cloud1-day');
    $('.cloud2').addClass('cloud2-day');
    $('.cloud3').addClass('cloud3-day');
    $('.mountain').prepend('<img src="assets/img/object/mountain-day.svg" class="img-responsive" alt="">');
    $('.game-btn a').prepend('<img src="assets/img/object/lets-play-day.svg" class="letplay img-responsive" alt="">');
    $('.ship-main').prepend('<img src="assets/img/object/ship-day.svg" alt="ship" class="img-responsive">');
    $('.ship').prepend('<img src="assets/img/object/ship-day.svg" alt="ship" class="img-responsive">');
    $('.moon').prepend('<img src="assets/img/object/moon-day.svg" class="img-responsive" alt="">');
    $('.slide:eq(1) .cisland').prepend('<img src="assets/img/object/canon-day.svg" alt="island" class="img-responsive">');
    $('.slide:eq(2) .cisland').prepend('<img src="assets/img/object/fruit-island-day.svg" alt="island" class="img-responsive">');
    $('.slide:eq(3) .cisland').prepend('<img src="assets/img/object/Kraken-day.svg" alt="island" class="img-responsive">');
    $('.slide:eq(4) .cisland').prepend('<img src="assets/img/object/wholecake-island-day.svg" alt="island" class="img-responsive">');
    $('.slide:eq(5) .cisland').prepend('<img src="assets/img/object/castle-day.svg" alt="island" class="img-responsive">');
    $('.slide:eq(6) .cisland').prepend('<img src="assets/img/object/ice-fire-island-day.svg" alt="island" class=" img-responsive">');
  }
  else {
    $('link#timeBasedStyle').attr('href','assets/css/style-night.css');
    $('.wave.wave1').addClass('wave1-night');
    $('.wave.wave2').addClass('wave2-night');
    $('.wave.wave3').addClass('wave3-night');
    $('.cloud1').addClass('cloud1-night');
    $('.cloud2').addClass('cloud2-night');
    $('.cloud3').addClass('cloud3-night');
    $('.mountain').prepend('<img src="assets/img/object/mountain-night.svg" class="img-responsive" alt="">');
    $('.game-btn a').prepend('<img src="assets/img/object/lets-play-night.svg" class="letplay img-responsive" alt="">');
    $('.ship-main').prepend('<img src="assets/img/object/ship-night.svg" alt="ship" class="img-responsive">');
    $('.ship').prepend('<img src="assets/img/object/ship-night.svg" alt="ship" class="img-responsive">');
    $('.moon').prepend('<img src="assets/img/object/moon-night.svg" class="img-responsive" alt="">');
    $('.slide:eq(1) .cisland').prepend('<img src="assets/img/object/canon-night.svg" alt="island" class="img-responsive">');
    $('.slide:eq(2) .cisland').prepend('<img src="assets/img/object/fruit-island-night.svg" alt="island" class="img-responsive">');
    $('.slide:eq(3) .cisland').prepend('<img src="assets/img/object/Kraken-night.svg" alt="island" class="img-responsive">');
    $('.slide:eq(4) .cisland').prepend('<img src="assets/img/object/wholecake-island-night.svg" alt="island" class="img-responsive">');
    $('.slide:eq(5) .cisland').prepend('<img src="assets/img/object/castle-night.svg" alt="island" class="img-responsive">');
    $('.slide:eq(6) .cisland').prepend('<img src="assets/img/object/ice-fire-island-night.svg" alt="island" class=" img-responsive">');
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
