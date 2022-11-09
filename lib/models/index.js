'use strict'
const {
    DataTypes
} = require('sequelize')
const mysql = require('../db/mysql')

let DB_URL = {}
const sequelize = mysql.sq
DB_URL.sequelize = mysql.sq

// DB_URL.nft_orders = require('./nft_orders')(sequelize, DataTypes)
DB_URL.games = require('./games')(sequelize, DataTypes)
DB_URL.bet_records = require('./bet_records')(sequelize, DataTypes)

// toupiao.sequelize.sync({force: true})
DB_URL.sequelize.sync()

module.exports = DB_URL
