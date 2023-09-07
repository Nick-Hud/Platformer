class tile extends entity {
    constructor() {
        super()
        let shown
        this.shown = true
    }
    draw() {
        push()
        translate(this.getPos("vector"))
        box(25, 3, 25)
        pop()
    }

    getShown() {
        return(this.shown)
    }
    setShown(value) {
        this.shown = value
    }

}

class tileHandler {
    constructor() {
        this.tiles = []
        let posArr = [-40, 0, 40]
        for (let i = 0; i < 9; i++) {
            this.tiles[i] = new tile()
        }
        let count = 0
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                this.tiles[count].setPos(posArr[i], 40, posArr[j])
                count++
            }
        }
    }

    draw() {
        for (let i = 0; i < 9; i++) {
            if (this.tiles[i].getShown() == true){
                this.tiles[i].draw()
            }
        }
    }
    getTile(i) {
        return(this.tiles[i])
    }
}