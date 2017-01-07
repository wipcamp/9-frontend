$(document).ready(function(){
  initSlide();

  $('div.menu').click(function(event) {
    if(getTransform($(event.target).parents().filter('.slide'))[0] == 0){
      $(event.target).parents().filter('.slide').removeClass('active');
      $(event.target).parents().filter('.slide').css({"transform": "perspective(100px) translate3d(0, -100px, -50px)"});
    }
  });

  $('div.slide').click(function(event) {
    console.log("Happy");
    if(parseInt(getTransform(event.target)[0]) == 0){
      $(event.target).addClass('active');
      $(event.target).css({"transform": "perspective(100px) translate3d(0, 0, 0)"});
    }
  });

  $(document).keydown(function(event) {
    if(event.which == 39 && getTransform("div.slide")[2] == -50) {
      slide(1);
    }
    if(event.which == 37 && getTransform("div.slide")[2] == -50) {
      slide(-1);
    }
  });

  $(function(){
    var slideContainer = $("#con")[0];
    Hammer(slideContainer).on("swipeleft", function() {
      if(getTransform("div.slide")[2] == -50) {
        slide(1);
      }
    });
    Hammer(slideContainer).on("swiperight", function() {
      if(getTransform("div.slide")[2] == -50) {
        slide(-1);
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
    $(val).css('transform', 'perspective(100px) translate3d('+ getLeftDistance(val, items) +'px, -100px, -50px)');
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

var page = 0;
var pageTransform = {};
for(var i = -7; i < 8; i++){
  pageTransform[i] = i*diffSlide();
}

function slide(direction) {
  if (direction === 1 && page != -7) {
    page--;
  } else if (direction === -1 && page != 0) {
    page++;
  }

  var temp = page + 8;
  $.each($('div.slide'), function (idx, val) {
    $(val).css({"transform": "perspective(100px) translate3d(" + pageTransform[temp - (8 - idx)] + "px, -100px, -50px)"});
  });
}
