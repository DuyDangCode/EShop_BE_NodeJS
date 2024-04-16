import app from './src/app.js'
import chalk from 'chalk'
import { DEV } from './src/configs/config.env.js'
import { terminate } from './src/helpers/index.helper.js'
import * as dotenv from 'dotenv'
dotenv.config()

const PORT = DEV.app.port || 8080

const server = app.listen(PORT, () => {
  console.log(chalk.green(`E-Shop::: Server is running at port: ${PORT}`))
})

const exitHandler = terminate(server, { coredump: false, timeout: 500 })

process.on('uncaughtException', exitHandler(1, 'Unexpected Error'))
process.on('SIGTERM', exitHandler(0, 'SIGTERM'))
process.on('SIGINT', exitHandler(0, 'SIGINT'))
