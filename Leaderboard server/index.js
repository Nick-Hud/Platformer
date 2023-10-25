/* Name: Nicholas Hudson
Date:25/10/2023
This is the only file I have written for the server side of my project. 
This gets run using node.js and can interface with the database and the client side
Commands needed to initialise Node correctly.

npm init
npm install ws -s
npm install fs -s
npm install https -s
npm install mysql2 -s
node index.js

Also needs key files for secure WebSocket

*/


//The two functions below handle connecting to the mySQL server (currently running locally on my PC)
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


//The function to handle adding recived data to the database using SQL and values that have been passed to it
function addToDatabase(displayName, score) {
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

//The below fuctions handle the configuration and hosting of the websocket server
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


//This function is ran every time a client connects to the server
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

//This funtion is used to get the sorted leaderboard from the SQL server and return it to be sent to the client
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





