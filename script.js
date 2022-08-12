const startBtn = document.body.querySelector('.start-btn');
const pauseBtn = document.body.querySelector('.pause-btn');
const stopBtn = document.body.querySelector('.stop-btn');
const setArray = document.body.querySelectorAll('.set-btn')

const minutes = document.querySelector('.minutes-box > .box-digits');
const seconds = document.querySelector('.seconds-box > .box-digits');
const scoreWrapper = document.querySelector('.score-wrapper');

let sound = document.createElement('audio');
sound.src = 'zvuk.ogg';

let minutesCount = null;
let secondsCount = null;
let timerId = null;
let currentScore = 600;

const render = score => {
    minutesCount = (Math.trunc(score  / 60)).toString() || '00';
    secondsCount = (Math.trunc(score - minutesCount * 60)).toString() || '00';
    minutes.textContent = minutesCount.length < 2 ? '0' + minutesCount : minutesCount;
    seconds.textContent = secondsCount.length < 2 ? '0' + secondsCount : secondsCount;
    if (score === 1) { sound.play() }
};

render(currentScore);

const runtimeStepEngine = () => {
    if (currentScore > 0) { render(--currentScore) }
    if (currentScore === 0) {
        currentScore = 600;
        render(--currentScore);
    }
};

const writeReport = (message) => {
    scoreWrapper.innerText += `${new Date().toLocaleString()} ${message} \n`;
}

const startBtnHandler = () => {
    if (currentScore === 0) { currentScore = 600 }
    timerId = setInterval(runtimeStepEngine, 1000);
    startBtn.classList.add('controls-btn-active');
    pauseBtn.classList.remove('controls-btn-active');
    writeReport(' start');
};

const pauseBtnHandler = () => {
    clearInterval(timerId);
    startBtn.addEventListener('click', startBtnHandler, {once: true});
    startBtn.classList.remove('controls-btn-active');
    pauseBtn.classList.add('controls-btn-active');
    writeReport(' pause');
};

const stopBtnHandler = () => {
    clearInterval(timerId);
    currentScore = 0;
    render(currentScore);
    startBtn.addEventListener('click', startBtnHandler, {once: true});
    startBtn.classList.remove('controls-btn-active');
    pauseBtn.classList.remove('controls-btn-active');
    writeReport(' stop');
};

const setArrayHandler = e => {
    currentScore += 60 * e.target.innerText;
    writeReport(`${e.target.innerText} minutes`);
    render(currentScore);
}

startBtn.addEventListener('click', startBtnHandler, {once: true});
pauseBtn.addEventListener('click', pauseBtnHandler );
stopBtn.addEventListener('click', stopBtnHandler );
setArray.forEach(i => i.addEventListener('click', setArrayHandler ));


