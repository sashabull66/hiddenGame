import {virtualDom} from "../../../index.js";
import Button from "../Button/Button.js";

export default function ModalWindow(props) {
    const {title, buttons, input} = props
    const buttonsTitles = Object.keys(buttons)

    return (
        virtualDom.createVirtualNode('div', {class: 'modal'}, [
            virtualDom.createVirtualNode('div', {class: 'modalControls'}, [
                virtualDom.createVirtualNode('p', {}, [`${title}`]),
                input ?
                    virtualDom.createVirtualNode('input',
                        {
                            type: 'text',
                            placeholder: input.placeholder,
                            oninput: input.onInput,
                            value: input.value
                        },
                        []) : '',
                ...buttonsTitles.map(title => Button({
                    title: title,
                    onclick: buttons[title].onclick,
                    id: buttons[title].id
                })),
            ])
        ])
    )
}

// modal props => {title, buttons, input?}
// btn props => {title, onclick, id}
// input props => {placeholder, id}

function rrr (ev) {
    console.log(ev.value)
}