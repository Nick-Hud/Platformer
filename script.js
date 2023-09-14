/* Name: Nicholas Hudson
Date:29/06/2023
This is the main script.js file for my program it contains all of the predefined functions. 
This forms the basis of my project but requires other files to function
(menu.js, entity.js, player.js, index.html) */

let gameState;
let canvusWidth
let canvusHeight
let score = 0

function preload() {
    //loads any needed assets
    futuraHand = loadFont('FuturaHand.ttf');
}

function setup() {
    //Sets up essential features such as: canvus, frame rate and instantiating the player object
    canvusWidth = windowWidth - 20
    canvusHeight = windowHeight - 100
    frameRate(60);
    createCanvas(canvusWidth, canvusHeight, WEBGL);
    menuCamera = createCamera()
    gameModeCamera = createCamera()
    setCamera(menuCamera)
    rectMode(CENTER)
    angleMode(DEGREES)
    textFont(futuraHand);
    textAlign(CENTER, CENTER)
    gameState = "mainMenu"
    player1 = new player()
    gameMode1Button = new button(-400, 200, "Game mode 1")
    gameMode2Button = new button(0, 200, "Game mode 2")
    tutorialButton = new button(400, 200, "Tutorial")
    resumeButton = new button(-300, 200, "Resume")
    mainMenuButton = new button(300, 200, "Main menu")
    tileHandler1 = new tileHandler()
    resetValues()
}

function draw() {
    //Ran whenever a frame is drawn, runs the inputs, process and outputs
    inputs()
    process()
    output()
    //console.log(gameState)
}

function inputs() {
    //Player movement
    if (gameState == "gameMode1") {
        if (!(movedX >= 100 || movedX <= -100)) {
            if (!(movedY >= 100 || movedY <= -100)) {
                player1.setPos((player1.getPos("x") + movedX), player1.getPos("y"), (player1.getPos("z") + movedY))
            }
        }
    }
}

function process() {
    // validation for gamestate and pointerlock.
    if (gameState == "gameMode1") {
        requestPointerLock()
        if (player1.getPos("y") < 0) {
            tileHandler1.dropTiles(0.5)
            score += 10
        } else {
            tileHandler1.dropTiles(0.05)
            score += 1
        }
        tileHandler1.tileResetDetection()
    } 
    if (gameState == "pauseMenu" || gameState == "mainMenu") {
        exitPointerLock()
    }
    if (gameState == "mainMenu") {
        resetValues()
    }
    if (!(gameState == "gameMode1" || gameState == "mainMenu" || gameState == "pauseMenu" || gameState == "gameMode2" || gameState == "tutorial")) {
        console.error("Unrecognised gameState: " + gameState + " Reverting to mainMenu")
        gameState = "mainMenu"
    }
}

function output() {
    //Displays all the entities in the correct order
    background(60)
    if (gameState == "mainMenu") { mainMenuOutput() }
    if (gameState == "pauseMenu") { pauseMenuOutput() }
    if (gameState == "gameMode1") {
        //camera(0, -50, 150, 0, 12, 0);
        setCamera(gameModeCamera)
        scene()
        player1.draw()
        tileHandler1.draw()
        push()
        fill(color("black"))
        text(score, 0, -50)
        pop()
    }
}

function scene() {
    //Displays the outer scene 
    for (let i = 0; i <= 3; i++) {
        push()
        fill(255, 102, 94);
        strokeWeight(2)
        stroke(0)
        if (i == 0) { translate(0, 0, -60) }
        if (i == 1) { translate(-60, 0, 0), rotateY(90) }
        if (i == 2) { translate(60, 0, 0), rotateY(90) }
        if (i == 3) { translate(0, 60, 0), rotateX(90) }
        box(118, 118, 1)
        pop()
    }
}

function keyPressed() {
    //Gets run whenever a key is pressed. Looks for the 'p' key and will change gameState to pauseMenu
    if (keyCode == '80') {
        prevGameState = gameState
        gameState = "pauseMenu"
    }
    if (keyCode == '32'){
        player1.jump()
    }
    //console.log(event)
}

function mouseClicked() {
    //Gets run whenever the mouse is clicked and runs the methods to detect whether a button has been clicked
    if (gameState == "mainMenu") {
        gameMode1Button.onClick("gameMode1")
        gameMode2Button.onClick("gameMode2")
        tutorialButton.onClick("tutorial")
    }
    if (gameState == "pauseMenu") {
        resumeButton.onClick(prevGameState)
        mainMenuButton.onClick("mainMenu")
    }
}