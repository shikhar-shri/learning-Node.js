import fs from "fs";
import Logger from "./logger.js";
import LogFormatter from "./log_formatter.js";
import { error } from "console";
import path from "path";

class LogWriter{
    constructor(logFilePath = 'logs/logs.txt') {
        this.logFilePath = logFilePath;
        this.checkLogDir(); //check if path exists
        this.writeStream = fs.createWriteStream(this.logFilePath,{flags: 'a'});
        //register all event handlers
        Logger.on("INFO",(message)=> this.writeLog("INFO",message));
        Logger.on("WARNING",(message)=> this.writeLog("WARNING",message));
        Logger.on("ERROR", (message) => this.writeLog("ERROR", message));
        
        this.setUpCleanup();
    }


    checkLogDir() {
        const logDir = path.dirname(this.logFilePath);

        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir)
        }

        if (!fs.existsSync(this.logFilePath)) {
            fs.writeFileSync(this.logFilePath, '');
        }
    }

    //write logs to file
    writeLog(type, message) {
        const logEntry = LogFormatter.format(type, message);
        // fs.appendFile(this.logFilePath, logEntry, (err) => {
        //     if (err)
        //         console.error("Failed to write log: ", err);
                
        // });
        this.writeStream.write(logEntry);
    }

    setUpCleanup() {

        const cleanup = () => {
            console.log("closing the log write stream..");
            this.writeStream.end(() => {
                console.log("log write stream closed");
                
            })
            
        }

        process.on('exit', cleanup); // ✅ On process exit
        process.on('SIGINT', cleanup); // ✅ Ctrl+C
        process.on('SIGTERM', cleanup); // ✅ Kill signal (Docker, PM2)
        process.on('uncaughtException', (err) => {
            console.error("Uncaught Exception:", err);
            cleanup();
            process.exit(1); // Exit after logging
        });
    }


}

export default new LogWriter();