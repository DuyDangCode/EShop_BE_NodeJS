import redis from 'redis'
import { RedisError } from '../core/error.res.js'

// const client = redis.createClient()

const pexpire = async (client, key, time) => {
  return await client.PEXPIRE(key, time)
}

const setnx = async (client, key, value = '') => {
  return await client.SETNX(key, value)
}

const delKey = async (client, key) => {
  return await client.DEL(key)
}

export { pexpire, setnx, delKey }
