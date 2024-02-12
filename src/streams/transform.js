import { Transform } from 'stream';
import readline from 'readline';

const transform = async () => {
    
    const reverseTransformFile = async () => {

        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        const reverseTransform = new Transform({
            transform(chunk, encoding, callback) {
                process.stdout.write('Reversed text using Transform Stream: ');
                this.push(chunk.toString().split('').reverse().join(''));
                callback();
            }
        });
        
        rl.question('============= Please enter some text - ', (answer) => {
            const string = String(answer).trim();
            reverseTransform.write(answer);
            rl.close();
        });

        reverseTransform.pipe(process.stdout);
    };
    
    try {
        await reverseTransformFile();
    } catch (error) {
        console.error(error.message);
    }
};

await transform();