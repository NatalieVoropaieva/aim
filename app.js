const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');
let time = 5;
const scoreContainer = document.querySelector('#score')
let score = 0

let intervalId = null;

const setTime = (value) => {
    timeEl.innerHTML = `00:${value}`
};
const finishGame = () => {
    console.log("clear");
    // timeEl.parentNode.classList.add('hide');
    scoreContainer.innerText = score;
    screens[2].classList.add('up');
    clearInterval(intervalId);
    clearCircles();
};

const decreaseTime = ()=>{
    if (time === 0) {
        finishGame()
    } else {
        let current = --time
        if (current < 10) {
            current = `0${current}`
        }
        setTime(current)
    }
};


const getRandomNumber = (min,max) => {
    return Math.round(Math.random() * (max - min) + min)
};

const createRandomCircle = () => {
    const {width, height} = board.getBoundingClientRect();
    const circle = document.createElement('div')
    const size = getRandomNumber(20, 60);
    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0, height - size);
    circle.classList.add('circle');
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;

    board.append(circle)
};

const startGame = () => {
    intervalId = setInterval(decreaseTime, 1000)
    createRandomCircle()
    setTime(time)
};

startBtn.addEventListener('click', (event) => {
    event.preventDefault()
    screens[0].classList.add('up')
});
timeList.addEventListener('click', (event) => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'))
        screens[1].classList.add('up')

        startGame()
    }
});

const clearCircles = () => {
    board.innerHTML = "";
}
board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        createRandomCircle()
    }
})
const restartGame = () => {
    score = 0;
    time = 20;
    screens.forEach(screen => {
        screen.classList.remove('up');
    });
    console.log(screens);
}

