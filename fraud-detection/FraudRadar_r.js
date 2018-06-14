const fs = require('fs')

function Check (filePath) {
    //let orders = createOrder()
    //console.log(filePath)
    return checkFraud(cleanOrder(createOrder(filePath)))
  }
   
  
  function createOrder (filePath) {
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
      //console.log(order)
      }
      return orders
    }
  
  //createOrder()
  
  function cleanOrder(orders) {
    for (let order of orders) {
      // Normalize email
      let aux = order.email.split('@')
      let atIndex = aux[0].indexOf('+')
   
      aux[0] = atIndex < 0 ? aux[0].replace('.', '') : aux[0].replace('.', '').substring(0, atIndex - 1)
      order.email = aux.join('@')
  
      // Normalize street
      order.street = order.street.replace('st.', 'street')
                                 .replace('rd.', 'road')
  
      // Normalize state
      order.state = order.street.replace('il', 'illinois')
                                .replace('ca', 'california')
                                .replace('ny', 'new york')
    }
    //console.log(orders)
    return orders
  }
  
  //cleanOrder()
  
  function checkFraud (orders) {
    let fraudResults = []
    //let check1 = [dealId, email, creditCard]
    //let check2 = [dealId, state, zipCode, street, city, creditCard]
  
    for (let i = 0; i < orders.length; i++) {
      let current = orders[i]
      let isFraudulent = false
  
      for (let j = i + 1; j < orders.length; j++) {
        isFraudulent = false
  
        //function isFraud(check1){
        //  if(current.fields[i] === orders[j].fields[i]) {
        //
        //  }
        //}
  
        if (current.dealId === orders[j].dealId &&
          current.email === orders[j].email &&
          current.creditCard !== orders[j].creditCard) {
          isFraudulent = true
        }
  
        if (current.dealId === orders[j].dealId &&
          current.state === orders[j].state &&
          current.zipCode === orders[j].zipCode &&
          current.street === orders[j].street &&
          current.city === orders[j].city &&
          current.creditCard !== orders[j].creditCard) {
          isFraudulent = true
        }
  
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

  module.exports = { Check }

