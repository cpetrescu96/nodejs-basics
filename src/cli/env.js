const parseEnv = () => {
    function printRSSVariables() {
        console.log('Environment variables with the prefix "RSS_":');
        Object.entries(process.env).forEach(([key, value]) => {
            if (key.startsWith('RSS_')) {
                console.log(`${key}=${value}`);
            }
        });
    }
    try {
        // Set environment variables for testing using both "npm run script.js" and "node script.js"
        process.env.SOME = 'any';
        process.env.RSS_foo = 'bar';
        process.env.RSS_bar = 'baz';
        
        printRSSVariables();
    } catch (error) {
        console.error(error.message);
    }

};

parseEnv();