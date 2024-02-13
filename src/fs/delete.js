import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const remove = async () => {

    function deleteFile() {
        // Get the directory name of the current module
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
    
        const fileToRemove = 'fileToRemove.txt';
        const filePath = path.join(__dirname, "files", fileToRemove);
    
        // Check if file exists
        if (!fs.existsSync(filePath)) {
            throw new Error('FS operation failed: File does not exist');
        }
    
        // Delete the file
        fs.unlinkSync(filePath);
    
        console.log('File deleted successfully.');
    }
    
    try {
        deleteFile();
    } catch (error) {
        console.error(error.message);
    }
};

await remove();