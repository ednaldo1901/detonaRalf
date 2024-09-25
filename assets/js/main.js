const states = {
    view:{
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lifes: document.querySelector("#life")
    },
    value:{
        hitPosition:0,
        resul:0,
        curentTime: 60,
        conutLife:3,
    },

    actions:{
        timeId: setInterval(rondamSquare, 1000),
        coutDownId: setInterval(countTime, 1000),
        sound: setInterval(playsoundJogo,24000),
    }
};

async function playsoundJogo() {
    let audioJogo = new Audio("assets/audio/audioFundo.mp3");
    audioJogo.volume = 0.4;
    await audioJogo.play();
};

function playSoundErro(){
    let audioErro = new Audio("assets/audio/audio2.mp3");
    audioErro.play();
}

function playSound(){
    let audio = new Audio("assets/audio/audio1.mp3")
    audio.play()
}

function countTime(){
    states.value.curentTime--;
    states.view.timeLeft.textContent = states.value.curentTime;
    
    if(states.value.curentTime <= 0){
        clearInterval(states.actions.coutDownId);
        clearInterval(states.actions.timeId);
        alert(`O seu tempo acabou você fez ${states.value.resul}`);
        
    };
}

function rondamSquare(){
    states.view.squares.forEach((square)=>{
      square.classList.remove("enemy")  
    })

    let rondomNumber = Math.floor(Math.random() * 9);
    let randomSquare = states.view.squares[rondomNumber];
    randomSquare.classList.add("enemy");
    states.value.hitPosition = randomSquare.id;
}


function addListenerHitBox(){
    states.view.squares.forEach((square) =>{
        square.addEventListener('mousedown',() => {
            if(square.id === states.value.hitPosition){
                states.value.resul++
                states.view.score.textContent = states.value.resul;
                states.value.hitPosition = null;
                playSound();
            }else{
                square.id !== states.value.hitPosition;
                states.value.conutLife--;
                states.view.lifes.textContent = `x${states.value.conutLife}`;
                square.classList.add("bomb");

                setTimeout(() => {
                    square.classList.remove('bomb');
                }, 1000);

                playSoundErro();
                if(states.value.conutLife <= 0){
                    states.view.lifes.textContent =`x${0}`;
                    alert("game over!")
                    clearInterval(states.actions.coutDownId);
                    clearInterval(states.actions.timeId);
                }
            }
        });
    });
}

function init() {
    playsoundJogo();
    addListenerHitBox();
    
 };
init();