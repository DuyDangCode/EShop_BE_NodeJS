import chalk from 'chalk';
import { BadRequestError, ConfigRequestError } from '../core/error.res.js';
import userModel from '../models/user.model.js';
import bcrypt from 'bcrypt';
import KeyService from './key.service.js';

const ROLES = {
  user: '001',
  admin: '002',
  write: '003',
};
class AccessService {
  static signup = async ({ username, email, password }) => {
    //check user exist
    const holderUser = userModel.findOne({ username: username }).lean();
    if (holderUser) {
      throw new BadRequestError(400, 'User already exist');
    }

    //create new user
    const passwordHash = bcrypt.hash(password, 10);
    const newUser = userModel.create({
      username: username,
      email: email,
      password: passwordHash,
      roles: [ROLES.admin],
    });

    //return tokens when create sucessfull
    if (newUser) {
      const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 4096,
        publicKeyEncoding: {
          type: 'spki',
          format: 'pem',
        },
        privateKeyEncoding: {
          type: 'pkcs8',
          format: 'pem',
        },
      });

      const publicKeyString = await KeyService.createKeyToken(
        newUser._id,
        publicKey
      );

      if (!publicKeyString) {
        throw new BadRequestError(500);
      }

      const publishKeyObject = crypto.createPublicKey(publicKeyString);
      const payload = { userId: newUser._id, email };
    }
  };

  static signin = async ({ username, password }) => {
    const user = userModel.find({ username: username }).lean();

    //check user exist
    if (user) {
      throw new BadRequestError(400);
    }

    const isLogin = bcrypt.compareSync(password, user.password);

    //check password
    if (!isLogin) {
      throw new BadRequestError(400);
    }
  };
}

export default AccessService;
