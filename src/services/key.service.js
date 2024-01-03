import { BadRequestError } from '../core/error.res.js';
import keyTokenModel from '../models/keyToken.model.js';

class KeyService {
  static async createKeyToken({ userId, publicKey }) {
    try {
      const publicKeyString =
        typeof publicKey !== 'string' ? publicKey.toString() : publicKey;
      const tokens = await keyTokenModel.create({
        user: userId,
        publicKey: publicKeyString,
      });

      return tokens ? publicKeyString : null;
    } catch (error) {
      console.log(error);
      throw new BadRequestError(500);
    }
  }
}

export default KeyService;
