// -------------------------
// ANIMATIONS
// -------------------------

// Variables

  // Calc Window Height
  var winHeight = $(window).height();
  var docHeight = $(document).height();
  var mq = window.matchMedia("(max-width: 768px)");

$(document).ready(function(){

  // Preload img
  $(window).load(function(){
    $("img, .subtitle, .title").not('.not-preload,.img-hover').each(function(){
      $(this).animate({'opacity':1},2000);
    });
  });

  $(window).load(function() {
    $(".loader").fadeOut(600);
    $('#page-content-wrapper').fadeIn(600);
  })

  // Calc Window Height
  $('.height-calc').css('height', winHeight);
  $('.eventos').css('min-height', winHeight);

  if (mq.matches) {
    $('.height-calc').css('height', winHeight + 150);
  }

  // Sidebar Wrapper TOGGLE
  $(".navbar-toggle").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("sidebar-toggle");
      $('.social-block').fadeToggle();
  });
  $("#sidebar-closebox").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("sidebar-toggle");
      $('.social-block').fadeToggle();
  });

  // Go to SIDEBAR
  function scrollToAnchor(aid){
     var aTag = $("#"+ aid);
     $('html,body').animate({scrollTop: aTag.offset().top-100},'slow');
  }

  $('.gotop').click(function(){
    scrollToAnchor('top');
  });

  $('.godown').click(function(){
    scrollToAnchor('section-02');
  });

});




