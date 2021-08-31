import ModalWindow from "../../UI/ModalWindow/ModalWindow.js";
import {changeHash} from "../../../index.js";
import {store} from "../../../store/store.js";
import {stopStartTimer} from "../Game.js";


export default function BeforeFirstRoundModal(state) {
    return (
        ModalWindow({
            title: 'The task of the game is to find objects on the playing field from the block of tasks on the right side! Wish you luck!',
            buttons: {
                Start: {
                    title: 'Start',
                    onclick: () => {
                        state.game.isPlayNow = true
                        store.editState(state)
                        stopStartTimer('start')
                    },
                    id: 'Start'
                },
                Menu: {
                    title: 'Menu',
                    onclick: () => {
                        changeHash('main')
                    },
                    id: 'Menu'
                }
            }
        })
    )
}