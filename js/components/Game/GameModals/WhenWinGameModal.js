import ModalWindow from "../../UI/ModalWindow/ModalWindow.js";
import {changeHash, initialState} from "../../../index.js";

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
                        //resetGameStatus(state)
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
    const state = initialState.getState()

    const name = state.game.activeGame.gameStatistics.playerName;
    const score = state.game.activeGame.gameStatistics.totalPoints;

    console.log(name, score.length)
}

function addName (e) {
   const state = initialState.getState()
    state.game.activeGame.gameStatistics.playerName = e.target.value
    initialState.editState(state)
}


// modal props => {title, buttons, input?}
// btn props => {title, onclick, id}
// input props => {placeholder}