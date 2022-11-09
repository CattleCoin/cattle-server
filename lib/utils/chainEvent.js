const ethers = require('ethers')
const logger = require('../logger/index')

const starnftAbi = require('../../abi.json')

async function addChainListening() {
    logger.info('begin listen chain event.....', SYSCONFIG.CHAIN_URL)
    const provider = new ethers.providers.JsonRpcProvider(SYSCONFIG.CHAIN_URL)

    let num = await provider.getBlockNumber()
    logger.info('ngetBlockNumber: ', num)

    const daiContract = new ethers.Contract(SYSCONFIG.CONTRACT_ADDRESS, starnftAbi, provider)

    daiContract.on('Transfer', async (a, b, c, d, e, f, i) => {
        logger.info(a, b, c, d)
    })
}

addChainListening()
    .then((res) => {
        logger.info('listen res: ', res)
    })
    .catch((e) => {
        logger.info('listen err: ', e)
    })
