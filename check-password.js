const bcrypt = require('bcryptjs');

const hash = '$2b$10$PnEGnNhcF5dDe0RXd1C0vOmudGqJ6wSlp/DNtjUmtO9pURS6.hasO';
const password = 'password123';

bcrypt.compare(password, hash).then(res => {
    console.log('Password match:', res);
});
