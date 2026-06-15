const runBtn = document.querySelectorAll('.controller__play'),
      song = document.querySelector('.intro__audio'),
      progress = document.querySelectorAll('.controller__timeline');
function playPause() {
    if(song.paused) {
        song.play();
        runBtn[0].className = 'controller__play';
    } else {
        song.pause();
        runBtn[0].className = 'controller__pause';
    }
}

runBtn[0].addEventListener('click', playPause);
song.addEventListener('ended', function() {
    runBtn[0].className = 'controller__play';
})

progress[0].addEventListener('input', userChangeProgress);

function userChangeProgress() {
    if (!Number.isFinite(song.duration)) return;
    const userTime = (progress[0].value / 100) * song.duration;
    song.currentTime = userTime;
    progress[0].style.setProperty('--progress', `${progress[0].value}%`);
}

const currentTime = document.querySelectorAll('.controller__current'),
      commonTime = document.querySelectorAll('.controller__duration');

/* view timing, secs and mins how to display it */
const showTime = (num) => {
    const min = Math.floor(num / 60),
          sec = Math.floor(num % 60),
          currSec = sec < 10 ? `0${sec}`:`${sec}`;
    return `${min}:${currSec}`;
}

function updPlayerAndTiming() {
    // loaded audio/metadata
    if (!Number.isFinite(song.duration)) return;
    const posInPercent = (song.currentTime / song.duration) * 100;
    progress[0].value = posInPercent;
    progress[0].style.setProperty('--progress', `${posInPercent}%`);

    // display time 0:00-2:54
    currentTime[0].textContent = showTime(Math.floor(song.currentTime));
}

function showCommonTime() {
    if (!Number.isFinite(song.duration)) return;
    commonTime[0].textContent = showTime(song.duration);
}
song.addEventListener('loadedmetadata', showCommonTime);
song.addEventListener('timeupdate', updPlayerAndTiming);