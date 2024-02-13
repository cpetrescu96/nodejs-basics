import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const read = async () => {

    function printFileContent() {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
    
        const fileToRead = 'fileToRead.txt';
        const filePath = path.join(__dirname, 'files', fileToRead);
    
        // Check if file exists
        if (!fs.existsSync(filePath)) {
            throw new Error('FS operation failed: File does not exist');
        }
    
        // Read file content
        const content = fs.readFileSync(filePath, 'utf-8');
    
        // Print content to console
        console.log('Content of "fileToRead.txt":');
        console.log(content);
    }
    
    try {
        printFileContent();
    } catch (error) {
        console.error(error.message);
    }
};

await read();