$(function() {
  const $polygons = $('.bg > polygon');

  const ANIM = {
    duration: 0.6,
    stagger: 0.005,
    
    from: {
      opacity: 0,
      scale: 0,
      transformOrigin: 'center center',
      force3D: true
    },
        
    to: {
      opacity: 1,
      scale: 1,
      ease: Elastic.easeInOut,
      force3D: true
    }
  };
  
  const timeline = new TimelineMax({
    delay: 0,
    repeat: 0,
    //repeatDelay: 0.5,
    //yoyo: true
  });

  
  timeline.staggerFromTo($polygons, ANIM.duration, ANIM.from, ANIM.to, ANIM.stagger, 0);
  //TweenMax.staggerFromTo(polygons, ANIM.duration, ANIM.from, ANIM.to, ANIM.stagger);
  
  $('body').addClass('loaded');
});