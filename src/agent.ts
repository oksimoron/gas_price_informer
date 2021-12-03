const bigNubmer = require("bignumber.js")

import { 
  TransactionEvent, 
  Finding, 
  HandleTransaction, 
  FindingSeverity, 
  FindingType,
  getJsonRpcUrl

} from 'forta-agent'

function getGveiPrice(price: string):string{
  const bigPrice = bigNubmer(price)
  const gveiPrice = bigPrice.dividedBy("100000000000000000000000").c
  if (gveiPrice[1]){
    return `${gveiPrice[0]}.${gveiPrice[1]}`
  }
  return gveiPrice[0]

}


const handleTransaction: HandleTransaction = async (txEvent: TransactionEvent) => {
  const findings: Finding[] = [];
  const price = getGveiPrice(txEvent.gasPrice)
  findings.push(
    Finding.fromObject({
      name: "GAS_TRACKER",
      description: `Gas price tracker`,
      alertId: "FORTA-2",
      severity: FindingSeverity.Info,
      type: FindingType.Info,
      metadata:{
        price:price
      }
      

    })
   )
 


  return findings;
}

export default {
  handleTransaction
}