import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const read = async () => {
    function printFileContent() {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const filePath = path.join(__dirname, 'files', 'fileToRead.txt');
        const input = fs.createReadStream(filePath);
    
        input.on('data', chunk => {
            process.stdout.write(chunk);
        });
    
        input.on('error', err => {
            console.error('An error occurred:', err);
        });
    }
    
    try {
        printFileContent();
    } catch (error) {
        console.error(error.message);
    }
};

await read();