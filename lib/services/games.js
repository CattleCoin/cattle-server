const db = require('../models')

async function list(data) {
    let perPage = data.perPage || 10
    let page = data.page || 1

    let where = {}
    if (data.type) {
        Object.assign(where, {game_type: data.type})
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
    list
}
