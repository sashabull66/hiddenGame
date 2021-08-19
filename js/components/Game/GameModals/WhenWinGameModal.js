import ModalWindow from "../../UI/ModalWindow/ModalWindow.js";
import {changeHash} from "../../../index.js";
import {resetGameStatus} from "../Game.js";


export default function WhenWinGameModal (state) {
    return (
        ModalWindow({
            title: 'Congratulations! You have won. Enter your name to save the result.',
            input:{
                placeholder: 'your name'
            },
            buttons: {
                Save: {
                    title: 'Save',
                    onclick: () => {
                        resetGameStatus(state)
                    },
                    id: 'Save'
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







// modal props => {title, buttons, input?}
// btn props => {title, onclick, id}
// input props => {placeholder}