import {
    changeHash,
    initialState,
    offOnBackgroundMusic,
    offOnSpriteMusic,
    virtualDom
} from "../../index.js";


export default function Help() {
    const state = initialState.getState();
    return (
        virtualDom.createVirtualNode('main', {id: "root"}, [
            virtualDom.createVirtualNode('div', {
                id: "gameScreen",
                class: `gameScreen ${state.screen.fullscreen ? 'fullScreen' : ''}`
            }, [
                virtualDom.createVirtualNode('div', {class: 'help'}, [
                    virtualDom.createVirtualNode('div', {class: 'help_wrapper'}, [
                        virtualDom.createVirtualNode('h1', {}, [state.help.title]),
                        virtualDom.createVirtualNode('p', {}, [state.help.subtitles.first]),
                        virtualDom.createVirtualNode('p', {}, [state.help.subtitles.second]),
                        virtualDom.createVirtualNode('img', {
                            src: state.help.image.src,
                            alt: state.help.image.title,
                        }, []),
                        virtualDom.createVirtualNode('button', {
                            id: 'back',
                            onclick: () => {
                                changeHash('main')
                            }
                        }, [state.help.button]),
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
    )
}
