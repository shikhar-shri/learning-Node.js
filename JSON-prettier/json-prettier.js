import readline from "readline";

// process.stdin.setEncoding("utf8");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

let input = "";

rl.on("line", (line) => {
    input = line;
    rl.close();
})

rl.on("close", () => {
    
    try {
        const jsonObj = JSON.parse(input.trim());
        const prettyJson = JSON.stringify(jsonObj,null,3);
        console.log(prettyJson);
        
    } catch (error) {
        console.error(error.message);
        
    }
})

