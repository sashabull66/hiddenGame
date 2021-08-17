import ModalWindow from "../../UI/ModalWindow/ModalWindow.js";
import {initialState} from "../../../index.js";
import {stopStartTimer} from "../Timer/Timer.js";


export default function DuringPauseModal (state) {
    return (
        ModalWindow({
            title: 'Pause',
            buttons: {
                Continue: {
                    title: 'Continue',
                    onclick: () => {
                        state.game.isPause = false
                        initialState.editState(state)
                        stopStartTimer('start')
                    },
                    id: 'Resume'
                },
                Menu: {
                    title: 'Menu',
                    onclick: () => {
                        state.game.isPause2 = true;
                        initialState.editState(state)
                        stopStartTimer('start')
                    },
                    id: 'Menu'
                }
            }
        })
    )
}