import '../assets/styles/main.css';
import WaveSurfer from 'wavesurfer.js';
import track from '../assets/audio/Фристайл - Чёрные глаза.mp3';
import track2 from '../assets/audio/5Sta Family - Искры.mp3';
import track3 from '../assets/audio/Dabro - На часах ноль-ноль.mp3';
import track4 from '../assets/audio/NLO - Танцы.mp3';
import track5 from '../assets/audio/ПАПА ДЖАН - ДИКИЙ (КАВКАЗСКАЯ МУЗЫКА).mp3';
import track6  from '../assets/audio/sample-12s.wav';
const musicButtons = document.querySelectorAll('.music-choose');
const currentTime = document.querySelector('#timeNow');
const fullTime = document.querySelector('#timeFull');
let wavesurfer = null;

const playlist = {
    'Фристайл - Чёрные глаза.mp3': track,
    '5Sta Family - Искры.mp3': track2,
    'Dabro - На часах ноль-ноль.mp3': track3,
    'NLO - Танцы.mp3': track4,
    'ПАПА ДЖАН - ДИКИЙ (КАВКАЗСКАЯ МУЗЫКА).mp3': track5,
    'sample-12s.wav': track6
}

// Очищаем активные кнопки
const buttonClear = () => {
    musicButtons.forEach((button) => button.style.color = '#fff')
}

function formatTime(seconds) {
    // Проверка на валидность входных данных
    if (isNaN(seconds) || seconds < 0) {
        return "Некорректные данные";
    }

    // Расчет минут и секунд
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60); // Используем Math.floor, чтобы получить только целые секунды

    // Добавление ведущего нуля, если секунды < 10
    const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;

    // Форматированная строка
    const formattedTime = `${minutes}:${formattedSeconds}`;

    return formattedTime;
}

// Добавляем плеер
const musicHandler = (event) => {
    const target = event.target;
    const id = target.dataset.id;
    buttonClear();
    fullTime.textContent = '0:00';
    currentTime.textContent = '0:00';
    target.style.color = '#f60000'

    if (wavesurfer !== null) {
        wavesurfer.destroy();
        wavesurfer = WaveSurfer.create({
            container: "#wave",
            waveColor: "#D8D8D8",
            progressColor: "#f60000",
            cursorColor: "#fff",
            url: playlist[id],
        })
    } else {
        wavesurfer = WaveSurfer.create({
            container: "#wave",
            waveColor: "#D8D8D8",
            progressColor: "#f60000",
            cursorColor: "#fff",
            url: playlist[id],
        })
    }

    wavesurfer.on('ready', (e) => {
        fullTime.textContent = formatTime(wavesurfer.getDuration());
    })

    wavesurfer.on('audioprocess', (e) => {
        currentTime.textContent = formatTime(wavesurfer.getCurrentTime());
    })
}

const initLocalStorage = () => {
    localStorage.setItem('playlist', JSON.stringify(playlist));
}

const startApp = () => {
    initLocalStorage();
    musicButtons.forEach((button) => button.addEventListener('click', musicHandler));
    document.getElementById('playButton').addEventListener('click', function () {
        if (wavesurfer.isPlaying()) {
            wavesurfer.pause();
        } else {
            wavesurfer.play();
        }
    });

    const volumeRange = document.getElementById('volume');

    volumeRange.addEventListener('input', function () {
        const volumeValue = parseFloat(this.value); // Получение значения громкости из ползунка
        wavesurfer.setVolume(volumeValue); // Установка громкости
    });
}

startApp();
