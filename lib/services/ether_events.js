const db = require('../models')
const logger = require('../logger')
const ether = require('ethers')

async function addGame(data) {
    await db.games.create(data)
    await addOnePlayer({data})
}

async function addPledge(data) {
    await db.pledges.create(data)
    await addOnePlayer({
        data: {address: data.address, pledge_amount: data.amount},
        type: 1
    })
}
async function addBet(data) {
    await db.bets.create(data)
    await addOnePlayer({
        data: {address: data.address, pledge_amount: data.amount},
        type: 1
    })
}
async function redeem(data) {
    await db.redeems.create(data)
    let player = await db.players.findOne({where: {address: data.address}})
    if (player) {
        player.pledge_amount = 0
        await player.save()
    }
}

async function prize(data) {
    let bet = await db.bets.findOne({
        where: {
            address: data.address,
            game_number: data.game_number
        }
    })
    logger.info('prize data: ', data)

    if (bet) {
        bet.win = data.win
        bet.win_amount = data.win_amount
        bet.banker_point = data.banker_point

        await bet.save()
    }
}

async function addOnePlayer({data, type}) {
    let player = await db.players.findOne({where: {address: data.address}})
    if (player) {
        if (type === 1) {
            let r = ether.BigNumber.from(player.pledge_amount).add(data.pledge_amount)
            player.pledge_amount = r.toString()
            await player.save()
        }
    } else {
        db.players.create(data)
    }
}


module.exports = {
    addGame,
    addPledge,
    addBet,
    redeem,
    prize
}
