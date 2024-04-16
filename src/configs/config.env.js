import * as dotenv from 'dotenv'
dotenv.config()
const DEV = {
  app: { port: process.env.DEV_APP_PORT || 8080 },
  db: {
    host: process.env.DEV_DB_HOST || 'localhost',
    port: process.env.DEV_DB_PORT || 27017,
    name: process.env.DEV_DB_NAME || 'eshopDEV'
  }
}

const PRO = {
  app: { port: process.env.PRO_APP_PORT || 8080 },
  db: {
    host: process.env.PRO_DB_HOST || 'localhost',
    port: process.env.PRO_DB_PORT || 27017,
    name: process.env.PRO_DB_NAME || 'eshopPRO',
    url: process.env.PRO_MONGODB_URL || 'mongodb://localhost:27017/eshopPRO'
  }
}

export { DEV, PRO }
