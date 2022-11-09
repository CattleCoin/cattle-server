const moment = require('moment')
const schedule = require('node-schedule')

schedule.scheduleJob('5 */15 * * * *', async function() {
    let begin = moment().unix()
    logger.info('============开始 检查token owner======================')
    let end = moment().unix()
    logger.info('============ 检查token owner结束======================', end - begin)
    logger.info('============ 检查token owner结束======================', end - begin)
})
// chainService.getTokenInf()
// chainService.autoSendClientTx()
