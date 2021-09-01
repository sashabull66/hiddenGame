import {playSpriteMusic, virtualDom} from "../../../index.js";
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
            ...state.game.levels[state.game.currentLevel].elementsToInsert,
            state.game.activeGame.hint.showHint ? virtualDom.createVirtualNode('div', {class: 'hint', style:`top: ${state.game.activeGame.hint.top}px; left: ${state.game.activeGame.hint.left}px;`}) : ''
        ])
    )
}

function gameCLickListener(event) {
    const state = store.getState()
    let currentActiveElements = state.game.currentItems // все картинки из блока задач
    let allGameElements = state.game.levels[state.game.currentLevel].elementsToInsert // все картинки игрового поля

    if (event.target !== event.currentTarget) { // клик был не по игровому полю...
        if (currentActiveElements.find(img => img.props.src.substr(-13) === event.target.src.substr(-13))) {
            playSpriteMusic(state, 'success')
            state.game.currentItems = currentActiveElements.filter(img => img.props.src.substr(-13) !== event.target.src.substr(-13))
            state.game.levels[state.game.currentLevel].elementsToInsert = allGameElements.filter(img => img.props.src.substr(-13) !== event.target.src.substr(-13))
            state.game.activeGame.score += 10
            store.editState(state)
            checkGameStatus(state)
        } else { // если клик был не по предмету из списка задач
            playSpriteMusic(state, 'error')
            state.game.activeGame.score += -5
            store.editState(state)
        }

    } else { // если клик был по пустому месту (по игровому полю)
        playSpriteMusic(state, 'error')
        state.game.activeGame.score += -5
        store.editState(state)
    }
}