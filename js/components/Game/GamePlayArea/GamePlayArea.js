import {initialState, virtualDom} from "../../../index.js";
import {checkGameStatus} from "../Game.js";


export default function GamePlayArea (state) {
    return (
        virtualDom.createVirtualNode('div', {
            class: 'game__play-area',
            style: `background: url('${state.game.levels[state.game.currentLevel].backgroundImgSrc}'); background-size: 100% 100%`,
            onclick: gameCLickListener
        }, [
            // кликабельные картинки:
            ...state.game.levels[state.game.currentLevel].elementsToInsert
        ])
    )
}

function gameCLickListener(event) {
    const state = initialState.getState()
    let currentActiveElements = state.game.currentItems // все картинки из блока задач
    let allGameElements = state.game.levels[state.game.currentLevel].elementsToInsert // все картинки игрового поля

    if (event.target !== event.currentTarget) { // клик был не по игровому полю...
        if (currentActiveElements.find(img => img.props.src.substr(-13) === event.target.src.substr(-13))) {
            state.game.currentItems = currentActiveElements.filter(img => img.props.src.substr(-13) !== event.target.src.substr(-13))
            state.game.levels[state.game.currentLevel].elementsToInsert = allGameElements.filter(img => img.props.src.substr(-13) !== event.target.src.substr(-13))
            state.game.activeGame.score += 10
            initialState.editState(state)
            /*if (state.game.activeGame.time > 0 && state.game.isPlayNow && state.game.currentItems.length === 0) {
                ///////// checkGameStatus (state) ////////////
                // For next level*************************
                /!*state.game.currentItems = null
                state.game.isPlayNow = false;
                state.game.currentLevel += 1;
                initialState.editState(state)*!/
                checkGameStatus(state)
// перенес в таймер!!!!!!!!!!!!

            }*/
            checkGameStatus(state)
        } else { // если клик был не по предмету из списка задач
            state.game.activeGame.score += -5
            initialState.editState(state)
        }

    } else { // если клик был по пустому месту (по игровому полю)
        state.game.activeGame.score += -5
        initialState.editState(state)
    }
}