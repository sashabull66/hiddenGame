import ModalWindow from "../../UI/ModalWindow/ModalWindow.js";
import {store} from "../../../store/store.js";
import {changeHash} from "../../../index.js";

export default function WhenWinGameModal(state) {
    return (
        ModalWindow({
            title: 'Congratulations! You have won. Enter your name to save the result.',
            input: {
                placeholder: 'your name',
                onInput: addName,
                value: state.game.activeGame.gameStatistics.playerName,
            },
            buttons: {
                Save: {
                    title: 'Save',
                    onclick: () => {
                        printWinner()
                        //resetGameStatus(store)
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


function updateScore(newScore) {
    newScore = JSON.stringify(newScore)
    console.log(newScore)
    console.log(typeof newScore)
}

function printWinner() {
    const state = store.getState()

    const name = state.game.activeGame.gameStatistics.playerName;
    const score = state.game.activeGame.gameStatistics.totalPoints;

    console.log(name, score.length)
}

function addName (e) {
   const state = store.getState()
    state.game.activeGame.gameStatistics.playerName = e.target.value
    store.editState(state)
}


// modal props => {title, buttons, input?}
// btn props => {title, onclick, id}
// input props => {placeholder}