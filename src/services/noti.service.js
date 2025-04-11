import notiModel from '../models/notification.model.js'

class NotiService {
  static push(receiver, type, options = {}) {
    let notiContent
    if (type === 'PRODUCT-001') {
      notiContent = 'Thêm sản phẩm mới: @@@@'
    } else {
      notiContent = 'Thêm sản phẩm mới: @@@@'
    }

    return notiModel.create({
      noti_type: type,
      noti_content: notiContent,
      noti_receiver: receiver,
      noti_option: options,
    })
  }
  static listByUser(userId, type = 'all', isRead = 0) {
    const match = { noti_receiver: userId }
    if (type !== 'all') {
      match['noti_type'] = type
    }

    return notiModel.aggregate([
      { $match: match },
      {
        $project: {
          noti_type: 1,
          noti_receiver: 1,
          noti_content: {
            $concat: ['Thêm sản phẩm mới: ', '$noti_option.product_name'],
          },
          createAt: 1,
          noti_option: 1,
        },
      },
    ])
  }
}

export default NotiService
