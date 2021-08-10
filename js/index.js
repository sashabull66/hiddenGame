import useState from "./state/useState.js";
import Main from "./components/Main/Main.js";
import Help from "./components/Help/Help.js";



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
    game: {},
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
            initialState.addFollower(()=>{
                ActiveGame(gameScreen)
            })

            break;
        case '' : // если хэш пуст, то показать главную
            initialState.addFollower(()=>{
                Main(gameScreen)
            })
            break;
        case 'scores': // если хэш равен scores то отрисовать эту страницу
            initialState.addFollower(()=>{
                HighScores(gameScreen)
            })
            break;
        case 'help': // если хэш равен scores то отрисовать эту страницу
            initialState.addFollower(()=>{
                Help(gameScreen)
            })
            break;
        default:
            initialState.addFollower(()=>{
                Main(gameScreen)
            }) // или отрисовать главную
    }
}

window.onhashchange = renderAPP;
renderAPP(); // init start
//const scalableElement = document.getElementById('root').children[0]
//console.log(scalableElement)

export function launchFullScreen() {
    const scalableElement = document.getElementById('root').children[0]
    if (initialState.getState().screen.fullscreen) {
        /*if (scalableElement.requestFullScreen) {
            scalableElement.requestFullScreen();
        } else if (scalableElement.mozRequestFullScreen) {
            scalableElement.mozRequestFullScreen();
        } else if (scalableElement.webkitRequestFullScreen) {
            scalableElement.webkitRequestFullScreen();
        }*/
        scalableElement.classList.add('fullScreen')
        document.addEventListener('keydown', (e)=>{
            if (e.code === 'Escape') {
                scalableElement.classList.remove('fullScreen')
            }
        })
    } else {
        /*if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }*/
        scalableElement.classList.remove('fullScreen')
        document.removeEventListener('keydown', (e)=>{
            if (e.code === 'Escape') {
                scalableElement.classList.remove('fullScreen')
            }
        })
    }


} // full/normal screen
export function offOnBackgroundMusic() {
    if (initialState.getState().audio.background.isPlay)  {
        window.audioBackground.play()
    }
    if (!initialState.getState().audio.background.isPlay) {
        window.audioBackground.pause()
    }
}
export function offOnSpriteMusic() {
    if (initialState.getState().audio.sprite.isPlay)  {
        window.audioSprite.play()
    }
    if (!initialState.getState().audio.sprite.isPlay) {
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



