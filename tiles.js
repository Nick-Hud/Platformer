/* Name: Nicholas Hudson
Date:25/10/2023
This is the file that contains the tile and tile handler class for my program.
This is used for the tiles peice
This forms part of my project but requires other files to function
(script.js, index.html, entity.js) */

//Class used for all the individual tiles, storing their position, shown and draw functions
class tile extends entity {
    constructor() {
        super()
        let shown
        this.shown = false
    }
    draw() {
        if (this.shown) {
            push()
            translate(this.getPos("vector"))
            box(250, 30, 250)
            pop()
        }
    }

    getShown() {
        return (this.shown)
    }
    setShown(value) {
        this.shown = value
    }

}

//The class to handle all 9 tiles randomising, reset and dropping of the tiles
class tileHandler {
    constructor() {
        this.tiles = []
        let posArr = [-400, 0, 400]
        let height = 400
        for (let i = 0; i < 9; i++) {
            this.tiles[i] = new tile()
        }
        let count = 0
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                this.tiles[count].setPos(posArr[i], height, posArr[j])
                count++
                height -= 150
            }
        }
    }

    draw() {
        for (let i = 0; i < 9; i++) {
            if (this.tiles[i].getShown() == true) {
                this.tiles[i].draw()
            }
        }
    }

    getTile(i) {
        return (this.tiles[i])
    }

    randomise(numberToShow) {
        let randomNos = [numberToShow]
        let number
        for (let i = 0; i < numberToShow; i++) {
            do {
                number = Math.round(Math.random() * 8)
            } while (randomNos.includes(number))
            randomNos[i] = number
        }
        for (let i = 0; i < numberToShow; i++) {
            this.tiles[randomNos[i]].setShown(true)
        }
    }

    hideAll() {
        for (let i = 0; i < 9; i++) {
            this.tiles[i].setShown(false)
        }
    }

    dropTiles(rate) {
        for (let i = 0; i < 9; i++) {
            this.tiles[i].setPos(this.tiles[i].getPos("x"), this.tiles[i].getPos("y") + rate, this.tiles[i].getPos("z"))
        }
    }

    tileResetDetection() {
        for (let i = 0; i < 9; i++) {
            if (this.tiles[i].getPos("y") >= 490) {
                this.tiles[i].setShown(false)
                this.randomise(1)
                this.tiles[i].setPos(this.tiles[i].getPos("x"), -450, this.tiles[i].getPos("z"))
            }
        }
    }

    getAllShown() {
        let currentlyShown = []
        let pointer = 0
        for (let i = 0; i < 9; i++) {
            if (this.tiles[i].getShown() == true) {
                let currentlyShownX = this.tiles[i].getPos("x")
                let currentlyShownY = this.tiles[i].getPos("y")
                let currentlyShownZ = this.tiles[i].getPos("z")
                let bounds = { "upperX": currentlyShownX + 125, "upperY": currentlyShownY + 15, "upperZ": currentlyShownZ + 125, "lowerX": currentlyShownX - 125, "lowerY": currentlyShownY - 15, "lowerZ": currentlyShownZ - 125 }
                currentlyShown[pointer] = { "tileNumber": i, "bounds": bounds }
                pointer += 1
            }
        }
        return (currentlyShown)
    }
}