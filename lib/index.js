const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser')
const convert = require('koa-convert')
const cors = require('koa2-cors')
const serve = convert(require('koa-static-server'))
const xmlParser = require('koa-xml-body')
require('../config')
const md = require('./middlewares')
// require('./schedules/owner')
require('./utils/chainEvent')

global._ = require('lodash')
global.moment = require('moment')
global.CError = require('./utils/CError')
global.logger = require('./logger')

require('./middlewares/expansion')(app.context)

app.use(md.error)

if (/local|dev|test/.test(process.env.NODE_ENV)) {
    app
        .use(
            cors({
                methods: 'GET,HEAD,PUT,POST,DELETE'
            })
        )
        .use(serve({
            rootDir: 'apidoc',
            rootPath: '/tortoise/doc'
        }))
}

app
    .use(md.xResponseTime)
    .use(md.log4jsMiddleware)
    .use(async function(ctx, next) {
        ctx.request.headers['content-encoding'] = null
        await next()
    })
    .use(xmlParser())
    .use(bodyParser({
        enableTypes: ['json', 'form', 'text']
    }))
    .use(md.requestId)

require('./routes')(app)

const port = process.env.PORT || SYSCONFIG.PORT

logger.info('server start port: ', port)

module.exports = app.listen(port)
