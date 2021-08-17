import {virtualDom} from "../../../index.js";
import {initialState} from "../../../index.js";
import {checkGameStatus} from "../Game.js";


export default function Timer(props) {
    return virtualDom.createVirtualNode('p', {id: 'timerDisplay'}, [`${props || "00:00"}`])
}


export function stopStartTimer() {
    const state = initialState.getState()
    let timerSettings = {
        ...state.game.activeGame.gameTimers,
        currentLevelNumber: state.game.currentLevel
    }
    const levelNumber = timerSettings.currentLevelNumber
    let timerValue = state.game.activeGame.time || timerSettings[levelNumber]

    let timer = setInterval(() => {
        if (state.game.isPlayNow && !state.game.isPause && !state.game.isPause2) {
            timerValue -= 1000
            state.game.activeGame.time = timerValue
            initialState.editState(state)

            const timeForDisplay = millisToMinutesAndSeconds(state.game.activeGame.time)
            virtualDom.render(Timer(timeForDisplay), document.querySelector('#timerDisplay'))
            checkGameStatus(state)
        } else {
            clearInterval(timer)
        }
    }, 1000)
}

function millisToMinutesAndSeconds(millis) {
    let minutes = Math.floor(millis / 60000);
    let seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}