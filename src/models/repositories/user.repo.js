import { convertStringToObjectId } from '../../utils/index.js'
import userModel from '../user.model.js'

const findUserWithId = async (_id) => {
  return await userModel.findById(convertStringToObjectId(_id)).lean()
}

export { findUserWithId }
