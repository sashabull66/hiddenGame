import {initialState, launchFullScreen, offOnBackgroundMusic, offOnSpriteMusic} from "../../index.js";

export default function Game(root) {
    const state = initialState.getState();
    checkGameStatus(state)
    checkFullScreenStatus(state, root)
// для панели ${state.game.currentItems}
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
                    <p>00:00</p>
                    </div>
                    <div class="label score">
                    Score
                    <p>658</p>
                    </div>
                    <div class="label level">
                    Level
                    <p>1/10</p>
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
    document.querySelector('.controlsWrapper').addEventListener('click', (event) => {
        switch (event.target.id) {
            case 'full-screen-btn' :
                state.screen.fullscreen = !state.screen.fullscreen
                initialState.editState(state)
                break
            case 'background-sound-btn':
                state.audio.background.isPlay = !state.audio.background.isPlay
                initialState.editState(state)
                offOnBackgroundMusic()
                break
            case 'action-sound-btn':
                state.audio.sprite.isPlay = !state.audio.sprite.isPlay
                initialState.editState(state)
                offOnSpriteMusic()
                break
        }
    })
    offOnBackgroundMusic()
    offOnSpriteMusic()
}

function checkGameStatus(state) {
    if (state.game.isPlayNow && state.game.currentItems && state.game.levels[state.game.currentLevel].elementsToInsert) {
        return
    }
    if (!state.game.isPlayNow) {
       createAllElementsToInsert(state)
        state.game.currentItems = getRandomObjects(state.game.levels[state.game.currentLevel].gameElementsQuantity).map(
            number => `<img src="${state.game.levels[state.game.currentLevel].itemsSrc + number + '.png'}" alt="">`
        ).join('')
        state.game.isPlayNow = true
        initialState.editState(state)
    }
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
function createAllElementsToInsert(state) {
    const allQuantity = state.game.levels[state.game.currentLevel].gameElementsQuantity
    const currentSrc = state.game.levels[state.game.currentLevel].itemsSrc
setTimeout(()=>{
    state.game.levels[state.game.currentLevel].elementsToInsert = new Array(allQuantity).fill('')
        .map((_, index) => `<img src="${currentSrc + index + '.png'}" alt="">`)
        .join('');
    initialState.editState(state)
},0)
}



