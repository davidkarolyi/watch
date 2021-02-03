const DEGS_IN_CIRCLE = 360;
const SECS_IN_MIN = 60;
const MS_IN_SEC = 1000;


const hourHand = document.querySelector(".hour-hand");
const secondHand = document.querySelector(".second-hand");

function updateHands() {
  const date = new Date();
  const millisecDegrees = date.getMilliseconds() * DEGS_IN_CIRCLE / (SECS_IN_MIN * MS_IN_SEC);
  const secDegrees = date.getSeconds() * DEGS_IN_CIRCLE / SECS_IN_MIN;

  const deg = secDegrees + millisecDegrees;
  secondHand.style.transform = `rotate(${deg}deg)`;
  requestAnimationFrame(updateHands);
}

requestAnimationFrame(updateHands);