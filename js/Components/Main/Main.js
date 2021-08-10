import {initialState, offOnBackgroundMusic, offOnSpriteMusic, changeHash, launchFullScreen} from "../../index.js";

export default function Main(root) {
    const state = initialState.getState();
    state.screen.fullscreen ?
        (root.classList.add('fullScreen'),document.onkeydown = launchFullScreen)
        :
        (root.classList.remove('fullScreen'), document.onkeydown = null)
    root.innerHTML = ''
    root.innerHTML +=
        `
        <div class="main">
        <div class="menu">
            <div class="div4">
                <div class="jumping-text">${state.main.title}</div>
            </div>
            <div class="menu-item item1">
                <div class="menu-btn">
                    <div id="start" class="jumping-text">${state.main.buttons.start}</div>
                </div>
            </div>
            <div class="menu-item item2">
                <div class="menu-btn">
                    <div id="score" class="jumping-text">${state.main.buttons.score}</div>
                </div>
            </div>
            <div class="menu-item item3">
                <div class="menu-btn">
                    <div id="help" class="jumping-text">${state.main.buttons.help}</div>
                </div>
            </div>
        </div>
        <div class="controlsWrapper">
        <div id="full-screen-btn" class="full-screen-btn ${state.screen.fullscreen ? 'full' : ''}" title="развернуть/свернуть на весь экран"></div>
        <div id="background-sound-btn" class="background-sound-btn ${state.audio.background.isPlay ? '' : 'offMusic'}" title="on/off background sound"></div>
        <div id="action-sound-btn" class="action-sound-btn ${state.audio.sprite.isPlay ? '' : 'offSound'}" title="on/off action sound"></div>
        </div>
        </div>
    </div>
        `

    function replaceLetter(string) {
        return string.split('').map(letter => {
            return `<span>${letter === ' ' ? `&nbsp` : letter}</span>` // сохраняю пробел заменяя пустую строку на неразрывный пробел
        }).join('')
    }

    document.querySelectorAll('.jumping-text').forEach((elem) => {
        elem.innerHTML = replaceLetter(elem.innerHTML)
    })
    document.querySelector('.controlsWrapper').addEventListener('click', (event) => {
        switch (event.target.id) {
            case 'full-screen-btn' :
                state.screen.fullscreen = !state.screen.fullscreen
                initialState.editState(state)
                //launchFullScreen()
                break
            case 'background-sound-btn':
                state.audio.background.isPlay = !state.audio.background.isPlay
                initialState.editState(state)
                offOnBackgroundMusic()
                break
            case 'action-sound-btn':
                state.audio.sprite.isPlay = !state.audio.sprite.isPlay
                initialState.editState(state)
                offOnSpriteMusic()
                break
        }
    })
    document.querySelector('.menu').addEventListener('click', (e) => {
        if (e.target.closest('.item1')) {
            changeHash('game')
        }
        if (e.target.closest('.item2')) {
            changeHash('scores')
        }
        if (e.target.closest('.item3')) {
            changeHash('help')
        }
    })
    offOnBackgroundMusic()
    offOnSpriteMusic()
}