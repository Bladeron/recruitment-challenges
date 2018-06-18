function cleanOrder(orders) {
    //Dictionaries to normalize
    const STATES = {
        il: "illinois",
        ca: "california",
        ny: "new york"
    };

    const ROADS = {
        "st.": "street",
        "rd.": "road",
    };

    for (let order of orders) {
        let normalizers = [longName("street", ROADS), longName("state", STATES), normalizeEmail()]

        //Funtion that gets field and dictionary to replace text in each field
        function longName(field, dictionary) {
            for (i = 0; i < Object.keys(dictionary).length; i++) {
                order[field] = order[field].replace(Object.keys(dictionary)[i], Object.values(dictionary)[i])
            }
        }

        // Normalize email
        function normalizeEmail() {
            let aux = order.email.split('@')
            order.mail = aux[0].replace(/[+.]/g, '').substring(0, (order.email.indexOf("+") - 1))
            order.email = aux.join('@')
        }

        //Cycles all normalizers
        normalizers.forEach(e => {
            e
        })

    }
    return orders
}

module.exports = { cleanOrder }