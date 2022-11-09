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

    return {
        rows: allList.rows,
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
