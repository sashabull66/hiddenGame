import ModalWindow from "../../UI/ModalWindow/ModalWindow.js";
import {store} from "../../../store/store.js";
import {changeHash, playSpriteMusic} from "../../../index.js";

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
                        playSpriteMusic(state, 'click')
                        printWinner()
                    },
                    id: 'Save'
                },
                Menu: {
                    title: 'Menu',
                    onclick: () => {
                        playSpriteMusic(state, 'click')
                        changeHash('main')
                    },
                    id: 'Menu'
                }
            }
        })
    )
}


function printWinner() {
    const state = store.getState()
    const name = state.game.activeGame.gameStatistics.playerName;
    const score = state.game.activeGame.gameStatistics.totalPoints;
    state.scores.scores.push({name: name, score: score})
    updateScore(state.scores.scores)
    store.editState(state)
    changeHash('main')
}

function addName (e) {
   const state = store.getState()
    state.game.activeGame.gameStatistics.playerName = e.target.value
    store.editState(state)
}

function updateScore(newValue) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://fe.it-academy.by/AjaxStringStorage2.php');
        xhr.responseType = 'json';
        let formData = new FormData(); // создать объект formDATA
        formData.append('f', 'LOCKGET'); // заполнить объект formDATA
        formData.append('n', 'HiidenGame_sashabull66'); // заполнить объект formDATA
        formData.append('p', '6666'); // заполнить объект formDATA
        xhr.send(formData)
        xhr.onload = function () {
            if (xhr.status >= 200 || xhr.status < 300) {
                resolve(xhr.response)
            } else {
                reject(new Error('Усё пропало!'))
            }
        }

    })
        .then((answer) => {
            if (answer.error && answer.result === '') {
                return null
            } else {
                let xhr = new XMLHttpRequest();
                xhr.open('POST', 'https://fe.it-academy.by/AjaxStringStorage2.php');
                xhr.responseType = 'json';
                let formData = new FormData(); // создать объект formDATA
                formData.append('f', 'UPDATE'); // заполнить объект formDATA
                formData.append('n', 'HiidenGame_sashabull66'); // заполнить объект formDATA
                formData.append('p', '6666'); // заполнить объект formDATA
                formData.append('v', JSON.stringify(newValue)); // заполнить объект formDATA
                xhr.send(formData)
                xhr.onload = function () {
                    if (xhr.status >= 200 || xhr.status < 300) {
                        return null
                    } else {
                        console.error(new Error('Усё пропало!'))
                    }
                }
            }
        })
}