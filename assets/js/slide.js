$(function(){
  var slide = document.getElementById("con");

  Hammer(slide).on("swipeleft", function() {
    if(getTransform("div.slide")[2] == -50) {
      slideRight();
    }
  });

  Hammer(slide).on("swiperight", function() {
    if(getTransform("div.slide")[2] == -50) {
      slideLeft();
    }
  });
})

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

function diffSlide(){
  var windowWidth = $(window).width();
  return windowWidth * 1.15625;
}

function slideRight(){
  var one = getTransform("div.one")[0]-diffSlide();
  var two = getTransform("div.two")[0]-diffSlide();
  var three = getTransform("div.three")[0]-diffSlide();
  var four = getTransform("div.four")[0]-diffSlide();
  var five = getTransform("div.five")[0]-diffSlide();
  var six = getTransform("div.six")[0]-diffSlide();
  var seven = getTransform("div.seven")[0]-diffSlide();
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
  var one = parseInt(getTransform("div.one")[0])+diffSlide();
  var two = parseInt(getTransform("div.two")[0])+diffSlide();
  var three = parseInt(getTransform("div.three")[0])+diffSlide();
  var four = parseInt(getTransform("div.four")[0])+diffSlide();
  var five = parseInt(getTransform("div.five")[0])+diffSlide();
  var six = parseInt(getTransform("div.six")[0])+diffSlide();
  var seven = parseInt(getTransform("div.seven")[0])+diffSlide();
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
