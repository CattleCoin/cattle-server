const ethers = require('ethers')
const logger = require('../logger/index')

const starnftAbi = require('../../abi.json')
const etherService = require('../services/ether_events')

async function addChainListening() {
    logger.info('begin listen chain event.....', SYSCONFIG.CHAIN_URL)
    const provider = new ethers.providers.JsonRpcProvider(SYSCONFIG.CHAIN_URL)

    let num = await provider.getBlockNumber()
    logger.info('ngetBlockNumber: ', num)

    const daiContract = new ethers.Contract(SYSCONFIG.CONTRACT_ADDRESS, starnftAbi, provider)

    daiContract.on('Pledge', async (a, b, c, d, e, f, i) => {
        logger.info('Pledge', a, b, c, d, e, b.args[0][2])
        await etherService.addPledge({
            blockNumber: b.blockNumber,
            address: b.args[0][0],
            amount: ethers.BigNumber.from(b.args[0][1]).toString(),
            transactionHash: b.transactionHash
        })
    })
    daiContract.on('CreateGame', async (a, b, c, d, e, f, i) => {
        logger.info('CreateGame', a, b, c, d, e)
        await etherService.addGame({
            blockNumber: b.blockNumber,
            transactionHash: b.transactionHash,
            game_number: b.args[0][0],
            name: b.args[0][1],
            cover: b.args[0][2],
            game_type: b.args[0][3],
            address: b.args[0][4],
            duration: b.args[0][5],
            status: b.args[0][6]
        })
    })
    daiContract.on('Betting', async (a, b, c, d, e, f, i) => {
        logger.info('Betting', a, b, c, d, e)
        await etherService.addBet({
            blockNumber: b.blockNumber,
            transactionHash: b.transactionHash,
            address: b.args[0][0],
            choice: ethers.BigNumber.from(b.args[0][1]).toString(),
            amount: ethers.BigNumber.from(b.args[0][2]).toString(),
            game_number: ethers.BigNumber.from(b.args[0][3]).toString(),
            owner: b.args[0][4],
            prize: b.args[0][5]
        })
    })
    daiContract.on('Redeem', async (a, b, c, d, e, f, i) => {
        logger.info('Redeem', a, b, c, d, e)
        await etherService.redeem({
            blockNumber: b.blockNumber,
            transactionHash: b.transactionHash,
            address: b.args[0][0],
            amount: ethers.BigNumber.from(b.args[0][1]).toString(),
            service_fee: ethers.BigNumber.from(b.args[0][2]).toString()
        })
    })
    daiContract.on('Prize', async (a, b, c, d, e, f, i) => {
        logger.info('Prize', a, b, c, d, e, ethers.BigNumber.from(b.args[0][1]).toString())
        await etherService.prize({
            blockNumber: b.blockNumber,
            transactionHash: b.transactionHash,
            game_number: ethers.BigNumber.from(b.args[0][0]).toString(),
            address: b.args[0][1],
            win: b.args[0][2],
            win_amount: ethers.BigNumber.from(b.args[0][3]).toString(),
            choice: ethers.BigNumber.from(b.args[0][6]).toString(),
            banker_point: ethers.BigNumber.from(b.args[0][7]).toString(),
            prize: true
        })
    })
}

addChainListening()
    .then((res) => {
        logger.info('listen res: ', res)
    })
    .catch((e) => {
        logger.info('listen err: ', e)
    })
