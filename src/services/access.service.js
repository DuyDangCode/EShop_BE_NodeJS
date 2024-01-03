import chalk from 'chalk';
import { BadRequestError, ConfigRequestError } from '../core/error.res.js';
import userModel from '../models/user.model.js';
import bcrypt from 'bcrypt';
import KeyService from './key.service.js';
import crypto from 'crypto';
import { createTokenPair } from '../auth/authUtils.js';
import { USER_ROLES } from '../constrant/user.constrant.js';

class AccessService {
  static signup = async ({ username, email, password }) => {
    if (!username || !email || !password)
      throw new BadRequestError(400, 'Not find username, email or password');

    //check user exist
    const holderUserWithEmail = await userModel
      .findOne({ email: email })
      .lean();
    const holderUserWithUsername = await userModel
      .findOne({ username: username })
      .lean();
    if (holderUserWithEmail || holderUserWithUsername) {
      throw new BadRequestError(400, 'User already exist');
    }

    // hash password
    const passwordString =
      typeof password === 'string' ? password : password.toString();
    const passwordHash = await bcrypt.hash(passwordString, 5);

    //create new user
    const newUser = await userModel.create({
      username: username,
      email: email,
      password: passwordHash,
      roles: [USER_ROLES.admin],
    });

    if (!newUser) throw new BadRequestError(500, 'Create user fail.');

    //return tokens when create sucessfull
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
      modulusLength: 2048,
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem',
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
      },
    });

    const publicKeyString = await KeyService.createKeyToken({
      userId: newUser._id,
      publicKey: publicKey,
    });

    if (!publicKeyString) {
      throw new BadRequestError(500);
    }

    const payload = { userId: newUser._id };
    const tokens = createTokenPair(payload, privateKey);

    if (!tokens) {
      throw new BadRequestError(500);
    }

    return {
      userId: newUser._id,
      roles: newUser.roles,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
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
