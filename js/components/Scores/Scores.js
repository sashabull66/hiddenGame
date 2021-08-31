import {changeHash, virtualDom} from "../../index.js";
import {store} from "../../store/store.js";
import Button from "../UI/Button/Button.js";
import GameControls from "../GameControls/GameControls.js";
import ScoresBodyItem from "./ScoresBody/ScoresBodyItem.js";
// props => title, onclick, id
export default function Scores() {
    const state = store.getState()
    return (
        virtualDom.createVirtualNode('main', {id: "root"}, [
            virtualDom.createVirtualNode('div', {
                id: "gameScreen",
                class: `gameScreen ${state.screen.fullscreen ? 'fullScreen' : ''}`
            }, [
                virtualDom.createVirtualNode('div', {class: 'scores'}, [
                    virtualDom.createVirtualNode('div', {class: 'scores__header'}, [
                        virtualDom.createVirtualNode('div', {class: 'scores__header-item'}, ['Rank']),
                        virtualDom.createVirtualNode('div', {class: 'scores__header-item'}, ['Name']),
                        virtualDom.createVirtualNode('div', {class: 'scores__header-item'}, ['Score'])
                    ]),
                    virtualDom.createVirtualNode('div', {class: 'scores__body'}, [
                        ...state.scores.scores.map(item => ScoresBodyItem({rank:item.rank, name:item.name, score:item.score}))
                    ]),
                    Button({
                        title: 'В меню', onclick: () => {
                            changeHash('main')
                        }, id: 'scores__back'
                    }),
                    GameControls(state)
                ])
            ])
        ])
    )
}