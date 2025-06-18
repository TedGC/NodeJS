const Sequelize = require('sequelize')

const sequelize = require('../util/database.js')




const User = Sequelize.define(
    'user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    title:
        { type: Sequelize.STRING, },
    price: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    imageUrl: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    password: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}
)

module.exports = User