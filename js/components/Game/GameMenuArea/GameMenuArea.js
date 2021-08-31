import {initialState, virtualDom} from "../../../index.js";
import {stopStartTimer} from "../Game.js";


export default function GameMenuArea (state) {
    return (
        virtualDom.createVirtualNode('div', {class: 'game__menu-area'}, [
            //меню:
            virtualDom.createVirtualNode('div', {class: 'selector'}, [
                ...state.game.currentItems
            ]),
            virtualDom.createVirtualNode('div', {class: 'game_controls'}, [
                virtualDom.createVirtualNode('div', {class: 'game__btn'}, ['Hint']),
                virtualDom.createVirtualNode('div', {
                    class: 'game__btn',
                    onclick: () => {
                        state.game.isPause = true;
                        initialState.editState(state);
                        stopStartTimer();
                    }
                }, ['Pause']),
                virtualDom.createVirtualNode('div', {
                    class: 'game__btn',
                    onclick: () => {
                        state.game.isPause2 = true;
                        initialState.editState(state);
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