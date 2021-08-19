import useState from "./libraries/useState/useState.js";
import VDom from "./libraries/VDom/VDom.js";
import Main from "./components/Main/Main.js";
import Help from "./components/Help/Help.js";
import Scores from "./components/Scores/Scores.js";
import Game, {resetGameStatus} from "./components/Game/Game.js";

export const virtualDom = new VDom();
export const initialState = new useState({
    help: {
        title: 'Инструкция',
        subtitles: {
            first: 'Найди все спрятанные объекты в игре. Список текущих искомых элементов будет отображен в блоке на правой части экрана. Найди объект на экране и щелкни по нему, чтобы выбрать его.',
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
        isPause: false,
        isPause2: false,
        activeGame: {
            score: 0,
            time: null,
            isWin: false,
            isLose: false,
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
            },
            gameStatistics: {
                totalPoints: [],
                playerName: null,
            }
        },
        currentLevel: 10,
        currentItems: null, // то что в меню
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
                gameElementsQuantity: 28,
                elementsToInsert: null
            },
            3: {
                backgroundImgSrc: '/../images/game/levelsImages/level3/background.jpg',
                itemsSrc: '/../images/game/levelsImages/level3/',
                gameElementsQuantity: 22,
                elementsToInsert: null
            },
            4: {
                backgroundImgSrc: '/../images/game/levelsImages/level4/background.jpg',
                itemsSrc: '/../images/game/levelsImages/level4/',
                gameElementsQuantity: 25,
                elementsToInsert: null
            },
            5: {
                backgroundImgSrc: '/../images/game/levelsImages/level5/background.jpg',
                itemsSrc: '/../images/game/levelsImages/level5/',
                gameElementsQuantity: 27,
                elementsToInsert: null
            },
            6: {
                backgroundImgSrc: '/../images/game/levelsImages/level6/background.jpg',
                itemsSrc: '/../images/game/levelsImages/level6/',
                gameElementsQuantity: 29,
                elementsToInsert: null
            },
            7: {
                backgroundImgSrc: '/../images/game/levelsImages/level7/background.jpg',
                itemsSrc: '/../images/game/levelsImages/level7/',
                gameElementsQuantity: 30,
                elementsToInsert: null
            },
            8: {
                backgroundImgSrc: '/../images/game/levelsImages/level8/background.jpg',
                itemsSrc: '/../images/game/levelsImages/level8/',
                gameElementsQuantity: 26,
                elementsToInsert: null
            },
            9: {
                backgroundImgSrc: '/../images/game/levelsImages/level9/background.jpg',
                itemsSrc: '/../images/game/levelsImages/level9/',
                gameElementsQuantity: 29
            },
            10: {
                backgroundImgSrc: '/../images/game/levelsImages/level10/background.jpg',
                itemsSrc: '/../images/game/levelsImages/level10/',
                gameElementsQuantity: 26,
                elementsToInsert: null
            }
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
    scores: {
        title: 'High score table',
        scores: [
            {
                rank: 1,
                name: 'Sasha',
                score: 589,
            },
            {
                rank: 2,
                name: 'Masha',
                score: 473,
            }
        ]
    },
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
    },
});

function renderAPP() {
    const state = initialState.getState();
    const root = document.getElementById('root');

    if (!window.audioBackground || !window.audioSprite) { // add audio files
        window.audioSprite = new Audio(state.audio.sprite.src);
        window.audioBackground = new Audio(state.audio.background.src);
        window.audioBackground.loop = true;
    }

    const hashData = decodeURIComponent(window.location.hash.substr(1));
    switch (hashData) {

        case 'game' :
            initialState.addFollower(() => {
                virtualDom.render(Game(), root)
            })
            break;

        case 'main' :
            resetGameStatus(state)
            initialState.addFollower(() => {
                virtualDom.render(Main(), root)
            })
            break;

        case 'scores':
            resetGameStatus(state)
            initialState.addFollower(() => {
                virtualDom.render(Scores(), root)
            })
            break;

        case 'help':
            resetGameStatus(state)
            initialState.addFollower(() => {
                virtualDom.render(Help(), root)
            })
            break;

        default:
            changeHash('main')
    }
}

window.onhashchange = renderAPP;
renderAPP(); // init start


export function offOnBackgroundMusic(state) {
    if (state.audio.background.isPlay) {
        window.audioBackground.play()
    }
    if (!state.audio.background.isPlay) {
        window.audioBackground.pause()
    }
}

export function offOnSpriteMusic(state) {
    if (state.audio.sprite.isPlay) {
        window.audioSprite.play()
    }
    if (!state.audio.sprite.isPlay) {
        window.audioSprite.pause()
    }
}

export function changeHash(newHashValue) {
    let r;
    if (newHashValue.includes('-')) {
        r = newHashValue.replace('-', '_')
    }
    location.hash = r || newHashValue
} // функция для смены хеша
function replaceLetter(selectors) {
    selectors.forEach((selector) => {
        selector.innerHTML = selector.innerHTML.split('').map(letter => {
            return `<span>${letter === ' ' ? `&nbsp` : letter}</span>` // сохраняю пробел заменяя пустую строку на неразрывный пробел
        }).join('')
    })

}


/*virtualDom.createVirtualNode('main', {id:"root"}, [
    virtualDom.createVirtualNode('div', {id:"gameScreen"}, [
        ///////
    ])
])*/

// virtualDom.createVirtualNode('', {}, [])



