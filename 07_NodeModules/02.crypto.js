const crypto = require('crypto');
let salt = 'ABCD';
let password = '1234';
let hash = 'sha512';
let displayBase = 'base64';
let sha512 = crypto.createHash(hash).update(`${salt}${password}`).digest(displayBase); // only encrypt
console.log(sha512);

// Callback
crypto.pbkdf2(password, salt, 123456, 64, hash, (err, key) => console.log(`key: ${key.toString(displayBase)}`));

// Promise model
const util = require('util');
const pbkdf2Promise = util.promisify(crypto.pbkdf2);
( async () => {
  console.time('Crypt')
  let key = await pbkdf2Promise(password, salt, 123456, 64, hash);
  console.timeEnd('Crypt')
  console.log(key.toString(displayBase));
})();
