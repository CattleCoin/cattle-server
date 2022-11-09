const Redis = require('ioredis')

const options = {
    host: SYSCONFIG.REDIS_HOST,
    port: SYSCONFIG.REDIS_PORT,
    username: 'default', // needs Redis >= 6
    password: SYSCONFIG.REDIS_PASS,
    db: 1
}

module.exports = {
    redis: new Redis(options)
}
