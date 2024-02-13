import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import { fileURLToPath } from 'url';

const decompress = async () => {

    function decompressFile() {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const filePath = path.join(__dirname, 'files', 'archive.gz');
        const input = fs.createReadStream(filePath);
        const output = fs.createWriteStream(path.join(__dirname, 'files', 'fileToCompress.txt'));
        const gunzip = zlib.createGunzip();
        input.pipe(gunzip).pipe(output);
    }

    try {
        decompressFile();
    } catch (error) {
        console.error(error.message);
    } finally {
        console.log('File decompressed successfully!');
    }

};

await decompress();