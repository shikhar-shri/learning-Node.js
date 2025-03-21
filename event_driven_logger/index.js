import Logger from "./logger.js";
import "./log_writer.js"
import express from "express"

const app = express();

app.listen(8000, () => {
    Logger.log("info", "server listening successfully on port 8000");
})
