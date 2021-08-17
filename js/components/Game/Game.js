import {virtualDom, initialState} from "../../index.js";
import {stopStartTimer} from "./Timer/Timer.js";
import GameControls from "../GameControls/GameControls.js";
import BeforeEveryRoundModal from "./GameModals/BeforeEveryRoundModal.js";
import DuringPauseModal from "./GameModals/DuringPauseModal.js";
import TryingToQuitGameModal from "./GameModals/TryingToQuitGameModal.js";
import GamePlayArea from "./GamePlayArea/GamePlayArea.js";
import GameMenuArea from "./GameMenuArea/GameMenuArea.js";

export default function Game() {
    let game;
    const state = initialState.getState();
    createGameElements(state)
    game = virtualDom.createVirtualNode('main', {id: "root"}, [
        virtualDom.createVirtualNode('div', {id: "gameScreen", class: `gameScreen ${state.screen.fullscreen ? 'fullScreen' : ''}`}, [
            virtualDom.createVirtualNode('div', {class: 'game'}, [
                state.game.isPause ? DuringPauseModal(state) : '',
                state.game.isPlayNow ? '' : BeforeEveryRoundModal(state),
                state.game.isPause2 ? TryingToQuitGameModal(state) : '',
                GamePlayArea(state),
                GameMenuArea(state),
                GameControls(state)
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
    const levels = Object.keys(state.game.levels)
    levels.forEach((level) => { // убрать изображения для вставки на поле
        state.game.levels[level].elementsToInsert = null
    })
    initialState.editState(state)
    stopStartTimer('stop');
}

function createGameElements(state) {
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

    initialState.editState(state)
}

export function checkGameStatus(state) {
    // for next level
    if (state.game.activeGame.time > 0 && state.game.isPlayNow && state.game.currentItems.length === 0) {
        state.game.currentItems = null
        state.game.isPlayNow = false;
        state.game.currentLevel += 1;
        state.game.activeGame.gameStatistics.totalPoints.push(state.game.activeGame.score);
        console.log(state.game.activeGame.gameStatistics.totalPoints)
        initialState.editState(state)
    }
    // for lose
    if (state.game.activeGame.time <= 0) {
        state.game.isPlayNow = false;
        initialState.editState(state)
    }
}