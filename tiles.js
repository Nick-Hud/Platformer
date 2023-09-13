class tile extends entity {
    constructor() {
        super()
        let shown
        this.shown = false
    }
    draw() {
        if(this.shown){
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
                height -= 10
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
            } while(randomNos.includes(number))
            randomNos[i] = number
        }
        for (let i = 0; i < numberToShow; i++) {
            this.tiles[randomNos[i]].setShown(true)
        }
    }
}