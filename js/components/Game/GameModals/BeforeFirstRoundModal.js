import ModalWindow from "../../UI/ModalWindow/ModalWindow.js";
import {changeHash, initialState} from "../../../index.js";
import {resetGameStatus} from "../Game.js";
import {stopStartTimer} from "../Timer/Timer.js";


export default function BeforeFirstRoundModal(state) {
    return (
        ModalWindow({
            title: 'The task of the game is to find objects on the playing field from the block of tasks on the right side! Wish you luck!',
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
                    id: 'Menu'
                }
            }
        })
    )
}