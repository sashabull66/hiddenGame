import {virtualDom} from "../../../index.js";
import {initialState} from "../../../index.js";
import useState from "../../../state/useState.js";

export default function Timer(props) {
    return virtualDom.createVirtualNode('p', {id: 'timerDisplay'}, [`${props || "00:00"}`])
}

export let timerSettings;

export function stopStartTimer(command) {
    const globalState = initialState.getState()
    let TIK = null;
    if (command === 'stop') {
        clearInterval(TIK)
        return
    }
    if (command === 'start') {
        timerSettings = new useState({
            ...globalState.game.activeGame.gameTimers,
            currentLevelNumber: globalState.game.currentLevel
        })
        const state = timerSettings.getState()
        const currentLevelNumber = state.currentLevelNumber
        const cLevel = state.currentLevelNumber
        TIK = setInterval(() => {
            if (globalState.game.isPlayNow) {
                state[cLevel] -= 1000
                timerSettings.editState(state)

               globalState.game.activeGame.time = state[cLevel]
               initialState.editState(globalState)

                const timeForDisplay = millisToMinutesAndSeconds(state[currentLevelNumber])
                virtualDom.render(Timer(timeForDisplay), document.querySelector('#timerDisplay'))
            } else {
                clearInterval(TIK)
            }
        }, 1000)
    }
}

function millisToMinutesAndSeconds(millis) {
    let minutes = Math.floor(millis / 60000);
    let seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}