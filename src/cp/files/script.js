const args = process.argv.slice(2);

console.log(`Total number of arguments is ${args.length} \n`);
console.log(`Arguments: ${JSON.stringify(args)} \n`);

const echoInput = (chunk) => {
    const chunkStringified = chunk.toString();
    if (chunkStringified.includes('CLOSE')) process.exit(0);
    process.stdout.write(`this Child has Received from master process words of wisdom: \n ` + `=> ${chunk.toString()}`)
};

process.stdin.on('data', echoInput);
