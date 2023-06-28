class player extends entity {
    draw(){
        translate(this.getPos("vector"))
        box(20)
    }

    jump(){

    }

    tick(){

    }

    xMovement(value){
        this.xPos = this.xPos + value
    }

    yMovement(value){
        this.yPos = this.yPos + value
    }
}