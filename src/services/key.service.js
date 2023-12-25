import keyTokenModel from '../models/keyToken.model.js';

class KeyService {
  static async createKeyToken({ userId, publicKey }) {
    try {
      const publicKeyString = publicKey.toString();
      const tokens = await keyTokenModel.create({
        user: userId,
        publicKey: publicKeyString,
      });
      return tokens ? publicKeyString : null;
    } catch (error) {
      return error;
    }
  }
}

export default KeyService;
