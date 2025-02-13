import { connectMongoDb } from './init.mongodb.js'
import { initRedis } from './init.redis.js'

const actions = {
  mongodb: connectMongoDb,
  redis: initRedis,
}

class Database {
  constructor() {}

  connect(type) {
    actions[type]()
  }

  static getInstance() {
    if (Database.instance == null) {
      Database.instance = new Database()
    }
    return Database.instance
  }
}

export default Database
