let gameState;
let canvusWidth
let canvusHeight
let player1
let gameMode1Button
let gameMode2Button
let tutorialButton

function preload() {
    futuraHand = loadFont('FuturaHand.ttf');
}

function setup() {
    canvusWidth = windowWidth - 20
    canvusHeight = windowHeight - 100
    frameRate(60);
    createCanvas(canvusWidth, canvusHeight, WEBGL);
    rectMode(CENTER)
    angleMode(DEGREES)
    textFont(futuraHand);
    textAlign(CENTER, CENTER)
    gameState = "mainMenu"
    player1 = new player()
    player1.setPos(0, 40, 0)
    gameMode1Button = new button()
    gameMode1Button.setVal(-400, 200, "Game mode 1")
    gameMode2Button = new button()
    gameMode2Button.setVal(0, 200, "Game mode 2")
    tutorialButton = new button()
    tutorialButton.setVal(400, 200, "Tutorial")
}

function draw() {
    inputs()
    process()
    output()
    //console.log(gameState)
}

function inputs() {
    if (gameState == "mainMenu") {

    } if (gameState == "gameMode1") {
        player1.setPos((player1.getPos("x") + movedX), player1.getPos("y"), (player1.getPos("z") + movedY))

    } if (gameState == "pauseMenu") {

    }

}

function process() {
    if (gameState == "mainMenu") {

    } if (gameState == "gameMode1") {
        requestPointerLock()


    } if (gameState == "pauseMenu") {
        exitPointerLock()
    }
}

function output() {
    background(60)
    if (gameState == "mainMenu") { mainMenu() }
    if (gameState == "gameMode1") {
        camera(0, -50, 150, 0, 12, 0);
        scene()
        player1.draw()


    } if (gameState == "pauseMenu") {

    }



}

function scene() {
    for (let i = 0; i <= 3; i++) {
        push()
        fill(255, 102, 94);
        if (i == 0) { translate(0, 0, -60) }
        if (i == 1) { translate(-60, 0, 0), rotateY(90) }
        if (i == 2) { translate(60, 0, 0), rotateY(90) }
        if (i == 3) { translate(0, 60, 0), rotateX(90) }
        plane(120, 120);
        pop()
    }
}

function keyPressed() {
    if (keyCode == '80') {
        gameState = "pauseMenu"
    }
    //console.log(event)
}

function mouseClicked() {
    gameState = "gameMode1"
    //console.log(event)
}