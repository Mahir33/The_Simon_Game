

const btnColours = ['red', 'blue', 'green', 'yellow'];
let gamePattern = [];
let userClickPattern = [];
let level = 0;
let started = false;


function nextSequence () {
    userClickPattern = []
    level += 1
    $('h1').text(`Level ${level}`)

    let n = Math.floor(Math.random() * 4)
    let randomChosenColor = btnColours[n];
    gamePattern.push(randomChosenColor)

    $(`#${randomChosenColor}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor)
    animatePress(randomChosenColor)
    console.log("Game pattern: " + gamePattern)
    
};

$('[type="button"]').on('click', function (){
    const userChosenColour = this.id
    userClickPattern.push(userChosenColour)
    playSound(userChosenColour)
    animatePress(userChosenColour)
    checkAnswer(userClickPattern.length - 1)
    console.log("User pattern: " + userClickPattern)
})

function playSound(name){
    let audio = new Audio(`sounds/${name}.mp3`)
    audio.play()
}

function animatePress(currentColour){
    $(`[id="${currentColour}"]`).addClass('pressed')
    setTimeout(() => {
        $(`[id="${currentColour}"]`).removeClass('pressed')
    }, 100)

}

function checkAnswer(currentLevel){

    if(userClickPattern[currentLevel] === gamePattern[currentLevel]){
        if(userClickPattern.length === gamePattern.length){
            setTimeout(() => nextSequence(), 1000)
        }
    } else {
        playSound('wrong');
        $('body').addClass('game-over');
        setTimeout(() => $('body').removeClass('game-over'), 1000)
        $('h1').text('Game Over, Press Any Key to Restart')
        startOver()
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}

// Start Game
$(document).on('keypress', function () {
    
    if(!started){
        $('h1').text(`Level ${level}`);
        nextSequence()
        started = true;
    }
})
