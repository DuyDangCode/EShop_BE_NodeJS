import mongoose from 'mongoose'
import chalk from 'chalk'
import { countConnet } from '../helpers/check.connect.js'
import { DEV, PRO } from '../configs/config.env.js'

const CONNECT_STRING =
  PRO.db.url || `mongodb://${DEV.db.host}:${DEV.db.port}/${DEV.db.name}`

export const connectMongoDb = () => {
  mongoose
    .connect(CONNECT_STRING, { maxPoolSize: 50 })
    .then((_) => {
      console.log(chalk.green('E-Shop::: Connect mongodb success'))
      countConnet()
    })
    .catch((err) => console.log(chalk.red(`E-Shop:::Err::: ${err}`)))
}
