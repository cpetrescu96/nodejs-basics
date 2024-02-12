import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { finished } from 'stream/promises';

const write = async () => {

    const writeToFile = async () => {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const filePath = path.join(__dirname, 'files', 'fileToWrite.txt');
        const output = fs.createWriteStream(filePath);

        output.write('Hello, ');
        output.write('world!');
        output.end();

        process.stdin.pipe(output);

        process.stdin.on('end', () => {
            console.log('Finished writing to file');
        });

        output.on('error', err => {
            console.error('An error occurred:', err);
        });

        await finished(output);
        // console.log('File written successfully.');
    }

    try {
        await writeToFile();
    } catch (error) {
        console.error(error.message);
    }
};

await write();