import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const list = async () => {

    function printFilenames() {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
    
        const filesDir = path.join(__dirname, 'files');
    
        // Check if "files" folder exists
        if (!fs.existsSync(filesDir)) {
            throw new Error('FS operation failed: "files" folder does not exist');
        }
    
        // Read all filenames in the "files" folder
        const filenames = fs.readdirSync(filesDir);
    
        // Print filenames to console
        console.log('Filenames in the "files" folder are the following ones:');
        filenames.forEach(filename => {
            console.log(filename);
        });
    }
    
    try {
        printFilenames();
    } catch (error) {
        console.error(error.message);
    }
};

await list();