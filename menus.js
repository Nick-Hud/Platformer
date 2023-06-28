function mainMenu() {
    push()
    textSize(100)
    text("PLATFORMER", 0, -300)
    pop()
    //Title
    buttons(-400, 200, "Game mode 1")
    buttons(0, 200, "Game mode 2")
    buttons(400, 200, "Tutorial")
    //Buttons



    function buttons(buttonX, buttonY, buttonText) {
        push()
        textSize(25)
        translate(buttonX, buttonY, -1)
        fill(255, 102, 94);
        box(300, 100, 0)
        fill(color("black"))
        text(buttonText, 0, 0)
        pop()
    }
}