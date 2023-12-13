/* Name: Nicholas Hudson
Date:25/10/2023
This is the leaderboard.js file that containe the interfacing with the server and the leaderboard displaying.
This ensures that the leaderboard is submitted, recived and displayed correctly.
(script.js, index.html) */

//This function connects and iterfaces with the Leaderboard server
function leaderboardSubmitAndGet() {
    if (!leaderboardGot) {
        let URL = 'wss://wss.njhudson.co.uk:8082'
        let ws = new WebSocket(URL);
        ws.onopen = function () {
            console.log('Connected to WebSocket server');
            ws.send(JSON.stringify({ displayName: displayName, score: score }));
        };
        ws.onmessage = function (event) {
            leaderboardData = (JSON.parse(event.data))
            console.log(leaderboardData)
            leaderboardRecived = true
            ws.close()
        };

        ws.onerror = function (event) {
            console.error('WebSocket error: ' + event);
            gameState = "mainMenu"
        };

        ws.onclose = function () {
            console.log('WebSocket closed');
        };
        leaderboardGot = true
    }
}

//This function displays the leaderboard to the user once the leaderboard has been recived
function leaderboardDisplay() {
    if (leaderboardRecived == false) {
        push()
        textSize(75)
        text("Leaderboard LOADING", 0, -350)
        pop()
        leaderboardData = leaderboardSubmitAndGet()
    } else {
        let place, resultID
        push()
        textSize(75)
        text("Leaderboard", 0, -350)
        pop()
        inp.hide()
        mainMenuButton.draw()
        for (let i = 0; i < leaderboardData.length; i++) {
            if (leaderboardData[i].displayName == displayName && score == leaderboardData[i].score) {
                place = i + 1
                resultID = leaderboardData[i].resultID
            }
        }
        push()
        textSize(25)
        text("Your place = " + place, 300, -275)
        text("Your score = " + score, 0, -275)
        text("Result ID = " + resultID, -300, -275)
        pop()
        push()
        textSize(25)
        fill(color("grey"))
        tablePos = [-300, -225]
        for (let i = 0; i < 10; i++) {
            text((i + 1), tablePos[0], tablePos[1])
            text(leaderboardData[i].displayName, tablePos[0] + 300, tablePos[1])
            text(leaderboardData[i].score, tablePos[0] + 600, tablePos[1])
            tablePos[1] += 40
        }
        pop()             
    }

}

//This function takes the input from the input form and puts the value into the displayName variable
function myInputEvent() {
    displayName = this.value()
}
