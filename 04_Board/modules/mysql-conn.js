const mysql = require('mysql');
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'wkdtlgus',
  port: 3306,
  database: 'node',
  connectionLimit: 10
});
/*
// needs to release useless connections
const connect = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  port: 3306,
  database: 'node'
});
*/

/*
ES6
module.exports = { mysql, pool };
when variable and value have a same name!
*/
module.exports = { mysql: mysql, pool: pool }; 
