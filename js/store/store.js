import useState from "../libraries/useState/useState.js"; // импорт библиотеки по работе с состоянием
/*
в объекте ниже будет
хранится все состояние
приложения и больше
нигде!!!
*/
export const store = new useState({  // создать экземпляр класса useState для работы с состоянием
    help: {
        title: 'Инструкция',
        subtitles: {
            first: 'Найди все спрятанные объекты в игре. Список текущих искомых элементов будет отображен в блоке на правой ' +
                'части экрана. Найди объект на экране и щелкни по нему, чтобы выбрать его. Клик не по предмету из списка задач ' +
                'отнимет у тебя 5 очков! Если количество очков будет меньше ноля ты проиграешь, так же проигрыш будет в случае ' +
                'окончания игрового времени! Выигрыш засчитывается только при прохождении всех раундов без единого проигрыша!',
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
                totalPoints: 0,
                playerName: null,
            }
        },
        currentLevel: 1,
        currentItems: null, // то что render в меню
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
        scores: [],
    },
    audio: {
        background: {
            src: '/../audio/Game.mp3',
            isPlay: false,
        },
        sprite: {
            isPlay: true,
            error: {src: '/../audio/error.mp3'},
            success: {src: '/../audio/success.mp3'},
            winLevel: {src: '/../audio/winLevel.mp3'},
            click: {src: '/../audio/click.mp3'},
        }
    },
    screen: {
        fullscreen: false,
    },
});