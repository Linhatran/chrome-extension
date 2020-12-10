chrome.browserAction.setIcon({ path: 'icon.png' });
const startBtn = $('#start');
const pauseBtn = $('#pause');
let isPlaying = null;
let timeInput = $('.duration');
const displayTime = (time) => {
  $('#display').text(time);
};
let intervalId;
class Timer {
  constructor(callbacks) {
    this.startBtn = startBtn;
    this.pauseBtn = pauseBtn;
    this.duration = $(timeInput).val();
  }

  start = (button) => {
    $(this.startBtn).on('click', () => {
      let duration =
        parseInt($('#display').text().split(':')[0]) * 60 +
        parseInt($('#display').text().split(':')[1]) -
        1;
      let minutes;
      let seconds;

      if (!intervalId) {
        intervalId = window.setInterval(function () {
          minutes = parseInt(duration / 60, 10);
          seconds = parseInt(duration % 60, 10);

          minutes = minutes < 10 ? '0' + minutes : minutes;
          seconds = seconds < 10 ? '0' + seconds : seconds;
          let time = minutes + ' : ' + seconds;

          while (--duration < 0) {
            duration = parseInt(button.id) * 60;
          }
          displayTime(time);
        }, 1000);
      } else intervalId = intervalId;
    });
  };
  pause = () => {
    clearInterval(intervalId);
    intervalId = null;
  };
}
const myTimer = new Timer();
$(window).on('click', (e) => {
  if (e.target.className === 'minutes') {
    myTimer.pause();
    displayTime(e.target.value);
    myTimer.start(e.target);
  }
  if (e.target.className === 'fas fa-pause') {
    myTimer.pause();
  }
});

let imageArr = [
  './images/field.jpg',
  './images/lake.jpg',
  './images/ocean.jpg',
  './images/palm-tree.jpg',
  './images/sky.jpg',
];

$('#changeBackground').on('click', function () {
  let index = Math.floor(Math.random() * 5);
  let newBackground = `background-image: url(${imageArr[index]})`;
  $('body').attr('style', newBackground);
});
function playSound(button, soundId) {
  button.on('click', () => {
    if (!isPlaying) {
      document.getElementById(soundId).play();
      document.getElementById(soundId).loop = true;
      isPlaying = true;
    } else {
      document.getElementById(soundId).pause();
      isPlaying = false;
    }
  });
}
playSound($('.fa-cloud-sun-rain'), 'rain');
playSound($('.fa-dove'), 'bird');
playSound($('.fa-water'), 'ocean');
