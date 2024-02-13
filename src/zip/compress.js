import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import { fileURLToPath } from 'url';

const compress = async () => {
    
    function compressFile() {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const filePath = path.join(__dirname, 'files', 'fileToCompress.txt');
        const input = fs.createReadStream(filePath);
        const output = fs.createWriteStream(path.join(__dirname, 'files', 'archive.gz'));
        const gzip = zlib.createGzip();
        input.pipe(gzip).pipe(output);
    }

    try {
        compressFile();
    } catch (error) {
        console.error(error.message);
    }

};

await compress();