import ModalWindow from "../../UI/ModalWindow/ModalWindow.js";
import {changeHash, playSpriteMusic} from "../../../index.js";
import {store} from "../../../store/store.js";
import {stopStartTimer} from "../Game.js";

export default function TryingToQuitGameModal (state) {
    return (
        ModalWindow({
            title: 'Are you sure you want to leave the game? All progress will be lost!',
            buttons: {
                Resume: {
                    title: 'Resume',
                    onclick: () => {
                        playSpriteMusic(state, 'click')
                        state.game.isPause2 = false
                        store.editState(state)
                        stopStartTimer()
                    },
                    id: 'Resume'
                },
                Menu: {
                    title: 'Menu',
                    onclick: () => {
                        playSpriteMusic(state, 'click')
                        changeHash('main')
                    },
                    id: 'Stop'
                }
            }
        })
    )
}