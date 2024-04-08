import redis from 'redis'
import redisConstrant from '../constrant/redis.constrant.js'
import { RedisError } from '../core/error.res.js'

let timeout
const client = {}

const handleTimeout = () => {
  timeout = setTimeout(() => {
    throw new RedisError()
  }, redisConstrant.TIMEOUT)
}

const handleEventConnect = ({ instanceRedis }) => {
  instanceRedis.on(redisConstrant.status.CONNECT, () => {
    console.log('redis connected')
    clearTimeout(timeout)
  })

  instanceRedis.on(redisConstrant.status.RECONNECT, () => {
    console.log('Redis reconnect')
    clearTimeout(timeout)
  })

  instanceRedis.on(redisConstrant.status.ERROR, () => {
    console.log('Redis error')
    handleTimeout()
  })

  instanceRedis.on(redisConstrant.status.END, () => {
    console.log('Redis end')
    handleTimeout()
  })
}

const initRedis = async () => {
  // client.instanceRedis = redis.createClient({
  //   username: redisConstrant.USERNAME,
  //   password: redisConstrant.PASSWORD,
  //   socket: {
  //     host: redisConstrant.HOST,
  //     port: redisConstrant.PORT
  //   }
  // })
  client.instanceRedis = redis.createClient()
  client.instanceRedis.connect()
  handleEventConnect(client)
}

const getRedis = async () => client

const closeRedis = async () => {
  client.forEach(async (item) => {
    await item.quit()
    handleEventConnect(item)
  })
}

export { initRedis, getRedis, closeRedis }
