const game = document.querySelector('#game');
const test = document.querySelector('#word');
const response = document.querySelector('#answer');
const submitBtn = document.querySelector('#submit-btn');
const restartBtn = document.querySelector('#restart-btn');
const startBtn = document.querySelector('#start-btn');
const time = document.querySelector('#time');
const gameOver = document.querySelector('#game-over')
const points = document.querySelector('#points');
const instruction = document.querySelector('.instruction');
const statusMsg = document.querySelector('#status-msg');
const highScore = document.querySelector('.high-score');
const mobileBtn = document.querySelectorAll('.mobileBtn');
const level = document.querySelector('#level');


// AUDIOS
// const timeAddedAudio = document.querySelector('#timeAddedAudio');
const gameEndAudio = document.querySelector('#gameEndAudio');
const m15 = document.querySelector('#m15');
const m13 = document.querySelector('#m13');
const m12 = document.querySelector('#m12');
const m10 = document.querySelector('#m10');
const m8 = document.querySelector('#m8');
const m3 = document.querySelector('#m3');

// 
game.style.display = 'none';
let gameActive = true;
gameOver.style.display = 'none';
let score = 0;
let timeRemaining = 60;
time.innerHTML = timeRemaining;
let currentAnswer;
let words, encWords, mobileAnswer;


let timeFunc = () => {
    if(timeRemaining > 0){
        if(timeRemaining > 30) time.style.color = '#fff';
        if(timeRemaining < 30 && timeRemaining > 15) time.style.color = 'yellow';
        else if(timeRemaining < 15) time.style.color = 'red';
        timeRemaining -= 1;
        time.innerHTML = timeRemaining;
        checkStatus();
    }else{
        gameActive = false
        checkStatus();
        gameOff();
    }
}

let displayQuestion = (arr) => {
    test.innerHTML = '';
    let questionWord, answer;
    randomIndex = Math.floor(Math.random() * arr.length);
    questionWord = arr[randomIndex];
    test.innerHTML = questionWord;
}


// let test2 = test();
// setTimeout(test, 3000);

// let test = (arg) => {
//     addedTime.innerHTML = arg;
//     return setInterval(() => {       
//         addedTime.style.opacity -= 1;
//     }, 1000)
// }

// let timeAudio = () => timeAddedAudio.play();
let endAudio = () => gameEndAudio.play();
let m15Play = () => m15.play();
let m13Play = () => m13.play();
let m12Play = () => m12.play();
let m10Play = () => m10.play();
let m8Play = () => m8.play();
let m3Play = () => m3.play();

let scorePoint = () => {
    let responseValue
    if(mobileAnswer) responseValue = mobileAnswer;
    else {responseValue = response.value};
    let counter = 0;
    let vowels = ['a', 'e', 'i', 'o', 'u'];
    let currentQuestion = Array.from(test.innerHTML.toLowerCase());
    currentQuestion.forEach(letter => {
        if(vowels.includes(letter)){
            counter ++;
        };
    })
    if(parseInt(responseValue) === counter){
        score += 5;
        points.innerHTML = score;
        response.value = '';
        response.focus();

        if(score === 60){
            statusMsg.classList.remove('bounceIn');
            level.classList.add('wobbble');
            level.innerHTML = 2;
            statusMsg.classList.add('bounceIn');
            // statusMsg.classList.add('bounceIn');
            timeRemaining +=8;
            m8Play();
        };
        if(score === 80){
            timeRemaining +=10;
            m10Play();
        };
        if(score === 100){
            timeRemaining +=15;
            m10Play();
        };
        if(score === 130){
            timeRemaining +=12;
            m12Play();
        }
        if(score === 170){
            timeRemaining +=13;
            m13Play();
        };
        if(score === 230){
            timeRemaining +=12;
            m12Play();
        }
        if(score === 250){
            timeRemaining +=10;
            m10Play();
        }
        if(score === 280){
            timeRemaining +=8;
            m8Play();
        }
        if(score === 300){
            timeRemaining +=3;
            m3Play();
        }
        if(score === 350){
            // statusMsg.innerHTML = encWords[3]
            timeRemaining +=10;
            m10Play();
        }
        if(score === 450){
            // statusMsg.innerHTML = encWords[3]
            timeRemaining +=15;
            m15Play();
        }
    }
    else{
        gameOff();
    }
}

let highScoreHandler = () => {
    let prevHighScore = localStorage.getItem("High Score");
    highScore.innerHTML = prevHighScore;
    if(!prevHighScore)  localStorage.setItem("High Score", score);
    else if(score > prevHighScore){
        localStorage.setItem("High Score", score);
        highScore.innerHTML = score;
    }
}
let gameOff = () => {
    endAudio();
    highScoreHandler();
    gameActive = false;
    document.querySelector('#totalPoints').innerHTML = score;
    response.value = '';
    document.getElementById('game-on').style.display = 'none';
    game.classList.remove('active');
    gameOver.classList.add('active');
}


let init = function() {
    highScoreHandler();
    startBtn.style.display = 'none';
    game.classList.add('active');
    gameActive = true;
    setInterval(timeFunc, 1000);
}

startBtn.addEventListener('click', (e) =>{
    test.innerHTML = words[Math.floor(Math.random() * words.length)];
    instruction.style.display = 'none';
    e.preventDefault()
    init();
    console.log(words)
})



restartBtn.addEventListener('click', (e) =>{
    location.reload();
})
let progress = () =>{
    scorePoint();
    displayQuestion(words);
}
submitBtn.addEventListener('click', (e) => {
    e.preventDefault()
    progress();
});

mobileBtn.forEach(butn => {
    butn.addEventListener('click', (e) => {
        mobileAnswer =  e.target.value;
        e.preventDefault()
        progress();
    }) 
})



document.addEventListener('keypress', (e) =>{
    if(e.code === 'Enter'){
        progress();
    }
});


let resetGame = () => {
    gameOver.style.display = 'block';
    answer.innerHTML = "";
    timeRemaining = 60;
}
let checkStatus = () => {
    if(gameActive){
    gameOver.style.display = 'none';
    }else{
        resetGame()
    }
}













encWords = ['Keep going', 'You are doing well!', 'You can do it!', 'You are a pro!']

words = `wonder thousand ceramicist cercarians cerebellar cerebellum exodontist exoenzymes exogenisms exonerated cerebrally cervicitis cessations chafferers chaffering chagrining chagrinned ago ran check game shape equate hot miss brought heat snow hodgepodge hodoscopes hokeypokey hokinesses hokypokies holidayers holidaying holinesses hollowares hollowness tire bring yes distant fill east paint language among grand ball yet wave drop heart am present heavy dance engine position wide sail material size vary settle speak weight general ice matter circle pair include divide syllable felt perhaps pick sudden count square reason length represent art subject certifying certiorari certitudes ceruminous region energy hunt probable bed brother egg cetologies hoarsening hobblebush hobbyhorse hobgoblins hobnailing hobnobbers hobnobbing hollowware hollyhocks cetologist chabazites chaetopods ride cell believe fraction forest sit race window store summer cerebrated cerebrates cerecloths ceremonial ceremonies certainest certifiers cerussites cervelases ederating federation federative federators feebleness feedgrains feedstocks feedstuffs feistiness cervicites train sleep prove lone leg exercise wall mount wish sky board joy winter sat written wild instrument glass grass cow job edge sign visit past soft fun bright noon locate character insect caught period indicate existences exobiology feculences fecundated fecundates federacies federalese federalism federalist federalize fexocytosed exocytoses exocytosis exocytotic exodontias`;

words = words.split(" ");
console.log(words);