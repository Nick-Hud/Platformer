/* Name: Nicholas Hudson
Date:02/10/2023
This is the file that contains the player class for my program.
This is used for the player peice
This forms part of my project but requires other files to function
(script.js, index.html, entity.js) */

class player extends entity {
    // A class for the player (More will be completed in iteration 2)
    draw() {
        push()
        translate(this.getPos("vector"))
        box(150)
        pop()
    }

    jump() {
        this.setPos(this.xPos, this.yPos - 200, this.zPos)
        this.maxHeight = this.yPos - 350
        jumpAllowed = false
        nextJumpScore = score + 35
        jumpSound.play()
    }
}

function playerFall(rate) {
    shownTilesWithBounds = tileHandler1.getAllShown()
    playerUpperBounds = [player1.getPos("x") + 75, player1.getPos("y") + 75, player1.getPos("z") + 75]
    playerLowerBounds = [player1.getPos("x") - 75, player1.getPos("y") - 75, player1.getPos("z") - 75]
    let fall = true
    for (let i = 0; i < shownTilesWithBounds.length; i++) {
        if (((shownTilesWithBounds[i].bounds.lowerX < playerUpperBounds[0]) && (shownTilesWithBounds[i].bounds.upperX > playerLowerBounds[0])) && ((shownTilesWithBounds[i].bounds.lowerZ < playerUpperBounds[2]) && (shownTilesWithBounds[i].bounds.upperZ > playerLowerBounds[2]))) {
            if (playerUpperBounds[1] <= shownTilesWithBounds[i].bounds.lowerY){
                fall = false
                player1.setPos(player1.getPos("x"), player1.getPos("y") + 2, player1.getPos("z"))
            }
        }
    }
    if (fall || player1.getPos("y") < 0) {
        player1.setPos(player1.getPos("x"), player1.getPos("y") + rate, player1.getPos("z"))
    }
}

function gameOverDetection(){
    if(player1.getPos("y") >= 450){
        if (score <= 250){
            //Grace period
        } else {
            gameState = "gameOver"
            gameOverSound.play()
        }
    }
}