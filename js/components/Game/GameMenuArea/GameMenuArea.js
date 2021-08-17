import {initialState, virtualDom} from "../../../index.js";
import Timer, {stopStartTimer} from "../Timer/Timer.js";


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
                        Timer()
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