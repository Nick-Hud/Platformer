/* Name: Nicholas Hudson
Date:25/10/2023
This is the main script.js file for my program it contains all of the predefined functions. 
This forms the basis of my project but requires other files to function
(menu.js, entity.js, player.js, index.html) */

let gameState;
let canvusWidth
let canvusHeight
let score = 0
let displayName
let leaderboardGot, leaderboardRecived = false
let leaderboardData = {}
let jumpAllowed = true
let nextJumpScore
let jumpSound, gameOverSound

function preload() {
    //loads any needed assets
    futuraHand = loadFont('FuturaHand.ttf');
    soundFormats('wav');
    jumpSound = loadSound('sound/Jump')
    gameOverSound = loadSound('sound/Game over')
}

function setup() {
    //Sets up essential features such as: canvus, frame rate and instantiating objects
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
    inp = createInput('Display Name');
    inp.position((canvusWidth / 2) - 50, (canvusHeight / 2));
    inp.size(100);
    inp.input(myInputEvent);
    gameMode1Button = new button(-400, 200, "Game mode 1")
    gameMode2Button = new button(0, 200, "Game mode 2")
    tutorialButton = new button(400, 200, "Tutorial")
    resumeButton = new button(-300, 200, "Resume")
    mainMenuButton = new button(300, 200, "Main menu")
    leaderboardButton = new button(0, 75, "Submit to Leaderboard")
    tileHandler1 = new tileHandler()
    resetValues()
    if (canvusWidth < 1175 || canvusHeight < 850) {
        gameState = "screenWarning"
    }
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
    if (gameState == "gameMode1" || gameState == "gameMode2" || gameState == "tutorial") {
        if (!(movedX >= 100 || movedX <= -100)) {
            if (!(movedY >= 100 || movedY <= -100)) {
                player1.setPos((player1.getPos("x") + movedX), player1.getPos("y"), (player1.getPos("z") + movedY))
            }
        }
    }
}

function process() {
    // Runs all the processing that needs to happen per frame
    if (gameState == "gameMode1" || gameState == "gameMode2" || gameState == "tutorial") {
        requestPointerLock()
        if (player1.getPos("y") < 0) {
            tileHandler1.dropTiles(10)
            score += 10
        } else {
            tileHandler1.dropTiles(2.5)
            score += 1
        }
        tileHandler1.tileResetDetection()
        playerFall(2.5)
        if (score >= nextJumpScore){
            jumpAllowed = true
        }
    }
    if (gameState == "gameMode1" || gameState == "gameMode2") {
        gameOverDetection()
    }
    if (gameState == "gameOver") {
        exitPointerLock()
    }
    if (gameState == "pauseMenu" || gameState == "mainMenu") {
        exitPointerLock()
    }
    if (gameState == "mainMenu") {
        resetValues()
    }
    if (!(gameState == "gameMode1" || gameState == "mainMenu" || gameState == "pauseMenu" || gameState == "gameMode2" || gameState == "tutorial" || gameState == "gameOver" || gameState == "leaderboard" || gameState == "screenWarning")) {
        console.error("Unrecognised gameState: " + gameState + " Reverting to mainMenu")
        gameState = "mainMenu"
    }
}

function output() {
    //Displays all the entities in the correct order
    background(60)
    if (gameState == "mainMenu") { mainMenuOutput() }
    if (gameState == "pauseMenu") { pauseMenuOutput() }
    if (gameState == "gameMode1" || gameState == "tutorial") {
        gameModeCamera.camera(0, -500, 1500, 0, 120, 0)
    }
    if (gameState == "gameMode2") {
        gameModeCamera.camera(player1.getPos("x"), -500 + player1.getPos("y"), 1250 + player1.getPos("z"), player1.getPos("x"), player1.getPos("y"), player1.getPos("z"))
    }
    if (gameState == "gameMode1" || gameState == "gameMode2" || gameState == "tutorial") {
        setCamera(gameModeCamera)
        scene()
        player1.draw()
        tileHandler1.draw()
        push()
        textSize(100)
        fill(color("black"))
        text(score, 0, -500)
        pop()
    }
    if (gameState == "gameOver") {
        setCamera(menuCamera)
        push()
        textSize(100)
        fill(255);
        text("GAME OVER", 0, -300)
        pop()
        mainMenuButton.draw()
        leaderboardButton.draw()
        inp.show()
    }
    if (gameState == "leaderboard") {
        leaderboardDisplay()
    }
    if (gameState == "screenWarning") {
        push()
        textSize(50)
        text("Your screen may be too small", 0, 0)
        text("Continue at your own risk", 0, 75)
        pop()
        mainMenuButton.draw()
    }
}

function scene() {
    //Displays the outer scene 
    for (let i = 0; i <= 3; i++) {
        push()
        fill(255, 102, 94);
        strokeWeight(20)
        stroke(0)
        if (i == 0) { translate(0, 0, -600) }
        if (i == 1) { translate(-600, 0, 0), rotateY(90) }
        if (i == 2) { translate(600, 0, 0), rotateY(90) }
        if (i == 3) { translate(0, 600, 0), rotateX(90) }
        box(1180, 1180, 10)
        pop()
    }
}

function keyPressed() {
    //Gets run whenever a key is pressed. Will then complete the nesecarry functions
    if (keyCode == '80') {
        if (gameState == "gameMode1" || gameState == "gameMode2" || gameState == "tutorial") {
            prevGameState = gameState
            gameState = "pauseMenu"
        }
    }
    if (keyCode == '32') {
        if (jumpAllowed) {
            player1.jump()
        }
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
    if (gameState == "gameOver") {
        mainMenuButton.onClick("mainMenu")
        leaderboardButton.onClick("leaderboard")
    }
    if (gameState == "leaderboard" || gameState == "screenWarning") {
        mainMenuButton.onClick("mainMenu")
    }
}