const fs = require('fs')

function createOrder(filePath) {
    let orders = []
    //let fileContent = "1,1,bugs@bunny.com,123 Sesame St.,New York,NY,10011,12345689010\n2,1,bugs@bunny.com,123 Sesame St.,New York,NY,10011,12345689011\n3,2,roger@rabbit.com,1234 Not Sesame rd.,Colorado,CL,10012,12345689012"
    let fileContent = fs.readFileSync(filePath, 'utf8')
    let lines = fileContent.split('\n')

    for (let line of lines) {
        let items = line.split(',')

        let order = {
            orderId: Number(items[0]),
            dealId: Number(items[1]),
            email: items[2].toLowerCase(),
            street: items[3].toLowerCase(),
            city: items[4].toLowerCase(),
            state: items[5].toLowerCase(),
            zipCode: items[6],
            creditCard: items[7]
        }
        orders.push(order)
    }
    return orders
}

module.exports = { createOrder }