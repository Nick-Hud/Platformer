class tile extends entity {

    draw() {
        push()
        translate(this.getPos("vector"))
        box(20, 3, 20)
        pop()
    }

}