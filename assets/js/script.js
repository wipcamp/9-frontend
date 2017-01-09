$(document).ready(function(){
  var slideItems = $('div.slide');

  initSlide();

  $('span.menu').click(function(event) {
    if(getTransform($(event.target).parents().filter('.slide'))[0] == 0){
      $(event.target).parents().filter('.slide').removeClass('active');
      $(event.target).parents().filter('.slide').css({"transform": "perspective(100px) translate3d(0, -100px, -50px)"});
      event.stopPropagation();
    }
  });

  $('div.slide').click(function(event) {
    if(getTransform($(event.target).parents().filter('.slide'))[0] == 0){ console.log("Happy");
      $(event.target).parents().filter('.slide').addClass('active');
      $(event.target).parents().filter('.slide').css({"transform": "perspective(100px) translate3d(0, 0, 0)"});
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
  });

  $('.slide-control').append('<div class="prev-container">prev</div>');
  $('.slide-control').append('<div class="bullet-container"></div>');
  $('.slide-control').append('<div class="next-container">next</div>');
  for (i = 0; i < slideItems.length; i++) {
    $('.bullet-container').append('<div class="bullet"></div>');
  }

  marginSlideControl();

  $('.slide-control .bullet').on('click', function(event) {
    var diff =  $('.slide-control .bullet').index(event.target) - Math.abs(page);
    for(i = 0; i < Math.abs(diff); i++) {
      if (diff > 0) {
        slide(1);
      }
      else if (diff < 0) {
        slide(-1);
      }
    }
  });

  $('.slide-control .next-container').on('click', function() {
    slide(1);
  });

  $('.slide-control .prev-container').on('click', function() {
    slide(-1);
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

  $('.slide-control .bullet').removeClass('current').empty();
  $('.slide-control .bullet:eq(' + Math.abs(page) + ')').addClass('current').append(Math.abs(page) + 1);
}

function marginSlideControl(){
  var dif = ($(window).width()-$('div.slide-control').width())/2;
  $('.slide-control').css({"margin-left": + dif +"px"});
}
