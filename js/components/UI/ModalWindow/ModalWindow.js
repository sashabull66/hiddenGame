import {virtualDom} from "../../../index.js";
import Button from "../Button/Button.js";

export default function ModalWindow(props) {
    const {title, buttons} = props
    const buttonsTitles = Object.keys(buttons)

    return (
        virtualDom.createVirtualNode('div', {class: 'modal'}, [
            virtualDom.createVirtualNode('div', {class: 'modalControls'}, [
                virtualDom.createVirtualNode('p', {}, [`${title}`]),
                ...buttonsTitles.map(title =>
                    Button({title: title, onclick: buttons[title].onclick, id: buttons[title].id})
                )
            ])
        ])
    )
}