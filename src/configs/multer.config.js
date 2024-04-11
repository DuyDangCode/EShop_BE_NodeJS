import multer from 'multer'
import DatauriParser from 'datauri/parser.js'
import path from 'path'

const storage = multer.memoryStorage()
const multerUploadSingleImage = multer({ storage }).single('image')
const dUri = new DatauriParser()
const decodeBase64ForMulter = (originalname, buffer) => {
  return dUri.format(path.extname(originalname).toString(), buffer)
}

export { multerUploadSingleImage, decodeBase64ForMulter }
