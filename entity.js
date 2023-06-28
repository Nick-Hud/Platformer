class entity {
    constructor() {
        let xPos, yPos, zPos
    }

    getPos(type){
        if (type == "vector"){
            let vector = createVector(this.xPos, this.yPos, this.zPos)
        return(vector)
        } if (type == "all"){
            return(this.xPos, this.yPos, this.zPos)
        } if (type == "x"){
            return(this.xPos)
        } if (type == "y"){
            return(this.yPos)
        } if (type == "z"){
            return(this.zPos)
        }

    }

    setPos(newX, newY, newZ){
        if (newX > 49 || newX < -49) {
            console.warn("Invalid value of X: " + newX)
        } else {
            this.xPos = newX
        }
        if (newY > 49 || newY < -49) {
            console.warn("Invalid value of Y: " + newY)
        } else {
            this.yPos = newY
        }
        if (newZ > 49 || newZ < -49) {
            console.warn("Invalid value of Z: " + newZ)
        } else {
            this.zPos = newZ
        }
    }
}