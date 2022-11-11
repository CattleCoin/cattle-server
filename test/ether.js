const ether = require('ethers')

function run() {
    let a = '10000000000000000000000'
    let b = '20000000000000000000000'

    console.log((parseInt(a) + parseInt(b)).toString())
    let r = ether.BigNumber.from(a).add(b)

    console.log('r: ', r, r.toString())
}

run()
