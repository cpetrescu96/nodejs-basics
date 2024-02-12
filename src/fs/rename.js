import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const rename = async () => {

    function renameFile() {
        // Get the directory name of the current module
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
    
        const sourceFilename = 'wrongFilename.txt';
        const targetFilename = 'properFilename.md';
    
        const sourcePath = path.join(__dirname, "files", sourceFilename);
        const targetPath = path.join(__dirname, "files", targetFilename);

        // Check if target file already exists
        if (fs.existsSync(targetPath)) {
            throw new Error('FS operation failed: Target file already exists with the right name and extension.');
        }
    
        // Check if source file exists
        if (!fs.existsSync(sourcePath)) {
            throw new Error('FS operation failed: Source file does not exist');
        }
    
        // Rename the file
        fs.renameSync(sourcePath, targetPath);
    
        console.log('File renamed successfully.');
    }
    
    try {
        renameFile();
    } catch (error) {
        console.error(error.message);
    }
};

await rename();