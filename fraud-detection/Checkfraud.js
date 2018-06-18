function checkFraud(orders) {
    let fraudResults = []

    for (let i = 0; i < orders.length; i++) {
        let current = orders[i]
        let isFraudulent = false

        for (let j = i + 1; j < orders.length; j++) {
            let checkList = [idCheck, addressCheck]
            isFraudulent = false

            function idCheck() {
                if (current.dealId === orders[j].dealId &&
                    current.email === orders[j].email &&
                    current.creditCard !== orders[j].creditCard) {
                    isFraudulent = true
                }
            }

            function addressCheck() {
                if (current.dealId === orders[j].dealId &&
                    current.state === orders[j].state &&
                    current.zipCode === orders[j].zipCode &&
                    current.street === orders[j].street &&
                    current.city === orders[j].city &&
                    current.creditCard !== orders[j].creditCard) {
                    isFraudulent = true
                }
            }

            checkList.forEach(e => {
                e()
            })

            if (isFraudulent) {
                fraudResults.push({
                    isFraudulent: true,
                    orderId: orders[j].orderId
                })
            }
        }
    }

    return fraudResults
}


module.exports = { checkFraud }