'use strict'

const crypto = require('crypto')

function md5(str) {
    return crypto
        .createHash('md5')
        .update(str, 'utf8')
        .digest('hex')
}


function stringify(data) {
    if (typeof data === 'string') {
        return data
    }

    if (typeof data === 'object') {
        return JSON.stringify(data)
    }

    return ''
}


module.exports = {
    md5,
    stringify
}
