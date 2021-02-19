const MS_PER_SEC = 1000;
const MS_PER_MIN = 60 * MS_PER_SEC;
const MS_PER_HOUR = 60 * MS_PER_MIN;
const MS_PER_TWELWE_HOURS = 12 * MS_PER_HOUR;

const hoursHand = document.querySelector(".hours-hand");
const minutesHand = document.querySelector(".minutes-hand");
const secondsHand = document.querySelector(".seconds-hand");

const minuteMarks = document.querySelector(".minute-marks");
const minuteLabels = document.querySelector(".minute-labels");

function renderMinuteMarks() {
  for (let degrees = 0; degrees < 360; degrees += 360 / 60) {
    const isAnHour = degrees % 30 === 0;
    if (isAnHour) {
      const minuteLabel = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text"
      );
      let position = getPositionFromDegrees(degrees);
      let minutes = (degrees || 360) / 6;
      minuteLabel.textContent = minutes < 10 ? `0${minutes}` : `${minutes}`;
      minuteLabel.style.fontFamily = "Roboto";
      minuteLabel.style.fontSize = "12px";
      minuteLabel.setAttribute("x", `${position.x}`);
      minuteLabel.setAttribute("y", `${position.y}`);
      minuteLabel.setAttribute("text-anchor", "middle");
      minuteLabel.setAttribute("dominant-baseline", "middle");
      minuteLabel.setAttribute("fill", "white");
      minuteLabels.appendChild(minuteLabel);
    } else {
      const mark = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "rect"
      );
      mark.setAttribute("x", "199.5");
      mark.setAttribute("y", "2");
      mark.style.transform = `rotate(${degrees}deg)`;
      minuteMarks.appendChild(mark);
    }
  }
}

function getPositionFromDegrees(degrees) {
  const degreesToRadian = degrees => (degrees * 2 * Math.PI) / 360;
  const rad = degreesToRadian(degrees);
  return {
    x: 200 + 190 * Math.sin(rad),
    y: 200 - 190 * Math.cos(rad)
  };
}

function updateHands() {
  const date = new Date();

  const secondsInMs = date.getSeconds() * MS_PER_SEC + date.getMilliseconds();
  const minutesInMs = date.getMinutes() * MS_PER_MIN + secondsInMs;
  const hoursInMs = date.getHours() * MS_PER_HOUR + minutesInMs;

  const secondsDegrees = (secondsInMs / MS_PER_MIN) * 360;
  const minutesDegrees = (minutesInMs / MS_PER_HOUR) * 360;
  const hoursDegrees = (hoursInMs / MS_PER_TWELWE_HOURS) * 360;

  secondsHand.style.transform = `rotate(${secondsDegrees}deg)`;
  minutesHand.style.transform = `rotate(${minutesDegrees}deg)`;
  hoursHand.style.transform = `rotate(${hoursDegrees}deg)`;

  requestAnimationFrame(updateHands);
}

renderMinuteMarks();
requestAnimationFrame(updateHands);
