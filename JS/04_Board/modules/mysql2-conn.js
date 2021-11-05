// mysql2 promise version
const mysql = require('mysql2/promise');
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'wkdtlgus',
  port: 3306,
  database: 'node',
  connectionLimit: 10
});
const sqlErr = (err) => { console.error(err); };

module.exports = { pool, sqlErr };
