import ModalWindow from "../../UI/ModalWindow/ModalWindow.js";
import {changeHash} from "../../../index.js";
import {stopStartTimer} from "../Game.js";
import {store} from "../../../store/store.js";

export default function BeforeEveryRoundModal (state) {
    return (
        ModalWindow({
            title: 'Wow! You have successfully completed the round! Want to start the next round?',
            buttons: {
                Start: {
                    title: 'Start',
                    onclick: () => {
                        state.game.isPlayNow = true
                        state.game.activeGame.time = null
                        store.editState(state)
                        stopStartTimer()
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