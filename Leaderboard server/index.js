const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: '192.168.1.201',
    user: 'root',
    password: 'Nick0145',
    database: 'leaderboard'
})
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database: ' + err.stack);
        return;
    }
    console.log('Connected to database as ID: ' + connection.threadId);
});


function addToDatabase(displayName, score) {
    //console.log(displayName, score)
    connection.query('INSERT INTO leaderboard (displayName, score) VALUES (?, ?)', [displayName, score], (err, results) => {
        if (err) {
            console.log(err)
        }
        if (results) {
            //console.log(results)
        }
    });
}
//^DATABASE

const WebSocket = require('ws');
const https = require('https');
const fs = require('fs');
const { URL } = require('url');
const { get } = require('http');

// Create a HTTPS server instance with SSL certificates
const server = https.createServer({
    cert: fs.readFileSync('keys/fullchain.pem'),
    key: fs.readFileSync('keys/privkey.pem')
});

// Create a new WebSocket server instance
const wss = new WebSocket.Server({ server });

// Start the HTTPS server
server.listen(8082, function () {
    console.log('Secure WebSocket server listening on port 8082');
});

wss.on('connection', function connection(ws, req) {
    console.log('Client connected');
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
        data = JSON.parse(message)
        addToDatabase(data.displayName, data.score)
        sendLeaderboard(ws)
    });
    ws.on('close', function close() {
        console.log(`Client disconnected`);
    });
});

function sendLeaderboard(ws) {
    connection.query('SELECT * FROM leaderboard ORDER BY score DESC', (err, results) => {
        if (err) {
            console.log(err)
        }
        if (results) {
            ws.send(JSON.stringify(results))
        }
    });
}





