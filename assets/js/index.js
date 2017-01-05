$(document).ready(function(){
  //$('div.one').css({"transform": "perspective(100px) translate3d(0, 0, -50px)"});
  $('div.two').css({"transform": "perspective(100px) translate3d(1500px, 0, -50px)"});
  $('div.three').css({"transform": "perspective(100px) translate3d(3000px, 0, -50px)"});
  $('div.four').css({"transform": "perspective(100px) translate3d(4500px, 0, -50px)"});
  $('div.five').css({"transform": "perspective(100px) translate3d(6000px, 0, -50px)"});
  $('div.six').css({"transform": "perspective(100px) translate3d(7500px, 0, -50px)"});
  $('div.seven').css({"transform": "perspective(100px) translate3d(9000px, 0, -50px)"});

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

function slideRight(){
  var one = getTransform("div.one")[0]-1500;
  var two = getTransform("div.two")[0]-1500;
  var three = getTransform("div.three")[0]-1500;
  var four = getTransform("div.four")[0]-1500;
  var five = getTransform("div.five")[0]-1500;
  var six = getTransform("div.six")[0]-1500;
  var seven = getTransform("div.seven")[0]-1500;
  if(getTransform("div.one")[0] == 0 || getTransform("div.two")[0] == 0
  || getTransform("div.three")[0] == 0 || getTransform("div.four")[0] == 0
  || getTransform("div.five")[0] == 0 || getTransform("div.six")[0] == 0
  || getTransform("div.seven")[0] != 0){
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
  var one = parseInt(getTransform("div.one")[0])+1500;
  var two = parseInt(getTransform("div.two")[0])+1500;
  var three = parseInt(getTransform("div.three")[0])+1500;
  var four = parseInt(getTransform("div.four")[0])+1500;
  var five = parseInt(getTransform("div.five")[0])+1500;
  var six = parseInt(getTransform("div.six")[0])+1500;
  var seven = parseInt(getTransform("div.seven")[0])+1500;
  if(getTransform("div.one")[0] != 0 || getTransform("div.two")[0] == 0
  || getTransform("div.three")[0] == 0 || getTransform("div.four")[0] == 0
  || getTransform("div.five")[0] == 0 || getTransform("div.six")[0] == 0
  || getTransform("div.seven")[0] == 0){
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
