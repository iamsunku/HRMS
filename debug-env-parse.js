require('dotenv').config();
const uri = process.env.MONGODB_URI;
if (!uri) {
    console.log('URI NOT FOUND');
} else {
    // Mask password and print
    const masked = uri.replace(/^mongodb\+srv:\/\/([^:]+):([^@]+)@(.*)$/, (match, user, pass, host) => {
        return `mongodb+srv://${user}:[REDACTED]@[HOST_PARSED_AS:${host}]`;
    });
    console.log('Parsed URI:', masked);
    console.log('Raw URI Length:', uri.length);
}
