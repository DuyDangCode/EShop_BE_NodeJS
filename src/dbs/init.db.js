import mongoose from "mongoose";
import chalk from "chalk";
const CONNECT_STRING = 'mongodb://localhost:27017/eshopDEV';

const connectMongoDb = () => {
  mongoose.connect(CONNECT_STRING).then(_ => console.log('E-Shop:: Connect mongodb success'));
}


const actions = {
  mongodb: connectMongoDb(),
}

class Database {
  constructor() {
    this.connect();
  }

  connect(type = 'mongodb') {
    actions[type];
  }

  static getInstance() {
    if (Database.instance == null) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}



export default Database.getInstance();
