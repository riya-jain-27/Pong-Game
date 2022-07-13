import Ball from "./ball.js";
import Paddle from "./paddle.js"

const ball = new Ball(document.getElementById("ball"))
const playerPaddle = new Paddle(document.getElementById("player-paddle"))
const computerPaddle = new Paddle(document.getElementById("computer-paddle"))
const playerScore = document.getElementById("player-score")
const computerScore = document.getElementById("computer-score")


let lastTime
function update(time){
    if(lastTime != null){
        const delta = time-lastTime;
        ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()])
        computerPaddle.update(delta, ball.y)
        const hue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--hue"))

        document.documentElement.style.setProperty("--hue", hue + delta * 0.01)

        if(isLose()){
            handleLose()
        }
    }

    lastTime = time;
    window.requestAnimationFrame(update)
}

function isLose(){
    const rect = ball.rect()
    return rect.left <= 0 || rect.right >= window.innerWidth
}

function handleLose(){
    const rect = ball.rect()
    if(rect.left <= 0){
        computerScore.textContent = parseInt(computerScore.textContent) + 1
    }else{
        playerScore.textContent = parseInt(playerScore.textContent) + 1
    }

    ball.reset()
    computerPaddle.reset()
}

document.addEventListener("mousemove", e => {
    playerPaddle.position = (e.y / window.innerHeight) * 100   //pixel to percentage(in css)
})

window.requestAnimationFrame(update)
