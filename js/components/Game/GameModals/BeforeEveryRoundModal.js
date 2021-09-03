import ModalWindow from "../../UI/ModalWindow/ModalWindow.js";
import {changeHash, playSpriteMusic} from "../../../index.js";
import {stopStartTimer} from "../Game.js";
import {store} from "../../../store/store.js";

export default function BeforeEveryRoundModal(state) {
    return (
        ModalWindow({
            title: 'Wow! You have successfully completed the ' + (state.game.currentLevel - 1).toString() + ' round! Want to start the next round?',
            buttons: {
                Start: {
                    title: 'Start',
                    onclick: () => {
                        playSpriteMusic(state, 'click')
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
                        playSpriteMusic(state, 'click')
                        changeHash('main')
                    },
                    id: 'Stop'
                }
            }
        })
    )
}