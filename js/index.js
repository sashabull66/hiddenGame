import useState from "./state/useState.js";
import Main from "./components/Main/Main.js";
import Help from "./components/Help/Help.js";
import Game from "./components/Game/Game.js";
import VDom from "./libraries/VDom/VDom.js";

export const virtualDom = new VDom();
export const initialState = new useState({
    help: {
        title: 'Инструкция',
        subtitles: {
            first: 'Найди все спрятанные объекты в игре. Список текущих искомых элементов будет отображен в блоке внизу экрана. Найди объект на экране и щелкни по нему, чтобы выбрать его.',
            second: 'Приятной игры!',
        },
        button: 'Вернуться',
        image: {
            src: '/images/help/help.png',
            title: 'инструкция'
        }
    },
    game: {
        isPlayNow: false,
        activeGame: {
            score: 0,
            time: null,
            isWin: false,
            gameTimers: {
                1: 180000,
                2: 144000,
                3: 132000,
                4: 120000,
                5: 90000,
                6: 81000,
                7: 72000,
                8: 66000,
                9: 63000,
                10: 60000,
            }
        },
        currentLevel: 1,
        currentItems: null,
        images: {
            gameMenuBG: '/../images/game/gameMenu/gameMenu.png'
        },
        levels: {
            1: {
                backgroundImgSrc: '/../images/game/levelsImages/level1/background.jpg',
                itemsSrc: '/../images/game/levelsImages/level1/',
                gameElementsQuantity: 28,
                elementsToInsert: null
            },
            2: {
                backgroundImgSrc: '/../images/game/levelsImages/level2/background.jpg',
                itemsSrc: '/../images/game/levelsImages/level2/',
                gameElementsQuantity: 29,
                elementsToInsert: null
            },
        }
    },
    main: {
        title: 'HIDDEN SCHOOL',
        buttons: {
            start: 'New Game',
            score: 'High Scores',
            help: 'Help',
        }
    },
    scores: {},
    audio: {
        background: {
            src: '/../audio/Game.mp3',
            isPlay: false,
        },
        sprite: {
            src: '/../audio/sprite.mp3',
            isPlay: false,
        }
    },
    screen: {
        fullscreen: false,
    }
});
const state = initialState.getState();

function renderAPP() {
    const ROOT = document.getElementById('root');
    if (!window.audioBackground || !window.audioSprite) { // add audio files
        window.audioSprite = new Audio(state.audio.sprite.src);
        window.audioBackground = new Audio(state.audio.background.src);
        window.audioBackground.loop = true;
    }
    if (ROOT.children.length !== 0) {
        ROOT.innerHTML = ''
    }
    const gameScreen = document.createElement('div');
    gameScreen.id = 'gameScreen'
    ROOT.append(gameScreen)
    const hash = decodeURIComponent(window.location.hash.substr(1));
    switch (hash) {
        case 'game' : // если хэш равен game то запустить игру
            initialState.addFollower(() => {
                Game(gameScreen)
            })

            break;
        case '' : // если хэш пуст, то показать главную
            initialState.addFollower(() => {
                Main(gameScreen)
            })
            break;
        case 'scores': // если хэш равен scores то отрисовать эту страницу
            initialState.addFollower(() => {
                Scores(gameScreen)
            })
            break;
        case 'help': // если хэш равен scores то отрисовать эту страницу
            initialState.addFollower(() => {
                Help(gameScreen)
            })
            break;
        default:
            initialState.addFollower(() => {
                Main(gameScreen)
            }) // или отрисовать главную
    }
}

window.onhashchange = renderAPP;
renderAPP(); // init start
//const scalableElement = document.getElementById('root').children[0]
//console.log(scalableElement)

export function launchFullScreen(event) {
    if (event.key === 'Escape') {
        initialState.editState(state)
    }

} // full/normal screen
export function offOnBackgroundMusic() {
    if (initialState.getState().audio.background.isPlay) {
        window.audioBackground.play()
    }
    if (!initialState.getState().audio.background.isPlay) {
        window.audioBackground.pause()
    }
}

export function offOnSpriteMusic() {
    if (initialState.getState().audio.sprite.isPlay) {
        window.audioSprite.play()
    }
    if (!initialState.getState().audio.sprite.isPlay) {
        window.audioSprite.pause()
    }
}
export function initControls() {
    document.querySelector('.controlsWrapper').addEventListener('click', (event) => {
        switch (event.target.id) {
            case 'full-screen-btn' :
                state.screen.fullscreen = !state.screen.fullscreen
                initialState.editState(state)
                break
            case 'background-sound-btn':
                state.audio.background.isPlay = !state.audio.background.isPlay
                initialState.editState(state)
                offOnBackgroundMusic()
                break
            case 'action-sound-btn':
                state.audio.sprite.isPlay = !state.audio.sprite.isPlay
                initialState.editState(state)
                offOnSpriteMusic()
                break
        }
    })
}
export function changeHash(newHashValue) {
    let r;
    if (newHashValue.includes('-')) {
        r = newHashValue.replace('-', '_')
    }
    location.hash = r || newHashValue
} // функция для смены хеша



