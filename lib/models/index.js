'use strict'
const { DataTypes } = require('sequelize')
const mysql = require('../db/mysql')

let DB = {}
const sequelize = mysql.sq
DB.sequelize = mysql.sq

DB.games = require('./game_events')(sequelize, DataTypes)
DB.bets = require('./bet_events')(sequelize, DataTypes)
DB.pledges = require('./pledge_events')(sequelize, DataTypes)
// DB.swaps = require('./swap_events')(sequelize, DataTypes)
DB.redeems = require('./redeem_events')(sequelize, DataTypes)
DB.players = require('./players')(sequelize, DataTypes)

// DB.sequelize.sync({force: true})
DB.sequelize.sync()

module.exports = DB
