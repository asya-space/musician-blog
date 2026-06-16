import { tracks } from '../data/_data.js';
import { showTime } from './_player.js';
import { showCommonTime } from './_player.js';
import { playPause } from './_player.js';
import { changeBtn } from './_player.js';
import { userChangeProgress } from './_player.js';
import { updPlayerAndTiming } from './_player.js';

const list = document.querySelector('.tracks__list'),
      runBtn = document.querySelectorAll('.controller__play')[1],
      progress = document.querySelectorAll('.controller__timeline')[1],
      audio = document.querySelector('.init__audio'); // <= who is playing audio? <audio>

/*  1) generation playlist without audio for correct generation'; 
    just one empty tag <audio> in HTML without attribute "src"
    list is just titles (6 counts), no audio src */
tracks.forEach((track) => {
    list.insertAdjacentHTML(       
        'beforeend',
        `<li class="tracks__item">
            <p class="tracks__title">${track.title}</p>
        </li>`
    );
})

/* 2) 0 = the 1st track from list;
    load 1st track */
let currentIndex = 0;
function loadTrack(index) {
    audio.src = tracks[index].src;
    audio.load();
}
loadTrack(currentIndex);


runBtn.addEventListener('click', () => playPause(audio, runBtn));

// 3) list from generated track's list, look at tracks.forEach();
const items = document.querySelectorAll('.tracks__item'),
      titles = document.querySelectorAll('.tracks__title');
items.forEach((item, index) => {
    item.addEventListener('click', () => {
        currentIndex = index;
        // load track with index n
        loadTrack(currentIndex);
        audio.play();
        // coloring playing track
        titles.forEach((title, i) => {
            if (i === currentIndex) {
                title.classList.add('active');
            } else {
                title.classList.remove('active');
            }
        });
    });
})

const currentTime = document.querySelectorAll('.controller__current')[1],
      commonTime = document.querySelectorAll('.controller__duration')[1];
audio.addEventListener('loadedmetadata', () =>  showCommonTime(audio, commonTime));
audio.addEventListener('timeupdate', () => updPlayerAndTiming(audio, progress, currentTime));
changeBtn(audio, runBtn);
progress.addEventListener('input', () => userChangeProgress(audio, progress));




