'use strict'

const models = require('./index')

models.bets.belongsTo(models.games, {foreignKey: 'game_number', targetKey: 'game_number', constraints: false, as: 'game'})

