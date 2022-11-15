
const gameService = require('./games')
require('../models/association')

const BUSINESSTYPE = {
    GAMELIST: 1,
    BETLIST: 2
}

async function businesses(ctx) {
    let body = ctx.request.body

    switch (body.type) {
        case BUSINESSTYPE.GAMELIST:
            return gameService.list(body.data)
        case BUSINESSTYPE.BETLIST:
            return gameService.betList(body.data)

        default:
            throw Error('业务参数有误')
    }
}


module.exports = {
    businesses
}
