import {
    virtualDom,
    initialState,
    offOnBackgroundMusic,
    offOnSpriteMusic,
    changeHash
} from "../../index.js";

/*function Ge(root) {

    console.log(state.game.isPlayNow)
    checkGameStatus(state)
    checkFullScreenStatus(state, root)
    console.log('tut')
    root.innerHTML = ''
    root.innerHTML +=
        `
        <div class="game">
            <div class="game__play-area" style="background: url('${state.game.levels[state.game.currentLevel].backgroundImgSrc}'); background-size: 100% 100%">
               ${state.game.levels[state.game.currentLevel].elementsToInsert}
            </div>
            <div class="game__menu-area">
                <div class="selector">${state.game.currentItems}</div>
                <div class="game_controls">
                    <!--<div class="game__btn">Hint</div>-->
                    <!--<div class="game__btn">Pause</div>-->
                    <!--<div class="game__btn">Menu</div>-->
                    <div class="label time ">
                    Time
                    <p>${millisToMinutesAndSeconds(state.game.activeGame.gameTimers[state.game.currentLevel])}</p>
                    </div>
                    <div class="label score">
                    Score
                    <p>${state.game.activeGame.score}</p>
                    </div>
                    <div class="label level">
                    Level
                    <p>${state.game.currentLevel}/${Object.keys(state.game.levels).length}</p>
                    </div>
                </div>
            </div>
            <div class="controlsWrapper">
                <div id="full-screen-btn" class="full-screen-btn ${state.screen.fullscreen ? 'full' : ''}" title="развернуть/свернуть на весь экран"></div>
                <div id="background-sound-btn" class="background-sound-btn ${state.audio.background.isPlay ? '' : 'offMusic'}" title="on/off background sound"></div>
                <div id="action-sound-btn" class="action-sound-btn ${state.audio.sprite.isPlay ? '' : 'offSound'}" title="on/off action sound"></div>
            </div>
        </div>
        `

    console.log('tut')
    offOnBackgroundMusic()
    offOnSpriteMusic()
    initGameListeners(state)
}*/

export default function Game() {
    let game;
    const state = initialState.getState();

    createImagesForGameBoard(state);
    createRandomImages(state);

    state.game.isPlayNow ? setInterval(()=>{tikTimer(state)},1000) : []

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
                                `${millisToMinutesAndSeconds(state.game.activeGame.gameTimers[state.game.currentLevel])}`
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
                virtualDom.createVirtualNode('div', {class: 'controlsWrapper'}, [
                    virtualDom.createVirtualNode('div', {
                        class: `full-screen-btn ${state.screen.fullscreen ? 'full' : ''}`,
                        id: 'full-screen-btn',
                        title: 'развернуть/свернуть на весь экран',
                        onclick: () => {
                            state.screen.fullscreen = !state.screen.fullscreen
                            initialState.editState(state)
                        }
                    }),
                    virtualDom.createVirtualNode('div', {
                        class: `background-sound-btn ${state.audio.background.isPlay ? '' : 'offMusic'}`,
                        id: 'background-sound-btn',
                        title: 'on/off background sound',
                        onclick: () => {
                            state.audio.background.isPlay = !state.audio.background.isPlay
                            offOnBackgroundMusic(state)
                            initialState.editState(state)
                        }
                    }),
                    virtualDom.createVirtualNode('div', {
                        class: `action-sound-btn ${state.audio.sprite.isPlay ? '' : 'offSound'}`,
                        id: 'action-sound-btn',
                        title: 'on/off action sound',
                        onclick: () => {
                            state.audio.sprite.isPlay = !state.audio.sprite.isPlay
                            offOnSpriteMusic(state)
                            initialState.editState(state)
                        }
                    })
                ])
            ])
        ])
    ])
    return game
}


function createRandomImages(state) {
    if (state.game.currentItems) {
        return
    }
    if (!state.game.currentItems) {
        state.game.currentItems = getRandomObjects(state.game.levels[state.game.currentLevel].gameElementsQuantity).map(
            number => virtualDom.createVirtualNode('img', {
                src: state.game.levels[state.game.currentLevel].itemsSrc + number + '.png',
                alt: ''
            }, [])
        )
        state.game.isPlayNow = true
        initialState.editState(state)
        console.log('createRandomImages was edited state')
    }
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

function initGameListeners(state) {
    document.querySelector('.game__play-area').addEventListener('click', (e) => {
        const currentActiveElements = document.querySelector('.selector').childNodes // все картинки из блока задач
        let scorePoint = -5 // переменная - score
        if (e.target !== e.currentTarget) { // клик был не по игровому полю...
            currentActiveElements.forEach((img) => {
                if (img.src === e.target.src) { // если кликнутая картинка имеет тот же src что и в блоке задач...
                    state.game.levels[state.game.currentLevel].elementsToInsert = state.game.levels[state.game.currentLevel].elementsToInsert.replace(e.target.outerHTML, '')
                    state.game.currentItems = state.game.currentItems.replace(e.target.outerHTML, '')
                    scorePoint += 15 // увеличить переменную-score на 15 (по итогу она станет равна 10)
                }
            })
            state.game.activeGame.score += scorePoint // установить значение переменной-score в локальный
            initialState.editState(state) // смержить локальный state с глобальным
        }
    })
    const timer = document.querySelector('.label.time').querySelector('p')
    const interval = setInterval(() => {
        if (state.game.activeGame.gameTimers[state.game.currentLevel] > 0 && state.game.isPlayNow && state.game.currentItems) {
            timer.innerHTML = millisToMinutesAndSeconds(state.game.activeGame.gameTimers[state.game.currentLevel])
            state.game.activeGame.gameTimers[state.game.currentLevel] -= 1000
        } else {
            state.game.isPlayNow = !state.game.isPlayNow
            clearInterval(interval)
        }


    }, 1000)

}

/*function checkFullScreenStatus(state, root) {
    state.screen.fullscreen ?
        (root.classList.add('fullScreen'), document.onkeydown = launchFullScreen)
        :
        (root.classList.remove('fullScreen'), document.onkeydown = null)
}*/

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

function millisToMinutesAndSeconds(millis) {
    let minutes = Math.floor(millis / 60000);
    let seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

function createImagesForGameBoard(state) {
    if (state.game.levels[state.game.currentLevel].elementsToInsert) return
    const allQuantity = state.game.levels[state.game.currentLevel].gameElementsQuantity
    const currentSrc = state.game.levels[state.game.currentLevel].itemsSrc

    state.game.levels[state.game.currentLevel].elementsToInsert = new Array(allQuantity + 1).fill('')
        .map((_, index) => virtualDom.createVirtualNode('img', {src: currentSrc + index + '.png', alt: ''}, []))

    initialState.editState(state)
    console.log('createImagesForGameBoard was edited state')
}

export function tikTimer (state) {
    state.game.activeGame.gameTimers[state.game.currentLevel] -= 1000;
    initialState.editState(state)
}