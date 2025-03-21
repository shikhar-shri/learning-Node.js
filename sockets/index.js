import { Socket } from "dgram";
import express from "express";
import http from "http";
import { Server } from "socket.io";


const app = new express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public')); 
app.get('/', (req, res) => {
    
});

io.on("connection", (socket) => {
    socket.on('user-message', msg => {
        console.log("A new user message", msg);
        
        
    })
    
})


server.listen(8000,()=>console.log('Server started at port 8000')
)