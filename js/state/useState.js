export default class useState {
    #state; // приватный state в котором будет все хранится
    #followers; // приватная переменная слушателей, а точнее слушателя, так как добавление слушателя всегда будет одним значением в массиве
    #valueNumber = 0; // приватная переменная счетчик необходимая для записи в state не всех данных кроме object
    constructor(initialState) {
        if (typeof initialState === 'object') { // если тип данных при инициализации = объект
            this.#state = {...initialState} // развернуть этот объект в state
        } else { // если тип данных не объект
            this.#state = {[`value_${this.#valueNumber}`]: initialState} // создать в state с динамическим ключом valueNumber входящее значение
            this.#valueNumber++ // увеличить счетчик переменной-счетчика
        }

    }
    editState(newValue) { // метод по изменению значения state
        if (typeof newValue === 'object') { // если тип добавляемых данных = объект
            this.#state = {...this.#state, ...newValue} // вернуть старое состояние state + новое значение
            this.#notifyFollower() // уведомить подписчика
        } else {
            this.#state = {...this.#state, ...{[`value_${this.#valueNumber}`]: newValue}} // вернуть старое состояние state + создать в state с динамическим ключом valueNumber входящее значение
            this.#valueNumber++ // увеличить счетчик переменной-счетчика
            this.#notifyFollower() // уведомить подписчика
        }
    }
    getState() { // метод по получению значения state
        return JSON.parse(JSON.stringify(this.#state)) // вернуть копию state
    }
    addFollower(someFunction) { // метод по добавлению слушателя изменения state
        /*        if (!this.#followers) {
                    this.#followers = []
                }*/
        this.#followers = []; // удалить всех предыдущих слушателей
        this.#followers.push(someFunction) // добавить в followers функцию текущего слушателя
        this.#notifyFollower() // уведомить подписчика
    }
    #notifyFollower() { // приватный метод по уведомлению слушателя об изменении state
        if (!this.#followers) { // если подписчиков нету
            return null // ничего не делать
        } // если есть подписчики
        this.#followers.forEach(function (follower) { // запустить все функции подписчиков
            follower()
        })
    }
}