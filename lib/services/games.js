const db = require('../models')
const GAME_STATUS = ['active', 'resolving', 'over']
const WINSTATUS = ['LOSE', 'WIN']

async function betList(data) {
    let perPage = data.perPage || 10
    let page = data.page || 1

    let where = {}
    if (data.address) {
        Object.assign(where, {address: data.address})
    }

    let allList = await db.bets.findAndCountAll({
        where,
        distinct: true,
        limit: perPage,
        offset: perPage * (page - 1),
        order: [['id', 'DESC']],
        include: {
            model: db.games,
            as: 'game',
            attributes: ['name', 'duration', 'status', 'created_time']
        }
    })

    let rows = allList.rows.map((el) => {
        let remainTime = el.game.created_time + el.game.duration - moment().unix()

        el = el.toJSON()
        el.remainTime = remainTime > 0 ? remainTime : 0
        el.created_time = moment.unix(el.created_time).format('YYYY-MM-DD HH:mm:ss')

        return {
            remainTime: Math.ceil((remainTime > 0 ? remainTime : 0) / 60),
            date: el.created_time,
            name: el.game.name,
            game_number: el.game_number,
            status: GAME_STATUS[el.game.status],
            win: WINSTATUS[el.win],
            bet_amount: (el.amount / 1e18).toFixed(5),
            win_amount: (el.win_amount / 1e18).toFixed(5),
            choice: el.choice,
            banker_point: el.banker_point
        }
    })

    return {
        rows,
        pageInfo: {
            total_count: allList.count,
            page,
            perPage
        }
    }
}

async function list(data) {
    let perPage = data.perPage || 10
    let page = data.page || 1

    let where = {
        status: [0, 1]
    }

    if (data.game_type) {
        Object.assign(where, {game_type: data.game_type})
    }

    let allList = await db.games.findAndCountAll({
        where,
        distinct: true,
        limit: perPage,
        offset: perPage * (page - 1),
        order: [['id', 'DESC']]
    })

    let rows = allList.rows.map((el) => {
        let remainTime = el.created_time + el.duration - moment().unix()

        el = el.toJSON()
        el.remainTime = remainTime > 0 ? remainTime : 0

        return el
    })

    return {
        rows,
        pageInfo: {
            total_count: allList.count,
            page,
            perPage
        }
    }

}

module.exports = {
    list,
    betList
}
