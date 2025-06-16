const mysql = require('mysql2')


const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'new-schema',
    password: 'Vn1093454899@'
})

module.exports = pool.promise() 