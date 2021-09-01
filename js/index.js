// libraries import
import VDom from "./libraries/VDom/VDom.js"; // импорт библиотеки по работе с VirtualDom
import {store} from "./store/store.js";

// components
import Main from "./components/Main/Main.js"; // импорт компоненты "Меню"
import Help from "./components/Help/Help.js"; // импорт компоненты "Помощь"
import Scores from "./components/Scores/Scores.js"; // импорт компоненты "Результаты"
import Game, {resetGameStatus} from "./components/Game/Game.js"; // импорт компоненты "Игра" => тут происходит весь игровой процесс

// init libraries
export const virtualDom = new VDom(); // создать экземпляр класса VirtualDom

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
                requestFullScreen()
            })
            break;

        case 'main' :
            resetGameStatus(state) // занулить игровой прогресс
            store.addFollower(() => { // добавить в store слушателя - функцию рендера главной страницы
                virtualDom.render(Main(), root)
                requestFullScreen()
            })
            break;

        case 'scores':
            resetGameStatus(state) // занулить игровой прогресс
            store.addFollower(() => { // добавить в store слушателя - функцию рендера страницы рекордов
                virtualDom.render(Scores(), root)
                requestFullScreen()
            })
            break;

        case 'help':
            resetGameStatus(state) // занулить игровой прогресс
            store.addFollower(() => { // добавить в store слушателя - функцию рендера страницы помощь
                virtualDom.render(Help(), root)
                requestFullScreen()
            })
            break;

        default:
            changeHash('main') // по дефолту переключится на "case 'main'..."
    }
}

window.onhashchange = renderAPP; // установить слушатель на смену хэша
renderAPP(); // init start

var myScreenOrientation = window.screen.orientation;
myScreenOrientation.lock("landscape");

/*window.addEventListener('resize', (ev)=>{

    console.log(ev.target.innerWidth)
    console.log(ev.target.innerHeight)
    //console.log(ev.target.outerHeight)
})*/

/*
window.addEventListener('load', () => {
    checkScreenSize()
    window.onresize = () => {
        checkScreenSize()
    }
})
*/


export function playBackgroundMusic(state) {
    if (state.audio.background.isPlay) {
        window.gameAudio.Background.play()
    }
    if (!state.audio.background.isPlay) {
        window.gameAudio.Background.pause()
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
    }
}


function checkScreenSize() {
    const screenWidth = window.innerWidth
    const screenHeight = window.innerHeight
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
        document.querySelector('#gameScreen').style.transform = 'rotate(90deg)'
        alert("Вы используете мобильное устройство (телефон или планшет).")

    } else {
        alert("Вы используете ПК.")
        document.querySelector('#gameScreen').style.transform = 'rotate(0deg)'
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


    //document.querySelector('#root').childNodes[0].requestFullScreen() || document.querySelector('#root').childNodes[0].cancelFullScreen()
}