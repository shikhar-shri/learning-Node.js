import express from "express"
import fs from "fs"

const app = express();

app.get("/files/:filename", (req, res) => {
    const filePath = `./${req?.params?.filename}`;
    if (!fs.existsSync(filePath)) {
        res.status(404).send("File Not Found");
    }
    else {
        const fileSize = fs.statSync(filePath).size;
        
        res.setHeader('Content-Type', 'text/plain');
        res.setHeader('Content-Length', fileSize);
        
        const fileStream = fs.createReadStream(filePath);

        let bytesSent = 0;

        fileStream.on("data", (chunk) => {
            bytesSent += chunk.length; // ✅ Add chunk size
            const progress = ((bytesSent / fileSize) * 100).toFixed(2);
            console.log(`📤 Sent: ${bytesSent} bytes (${progress}%)`);
        });
    
        fileStream.on("end", () => {
            console.log("✅ File fully sent!");
        });

        

        fileStream.pipe(res);
    }
})


app.listen(4000, () => {
    console.log("Server listening on port 4000");
    
})