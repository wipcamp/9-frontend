$(document).ready(function(){
  $('div.getstart').click(function(event) {
    $(event.target).parent().removeClass('active');
    event.stopPropagation();
  });

  $('div.one').click(function() {
    if(parseInt(getTransform(this)[0]) == 0){  //console.log("Hello");
      $(this).addClass('active');
      $(this).removeAttr('style');
    }
  });

  $(document).keydown(function(event) {
    if(event.which == 39) {
      var one = getTransform("div.one")[0]-1500;
      var two = getTransform("div.two")[0]-1500;
      var three = getTransform("div.three")[0]-1500;
      var four = getTransform("div.four")[0]-1500;
      var five = getTransform("div.five")[0]-1500;
      var six = getTransform("div.six")[0]-1500;
      var seven = getTransform("div.seven")[0]-1500;
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
    if(event.which == 37) {
      var one = parseInt(getTransform("div.one")[0])+1500;
      var two = parseInt(getTransform("div.two")[0])+1500;
      var three = parseInt(getTransform("div.three")[0])+1500;
      var four = parseInt(getTransform("div.four")[0])+1500;
      var five = parseInt(getTransform("div.five")[0])+1500;
      var six = parseInt(getTransform("div.six")[0])+1500;
      var seven = parseInt(getTransform("div.seven")[0])+1500;
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
/*
Key code
right == 39
left == 37
*/
