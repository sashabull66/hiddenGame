import {playSpriteMusic, virtualDom} from "../../../index.js";
import {store} from "../../../store/store.js";
import {stopStartTimer} from "../Game.js";


export default function GameMenuArea(state) {
    return (
        virtualDom.createVirtualNode('div', {class: 'game__menu-area'}, [
            //меню:
            virtualDom.createVirtualNode('div', {class: 'selector'}, [
                ...state.game.currentItems
            ]),
            virtualDom.createVirtualNode('div', {class: 'game_controls'}, [
                virtualDom.createVirtualNode('div', {
                    class: 'game__btn',
                    onclick: () => {
                        getHint(state)
                    }
                }, ['Hint']),
                virtualDom.createVirtualNode('div', {
                    class: 'game__btn',
                    onclick: () => {
                        playSpriteMusic(state, 'click')
                        state.game.isPause = true;
                        store.editState(state);
                        stopStartTimer();
                    }
                }, ['Pause']),
                virtualDom.createVirtualNode('div', {
                    class: 'game__btn',
                    onclick: () => {
                        playSpriteMusic(state, 'click')
                        state.game.isPause2 = true;
                        store.editState(state);
                        stopStartTimer();
                    }
                }, ['Menu']),
                virtualDom.createVirtualNode('div', {class: 'label time'}, [
                    'Time',
                    virtualDom.createVirtualNode('p', {}, [
                        millisToMinutesAndSeconds(state.game.activeGame.time)
                    ])

                ]),
                virtualDom.createVirtualNode('div', {class: 'label score'}, [
                    'Score',
                    virtualDom.createVirtualNode('p', {}, [
                        `${state.game.activeGame.score}`
                    ])
                ]),
                virtualDom.createVirtualNode('div', {class: 'label level'}, [
                    'Level',
                    virtualDom.createVirtualNode('p', {}, [
                        `${state.game.currentLevel}/${Object.keys(state.game.levels).length}`
                    ])
                ]),
            ])
        ])
    )
}

function millisToMinutesAndSeconds(millis) { // функция для конверсии миллисекунд в минуты и секунды с разделителем ":"
    let minutes = Math.floor(millis / 60000);
    let seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

function getHint(state) {
    function getRandomNumberFromRange(minValue, maxValue) {
        return (
            Math.floor(Math.random() * (maxValue - minValue + 1) + minValue)
        )
    }
    const currentElements = state.game.currentItems;
    const currentElementsQuantity = currentElements.length - 1;
    const randomElementNumber = getRandomNumberFromRange(0, currentElementsQuantity)
    const src = 'img[src$=' + '"' + currentElements[randomElementNumber].props.src.substr(-13).toString() + '"' + ']'
    const randomElement = document.querySelector(src)
    state.game.activeGame.hint.showHint = true;
    state.game.activeGame.hint.left = randomElement.offsetLeft - 5
    state.game.activeGame.hint.top = randomElement.offsetTop - 5
    store.editState(state)
}