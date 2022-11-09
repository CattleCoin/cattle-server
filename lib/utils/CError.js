
function CError(msg, code) {
    const e = new Error(msg)
    e.code = code || 500
    return e
}

module.exports = CError
