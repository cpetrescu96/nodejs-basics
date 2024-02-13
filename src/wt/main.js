import { Worker } from 'worker_threads';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';

const performCalculations = async () => {
    
    const cpus = os.cpus().length;
    const workers = [];
    const results = [];
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const workerFilePath = path.join(__dirname, 'worker.js');

    for (let i = 0; i < cpus; i++) {
        workers[i] = new Worker(workerFilePath);
    }

    for (let i = 0; i < cpus; i++) {
        workers[i].on('message', (result) => {
            results.push({ status: 'resolved', data: result});
        });
        workers[i].on('error', () => {
            results.push({ status: 'error', data: null });
        });
        workers[i].on('exit', () => {
            if (results.length === cpus) {
                console.log(results);
            }
        });
    }

    for (let i = 0; i < cpus; i++) {
        workers[i].postMessage(i + 10);
    }
};

await performCalculations();