module.exports = async (ctx, next) => {
    try {
        await next()
    } catch (e) {
        let errData = {
            code: e.statusCode || e.status || 500,
            err: e,
            text: e.message
        }

        ctx.body = errData
    }
}
