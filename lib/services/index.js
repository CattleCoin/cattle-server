
const gameService = require('./games')

const BUSINESSTYPE = {
    GAMELIST: 1
}

async function businesses(ctx) {
    let body = ctx.request.body

    switch (body.type) {
        case BUSINESSTYPE.GAMELIST:
            return gameService.list(body.data)

        default:
            throw Error('业务参数有误')
    }
}


module.exports = {
    businesses
}
