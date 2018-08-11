// hero.js文件

const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/DataModel', {useNewUrlParser: true}, function (err) {
  if (err) {
    console.log('Connection Error:', '数据连接失败!' + err)
  } else {
    console.log('Connection success!', '数据连接成功!')
  }
})

const DataModelSchema = mongoose.Schema({
  User: {
    phone: Number,
    password: String
  },
  StoreInfo: {
    LogoUrl: String,
    name: String,
    title: String,
    description: String,
    keyword: String,
    QQ: String,
    eamll: String,
    location: Object,
    switch: Object
  }
}, {
  collection: 'DataModel'
})

module.exports = mongoose.model('DataModel', DataModelSchema)
