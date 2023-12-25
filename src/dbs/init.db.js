import mongoose from 'mongoose';
import chalk from 'chalk';
import { countConnet } from '../helpers/check.connect.js';
import { DEV } from '../configs/config.env.js';

const CONNECT_STRING = `mongodb://${DEV.db.host}:${DEV.db.port}/${DEV.db.name}`;

const connectMongoDb = () => {
  mongoose
    .connect(CONNECT_STRING, { maxPoolSize: 50 })
    .then((_) => {
      console.log(chalk.green('E-Shop::: Connect mongodb success'));
      countConnet();
    })
    .catch((err) => console.log(chalk.red(`E-Shop:::Err::: ${err}`)));
};

const actions = {
  mongodb: connectMongoDb,
};

class Database {
  constructor(type = 'mongodb') {
    this.connect(type);
  }

  connect(type) {
    actions[type]();
  }

  static getInstance() {
    if (Database.instance == null) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

export default Database;
