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

    seconds.textContent = secondsCount.length < 2 ? '0' + secondsCount : secondsCount;
    minutes.textContent = minutesCount.length < 2 ? '0' + minutesCount : minutesCount;

    if (score === 1) {
        sound.play();
    }
};

render(currentScore);

const runtimeStepEngine = () => {
    if (currentScore > 0) {
        render(--currentScore);
    }
    if (currentScore === 0) {
        currentScore = 600;
        render(--currentScore);
    }
};

const writeReport = (minutes, seconds, message) => {
    scoreWrapper.innerText += `${
        minutes.length < 2 ?  '0' + minutes : minutes}:${
        seconds.length < 2 ?  '0' + seconds : seconds} - ${message} \n`;
}

const startBtnHandler = () => {
    if (currentScore === 0) {
        currentScore = 600;
    };
    timerId = setInterval(runtimeStepEngine, 1000);
    startBtn.classList.add('controls-btn-active');
    pauseBtn.classList.remove('controls-btn-active');
    writeReport(minutesCount, secondsCount, 'start');
};

const pauseBtnHandler = () => {
    clearInterval(timerId);
    startBtn.addEventListener('click', startBtnHandler, {once: true});
    startBtn.classList.remove('controls-btn-active');
    pauseBtn.classList.add('controls-btn-active');
    writeReport(minutesCount, secondsCount, 'pause');
};

const stopBtnHandler = () => {
    clearInterval(timerId);
    currentScore = 0;
    render(currentScore);
    startBtn.addEventListener('click', startBtnHandler, {once: true});
    startBtn.classList.remove('controls-btn-active');
    pauseBtn.classList.remove('controls-btn-active');
    writeReport(minutesCount, secondsCount, 'stop');
};

const setArrayHandler = e => {
    currentScore += 60 * e.target.innerText;
    writeReport(minutesCount, secondsCount, `${e.target.innerText} minutes`);
    render(currentScore);
}

startBtn.addEventListener('click', startBtnHandler, {once: true});
pauseBtn.addEventListener('click', pauseBtnHandler );
stopBtn.addEventListener('click', stopBtnHandler );
setArray.forEach(i => i.addEventListener('click', setArrayHandler ));


