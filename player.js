/* Name: Nicholas Hudson
Date:29/06/2023
This is the file that contains the player class for my program.
This is used for the player peice
This forms part of my project but requires other files to function
(script.js, index.html, entity.js) */

class player extends entity {
    // A class for the player (More will be completed in iteration 2)
    draw() {
        push()
        translate(this.getPos("vector"))
        box(15)
        pop()
    }

    jump() {
        this.setPos(this.xPos, this.yPos - 20, this.zPos)
        this.maxHeight = this.yPos - 30

    }

    tick() {

    }
}

function playerFall(rate) {
    shownTilesWithBounds = tileHandler1.getAllShown()
    playerUpperBounds = [player1.getPos("x") + 7.5, player1.getPos("y") + 7.5, player1.getPos("z") + 7.5]
    playerLowerBounds = [player1.getPos("x") - 7.5, player1.getPos("y") - 7.5, player1.getPos("z") - 7.5]
    for (let i = 0; i < shownTilesWithBounds.length; i++) {
        if (((shownTilesWithBounds[i].bounds.lowerX < playerUpperBounds[0]) && (shownTilesWithBounds[i].bounds.upperX > playerLowerBounds[0])) && ((shownTilesWithBounds[i].bounds.lowerZ < playerUpperBounds[2]) && (shownTilesWithBounds[i].bounds.upperZ > playerLowerBounds[2]))) {
            console.log("Overlapping" + shownTilesWithBounds[i].tileNumber)
            if (playerUpperBounds[1]>= shownTilesWithBounds[i].boundsLowerY){
                player1.setPos(player1.getPos("x"), shownTilesWithBounds[i].bounds.upperY, player1.getPos("z"))
            }
            break
        } else {
            player1.setPos(player1.getPos("x"), player1.getPos("y") + rate, player1.getPos("z"))
        }
    }
}

function gameOverDetection(){
    
}