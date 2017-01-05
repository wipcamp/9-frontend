$(document).ready(function(){
  /*$('div.one').css({"transform": "perspective(100px) translate3d(0, 0, -50px)"});
  $('div.two').css({"transform": "perspective(100px) translate3d(1850px, 0, -50px)"});
  $('div.three').css({"transform": "perspective(100px) translate3d(3000px, 0, -50px)"});
  $('div.four').css({"transform": "perspective(100px) translate3d(4500px, 0, -50px)"});
  $('div.five').css({"transform": "perspective(100px) translate3d(6000px, 0, -50px)"});
  $('div.six').css({"transform": "perspective(100px) translate3d(7500px, 0, -50px)"});
  $('div.seven').css({"transform": "perspective(100px) translate3d(9000px, 0, -50px)"});*/

  initSlide();

  $('div.back').click(function(event) {
    if(getTransformElement($(event.target).parent())[0] == 0){
      $(event.target).parent().removeClass('active');
      $(event.target).parent().css({"transform": "perspective(100px) translate3d(0, 0, -50px)"});
    }
  });

  $('div.slide').click(function(event) {
    if(parseInt(getTransform(event.target)[0]) == 0){
      $(event.target).addClass('active');
      $(event.target).css({"transform": "perspective(100px) translate3d(0, 0, 0)"});
    }
  });

  $(document).keydown(function(event) {
    if(event.which == 39) {
      slideRight();
    }
    if(event.which == 37) {
      slideLeft();
    }
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
function getTransformElement(el) {
    var results = el.css('-webkit-transform');
    var resultTranform = results.split(", ");
    resultTranform[0] = resultTranform[0].replace("matrix3d(","");
    resultTranform[resultTranform.length - 1] = resultTranform[resultTranform.length - 1].replace(")","");
    var xyz = [resultTranform[12], resultTranform[13], resultTranform[14]];
    return xyz;
}

function initSlide() {
  var items = $('.slide');
  $.each(items, function(idx, val) {
      $(val).css('transform', 'perspective(100px) translate3d('+ getLeftDistance(val, items) +'px, 0, -50px)');
  });
}

function  getLeftDistance(elEach, elAll) {
  var windowWidth = $(window).width();
  var index = $(elAll).index(elEach);
  //var transformWidth = elEach.getBoundingClientRect().width;
  //var spaceWidth = (windowWidth - transformWidth) / 2;
  //return index * (1.5 * spaceWidth + transformWidth);
  return index * (windowWidth * 1.15625);
}

function slideRight(){
  var one = getTransform("div.one")[0]-getLeftDistance($('.one')[0], $('.slide'));
  var two = getTransform("div.two")[0]-getLeftDistance($('.two')[0], $('.slide'));
  var three = getTransform("div.three")[0]-getLeftDistance($('.three')[0], $('.slide'));
  var four = getTransform("div.four")[0]-getLeftDistance($('.four')[0], $('.slide'));
  var five = getTransform("div.five")[0]-getLeftDistance($('.five')[0], $('.slide'));
  var six = getTransform("div.six")[0]-getLeftDistance($('.six')[0], $('.slide'));
  var seven = getTransform("div.seven")[0]-getLeftDistance($('.seven')[0], $('.slide'));
  if(getTransform("div.seven")[0] != 0){
    $("div.one").css({"transform": "perspective(100px) translate3d("+one+"px, 0, -50px)"});
    $("div.two").css({"transform": "perspective(100px) translate3d("+two+"px, 0, -50px)"});
    $("div.three").css({"transform": "perspective(100px) translate3d("+three+"px, 0, -50px)"});
    $("div.four").css({"transform": "perspective(100px) translate3d("+four+"px, 0, -50px)"});
    $("div.five").css({"transform": "perspective(100px) translate3d("+five+"px, 0, -50px)"});
    $("div.six").css({"transform": "perspective(100px) translate3d("+six+"px, 0, -50px)"});
    $("div.seven").css({"transform": "perspective(100px) translate3d("+seven+"px, 0, -50px)"});
  }
}

function slideLeft(){
  var one = parseInt(getTransform("div.one")[0])+getLeftDistance($('.one')[0], $('.slide'));
  var two = parseInt(getTransform("div.two")[0])+getLeftDistance($('.two')[0], $('.slide'));
  var three = parseInt(getTransform("div.three")[0])+getLeftDistance($('.three')[0], $('.slide'));
  var four = parseInt(getTransform("div.four")[0])+getLeftDistance($('.four')[0], $('.slide'));
  var five = parseInt(getTransform("div.five")[0])+getLeftDistance($('.five')[0], $('.slide'));
  var six = parseInt(getTransform("div.six")[0])+getLeftDistance($('.six')[0], $('.slide'));
  var seven = parseInt(getTransform("div.seven")[0])+getLeftDistance($('.seven')[0], $('.slide'));
  if(getTransform("div.one")[0] != 0){
    $("div.one").css({"transform": "perspective(100px) translate3d("+one+"px, 0, -50px)"});
    $("div.two").css({"transform": "perspective(100px) translate3d("+two+"px, 0, -50px)"});
    $("div.three").css({"transform": "perspective(100px) translate3d("+three+"px, 0, -50px)"});
    $("div.four").css({"transform": "perspective(100px) translate3d("+four+"px, 0, -50px)"});
    $("div.five").css({"transform": "perspective(100px) translate3d("+five+"px, 0, -50px)"});
    $("div.six").css({"transform": "perspective(100px) translate3d("+six+"px, 0, -50px)"});
    $("div.seven").css({"transform": "perspective(100px) translate3d("+seven+"px, 0, -50px)"});
  }
}
/*
Key code
right == 39
left == 37
*/
