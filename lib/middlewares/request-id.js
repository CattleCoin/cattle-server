const helper = require('../utils/helper')
const moment = require('moment')

module.exports = async (ctx, next) => {
    var requestId = helper.md5(helper.stringify(this.request) + moment.unix())
    logger.info('Request ID: ', requestId)
    logger.info('request data: ', ctx.request.body, ctx.request.query)

    await next()
    if (ctx.body && typeof ctx.body === 'object') {
        let tmpBody = _.clone(ctx.body)
        return ctx.body = tmpBody
    }
}
