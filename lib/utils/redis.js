const { redis } = require('../db/redis')
exports.lock = async function(key, expire_time, callback) {
    let result = await redis.set(key, 1, 'NX', 'EX', expire_time)
    if (!result) {
        return !!result
    }

    const needCallback = callback && typeof callback === 'function'
    if (!needCallback) {
        return result
    }

    const callbackResult = await callback()
    await redis.del(key)
    return callbackResult
}

exports.unlock = function(key) {
    return redis.del(key)
}
