import {virtualDom} from "../../../index.js";
import {store} from "../../../store/store.js";
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
    const state = store.getState()
    let currentActiveElements = state.game.currentItems // все картинки из блока задач
    let allGameElements = state.game.levels[state.game.currentLevel].elementsToInsert // все картинки игрового поля

    if (event.target !== event.currentTarget) { // клик был не по игровому полю...
        if (currentActiveElements.find(img => img.props.src.substr(-13) === event.target.src.substr(-13))) {
            state.game.currentItems = currentActiveElements.filter(img => img.props.src.substr(-13) !== event.target.src.substr(-13))
            state.game.levels[state.game.currentLevel].elementsToInsert = allGameElements.filter(img => img.props.src.substr(-13) !== event.target.src.substr(-13))
            state.game.activeGame.score += 10
            store.editState(state)
            /*if (store.game.activeGame.time > 0 && store.game.isPlayNow && store.game.currentItems.length === 0) {
                ///////// checkGameStatus (store) ////////////
                // For next level*************************
                /!*store.game.currentItems = null
                store.game.isPlayNow = false;
                store.game.currentLevel += 1;
                initialState.editState(store)*!/
                checkGameStatus(store)
// перенес в таймер!!!!!!!!!!!!

            }*/
            checkGameStatus(state)
        } else { // если клик был не по предмету из списка задач
            state.game.activeGame.score += -5
            store.editState(state)
        }

    } else { // если клик был по пустому месту (по игровому полю)
        state.game.activeGame.score += -5
        store.editState(state)
    }
}