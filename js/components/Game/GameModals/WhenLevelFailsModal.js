import ModalWindow from "../../UI/ModalWindow/ModalWindow.js";
import {changeHash} from "../../../index.js";
import {resetGameStatus} from "../Game.js";


export default function WhenLevelFailsModal (state) {
    return (
        ModalWindow({
            title: 'You lose. Do you want to start over?',
            buttons: {
                Yes: {
                    title: 'Yes',
                    onclick: () => {
                        resetGameStatus(state)
                    },
                    id: 'Yes'
                },
                No: {
                    title: 'No',
                    onclick: () => {
                        changeHash('main')
                    },
                    id: 'No'
                }
            }
        })
    )
}