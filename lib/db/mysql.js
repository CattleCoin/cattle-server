const {
    Sequelize
} = require('sequelize')

let MySql = {}
let options = {
    dialect: 'mysql',
    logging: function(sql) {
        logger.trace(sql)
    },
    pool: {
        max: 10,
        min: 0,
        idle: 10000
    },
    host: SYSCONFIG.DB_HOST,
    port: SYSCONFIG.DB_PORT,
    timezone: '+08:00',
    define: {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci'
    }
}

MySql.sq = new Sequelize(SYSCONFIG.DB_DATABASE, SYSCONFIG.DB_USER, SYSCONFIG.DB_PASS, options)

module.exports = MySql
