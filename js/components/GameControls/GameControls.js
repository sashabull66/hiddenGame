import {
    initialState,
    offOnBackgroundMusic,
    offOnSpriteMusic,
    virtualDom
}
    from "../../index.js";

export default function GameControls(props) {
    return (
        virtualDom.createVirtualNode('div', {class: 'controlsWrapper'}, [
            virtualDom.createVirtualNode('div', {
                class: `full-screen-btn ${props.screen.fullscreen ? 'full' : ''}`,
                id: 'full-screen-btn',
                title: 'развернуть/свернуть на весь экран',
                onclick: () => {
                    props.screen.fullscreen = !props.screen.fullscreen
                    initialState.editState(props)
                }
            }),
            virtualDom.createVirtualNode('div', {
                class: `background-sound-btn ${props.audio.background.isPlay ? '' : 'offMusic'}`,
                id: 'background-sound-btn',
                title: 'on/off background sound',
                onclick: () => {
                    props.audio.background.isPlay = !props.audio.background.isPlay
                    offOnBackgroundMusic(props)
                    initialState.editState(props)
                }
            }),
            virtualDom.createVirtualNode('div', {
                class: `action-sound-btn ${props.audio.sprite.isPlay ? '' : 'offSound'}`,
                id: 'action-sound-btn',
                title: 'on/off action sound',
                onclick: () => {
                    props.audio.sprite.isPlay = !props.audio.sprite.isPlay
                    offOnSpriteMusic(props)
                    initialState.editState(props)
                }
            })
        ])
    )
}