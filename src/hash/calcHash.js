import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const calculateHash = async () => {

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const fileToRead = 'fileToCalculateHashFor.txt';
    const filePath = path.join(__dirname, 'files', fileToRead);

    const hash = crypto.createHash('sha256');
    const input = fs.createReadStream(filePath);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
        throw new Error('FS operation failed: File does not exist');
    }

    input.on('readable', () => {
        const data = input.read();
        if (data)
            hash.update(data);
        else {
            console.log(hash.digest('hex'));
        }
    });
    input.on('error', () => {
        console.log('Error reading file.');
    });
    input.on('end', () => {
        console.log('File read completed.');
    });
};

await calculateHash();