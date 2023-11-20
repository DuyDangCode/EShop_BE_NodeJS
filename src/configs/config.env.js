const DEV = {
  app: { port: process.env.DEV_APP_PORT || 8080 },
  db: {
    host: process.env.DEV_DB_HOST || 'localhost',
    port: process.env.DEV_APP_PORT || 27017,
    name: process.env.DEV_DB_NAME || 'eshopDEV',
  },
};

const PRO = {
  app: { port: process.env.PRO_APP_PORT || 8080 },
  db: {
    host: process.env.PRO_DB_HOST || 'localhost',
    port: process.env.PRO_APP_PORT || 27017,
    name: process.env.PRO_DB_NAME || 'eshopPRO',
  },
};

export { DEV, PRO };
