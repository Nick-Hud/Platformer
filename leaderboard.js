function leaderboardSubmitAndGet(displayNameSubmit, scoreSubmit) {
    let leaderboardData
    let URL = 'wss://wss.njhudson.co.uk:8082'
    let ws = new WebSocket(URL);
    ws.onopen = function () {
        console.log('Connected to WebSocket server');
        ws.send(JSON.stringify({displayName: displayNameSubmit, score: scoreSubmit}));
    };
    ws.onmessage = function (event) {
        console.log(JSON.parse(event.data))
        leaderboardData = JSON.parse(event.data)
        ws.close()
    };

    ws.onerror = function (event) {
        console.error('WebSocket error: ' + event);
        gameState = "mainMenu"
    };

    ws.onclose = function () {
        console.log('WebSocket closed');
    };
    gameState = "mainMenu"
    return(leaderboardData)
}

function leaderboardDisplay() {
    
}