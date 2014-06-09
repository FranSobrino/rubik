$(document).ready(function() {
});

window.addEventListener("keydown", function (event) {
  if (event.defaultPrevented) {
    return; // Should do nothing if the key event was already consumed.
  }
  switch (event.keyCode) {
    case 37: //left arrow
      PageTransitions.prevSlide();
      break;
    case 38: //up arrow
      PageTransitions.prevSlide();
      break;
    case 39: //right arrow
      PageTransitions.nextSlide();
      break;
    case 40: //down arrow
      PageTransitions.nextSlide();
      break;
    case 13: //enter arrow
      PageTransitions.nextSlide();
      break;
    case 27:
      PageTransitions.goToSlide(0);
      break;
    case 36:
      PageTransitions.goToSlide(0);
      break;
    default:
      return; // Quit when this doesn't handle the key event.
  }
  // Consume the event for suppressing "double action".
  event.preventDefault();
}, true);