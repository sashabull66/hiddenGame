import {
    changeHash,
    initialState,
    offOnBackgroundMusic,
    offOnSpriteMusic,
    virtualDom
} from "../../index.js";


export default function Main() {
    const state = initialState.getState()
    return (
        virtualDom.createVirtualNode('main', {id: "root"}, [
            virtualDom.createVirtualNode('div', {
                id: "gameScreen",
                class: `gameScreen ${state.screen.fullscreen ? 'fullScreen' : ''}`
            }, [
                virtualDom.createVirtualNode('div', {class: 'main'}, [
                    virtualDom.createVirtualNode('div', {class: 'menu'}, [
                        virtualDom.createVirtualNode('div', {class: 'div4'}, [
                            virtualDom.createVirtualNode('div', {class: 'jumping-text'}, [state.main.title]),
                        ]),
                        virtualDom.createVirtualNode('div', {
                            class: 'menu-item item1',
                            onclick: () => {
                                changeHash('game')
                            }
                        }, [
                            virtualDom.createVirtualNode('div', {class: 'menu-btn'}, [
                                virtualDom.createVirtualNode('div', {
                                    class: 'jumping-text',
                                    id: 'start'
                                }, [state.main.buttons.start])
                            ])
                        ]),
                        virtualDom.createVirtualNode('div', {
                            class: 'menu-item item2',
                            onclick: () => {
                                changeHash('scores')
                            }
                        }, [
                            virtualDom.createVirtualNode('div', {class: 'menu-btn'}, [
                                virtualDom.createVirtualNode('div', {
                                    class: 'jumping-text',
                                    id: 'score'
                                }, [state.main.buttons.score])
                            ])
                        ]),
                        virtualDom.createVirtualNode('div', {
                            class: 'menu-item item3',
                            onclick: () => {
                                changeHash('help')
                            }
                        }, [
                            virtualDom.createVirtualNode('div', {class: 'menu-btn'}, [
                                virtualDom.createVirtualNode('div', {
                                    class: 'jumping-text',
                                    id: 'help'
                                }, [state.main.buttons.help])
                            ])
                        ]),
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

