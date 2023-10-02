/* Name: Nicholas Hudson
Date:02/10/2023
This is the file that contains the entity class for my program.
This is used for every object displayed (except buttons)
This forms part of my project but requires other files to function
(script.js, index.html) */


class entity {
    //A class that helps with the coordinate system for entities
    constructor() {
        let xPos, yPos, zPos
    }

    getPos(type) {
        if (type == "vector") {
            let vector = createVector(this.xPos, this.yPos, this.zPos)
            return (vector)
        } if (type == "all") {
            return (this.xPos, this.yPos, this.zPos)
        } if (type == "x") {
            return (this.xPos)
        } if (type == "y") {
            return (this.yPos)
        } if (type == "z") {
            return (this.zPos)
        }

    }

    setPos(newX, newY, newZ) {
        if (newX > 50 || newX < -50) {
            console.warn("Invalid value of X: " + newX)
            if (newX > 0) {
                this.xPos = 50
            } else {
                this.xPos = -50
            }
        } else {
            this.xPos = newX
        }
        if (newY > 50 || newY < -50) {
            console.warn("Invalid value of Y: " + newY)
            if (newY > 0) {
                this.yPos = 50
            } else {
                this.yPos = -50
            }
        } else {
            this.yPos = newY
        }
        if (newZ > 50 || newZ < -50) {
            console.warn("Invalid value of Z: " + newZ)
            if (newZ > 0) {
                this.zPos = 50
            } else {
                this.zPos = -50
            }
        } else {
            this.zPos = newZ
        }
    }
}