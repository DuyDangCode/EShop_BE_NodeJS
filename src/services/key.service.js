import keyModel from '../models/key.model';

class KeyService {
  static async createKeyToken({ userId, publicKey }) {
    try {
      const publicKeyString = publicKey.toString();
      const tokens = await keyModel.create({
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
