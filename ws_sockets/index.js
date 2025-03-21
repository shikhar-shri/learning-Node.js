import express, { request } from "express";
import { WebSocketServer } from "ws";
import { v4 as uuidv4 } from "uuid";

const app = express();
const port = process.env.PORT || 4000;
app.use(express.static("public"));
// const clients = new Map(); //store the clients with IDs

const onSocketError = (err) => {
    console.log(err.message);
    
}


const server = app.listen(port, () => {
    console.log(`Server listening on ${port}`);
    
});

const wss = new WebSocketServer({ noServer: true }); //handle upgrade manually

server.on('upgrade', (request, socket, head) => {
    socket.on('error', onSocketError);

    //perform auth
    if (!request.headers['sec-websocket-key']) {
        socket.destroy(); // Reject invalid connection
        return;
    }

    wss.handleUpgrade(request, socket, head, (ws) => {
        socket.removeListener('error', onSocketError); //upgradation is done so need to handle error event now.
        wss.emit('connection', ws, request);
    })


});

wss.on('connection', (ws) => { //connection event is emmited only when the ws connection has been established
    ws.on('error', (err) => {
        console.log(err.message);
        
    });

    // const clientId = uuidv4();
    // clients.set(clientId, ws); 

    console.log(`New client connected!`);
    // ws.send("Welcome to the Web socket server!"); //send data through the ws connection

    // wss.clients.forEach((ws) => {
    //     if (ws.readyState === 1) {//connection is open and ready for communication
    //         ws.send(`${clientId} has connected!`);
            
    //     }
    // })
    //server receives a msg from a client and broadcasts it to all the clients connected to the server
    ws.on("message", (data) => {
        console.log("Server received ", data.toString());
        
        wss.clients.forEach((client) => {
            if (client.readyState == 1) {
                client.send(data.toString());
            }
        })
    });

    ws.on('close', () => {
        console.log("web socket connection closed");
        
    })
    
});

