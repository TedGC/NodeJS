// const mysql = require('mysql2')


// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'new_schema',
//     password: 'Vn1093454899@'
// })

// module.exports = pool.promise() 


const Sequelize = require('sequelize')

const sequelize = new Sequelize('new_schema', 'root', 'Vn1093454899@',
    {
        dialect: 'mysql',
        host: 'localhost'
    }
)



module.exports = sequelize