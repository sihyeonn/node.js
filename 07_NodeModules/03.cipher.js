const crypto = require('crypto');

// Encrypt and Decrypt
let key = 'my-key';
let str = 'I am the best one.';
const algorithm = 'aes-256-cbc';

const cipher = crypto.createCipher(algorithm, key);
let encStr = cipher.update(str, 'utf8', 'base64');
encStr += cipher.final('base64');
console.log(encStr);

const decipher = crypto.createDecipher(algorithm, key);
let decStr = decipher.update(encStr, 'base64', 'utf8');
decStr += decipher.final('utf8');
console.log(decStr);
