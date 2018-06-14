function cleanOrder(orders) {
    var states = {
        il: "illinois",
        ca: "california",
        ny: "new york"
    };

    var roads = {
        "st.": "street",
        "rd.": "road",
    };

    for (let order of orders) {

        function longName(field, states) {
            for (i = 0; i < Object.keys(states).length; i++) {
                order[field] = order[field].replace(Object.keys(states)[i], Object.values(states)[i])
            }
        }

        // Normalize email
        let aux = order.email.split('@')
        let atIndex = aux[0].indexOf('+')

        aux[0] = atIndex < 0 ? aux[0].replace('.', '') : aux[0].replace('.', '').substring(0, atIndex - 1)
        order.email = aux.join('@')

        //Normalize streets and states
        longName("street", roads)
        longName("state", states)

    }
    return orders
}

module.exports = { cleanOrder }