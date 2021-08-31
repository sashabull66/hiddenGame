// libraries import
import VDom from "./libraries/VDom/VDom.js"; // импорт библиотеки по работе с VirtualDom
//import jquery from "./libraries/jquery/jquery.js"; // импорт библиотеки jquery
//import state
import {store} from "./store/store.js";
// components
import Main from "./components/Main/Main.js"; // импорт компоненты "Меню"
import Help from "./components/Help/Help.js"; // импорт компоненты "Помощь"
import Scores from "./components/Scores/Scores.js"; // импорт компоненты "Результаты"
import Game, {resetGameStatus} from "./components/Game/Game.js";
import ScoresBodyItem from "./components/Scores/ScoresBody/ScoresBodyItem.js"; // импорт компоненты "Игра" => тут происходит весь игровой процесс
// init libraries
//jquery(); // запустить скрипт jquery
export const virtualDom = new VDom(); // создать экземпляр класса VirtualDom

function renderAPP() {
    const state = store.getState(); // получить текущее состояние
    const root = document.getElementById('root'); // найти рутовый элемент
    state.scores.scores.length === 0 ? getScores(state) : null // запросить список рекордов с сервера
    if (!window.audioBackground || !window.audioSprite) { // add audio files
        window.audioSprite = new Audio(state.audio.sprite.src);
        window.audioBackground = new Audio(state.audio.background.src);
        window.audioBackground.loop = true;
    }

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

window.onhashchange = renderAPP; // установить слушатель на смену хэша
renderAPP(); // init start


export function offOnBackgroundMusic(state) {
    if (state.audio.background.isPlay) {
        window.audioBackground.play()
    }
    if (!state.audio.background.isPlay) {
        window.audioBackground.pause()
    }
}

export function offOnSpriteMusic(state) {
    if (state.audio.sprite.isPlay) {
        window.audioSprite.play()
    }
    if (!state.audio.sprite.isPlay) {
        window.audioSprite.pause()
    }
}

export function changeHash(newHashValue) {
    let r;
    if (newHashValue.includes('-')) {
        r = newHashValue.replace('-', '_')
    }
    location.hash = r || newHashValue
} // функция для смены хеша

function replaceLetter(selectors) {
    selectors.forEach((selector) => {
        selector.innerHTML = selector.innerHTML.split('').map(letter => {
            return `<span>${letter === ' ' ? `&nbsp` : letter}</span>` // сохраняю пробел заменяя пустую строку на неразрывный пробел
        }).join('')
    })

}

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
        console.log(xhr.response.result)
        store.editState(state)
    }
}