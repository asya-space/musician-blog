const song = document.querySelector('.intro__audio'),
      runBtn = document.querySelectorAll('.controller__play')[0],
      progress = document.querySelectorAll('.controller__timeline')[0];

// 1) audio = any audio file, universal arg;
export function playPause(audio, btn) {
    if(audio.paused) {
        audio.play();
        btn.className = 'controller__play';
    } else {
        audio.pause();
        btn.className = 'controller__pause';
    }
}

runBtn.addEventListener('click', () => playPause(song, runBtn));

export function changeBtn(audio, btn) {
    audio.addEventListener('ended', function() {
        btn.className = 'controller__play';
    });
}
changeBtn(song, runBtn);

progress.addEventListener('input', () => userChangeProgress(song, progress));

// 2) display progress bar
export function userChangeProgress(audio, timeline) {
    if (!Number.isFinite(audio.duration)) return;
    const userTime = (timeline.value / 100) * audio.duration;
    audio.currentTime = userTime;
    timeline.style.setProperty('--progress', `${timeline.value}%`);
}

/* view timing, secs and mins how to display it */
export const showTime = (num) => {
    const min = Math.floor(num / 60),
          sec = Math.floor(num % 60),
          currSec = sec < 10 ? `0${sec}`:`${sec}`;
    return `${min}:${currSec}`;
}

const currentTime = document.querySelectorAll('.controller__current')[0],
      commonTime = document.querySelectorAll('.controller__duration')[0];
// 3) timing 00:00 + auto update thumb on player
//  timeline = input[type="range"] = progress bar
export function updPlayerAndTiming(audio, timeline, current) {
    // loaded audio/metadata
    if (!Number.isFinite(audio.duration)) return;
    const posInPercent = (audio.currentTime / audio.duration) * 100;
    timeline.value = posInPercent;
    timeline.style.setProperty('--progress', `${posInPercent}%`);

    // display time 0:00-2:54
    current.textContent = showTime(Math.floor(audio.currentTime));
}

export function showCommonTime(audio, common) {
    if (!Number.isFinite(audio.duration)) return;
    common.textContent = showTime(audio.duration);
}
song.addEventListener('loadedmetadata', () => showCommonTime(song, commonTime));
song.addEventListener('timeupdate', () => updPlayerAndTiming(song, progress, currentTime));

