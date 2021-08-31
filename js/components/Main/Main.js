import {changeHash, virtualDom} from "../../index.js";
import {store} from "../../store/store.js";
import GameControls from "../GameControls/GameControls.js";


export default function Main() {
    const state = store.getState()
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
                    GameControls(state)
                ])
            ])
        ])
    )
}

