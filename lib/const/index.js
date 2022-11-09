const CONSTANTS = {}

CONSTANTS['RESPONSE'] = {}
CONSTANTS['RESPONSE']['SUCCESS'] = {
    code: 200
}

CONSTANTS['RESPONSE']['ERRORS'] = {}
CONSTANTS['RESPONSE']['ERRORS']['E400'] = {
    code: 400,
    err: '参数错误',
    text: '参数错误'
}

module.exports = CONSTANTS
