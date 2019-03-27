

$(function () {
  var $polygons = $('.bg > polygon');

  var ANIM = {
    duration: 1.5,
    stagger: 0.005,

    from: {
      opacity: 0,
      scale: 0,
      transformOrigin: 'center center',
      force3D: true },


    to: {
      opacity: 1,
      scale: 1,
      ease: Elastic.easeInOut,
      force3D: true } };



  var timeline = new TimelineMax({
    delay: 0,
    repeat: 0,
     repeatDelay: 0.5,
    //yoyo: true
  });


  timeline.staggerFromTo($polygons, ANIM.duration, ANIM.from, ANIM.to, ANIM.stagger, 0);
  //TweenMax.staggerFromTo(polygons, ANIM.duration, ANIM.from, ANIM.to, ANIM.stagger);

  $('body').addClass('loaded');
});
//--------------------------------------------

var googleUser = {};
  var startApp = function() {
    gapi.load('auth2', function(){
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      auth2 = gapi.auth2.init({
        client_id: '699546304820-dtc9edh7t4f23nnekb4oi1vdavqniq10.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        // Request scopes in addition to 'profile' and 'email'
        //scope: 'additional_scope'
      });
      attachSignin(document.getElementById('proceed-btn'));
    });
  };

  function attachSignin(element) {
    console.log(element.id);
    auth2.attachClickHandler(element, {},
        function(googleUser) {
          console.log("Signed in: " + googleUser.getBasicProfile().getName());
          window.location.href = "../loader.html";
        }, function(error) {
          alert(JSON.stringify(error, undefined, 2));
        });
  }

  setInterval(function(){
    for(let i=0;i<1;i+=0.1)
    {$('#proceed-btn').css('transform', 'scale('+i+')');
      $(".chakra").css("transform",'scale('+i+')');
  }
    $(".logo1").fadeIn("slow");
    $(".logo").fadeIn("slow");
  }, 3000);

  //----------------------------------------
// function loadDoc() {
//   var xhttp = new XMLHttpRequest();
//   xhttp.onreadystatechange = function() {
//     if (this.readyState == 4 && this.status == 200) {
//       var name = profile.getName();
//     }
//   };
//   xhttp.open("POST", "ajax_info.txt", true);
//   xhttp.send(name);
// }






function toggleFullScreen() {
  if ((document.fullScreenElement && document.fullScreenElement !== null) ||
   (!document.mozFullScreen && !document.webkitIsFullScreen)) {
    if (document.documentElement.requestFullScreen) {
      document.documentElement.requestFullScreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullScreen) {
      document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.cancelFullScreen) {
      document.cancelFullScreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    }
  }
}
$(document).ready(function(){
  $('.full').click(function(){
    $('.full').toggleClass('active');
    $('.close').toggleClass('active');


  })


})
