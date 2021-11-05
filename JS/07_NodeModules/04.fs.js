const fs = require('fs');

let str = 'I am the best one.';
let file = './readme.txt'

// fs.writeFile('./readme.txt', str, err => console.log( err ? err : 'Saved.' ) );
fs.writeFileSync(file, str);
let result = fs.readFileSync(file, 'utf8');
console.log(result);
