import chalk from 'chalk';
import { BadRequestError, ConfigRequestError } from '../core/error.res.js';

class AccessService {
  static signup = async () => {
    throw new ConfigRequestError();
  };

  static signin = async (data) => {
    throw new BadRequestError();
  };
}

export default AccessService;
