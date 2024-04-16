import redis from 'redis'
import { RedisError } from '../core/error.res.js'

// const client = redis.createClient()

const pexpire = (client, key, time) => {
  return client.PEXPIRE(key, time)
}

const setnx = (client, key, value = '') => {
  return client.SETNX(key, value)
}

const delKey = (client, key) => {
  return client.DEL(key)
}

export { pexpire, setnx, delKey }
