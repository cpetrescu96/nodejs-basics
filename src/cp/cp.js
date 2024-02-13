import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const spawnChildProcess = async (args) => {

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const scriptPath = path.join(__dirname, 'files', 'script.js');
    const child = spawn('node', [scriptPath, ...args], { stdio: ['pipe', 'pipe', 'pipe', 'ipc'] });

    process.stdin.pipe(child.stdin);
    // child.stdout.pipe(process.stdout);

    child.stdout.on('data', (message) => {
        console.log(`Master has Received the following message from children: \n ` + message.toString());
        child.stdout.pipe(process.stdout);
    });

    child.stderr.on('data', (error) => {
        console.error(`An error occurred: ${error} \n`);
    });

    child.on('exit', (code, signal) => {
        console.log(`Child process exited with code ${code} and signal ${signal} \n`);
    });
};

// Put your arguments in function call to test this functionality
spawnChildProcess( ['--name', 'John Doe', '--anotherOne'] );
