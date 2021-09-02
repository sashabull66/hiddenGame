import {virtualDom} from "../../../index.js";


export default function ScoresBodyItem (props) {
    const {rank, name, score} = props
    return (
        virtualDom.createVirtualNode('div', {class:'scores__body-item'}, [
            virtualDom.createVirtualNode('div', {class: 'item__rank'}, [`${rank}`]),
            virtualDom.createVirtualNode('div', {class: 'item__name'}, [`${name}`]),
            virtualDom.createVirtualNode('div', {class: 'item__score'}, [`${score}`]),
        ])
    )
}

// props => rank, name, score