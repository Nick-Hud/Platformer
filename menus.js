function mainMenu() {
    push()
    textSize(100)
    text("PLATFORMER", 0, -300)
    pop()
    //Title
    gameMode1Button.draw()
    gameMode2Button.draw()
    tutorialButton.draw()


}


class button {
    constructor() {
        let buttonX, buttonY, buttonText
    }

    setVal(buttonXInitial, buttonYInitial, buttonTextInitial) {
        this.buttonX = buttonXInitial
        this.buttonY = buttonYInitial
        this.buttonText = buttonTextInitial

        //mend this
    }

    draw() {
        push()
        textSize(25)
        translate(this.buttonX, this.buttonY, -1)
        fill(255, 102, 94);
        box(300, 100, 0)
        fill(color("black"))
        text(this.buttonText, 0, 0)
        pop()
    }

    // add collision detection
}