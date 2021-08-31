import {virtualDom} from "../../index.js";
import {store} from "../../store/store.js";
import GameControls from "../GameControls/GameControls.js";
import BeforeEveryRoundModal from "./GameModals/BeforeEveryRoundModal.js";
import DuringPauseModal from "./GameModals/DuringPauseModal.js";
import TryingToQuitGameModal from "./GameModals/TryingToQuitGameModal.js";
import GamePlayArea from "./GamePlayArea/GamePlayArea.js";
import GameMenuArea from "./GameMenuArea/GameMenuArea.js";
import WhenLevelFailsModal from "./GameModals/WhenLevelFailsModal.js";
import BeforeFirstRoundModal from "./GameModals/BeforeFirstRoundModal.js";
import WhenWinGameModal from "./GameModals/WhenWinGameModal.js";

export default function Game() {
    let game;
    const state = store.getState();
    createGameElements(state)
    game = virtualDom.createVirtualNode('main', {id: "root"}, [
        virtualDom.createVirtualNode('div', {
            id: "gameScreen",
            class: `gameScreen ${state.screen.fullscreen ? 'fullScreen' : ''}`
        }, [
            virtualDom.createVirtualNode('div', {class: 'game'}, [
                state.game.isPause ? DuringPauseModal(state) : '',
                state.game.currentLevel === 1 && !state.game.isPlayNow ? BeforeFirstRoundModal(state) : '',
                state.game.currentLevel > 1 && !state.game.isPlayNow ? BeforeEveryRoundModal(state) : '',
                state.game.isPause2 ? TryingToQuitGameModal(state) : '',
                state.game.activeGame.isLose && state.game.currentItems.length > 0 ? WhenLevelFailsModal(state) : '', // ??? WTF ???
                state.game.activeGame.isWin ? WhenWinGameModal(state) : '',
                GamePlayArea(state), // components
                GameMenuArea(state), // components
                GameControls(state) // components
            ]),
        ])
    ])
    return game
}

export function resetGameStatus(state) {
    state.game.isPause2 = false;
    state.game.currentItems = null;
    state.game.isPlayNow = false;
    state.game.isPause = false;
    state.game.activeGame.score = 0;
    state.game.activeGame.time = null;
    state.game.activeGame.isWin = false;
    state.game.activeGame.isLose = false;
    const levels = Object.keys(state.game.levels)
    levels.forEach((level) => { // убрать изображения для вставки на поле
        state.game.levels[level].elementsToInsert = null
    })
    store.editState(state)
    stopStartTimer('stop');
}

function createGameElements(state) {
    if (state.game.currentLevel > Object.keys(state.game.levels).length) {
        return
    }

    function getRandomObjects(number) { // функция для получения 10 рандомные чисел из предела
        const quantity = 10;
        let result = new Set()

        function randomInteger(min, max) {
            let rand = min - 0.5 + Math.random() * (max - min + 1);
            return Math.round(rand);
        }

        for (let temp = 0; result.size < quantity; temp++) {
            result.add(randomInteger(0, number))
        }
        return Array.from(result)
    }

    if (state.game.levels[state.game.currentLevel].elementsToInsert !== null && state.game.currentItems !== null) { // если есть в useState img для контента и для задач
        return null
    }

    if (state.game.levels[state.game.currentLevel].elementsToInsert === null || !state.game.levels[state.game.currentLevel].elementsToInsert) { // если нету img для контента
        const allQuantity = state.game.levels[state.game.currentLevel].gameElementsQuantity
        const currentSrc = state.game.levels[state.game.currentLevel].itemsSrc
        state.game.levels[state.game.currentLevel].elementsToInsert = new Array(allQuantity + 1).fill('')
            .map((_, index) => virtualDom.createVirtualNode('img', {src: currentSrc + index + '.png', alt: ''}, []))
    }

    if (state.game.currentItems === null || !state.game.currentItems) { // если нету картинок для блока задач
        state.game.currentItems = getRandomObjects(state.game.levels[state.game.currentLevel].gameElementsQuantity).map(
            number => virtualDom.createVirtualNode('img', {
                src: state.game.levels[state.game.currentLevel].itemsSrc + number + '.png',
                alt: ''
            }, [])
        )
    }

    store.editState(state)
}

export function checkGameStatus(state) {
    // for first level
    //...
    // for next level
    if (state.game.activeGame.time > 0 && // если время таймера больше чем 0
        state.game.isPlayNow && // если статус игры true
        state.game.currentItems.length === 0 && // если массив элементов в панели задач равен 0
        state.game.currentLevel < Object.keys(state.game.levels).length // если раунд не последний (10 в этом случае)
    ) {
        console.log('for next level...')
        state.game.currentItems = null // удалить элементы из блока задач
        state.game.isPlayNow = false; // остановить статус игры
        //console.log('before', store.game.currentLevel)
        state.game.currentLevel += 1; // повысить уровень
       // console.log('after', store.game.currentLevel)
        //store.game.activeGame.time = null // занулить текущий таймер
        state.game.activeGame.gameStatistics.totalPoints += state.game.activeGame.score; // добавить к рекордам счет за текущий раунд
        state.game.activeGame.score = 0; // занулить очки для следующего раунда
        //console.log(store.game.activeGame.gameStatistics.totalPoints)
        store.editState(state) // обновить глобальное состояние
    }

    // for lose
    if (state.game.activeGame.time <= 0 && // если время истекло
        state.game.currentItems.length > 0) { // если в панели задач не пусто
        state.game.isPlayNow = false; // остановить таймер
        state.game.activeGame.isLose = true; // показать модалку при проигрыше
        store.editState(state) // обновить глобальное состояние
    }

    // for win all game
    if (state.game.activeGame.time > 0 && // если время таймера больше чем 0
        state.game.isPlayNow && // если статус игры true
        state.game.currentItems.length === 0 &&  // если массив элементов в панели задач равен 0
        state.game.currentLevel === Object.keys(state.game.levels).length) { // если это последний раунд
        state.game.activeGame.gameStatistics.totalPoints += state.game.activeGame.score // добавить к глобальному счету счет текущего раунда
        state.game.isPlayNow = false; // остановить статус игры
        state.game.activeGame.isWin = true // установить статус выигрыша
        store.editState(state) // обновить глобальное состояние
    }

}

export function stopStartTimer() {
    const state = store.getState()
    let timerSettings = {
        ...state.game.activeGame.gameTimers,
        currentLevelNumber: state.game.currentLevel
    }
    const levelNumber = timerSettings.currentLevelNumber
    let timerValue = state.game.activeGame.time || timerSettings[levelNumber]

    let timer = setInterval(() => {
        if (state.game.isPlayNow && !state.game.isPause && !state.game.isPause2) {
            timerValue -= 1000
            state.game.activeGame.time = timerValue
            store.editState(state)
            checkGameStatus(state)
        } else {
            clearInterval(timer)
        }
    }, 1000)
}

