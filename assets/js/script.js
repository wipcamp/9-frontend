$(document).ready(function(){
  var slideItems = $('div.slide');

  var carousel = new WipcampCarousel('.con');
  carousel.init();

  $('img').on('dragstart', function (e) {
    e.preventDefault();
  });
  $('.idle .slide a').on('click', function (e) {
    e.preventDefault();
  });

  $('[data-toggle="tooltip"]').tooltip({
    html: true
  });

  $('.card-btn-back').click(function (event) {
    if(getTransform($(event.target).parents().filter('.slide'))[0] == 0){
      $('.con').addClass('idle');
      $('.slide').addClass('animate');
      $('.wave1, .wave2, .wave3').addClass('pause');
      $('.cloud1, .cloud2, .cloud3').addClass('pause');
      $('.ship').addClass('pause');
      $(event.target).parents().filter('.slide').removeClass('active');
      $(event.target).parents().filter('.slide').css({"transform": "perspective(100px) translate3d(0, -100px, -50px)"});
      event.stopPropagation();
    }
  });
  $('.card-btn-main').click(function (event) {
    if(getTransform($(event.target).parents().filter('.slide'))[0] == 0){
      $('.con').addClass('idle');
      $('.slide').addClass('animate');
      $('.wave1, .wave2, .wave3').addClass('pause');
      $('.cloud1, .cloud2, .cloud3').addClass('pause');
      $('.ship').addClass('pause');
      $(event.target).parents().filter('.slide').removeClass('active');
      $(event.target).parents().filter('.slide').css({"transform": "perspective(100px) translate3d(0, -100px, -50px)"});
      event.stopPropagation();
    }
    carousel.next();
  });
  $('div.slide').click(function(event) {
    if(getTransform($(event.target).parents().filter('.slide'))[0] == 0){
      var transitionTime = /((?:[0-9])+(?:\.(?:[0-9])+)?)(ms|s)/.exec($('.animate').css('transition-duration'));
      transitionTime.shift();
      transitionTime = transitionTime[1] == "s" ? transitionTime[0]*1000 : transitionTime[0];

      var beforeAnimate = function() {
        var r = $.Deferred();
        $('.con').removeClass('idle');
        $(event.target).parents().filter('.slide').addClass('active');
        $(event.target).parents().filter('.slide').css({"transform": "perspective(100px) translate3d(0, 0, 0)"});
        return r;
      };

      var afterAnimate = function() {
        setTimeout(function() {
          $('.slide').removeClass('animate');
        }, transitionTime);
      };

      beforeAnimate().done(afterAnimate());
    }
    $('.wave1, .wave2, .wave3').removeClass('pause');
    $('.cloud1, .cloud2, .cloud3').removeClass('pause');
    $('.ship').removeClass('pause');
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
  if(d.getMonth() == 1 && d.getDate() >= 6 || d.getMonth() == 2 && d.getDate() < 20) {
    onTime(0);
  }
  else if(d.getMonth() == 2 && d.getDate() >= 20) {
    passTime(0);
    onTime(1);
  }
  else if(d.getMonth() == 2 && d.getDate() == 31 || d.getMonth() == 3 || d.getMonth() == 4 && d.getDate() < 25) {
    passTime(0);
    passTime(1);
    onTime(2);
  }
  else if(d.getMonth() == 4 && d.getDate() >= 25) {
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
    $('.status:eq('+time+')').prepend('<img src="assets/img/object/shipInCircle.svg" alt="">');
  }
  function passTime(time){
    $('.status:eq('+time+') img').remove();
    $('.status:eq('+time+')').prepend('<img src="assets/img/object/shipInCircle2.svg" alt="">');
  }
}
