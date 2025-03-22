import Logger from "./logger.js";
import "./log_writer.js"
import express from "express"

// const app = express();

// app.listen(8000, () => {
//     Logger.log("info", "server listening successfully on port 8000");
// })

// for (let index = 0; index < 1000; index++) {
//     Logger.log("info", `message ${index}`);
// }
let i = 0;
const intervalId = setInterval(() => {
    Logger.log("info", `message ${i}`);
    i++;
}, 1000);

process.on('SIGINT', () => { clearInterval(intervalId) });
    
