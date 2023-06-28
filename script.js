let gameState;
function setup() {
    frameRate(60);
    createCanvas(windowWidth - 20, windowHeight - 100, WEBGL);
    rectMode(CENTER)
    angleMode(DEGREES)
    gameState = "mainMenu"
}

function draw() {
    inputs()
    process()
    output()
    console.log(gameState)
}

function inputs() {
    if (gameState == "mainMenu"){

    } if (gameState == "gameMode1") {
        requestPointerLock()
        //console.log(movedX, movedY)
    } if (gameState == "pauseMenu") {
        exitPointerLock()
    }
}

function process() {

}

function output() {
    background(60)
    scene()
    camera(0, -50, 170, 0, 0, 0);
}

function scene(){
    //back panel
  push()
  fill(255, 102, 94);
  translate(0, 0, -60)
  plane(120, 120);
  pop()
  //left panel
  push()
  fill(255, 102, 94);
  translate(-60, 0, 0)
  rotateY(90)
  plane(120, 120);
  pop()
  //right panel
  push()
  fill(255, 102, 94);
  translate(60, 0, 0)
  rotateY(90)
  plane(120, 120);
  pop()
  //bottom panel
  push()
  fill(255, 102, 94);
  translate(0, 60, 0)
  rotateX(90)
  plane(120, 120);
  pop()
}

function keyPressed() {
    if (keyCode == '80'){
        gameState = "pauseMenu"
    }
    console.log(event)
}

function mouseClicked() {
    gameState = "gameMode1"
    //console.log(event)
}