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