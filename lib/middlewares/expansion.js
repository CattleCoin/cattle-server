const CONSTANTS = require('../const')

module.exports = (ctx) => {
    ctx.success = function(data) {
        let success = _.clone(CONSTANTS.RESPONSE.SUCCESS)
        if (data.pageInfo) {
            success = {...success, ...data.pageInfo, data: data.rows}

        } else {
            success.data = data
        }
        return (this.body = success)
    }
    ctx.error = function(data) {
        if (typeof data === 'object') {
            return (this.body = {
                code: data.code || data.status || 500,
                text: data.message || data.text,
                err: data.message || data.text
            })
        }

        data = Object.assign({}, {
            code: 500,
            text: data,
            err: data
        })
        return (this.body = data)
    }

    ctx.throwError = function(data) {
        let err = new Error(data.text)
        err.code = data.code
        throw err
    }
}
