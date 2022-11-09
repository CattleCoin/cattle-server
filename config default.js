const logger = require('./lib/logger')

const commonConfig = {
    PORT: 12000
}

const envConfig = {
    local: {
        DB_URL: 'mysql://root:root@127.0.0.1:3306/tortoise',
        DB_DATABASE: 'tortoise',
        DB_USER: 'root',
        DB_PASS: 'root',
        DB_HOST: '127.0.0.1',
        DB_PORT: 3306,
        REDIS_HOST: '127.0.0.1',
        REDIS_PORT: 6379,
        REDIS_PASS: '',
        CHAIN_URL: 'http://192.168.120.11:1111',
        CONTRACT_ADDRESS: 'XXX',
        OWNER_ADDRESS: 'XXXX',
        SIYAO: 'XXXXX'
    },
    test: {

    },
    production: {

    }
}

global.SYSCONFIG = {...envConfig[process.env.NODE_ENV], ...commonConfig}
logger.info('SYSCONFIG = ', SYSCONFIG)
