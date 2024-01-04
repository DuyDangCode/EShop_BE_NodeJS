import apiKeyModel from '../models/apiKey.model.js';
import crypto from 'node:crypto';

const findById = async (key) => {
  //   const randomByte = crypto.randomBytes(32).toString('hex');
  //   const newKey = await apiKeyModel.create({
  //     key: randomByte,
  //     permissions: ['001'],
  //   });
  //   console.log(newKey);
  const keyObject = await apiKeyModel
    .findOne({ key: key, status: true })
    .lean();
  return keyObject;
};

export { findById };
