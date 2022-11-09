'use strict'
const Router = require('koa-router')
const ctrls = require('../controllers')

const moment = require('moment')
const { exec } = require('child_process')

module.exports = function(app) {
    var router = new Router({
        prefix: '/tortoise/v1'
    })
    router.get('/', async (ctx) => {
        let res = await new Promise((resolve, reject) => {

            exec('git log --oneline -1', (err, stdout, stderr) => {
                if (err) {
                    reject(err)
                }

                resolve(stdout)
            })

        })
        ctx.body = {
            content: 'Hello welcome to system ',
            time_stamp: moment().unix(),
            git_log: res
        }
    })

    router.post('/games', ctrls.games.businesses)
    app.use(router.middleware())
}
