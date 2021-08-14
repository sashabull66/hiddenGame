export default class VDom {

    /*
createVirtualNode - функция для создания виртуального элемента, принимает:
1. В виде строки tagName (div, span и т.п.) "div".
2. В виде объекта атрибуты элемента (id, className и т.п.) {id: 228}.
3. В виде массива дочерние элементы.
Возвращает в виде объекта  tagName, attributes, children.
По сути она просто группирует передаваемые ей разношерстные параметры в объект!
*/
    createVirtualNode (tagName, props = {}, ...children) {
        if (typeof tagName === "function") {
            return tagName(props, children);
        }

        return {
            tagName,
            props,
            children: children.flat(),
        };
    }

    /*
    createDomNodeFromVirtualNodeFromVirtualNode функция принимающая в себя как параметр
    результат работы функции createVirtualNode, т.е. объект с 3 элементами:
    tagName, attributes, children.
    1. Если вместо объекта придет строка то произойдет создание текстового узла
    с текстом который пришел.
    2. Если пришел объект то деструктуризацией разбить этот объект на 3 переменные
    и создать DOM элемент согласно данным и применить к нему атрибуты, а так же рекурсивно
    проделать действия выше для каждого ребенка и добавить все это внутрь первого элемента.
    */
    createDomNodeFromVirtualNode (vNode) {
        if (typeof vNode === "string") {
            return document.createTextNode(vNode);
        }

        const {tagName, props, children} = vNode;

        const node = document.createElement(tagName);

        this.compareOldVirtualAttributesWithNewVirtualAttributesAndMergeThem(node, {}, props);

        children.forEach(child => {
            node.appendChild(this.createDomNodeFromVirtualNode(child));
        });

        return node;
    }

    /*replaceVirtualNodeToDomWithDomElement функция принимающая два параметра:
    1. Cелектор DOM элемента который будет заменен на виртуальный элемент.
    2. Виртуальный элемент который отрендерится в DOM.
    Функция заменяет DOM элемент на виртуально созданный и возвращает его.
    replaceVirtualNodeToDomWithDomElement (node, target) {
        target.replaceWith(node);
        return node;
    }*/

    /*
    compareOldVirtualNodeWithNewVirtualNode  функция принимающая три параметра:
    1. Селектор текущего элемента в DOM.
    2. Виртуальную ноду текущего элемента в DOM.
    3. Новую виртуальную ноду (при ее наличии).
    1 - Если новой виртуальной ноды нету, то удаляет этот элемент из DOM дерева
    2 - Если старая виртуальная нода или новая виртуальная нода - текст, то
    сравнивает этот текст и при его различии заменяет этот текстовый узел на
    созданный из новой виртуальной ноды новый DOM элемент
    3 - Если у старой виртуальной ноды разные теги с новой виртуальной нодой,
    то заменяет этот DOM элемент на вновь созданный из новой виртуальной ноды
    DOM элемент...
    */
    compareOldVirtualNodeWithNewVirtualNode (node, vNode, nextVNode) {
        if (nextVNode === undefined) {
            node.remove();
            return;
        }

        if (typeof vNode === "string" || typeof nextVNode === "string") {
            if (vNode !== nextVNode) {
                const nextNode = this.createDomNodeFromVirtualNode(nextVNode);
                node.replaceWith(nextNode);
                return nextNode;
            }

            return node;
        }

        if (vNode.tagName !== nextVNode.tagName) {
            const nextNode = this.createDomNodeFromVirtualNode(nextVNode);
            node.replaceWith(nextNode);
            return nextNode;
        }

        this.compareOldVirtualAttributesWithNewVirtualAttributesAndMergeThem(node, vNode.props, nextVNode.props);
        this.compareOldVirtualChildrenWithNewVirtualChildren(node, vNode.children, nextVNode.children);

        return node;
    }

    /*
    applyOrRemoveAttribute функция принимающая 4 параметра
    1. Селектор текущего элемента в DOM.
    2. Имя атрибута.
    3. Старое значение атрибута.
    4. Новое значение атрибута (если есть).
    Если под текущем именем атрибута нету нового значения (т.е. в новой виртуальной ноде этого атрибута нету),
    то удалить этот атрибут с DOM элемента. Иначе применить этот атрибут к DOM элементу.
    */
    applyOrRemoveAttribute (node, key, value, nextValue) {
        if (key.startsWith("on")) {
            const eventName = key.slice(2);

            node[eventName] = nextValue;

            if (!nextValue) {
                node.removeEventListener(eventName, this.listener);
            } else if (!value) {
                node.addEventListener(eventName, this.listener);
            }
            return;
        }

        if (nextValue == null || nextValue === false) {
            node.removeAttribute(key);
            return;
        }

        node.setAttribute(key, nextValue);
    }

    /*
    compareOldVirtualAttributesWithNewVirtualAttributesAndMergeThem функция принимающая 3 параметра
    1. Селектор текущего элемента в DOM.
    2. Атрибуты из виртуальной ноды текущего элемента в DOM.
    3. Атрибуты из виртуальной ноды нового элемента.
    Функция объединяет старые атрибуты с новыми в общий объект и в цикле обходит этот смерженный объект.
    Если старые атрибуты совпадают с новыми то ничего не делает. Если же есть отличия в старых атрибутах
    с новыми, вызывает функцию по применению/удалению атрибутов
    */
    compareOldVirtualAttributesWithNewVirtualAttributesAndMergeThem (node, props, nextProps) {
        const mergedProps = {...props, ...nextProps};

        Object.keys(mergedProps).forEach(key => {
            if (props[key] !== nextProps[key]) {
                this.applyOrRemoveAttribute(node, key, props[key], nextProps[key]);
            }
        });
    }

    /*
    compareOldVirtualChildrenWithNewVirtualChildren функция принимающая 3 параметра:
    1. Селектор текущего элемента в DOM.
    2. Дочерние элементы из виртуальной ноды текущего элемента в DOM.
    3. Дочерние элементы из виртуальной ноды нового элемента.
    Функция обходит реальные DOM дочерние ноды в цикле и передает эти параметры
    (каждую дочернюю ноду из цикла и ее виртуальный образ и новую будущую ноду (если она есть))
    в функцию compareOldVirtualNodeWithNewVirtualNode где происходит их сравнение,
    потом новые дочерние ноды просто добавляются в DOM
    */
    compareOldVirtualChildrenWithNewVirtualChildren (parent, vChildren, nextVChildren) {
        parent.childNodes.forEach((childNode, i) => {
            this.compareOldVirtualNodeWithNewVirtualNode(childNode, vChildren[i], nextVChildren[i]);
        });

        nextVChildren.slice(vChildren.length).forEach(vChild => {
            parent.appendChild(this.createDomNodeFromVirtualNode(vChild));
        });
    }

    /*
    render функция принимающая 2 параметра:
    1. Виртуальную ноду (или следующую виртуальную ноду).
    2. Селектор текущего элемента в DOM.
    Функция ищет у DOM элемента свойство virtualTreeOfElements, если этого свойства нету
    то создает виртуальный образ этого DOM элемента  через функцию createVirtualNodeFromDomElement.
    Потом происходит отрисовка новой виртуальной ноды в DOM.
    Потом функция сохраняет текущее виртуальное дерево в DOM-ноде в свойстве virtualTreeOfElements.

    */
    render (nextVNode, node) {
        const vNode = node.v || this.createVirtualNodeFromDomElement(node);

        node = this.compareOldVirtualNodeWithNewVirtualNode(node, vNode, nextVNode);
        node.v = nextVNode;

        return node;
    }

    /*
    createVirtualNodeFromDomElement функция принимающая 1 параметр:
    1. Селектор текущего элемента в DOM.
    Функция получает имя тега у DOM элемента. Дочерние атрибуты.
    После создает из этих данных виртуальную ноду на основе реальной.
    */
    createVirtualNodeFromDomElement (node) {
        // Если текстовая нода - то возвращаем текст
        if (node.nodeType === 3) {
            return node.nodeValue;
        }
        //  Получаем имя тега
        const tagName = node.nodeName.toLowerCase();

        // Рекурсивно обрабатываем дочерние ноды
        const children = [].map.call(node.childNodes, this.createVirtualNodeFromDomElement);

        // Создаем виртуальную ноду из реальной
        return this.createVirtualNode(tagName, {}, children);
    }

    /*
    Эта функция будет вызываться при вызове события (например click), this указывает
    на DOM-элемент, this[event.type] на метод, который мы указываем в виртуальном элементе.
    */
    listener (event) {
        return this[event.type](event)
    }
}