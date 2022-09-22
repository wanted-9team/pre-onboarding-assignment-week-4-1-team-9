import * as brokers from '../data/brokers.json'

const toBrokerName = number => {
  return brokers[number]
}

export default toBrokerName
