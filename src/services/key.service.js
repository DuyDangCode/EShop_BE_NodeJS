import { BadRequestError } from '../core/error.res.js';
import keyTokenModel from '../models/keyToken.model.js';
import { Types } from 'mongoose';
import userModel from '../models/user.model.js';

class KeyService {
  static async createKeyToken({ userId, publicKey, refeshToken = null }) {
    try {
      const publicKeyString =
        typeof publicKey !== 'string' ? publicKey.toString() : publicKey;
      const filter = { userId },
        update = {
          userId,
          publicKey: publicKeyString,
          refreshTokensUsed: [],
          refeshToken,
        },
        option = { new: true, upsert: true };
      const tokens = await keyTokenModel.findOneAndUpdate(
        filter,
        update,
        option
      );

      if (!tokens) throw new BadRequestError(500);
    } catch (error) {
      throw new BadRequestError(500);
    }
  }

  static async findByUserId(userId) {
    return await keyTokenModel.findOne({ userId: userId }).lean();
  }

  static async removeById(id) {
    return await keyTokenModel.findOneAndDelete({ _id: id }).lean();
  }

  static async findByRefreshTokenUsed(refreshToken) {
    return await keyTokenModel
      .findOne({ refreshTokensUsed: refreshToken })
      .lean();
  }

  static async findByRefreshToken(refeshToken) {
    return await keyTokenModel.findOne({ refeshToken: refeshToken }).lean();
  }

  static async updateRefreshTokenUsed(_id, refreshTokenUsed) {
    return await keyTokenModel
      .updateOne({ _id: _id }, { refreshTokenUsed: refreshTokenUsed })
      .lean();
  }

  static async updateRefreshToken(_id, refeshToken) {
    return await keyTokenModel
      .updateOne({ _id: _id }, { refreshToken: refeshToken })
      .lean();
  }

  static async updatePublickey(_id, publicKey) {
    return await keyTokenModel
      .updateOne({ _id: _id }, { publicKey: publicKey })
      .lean();
  }
}

export default KeyService;
