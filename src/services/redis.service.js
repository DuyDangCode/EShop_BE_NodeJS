import { InternalServerError, RedisError } from '../core/error.res.js'
import { getRedis } from '../dbs/init.redis.js'
import { delKey, pexpire, setnx } from './redis.command.js'
import inventoryRepo from '../models/repositories/inventory.repo.js'

const aquireLock = async (productId, product_quantity, cartId) => {
  try {
    const client = getRedis().instanceRedis
    const key = `lock${productId}`
    const RETRY = 5
    const TIMMER = 50
    const EXPIRE_TIME = 30000

    for (let i = 0; i < RETRY; i++) {
      const res = await setnx(client, key)
      if (res) {
        //handle inventory
        const invenId = await inventoryRepo.reservationInventory(
          productId,
          product_quantity,
          cartId
        )

        if (invenId) {
          return { key, invenId }
        }

        await pexpire(client, key, EXPIRE_TIME)
        return null
      } else {
        await new Promise((resolve) => {
          setTimeout(resolve, TIMMER)
        })
      }
    }
    return null
  } catch (error) {
    throw new InternalServerError('Something wrong')
  }
}

const releaseLock = async (key) => {
  try {
    const client = getRedis().instanceRedis
    return await delKey(client, key)
  } catch (error) {
    throw new InternalServerError('Something wrong')
  }
}

export { aquireLock, releaseLock }
