import {virtualDom} from "../../../index.js";

export default function Button(props) {
    const {title, onclick, id} = props
    return (
        virtualDom.createVirtualNode('button', {
            class: 'Button',
            onclick: onclick,
            id: id ? id : ''
        }, [title])
    )
}