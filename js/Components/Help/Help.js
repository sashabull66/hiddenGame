import {initialState, offOnBackgroundMusic, offOnSpriteMusic, changeHash, launchFullScreen} from "../../index.js";

export default function Help(root) {
    const state = initialState.getState();
    state.screen.fullscreen ?
        (root.classList.add('fullScreen'), document.onkeydown = launchFullScreen)
        :
        (root.classList.remove('fullScreen'), document.onkeydown = null)
    root.innerHTML = ''
    root.innerHTML +=
        `
        <div class="help">
            <h1>${state.help.title}</h1>
            <p>${state.help.subtitles.first}</p>
            <p>${state.help.subtitles.second}</p>
            <img src="${state.help.image.src}" alt="${state.help.image.title}">
            <button id="back">${state.help.button}</button>
            <div class="controlsWrapper">
                <div id="full-screen-btn" class="full-screen-btn ${state.screen.fullscreen ? 'full' : ''}" title="развернуть/свернуть на весь экран"></div>
                <div id="background-sound-btn" class="background-sound-btn ${state.audio.background.isPlay ? '' : 'offMusic'}" title="on/off background sound"></div>
                <div id="action-sound-btn" class="action-sound-btn ${state.audio.sprite.isPlay ? '' : 'offSound'}" title="on/off action sound"></div>
            </div>
        </div>
        `
    document.querySelector('#back').onclick = () => {
        changeHash('')
    }
    document.querySelector('.controlsWrapper').addEventListener('click', (event) => {
        switch (event.target.id) {
            case 'full-screen-btn' :
                state.screen.fullscreen = !state.screen.fullscreen
                initialState.editState(state)
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
    offOnBackgroundMusic()
    offOnSpriteMusic()
}
