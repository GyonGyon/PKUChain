const BitMonkey = artifacts.require('BitMonkey')
const fs = require('fs')
const path = require('path')

module.exports = function(deployer) {
  deployer.deploy(DragonBall, { quota: 9999999 }).then((contract) => {
    let dirpath = path.resolve(process.cwd(), '../dragonball/src/contracts')
    const fpath = path.resolve(dirpath, 'dragonballCompiled.js')
    let f
    try {
      f = fs.openSync(fpath, 'w+')
    } catch (err) {
      dirpath = path.resolve(process.cwd(), '../compiled')
      f = fs.openSync(fpath, 'w+')
    }

    let data = ''
    data += `const address = ${JSON.stringify(contract.address)}\n`
    data += `const abi = ${JSON.stringify(contract.abi)}\n\n`
    data += `export {address, abi}\n`

    fs.writeFileSync(f, data)
  })
}
