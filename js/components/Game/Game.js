import {initControls, initialState, launchFullScreen, offOnBackgroundMusic, offOnSpriteMusic} from "../../index.js";

export default function Game(root) {
    const state = initialState.getState();
    console.log(state.game.isPlayNow)
    checkGameStatus(state)

    checkFullScreenStatus(state, root)
    console.log('tut')
    root.innerHTML = ''
    root.innerHTML +=
        `
        <div class="game">
            <div class="game__play-area" style="background: url('${state.game.levels[state.game.currentLevel].backgroundImgSrc}'); background-size: 100% 100%">
               ${state.game.levels[state.game.currentLevel].elementsToInsert}
            </div>
            <div class="game__menu-area">
            <div class="selector">${state.game.currentItems}</div>
                <div class="game_controls">
                    <div class="game__btn">Hint</div>
                    <div class="game__btn">Pause</div>
                    <div class="game__btn">Menu</div>
                    <div class="label time">
                    Time
                    <p>${millisToMinutesAndSeconds(state.game.activeGame.gameTimers[state.game.currentLevel])}</p>
                    </div>
                    <div class="label score">
                    Score
                    <p>${state.game.activeGame.score}</p>
                    </div>
                    <div class="label level">
                    Level
                    <p>${state.game.currentLevel}/${Object.keys(state.game.levels).length}</p>
                    </div>
                </div>
            </div>
            <div class="controlsWrapper">
                <div id="full-screen-btn" class="full-screen-btn ${state.screen.fullscreen ? 'full' : ''}" title="развернуть/свернуть на весь экран"></div>
                <div id="background-sound-btn" class="background-sound-btn ${state.audio.background.isPlay ? '' : 'offMusic'}" title="on/off background sound"></div>
                <div id="action-sound-btn" class="action-sound-btn ${state.audio.sprite.isPlay ? '' : 'offSound'}" title="on/off action sound"></div>
            </div>
        </div>
        `

    initControls()
    console.log('tut')
    offOnBackgroundMusic()
    offOnSpriteMusic()
    initGameListeners(state)
}

function checkGameStatus(state) {
    if (state.game.isPlayNow && state.game.currentItems && state.game.levels[state.game.currentLevel].elementsToInsert) {
        return
    }
    if (!state.game.isPlayNow || !state.game.currentItems) {
        createAllElementsToInsert(state)
        state.game.currentItems = getRandomObjects(state.game.levels[state.game.currentLevel].gameElementsQuantity).map(
            number => `<img src="${state.game.levels[state.game.currentLevel].itemsSrc + number + '.png'}" alt="">`
        ).join('')
        state.game.isPlayNow = true
        /*initialState.editState(state)*/
    }
}

function initGameListeners(state) {
    document.querySelector('.game__play-area').addEventListener('click', (e) => {
        const currentActiveElements = document.querySelector('.selector').childNodes // все картинки из блока задач
        let scorePoint = -5 // переменная - score
        if (e.target !== e.currentTarget) { // клик был не по игровому полю...
            currentActiveElements.forEach((img) => {
                if (img.src === e.target.src) { // если кликнутая картинка имеет тот же src что и в блоке задач...
                    state.game.levels[state.game.currentLevel].elementsToInsert = state.game.levels[state.game.currentLevel].elementsToInsert.replace(e.target.outerHTML, '')
                    state.game.currentItems = state.game.currentItems.replace(e.target.outerHTML, '')
                    scorePoint += 15 // увеличить переменную-score на 15 (по итогу она станет равна 10)
                }
            })
            state.game.activeGame.score += scorePoint // установить значение переменной-score в локальный
            initialState.editState(state) // смержить локальный state с глобальным
            console.log('initGameListeners: ')
            console.log(initialState.getState())
        }
    })
    const timer = document.querySelector('.label.time').querySelector('p')
    const interval = setInterval(() => {
        if (state.game.activeGame.gameTimers[state.game.currentLevel] > 0 && state.game.isPlayNow && state.game.currentItems) {
            timer.innerHTML = millisToMinutesAndSeconds(state.game.activeGame.gameTimers[state.game.currentLevel])
            state.game.activeGame.gameTimers[state.game.currentLevel] -= 1000
        } else {
            state.game.isPlayNow = !state.game.isPlayNow
            clearInterval(interval)
        }


    }, 1000)

}

function checkFullScreenStatus(state, root) {
    state.screen.fullscreen ?
        (root.classList.add('fullScreen'), document.onkeydown = launchFullScreen)
        :
        (root.classList.remove('fullScreen'), document.onkeydown = null)
}

function getRandomObjects(number) { // функция для получения 10 рандомные чисел из предела
    const quantity = 10;
    let result = new Set()

    function randomInteger(min, max) {
        let rand = min - 0.5 + Math.random() * (max - min + 1);
        return Math.round(rand);
    }

    for (let temp = 0; result.size < quantity; temp++) {
        result.add(randomInteger(0, number))
    }
    return Array.from(result)
}

function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

function createAllElementsToInsert(state) {
    const allQuantity = state.game.levels[state.game.currentLevel].gameElementsQuantity
    const currentSrc = state.game.levels[state.game.currentLevel].itemsSrc
    setTimeout(() => {
        state.game.levels[state.game.currentLevel].elementsToInsert = new Array(allQuantity + 1).fill('')
            .map((_, index) => `<img src="${currentSrc + index + '.png'}" alt="">`)
            .join('');
        initialState.editState(state)
        console.log('createAllElementsToInsert: ')
        console.log(initialState.getState())
    }, 0)
}