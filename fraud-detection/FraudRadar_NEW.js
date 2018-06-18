var createorder = require('./Createorder.js')
var cleanorder = require('./Cleanorder.js')
var checkfraud = require('./Checkfraud.js')

// Controlling function that makes all the calls
function Check(filePath) {
    let orders = createorder.createOrder(filePath)
    let cleanedorders = cleanorder.cleanOrder(orders)

    return checkfraud.checkFraud(cleanedorders)
}

module.exports = { Check }