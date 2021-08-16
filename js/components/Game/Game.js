import {
    virtualDom,
    initialState,
    offOnBackgroundMusic,
    offOnSpriteMusic,
    changeHash,
} from "../../index.js";


import Timer, {stopStartTimer} from "./Timer/Timer.js";
import GameControls from "../GameControls/GameControls.js";
import ModalWindow from "../UI/ModalWindow/ModalWindow.js";


export default function Game()  {
    let game;
    const state = initialState.getState();
    createGameElements(state);

    game = virtualDom.createVirtualNode('main', {id: "root"}, [
        virtualDom.createVirtualNode('div', {
            id: "gameScreen",
            class: `gameScreen ${state.screen.fullscreen ? 'fullScreen' : ''}`
        }, [
            virtualDom.createVirtualNode('div', {class: 'game'}, [
                virtualDom.createVirtualNode('div', {
                    class: 'game__play-area',
                    style: `background: url('${state.game.levels[state.game.currentLevel].backgroundImgSrc}'); background-size: 100% 100%`,
                    onclick: gameCLickListener
                }, [
                    // кликабельные картинки:
                    ...state.game.levels[state.game.currentLevel].elementsToInsert
                ]),
                virtualDom.createVirtualNode('div', {class: 'game__menu-area'}, [
                    //меню:
                    virtualDom.createVirtualNode('div', {class: 'selector'}, [
                        ...state.game.currentItems
                    ]),
                    virtualDom.createVirtualNode('div', {class: 'game_controls'}, [
                        virtualDom.createVirtualNode('div', {class: 'game__btn'}, ['Hint']),
                        virtualDom.createVirtualNode('div', {class: 'game__btn'}, ['Pause']),
                        virtualDom.createVirtualNode('div', {
                            class: 'game__btn',
                            onclick: () => {
                                changeHash('main')
                            }
                        }, ['Menu']),
                        virtualDom.createVirtualNode('div', {class: 'label time'}, [
                            'Time',
                            virtualDom.createVirtualNode('p', {}, [
                                Timer()
                            ])

                        ]),
                        virtualDom.createVirtualNode('div', {class: 'label score'}, [
                            'Score',
                            virtualDom.createVirtualNode('p', {}, [
                                `${state.game.activeGame.score}`
                            ])
                        ]),
                        virtualDom.createVirtualNode('div', {class: 'label level'}, [
                            'Level',
                            virtualDom.createVirtualNode('p', {}, [
                                `${state.game.currentLevel}/${Object.keys(state.game.levels).length}`
                            ])
                        ]),
                    ])
                ]),
                GameControls(state)
            ]),
            state.game.isPlayNow ?
                ''
                :
            ModalWindow({
                title: 'Start game?',
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
                    Stop: {
                        title: 'Stop',
                        onclick: () => {
                            state.game.isPlayNow = true
                            initialState.editState(state)
                            stopStartTimer('start')
                        },
                        id: 'Stop'
                    }
                }
            })
        ])
    ])
    return game
}


export function resetGameStatus (state) {
    const levels = Object.keys(state.game.levels)
    levels.forEach((level)=>{ // убрать изображения для вставки на поле
        state.game.levels[level].elementsToInsert = null
    })
    state.game.currentItems = null
    state.game.isPlayNow = false
    state.game.activeGame.score = 0
    state.game.activeGame.time = 0
    state.game.activeGame.isWin = false
    stopStartTimer('stop')


/*___________________________________*/
    initialState.editState(state)
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

    if (state.game.levels[state.game.currentLevel].elementsToInsert!==null && state.game.currentItems !==null) { // если есть в state img для контента и для задач
        return null
    }

    if (state.game.levels[state.game.currentLevel].elementsToInsert === null) { // если нету img для контента
        const allQuantity = state.game.levels[state.game.currentLevel].gameElementsQuantity
        const currentSrc = state.game.levels[state.game.currentLevel].itemsSrc
        state.game.levels[state.game.currentLevel].elementsToInsert = new Array(allQuantity + 1).fill('')
            .map((_, index) => virtualDom.createVirtualNode('img', {src: currentSrc + index + '.png', alt: ''}, []))
    }

    if (state.game.currentItems === null) { // если нету картинок для блока задач
        state.game.currentItems = getRandomObjects(state.game.levels[state.game.currentLevel].gameElementsQuantity).map(
            number => virtualDom.createVirtualNode('img', {
                src: state.game.levels[state.game.currentLevel].itemsSrc + number + '.png',
                alt: ''
            }, [])
        )
    }

    initialState.editState(state)
}
function gameCLickListener(event) {
    const state = initialState.getState()
    let currentActiveElements = state.game.currentItems // все картинки из блока задач
    let allGameElements = state.game.levels[state.game.currentLevel].elementsToInsert // все картинки игрового поля

    if (event.target !== event.currentTarget) { // клик был не по игровому полю...
        if (currentActiveElements.find(img => img.props.src.substr(-13) === event.target.src.substr(-13))) {
            state.game.currentItems = currentActiveElements.filter(img => img.props.src.substr(-13) !== event.target.src.substr(-13))
            state.game.levels[state.game.currentLevel].elementsToInsert = allGameElements.filter(img => img.props.src.substr(-13) !== event.target.src.substr(-13))
            state.game.activeGame.score += 10
            initialState.editState(state)
        } else {
            state.game.activeGame.score += -5
            initialState.editState(state)
        }

    }
}






