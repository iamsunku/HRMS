const fs = require('fs');
const env = fs.readFileSync('.env', 'utf8');
const lines = env.split(/\r?\n/);
lines.forEach((line, i) => {
    if (line.startsWith('MONGODB_URI')) {
        console.log(`Line ${i + 1}: "${line}"`);
        if (line.endsWith(' ')) {
            console.log('WARNING: Trailing space detected!');
        }
        const match = line.match(/"(.*)"/);
        if (match && match[1].endsWith(' ')) {
            console.log('WARNING: Trailing space INSIDE quotes detected!');
        }
    }
});
