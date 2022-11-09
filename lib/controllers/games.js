const services = require('../services')

async function businesses(ctx) {
    try {
        let ret = await services.businesses(ctx)
        ctx.success(ret)
    } catch (e) {
        ctx.error(e)
    }
}

module.exports = {
    businesses
}
