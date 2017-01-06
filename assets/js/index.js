$(document).ready(function(){
  initSlide();

  $('div.back').click(function(event) {
    if(getTransform($(event.target).parent())[0] == 0){
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
    if(event.which == 39 && getTransform("div.slide")[2] == -50) {
      slide(-1);
    }
    if(event.which == 37 && getTransform("div.slide")[2] == -50) {
      slide(1);
    }
  });

  $(function(){
    var slideContainer = $("#con")[0];
    Hammer(slideContainer).on("swipeleft", function() {
      if(getTransform("div.slide")[2] == -50) {
        slide(-1);
      }
    });
    Hammer(slideContainer).on("swiperight", function() {
      if(getTransform("div.slide")[2] == -50) {
        slide(1);
      }
    });
  })
});

function getTransform(el) {
    var results = $(el).css('-webkit-transform');
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

function getLeftDistance(elEach, elAll) {
  var windowWidth = $(window).width();
  var index = $(elAll).index(elEach);
  return index * (windowWidth * 1.15625);
}

function diffSlide(){
  var windowWidth = $(window).width();
  return windowWidth * 1.15625;
}

function slide(direction) {
  var elementsAll = $('div.slide');
  var elementFocused;

  switch (direction) {
    case 1 :
      elementFocused = elementsAll[0];
      break;
    case -1 :
      elementFocused = elementsAll[elementsAll.length - 1];
      break;
    default :
      return false;
  }

  if (getTransform(elementFocused)[0] != 0) {
    $.each(elementsAll, function(idx, val) {
      var axisX = parseInt(getTransform(val)[0]) + diffSlide() * direction;
      $(val).css({"transform": "perspective(100px) translate3d(" + axisX + "px, 0, -50px)"});
    });
  }
}
