import {changeHash, playSpriteMusic, virtualDom} from "../../index.js";
import {store} from "../../store/store.js";
import GameControls from "../GameControls/GameControls.js";
import Button from "../UI/Button/Button.js";


export default function Help() {
    const state = store.getState();
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
                        Button({
                            title:state.help.button,
                            onclick:() => {
                                playSpriteMusic(state, 'click')
                                changeHash('main')
                            },
                            id:'back'})
                    ]),
                    GameControls(state)
                ])
            ])
        ])
    )
}
