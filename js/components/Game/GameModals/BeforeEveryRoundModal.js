import ModalWindow from "../../UI/ModalWindow/ModalWindow.js";
import {changeHash, initialState} from "../../../index.js";
import {stopStartTimer} from "../Timer/Timer.js";

export default function BeforeEveryRoundModal (state) {
    return (
        ModalWindow({
            title: 'Wow! You have successfully completed the round! Want to start the next round?',
            buttons: {
                Start: {
                    title: 'Start',
                    onclick: () => {
                        state.game.isPlayNow = true
                        initialState.editState(state)
                        stopStartTimer('start')
                    },
                    id: 'Start'
                },
                Menu: {
                    title: 'Menu',
                    onclick: () => {
                        changeHash('main')
                    },
                    id: 'Stop'
                }
            }
        })
    )
}