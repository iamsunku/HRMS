const http = require('http');

http.get('http://localhost:3001/api/health', (res) => {
    let data = '';
    console.log('Status Code:', res.statusCode);
    console.log('Headers:', res.headers);

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        console.log('Body:', data);
    });
}).on('error', (err) => {
    console.error('Error:', err.message);
});
