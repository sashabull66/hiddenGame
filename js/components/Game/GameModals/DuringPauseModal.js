import ModalWindow from "../../UI/ModalWindow/ModalWindow.js";
import {store} from "../../../store/store.js";
import {stopStartTimer} from "../Game.js";
import {playSpriteMusic} from "../../../index.js";


export default function DuringPauseModal (state) {
    return (
        ModalWindow({
            title: 'Pause',
            buttons: {
                Continue: {
                    title: 'Continue',
                    onclick: () => {
                        playSpriteMusic(state, 'click')
                        state.game.isPause = false
                        store.editState(state)
                        stopStartTimer('start')
                    },
                    id: 'Resume'
                },
                Menu: {
                    title: 'Menu',
                    onclick: () => {
                        playSpriteMusic(state, 'click')
                        state.game.isPause2 = true;
                        store.editState(state)
                        stopStartTimer('start')
                    },
                    id: 'Menu'
                }
            }
        })
    )
}