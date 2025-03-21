const sendButton = document.getElementById("sendBtn");
const connectButton = document.getElementById("connectBtn");
const closeButton = document.getElementById("closeBtn");
const statusValue = document.getElementById("status");
const chat = document.getElementById("chat");
const msgInput = document.getElementById("messageInput");

let ws;

const sendConnectionRequest = () => {
    
    closeConnection();

    ws = new WebSocket("ws://localhost:8000");

    //when the connection is established
    ws.onopen = (e) => {
        statusValue.textContent = "Connected to WS Server";
    }

    //when client receives a msg
    ws.onmessage = (e) => {
        const msg = document.createElement("p");
        msg.innerText = e.data;
        chat.appendChild(msg);
    }

    //when the ws connnection is closed
    ws.onclose = () => {
        console.log("web socket connection closed");
        
    }
}

const sendMessage = () => {
    const msgValue = msgInput.value;
    if (ws && ws.readyState == WebSocket.OPEN) {
        ws.send(msgValue);
    } else {
        alert("Connect with WS Server first");
    }
}

const closeConnection = () => {
    if (ws)
        ws.close();
}

//client sends upgrade request to ther server
connectButton.addEventListener("click", sendConnectionRequest);

sendButton.addEventListener("click", sendMessage);

closeButton.addEventListener("click", closeConnection);

// ws.addEventListener("message", (event) => {
//     console.log(`Received message on client: ${event.data}`);
    
// })

// ws.onmessage = (message) => {
//     console.log(`Received message on client: ${message.data}`);
// }