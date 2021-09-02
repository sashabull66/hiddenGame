// library import
import VDom from "./libraries/VDom/VDom.js"; // импорт библиотеки по работе с VirtualDom

// main state import
import {store} from "./store/store.js";

// components
import Main from "./components/Main/Main.js"; // импорт компоненты "Меню"
import Help from "./components/Help/Help.js"; // импорт компоненты "Помощь"
import Scores from "./components/Scores/Scores.js"; // импорт компоненты "Результаты"
import Game, {resetGameStatus} from "./components/Game/Game.js"; // импорт компоненты "Игра" => тут происходит весь игровой процесс

// init library virtualDom
export const virtualDom = new VDom(); // создать экземпляр класса VirtualDom

renderAPP(); // init start
window.onhashchange = renderAPP; // установить слушатель на смену хэша

// main render function
function renderAPP() {
    const state = store.getState(); // получить текущее состояние
    const root = document.getElementById('root'); // найти рутовый элемент
    state.scores.scores.length === 0 ? getScores(state) : null // запросить список рекордов с сервера
    initAudio(state)
    const hashData = decodeURIComponent(window.location.hash.substr(1));
    switch (hashData) {
        case 'game' :
            store.addFollower(() => { // добавить в store слушателя - функцию игровой страницы
                virtualDom.render(Game(), root)
            })
            break;

        case 'main' :
            resetGameStatus(state) // занулить игровой прогресс
            store.addFollower(() => { // добавить в store слушателя - функцию рендера главной страницы
                virtualDom.render(Main(), root)
            })
            break;

        case 'scores':
            resetGameStatus(state) // занулить игровой прогресс
            store.addFollower(() => { // добавить в store слушателя - функцию рендера страницы рекордов
                virtualDom.render(Scores(), root)
            })
            break;

        case 'help':
            resetGameStatus(state) // занулить игровой прогресс
            store.addFollower(() => { // добавить в store слушателя - функцию рендера страницы помощь
                virtualDom.render(Help(), root)
            })
            break;

        default:
            changeHash('main') // по дефолту переключится на "case 'main'..."
    }
}

// other function for app
export function playBackgroundMusic(state) {
    if (state.audio.background.isPlay) {
        window.gameAudio.Background.play()
    }
    if (!state.audio.background.isPlay) {
        window.gameAudio.Background.pause()
    }
}

export function requestFullScreen(element = document.querySelector('#root').childNodes[0]) {
    const state = store.getState()
    if (state.screen.fullscreen) {
        if (element.requestFullScreen) {
            element.requestFullScreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullScreen) {
            element.webkitRequestFullScreen();
        }
    }
    if (!state.screen.fullscreen) {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }
    }
}

export function playSpriteMusic(state, audioName) {
    if (state.audio.sprite.isPlay) {
        window.gameAudio[audioName].play()
    }
}

export function changeHash(newHashValue) {
    let r;
    if (newHashValue.includes('-')) {
        r = newHashValue.replace('-', '_')
    }
    location.hash = r || newHashValue
} // функция для смены хеша

function getScores(state) {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://fe.it-academy.by/AjaxStringStorage2.php');
    xhr.responseType = 'json';
    let formData = new FormData() // создать объект formDATA
    formData.append('f', 'READ') // заполнить объект formDATA
    formData.append('n', 'HiidenGame_sashabull66') // заполнить объект formDATA
    xhr.send(formData)
    xhr.onload = function () {
        state.scores.scores = JSON.parse(xhr.response.result);
        store.editState(state)
    }
}

function initAudio(state) {
    if (!window.gameAudio) { // add audio files
        window.gameAudio = {};
        window.gameAudio.Background = new Audio(state.audio.background.src);
        window.gameAudio.Background.volume = 0.010
        window.gameAudio.Background.loop = true

        window.gameAudio.success = new Audio(state.audio.sprite.success.src);
        window.gameAudio.success.volume = 0.010

        window.gameAudio.error = new Audio(state.audio.sprite.error.src);
        window.gameAudio.error.volume = 0.030
        window.gameAudio.error.loop = false

        window.gameAudio.winLevel = new Audio(state.audio.sprite.winLevel.src);
        window.gameAudio.winLevel.volume = 0.040

        window.gameAudio.click = new Audio(state.audio.sprite.click.src);

        window.gameAudio.drums = new Audio(state.audio.sprite.drums.src);
        window.gameAudio.drums.volume = 0.070
    }
}