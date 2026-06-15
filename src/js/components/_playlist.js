import { tracks } from './../data/_audio.js';
import { showCommonTime } from './_player.js';

const list = document.querySelector('.tracks__list'),
      runBtn = document.querySelectorAll('.controller__play'),
      progress = document.querySelectorAll('.controller__timeline'),
      song = document.querySelector('.init__audio');

/* generation playlist */
tracks.forEach(track => {
    list.insertAdjacentHTML(
        'beforeend',
        `<li class="tracks__item">
            <p class="tracks__title">${track.title}</p>
        </li>`
    )
})

let currentIndex = 0;
function loadTrack(index) {
    song.src = tracks[index].src;
    song.load();

    console.log(tracks[index].src);
}
loadTrack(currentIndex);

function playPause(index) {
    if(song.paused) {
        song.play();
        runBtn[1].className = 'controller__play';
    } else {
        song.pause();
        runBtn[1].className = 'controller__pause';
    }
}
runBtn[1].addEventListener('click', playPause);
//let currentIndex = 0;

