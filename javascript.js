//set all variables.
var canvas = document.getElementById("game-canvas")
var ctx = canvas.getContext("2d")
var player = document.getElementById("image")
var toppipe = document.getElementById("tpimage")
var bottompipe = document.getElementById("bpimage")
var background = document.getElementById("bkimage")
var x = 100
var y = 350
var Playerheight = 40
var playerwidth = 40
var tubeh = 250
var tubeh2 = 300
var tubew = 50
var tubex = 500
var tubex2 = 1000
var tubey = 0
var tubey2 = 500
var tubey3 = 0
var tubey4 = 550
var tubegap = 200
var dy = 2
var dp = -2
var speed = 37
var s = 0
var sc = 0
let up = false
var b = 0
var interval = null
var hop = document.getElementById("hop");
hop.playbackRate = 2.0;
hop.volume = 0.5;
document.addEventListener("keydown",keydownhandler,false)
document.addEventListener("keyup",keyuphandler,false)

//draw items on screen, set gravity strength, set jump height, set game bounderies, set colision detection.
function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawback();
    drawplayer();
    drawtube();
    drawtube2();
    score();

    //set gravity for player.
    y += dy

    //move tube set one and two.
    tubex += dp
    tubex2 += dp

    //set jump height and play jump sound effect if the space bar is clicked.
    if (up){
        y = y - 10
        document.getElementById('hop').play();
    }

    //the respawn of both tube set one and two after it has left the screen.
    if (tubex + tubew < 0){
        tubex = 1000
        tubey = 0
        tubeh = Math.random()*450
        tubey2 = tubeh + tubegap
    }
    if (tubex2 + tubew < 0){
        tubex2 = 1000
        tubey3 = 0
        tubeh2 = Math.random()*450
        tubey4 = tubeh2 + tubegap
    }

    //Game collison detechtion if player hit celing or floor.
    if (y + dy > canvas.height - Playerheight)
    {
        gameover()
    }
    else if (y < 0){
        gameover()
    }

    //Game collison detection if player hit tube set one.
    if(x + playerwidth > tubex && x < tubex + tubew && y > tubey && y < tubeh){
        gameover()
    }
    if(x + playerwidth > tubex && x  < tubex + tubew && y + Playerheight > tubey2 && y < canvas.height){
        gameover()
    }

    //Game collison detection if player goes through tube set one.
    if (y > tubeh && y + Playerheight < tubey2 && x + playerwidth - speed > tubex && x < tubex)
    {
        s = s + 1
    }

    //Game collison detection if player hit tube set two.
    if(x + playerwidth > tubex2 && x < tubex2 + tubew && y > tubey3 && y < tubeh2){
        gameover()
    }
    if(x + playerwidth > tubex2 && x  < tubex2 + tubew && y + Playerheight > tubey4 && y < canvas.height){
        gameover()
    }

    //Game collison detection if player goes through tube set two.
    if (y > tubeh2 && y + Playerheight < tubey4 && x + playerwidth - speed > tubex2 && x < tubex2)
    {
        s = s + 1
    }

    //if score is past 5, the speed will increase and the gap will get smaller by 25px per 5 points to make game harder.
    if (s >= 5)
    {
        tubegap = 175
        dp = -3
        speed = 36
    }
    if (s >= 10){
        tubegap = 150
    }
    if (s >= 15){
        tubegap = 125
    }
    if (s >= 20){
        tubegap = 100
    }
    if (s >= 25){
        tubegap = 50
    }

    //if the score is higher than the best score, score replaces the best score and saves the data for the next round.
    if (s >= b) {
        b = s 
    }
}

//show player score on screen while game is playing fuction.
function score(){
    ctx.fillStyle = "gold "
    ctx.font = " 40px 'Press Start 2P', cursive  "
    ctx.fillText(s, 500,100)
}

//draws player avitar.
function drawplayer(){
    ctx.clearRect(0,0,canvas.width,canvas.height)
    ctx.drawImage(player,x,y,playerwidth,Playerheight)
}

//draw tube set 1.
function drawtube(){
    ctx.drawImage(toppipe,tubex,tubey,tubew,tubeh)
    ctx.drawImage(bottompipe,tubex,tubey2,tubew,canvas.height)
}

//draw tube set 2.
function drawtube2(){
    ctx.drawImage(toppipe,tubex2,tubey3,tubew,tubeh2)
    ctx.drawImage(bottompipe,tubex2,tubey4,tubew,canvas.height)
}

//draws background.
function drawback(){
    ctx.drawImage(background,520,0,500,700,0,0,500,688)
}

//stops game and call end menu.
function gameover() {
    endmenu()
    document.getElementById('death').play();
    clearInterval(interval)
}

//brings brings game back to start page.
function restart(){
        pre()
}

//displays end menu, blurs background, shows score and best score.
function endmenu() {
    document.getElementById("endscreen").style.display = 'block'
    game.classList.add('backdrop-blur')
    document.getElementById("endscore").innerHTML = s
    document.getElementById("bestscore").innerHTML = b  
    document.getElementById("rules").style.display = 'block'
    document.getElementById("Scoresystem").style.display = 'block'
}

//displaies start menu, hides end menu.
function pre(){
    document.getElementById("startscreen").style.display = 'block'
    document.getElementById("endscreen").style.display = 'none'
    document.getElementById("rules").style.display = 'block'
    document.getElementById("Scoresystem").style.display = 'block'
}

//reset all variables, remove background blur, hide start and end menu.
function Start(){
    interval = setInterval(draw,10)
     x = 100
     y = 350
     Playerheight = 40
     playerwidth = 40
     tubeh = 250
     tubeh2 = 300
     tubew = 50
     tubex = 500
     tubex2 = 1000
     tubey = 0
     tubey2 = 500
     tubey3 = 0
     tubey4 = 550
     tubegap = 200
     dy = 2
     dp = -2
     speed = 37
     s = 0
     sc = 0
    up = false
    game.classList.remove('backdrop-blur')
    document.getElementById("endscreen").style.display = 'none'
    document.getElementById("startscreen").style.display = 'none'
    document.getElementById("rules").style.display = 'none'
    document.getElementById("Scoresystem").style.display = 'none'
}

//listen when 'space' button is pressed down.
function keydownhandler(e){
    if(e.key === "Space" || e.key === " "){
        up = true
    }
}

//listen when 'space' button is up.
function keyuphandler(e){
    if(e.key === "Space" || e.key === " "){
        up = false
    }
}

//listen when the 'restart' button is clicked, if clicked call the restart function.
document.getElementById('restart').addEventListener("click", function() {
    restart()
 })
 //listen when the 'start' button is clicked, if clicked call the start function.
 document.getElementById('start').addEventListener("click", function() {
    Start()
 })