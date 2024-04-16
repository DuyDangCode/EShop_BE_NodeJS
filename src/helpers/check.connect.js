import chalk from 'chalk'
import mongoose from 'mongoose'
import os from 'os'
import process, { memoryUsage } from 'process'

const _SECONDS = 10000

// count connections
const countConnet = () => {
  const number = mongoose.connections.length
  console.log(chalk.yellow(`E-Shop:::Number:::Connections::: ${number}`))
  return number
}

//monitor every 5 seconds
const checkOverload = () => {
  setInterval(() => {
    const numConnections = countConnet()
    const numCores = os.cpus().length
    const memoryUsage = process.memoryUsage().rss
    //example 1 core has max 5 connections
    const maxConnections = numCores * 5
    console.log(
      chalk.yellow(
        `E-Shop:::Memory:::Usage:::  ${memoryUsage / 1024 / 1024} MB`
      )
    )
    if (maxConnections == numConnections) {
      console.log(chalk.red('E-Shop::: Connections overload !!!'))
    }
  }, _SECONDS)
}

export { countConnet, checkOverload }
