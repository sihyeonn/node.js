const c = console;

c.log(`dirname : ${__dirname}`);
c.log(`filename : ${__filename}`);
c.time('Time')
for (let i = 0; i < 1000000000; ++i) ;
c.timeEnd('Time')

const obj = { name: 'ABC', info: { type: 'O', gender: 'F' } };
c.log(obj);
c.dir(obj);

setInterval(() => {}, 1000);
setImmediate(() => {});
setTimeout(() => {}, 10);

const os = require('os');
c.log(os.arch());
c.log(os.platform());
c.log(os.type());
c.log(os.uptime());
c.log(os.hostname());
c.log(os.release());

// OS-Path
c.log(os.homedir());
c.log(os.tmpdir());

// CPU
c.log(os.cpus());
c.log(os.cpus().length);

// Memory
c.log(os.freemem());
c.log(os.totalmem());

// Path
const path = require('path');
let file = __filename;
c.log(path.parse(file)); // string to object : _.parse
c.log(path.normalize(`${__dirname}/../../../.`));
let dir = path.join(__dirname, '../../../');
c.log(dir);

c.clear();

// URL
const url = require('url');
const query = require('querystring');
let myURL = new URL('https://nodejs.org/api/url.html?x=10&y=20#urlHash');
c.log(myURL);
c.log(url.format(myURL)); // object to string : _.format

myURL.searchParams.append('z', 30);
myURL.searchParams.append('name', 'some_name');
c.log(myURL.searchParams);
c.log(url.format(myURL));
