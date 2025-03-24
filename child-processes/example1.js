import { spawn,exec } from "child_process";

try {
    // const child = spawn("dir", {shell: true}); // List directory contents

    // // Capture standard output
    // child.stdout.on("data", (data) => {
    //     console.log(`stdout: ${data}`);
    // });

    // // Capture standard error
    // child.stderr.on("data", (data) => {
    //     console.error(`stderr: ${data}`);
    // });

    // // Detect when process exits
    // child.on("close", (code) => {
    //     console.log(`Child process exited with code ${code}`);
    // });
    exec('dir', (err, op, stderr) => {
        if (err) {
          console.error(`exec error: ${err}`);
          return;
        }
      
        console.log(op);
      });

} catch (err) {
    console.log(err.message);
    
}
