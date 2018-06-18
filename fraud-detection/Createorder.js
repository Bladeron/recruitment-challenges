const fs = require('fs')

//Class to cycle and format all the orders
function createOrder(filePath) {
    let orders = []
    let fileContent = fs.readFileSync(filePath, 'utf8')
    let lines = fileContent.split('\n')

    class Order {
        constructor(items) {
            this.orderId = items[0],
            this.dealId = items[1],
            this.email = items[2],
            this.street = items[3],
            this.city = items[4],
            this.state = items[5],
            this.zipCode = items[6],
            this.creditCard = items[7]
        }

        formatting() {
            this.orderId = Number(this.orderId),
            this.dealId = Number(this.dealId),
            this.email = this.email.toLowerCase(),
            this.street = this.street.toLowerCase(),
            this.city = this.city.toLowerCase(),
            this.state = this.state.toLowerCase()
        
            return this
        }
    }

    for (let line of lines) {
        let items = line.split(',')
        let order = new Order(items).formatting()
        
        orders.push(order)
    }

    return orders
}

module.exports = { createOrder }