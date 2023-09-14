/* Name: Nicholas Hudson
Date:29/06/2023
This is the file that contains the menu functions and the button class.
This handles the menus of my program.
This forms part of my project but requires other files to function
(script.js, index.html) */

function mainMenuOutput() {
    //Outputs the menu and buttons
    setCamera(menuCamera)
    push()
    textSize(100)
    text("PLATFORMER", 0, -300)
    pop()
    //Title
    gameMode1Button.draw()
    gameMode2Button.draw()
    tutorialButton.draw()
}

function resetValues() {
    tileHandler1.hideAll()
    tileHandler1.randomise(3)
    tileHandler1.getTile(4).setShown(true)
    tileHandler1.getTile(4).setPos(0, 40, 0)
    player1.setPos(0, 30, 0)
    gameModeCamera.camera(0, -50, 150, 0, 12, 0)
}

function pauseMenuOutput() {
    setCamera(menuCamera)
    push()
    textSize(100)
    fill(255);
    text("PAUSE", 0, -300)
    pop()
    resumeButton.draw()
    mainMenuButton.draw()
}


class button {
    //A class that makes creating buttons easy
    constructor(newButtonX, newButtonY, newButtonText) {
        let buttonX, buttonY, buttonText
        this.buttonX = newButtonX
        this.buttonY = newButtonY
        this.buttonText = newButtonText
    }

    draw() {
        push()
        textSize(25)
        translate(this.buttonX, this.buttonY, -1)
        fill(255, 102, 94);
        box(300, 100, 0)
        fill(color("black"))
        text(this.buttonText, 0, 0)
        pop()
    }

    onClick(newGameState) {
        let upperXBound, upperYBound, lowerXBound, lowerYBound
        upperXBound = this.buttonX + 150 + (canvusWidth / 2)
        lowerXBound = this.buttonX - 150 + (canvusWidth / 2)
        upperYBound = this.buttonY + 50 + (canvusHeight / 2)
        lowerYBound = this.buttonY - 50 + (canvusHeight / 2)
        if ((mouseY > lowerYBound) && (mouseY < upperYBound)) {
            if ((mouseX > lowerXBound) && (mouseX < upperXBound)) {
                gameState = newGameState
            }
        }
    }

}