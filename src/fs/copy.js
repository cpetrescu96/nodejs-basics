import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const copy = async () => {
    
    function copyFilesFolder() {
        // Get the directory name of the current module
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
    
        const filesDir = path.join(__dirname, 'files');
        const filesCopyDir = path.join(__dirname, 'files_copy');
    
        // Check if "files" folder exists
        if (!fs.existsSync(filesDir)) {
            throw new Error('FS operation failed: "files" folder does not exist');
        }
    
        // Check if "files_copy" folder already exists
        if (fs.existsSync(filesCopyDir)) {
            throw new Error('FS operation failed: "files_copy" folder already exists');
        }
    
        // Create "files_copy" directory
        fs.mkdirSync(filesCopyDir);
    
        // Copy files from "files" to "files_copy"
        const files = fs.readdirSync(filesDir);
        for (const file of files) {
            const sourcePath = path.join(filesDir, file);
            const destinationPath = path.join(filesCopyDir, file);
            fs.copyFileSync(sourcePath, destinationPath);
        }
    
        console.log('Files copied successfully.');
    }
    
    try {
        copyFilesFolder();
    } catch (error) {
        console.error(error.message);
    }
};

await copy();
