const log4js = require('log4js')
let logger = log4js.getLogger('tortoise')
logger.level = 'TRACE'

function stringify(data) {
    if (typeof data === 'string') {
        return data
    }

    if (typeof data === 'object') {
        return JSON.stringify(data)
    }

    return ''
}


logger.details = function(req, options, res, e) {
    if (e) {
        if (e.name === 'ReferenceError' || e.name === 'TypeError' || e.name === 'Error') {
            logger.error(e)
        } else {
            logger.error(stringify(e))
        }
    }

    if (req) {
        logger.info(req.method, req.url)
    }

    if (options) {
        logger.info('[api] request options:', stringify(options))
    }

    if (res) {
        logger.info('[api] response statusCode:', res.statusCode)
        logger.info('[api] response body:', stringify(res.body))
    }
}
module.exports = logger
