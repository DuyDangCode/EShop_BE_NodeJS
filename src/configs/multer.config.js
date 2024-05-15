import multer from 'multer'
import DatauriParser from 'datauri/parser.js'
import path from 'path'

const fileSize = 2 * 1024 * 1024
const files = 1
const storage = multer.memoryStorage()
const multerUploadSingleImage = multer({
  storage,
  limits: { fileSize, files },
}).single('product_image')
const dUri = new DatauriParser()
const decodeBase64ForMulter = (originalname, buffer) => {
  return dUri.format(path.extname(originalname).toString(), buffer)
}

export { multerUploadSingleImage, decodeBase64ForMulter }
