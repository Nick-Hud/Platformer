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
            box(25, 3, 25)
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

class tileHandler {
    constructor() {
        this.tiles = []
        let posArr = [-40, 0, 40]
        let height = 40
        for (let i = 0; i < 9; i++) {
            this.tiles[i] = new tile()
        }
        let count = 0
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                this.tiles[count].setPos(posArr[i], height, posArr[j])
                count++
                height -= 15
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
            if (this.tiles[i].getPos("y") >= 49) {
                this.tiles[i].setShown(false)
                this.randomise(1)
                this.tiles[i].setPos(this.tiles[i].getPos("x"), -45, this.tiles[i].getPos("z"))
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
                let bounds = { "upperX": currentlyShownX + 12.5, "upperY": currentlyShownY + 1.5, "upperZ": currentlyShownZ + 12.5, "lowerX": currentlyShownX - 12.5, "lowerY": currentlyShownY - 1.5, "lowerZ": currentlyShownZ - 12.5 }
                currentlyShown[pointer] = { "tileNumber": i, "bounds": bounds }
                pointer += 1
            }
        }
        return (currentlyShown)
    }
}