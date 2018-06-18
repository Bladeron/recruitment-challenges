function checkFraud(orders) {
    let fraudResults = []
    let checkList = [idCheck, addressCheck]

    //Compares current order with the rest of the list
    for (let i = 0; i < orders.length; i++) {
        let current = orders[i]

        for (let j = i + 1; j < orders.length; j++) {

            let checks = checkList.some(check => {
                return check(current, orders[j])
            })

            if (checks) {
                fraudResults.push({
                    isFraudulent: true,
                    orderId: orders[j].orderId
                })
            }
        }
    }
    return fraudResults
}


//Functions to check fraud
function idCheck(current, order) {
    if (current.dealId === order.dealId &&
        current.email === order.email &&
        current.creditCard !== order.creditCard) {
        return true;
    }

    return false;
}

function addressCheck(current, order) {
    if (current.dealId === order.dealId &&
        current.state === order.state &&
        current.zipCode === order.zipCode &&
        current.street === order.street &&
        current.city === order.city &&
        current.creditCard !== order.creditCard) {
        return true;
    }

    return false;
}

module.exports = { checkFraud }