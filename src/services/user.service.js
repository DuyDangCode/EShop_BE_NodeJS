import userModel from '../models/user.model.js';

class UserService {
  static async findByEmail(email) {
    return await userModel.findOne({ email }).lean();
  }

  static async findById(_id) {
    return await userModel.findOne({ _id }).lean();
  }
}

export default UserService;
