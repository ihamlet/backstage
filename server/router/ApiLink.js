
const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const DataModel = require('../models/DataModel')
const crypto = require('crypto')

router.post('/Register', (req, res, next) => {
  const md5 = crypto.createHash('md5')

  const phone = req.body.User.phone
  const password = req.body.User.password
  md5.update(password + phone)
  const pwd = md5.digest('base64')

  const User = {
    phone: phone,
    password: pwd
  }

  DataModel.findOne({'User.phone': phone}, (err, doc) => {
    if (err) return next(err)
    if (!doc) {
      DataModel.create({ User }, (err, doc) => {
        if (err) {
          res.send({code: 500, message: '注册失败'})
        } else {
          res.send({code: 200, message: '注册成功'})
        }
      })
    } else {
      res.send({code: 409, message: '账号已被注册'})
    }
  })
})

router.post('/Login', (req, res, next) => {
  const md5 = crypto.createHash('md5')

  const phone = req.body.User.phone
  const password = req.body.User.password
  md5.update(password + phone)
  const pwd = md5.digest('base64')

  DataModel.findOne({'User.phone': phone, 'User.password': pwd}, (err, doc) => {
    if (err) return next(err)
    if (doc) {
      let token = jwt.sign({doc}, 'shh_token', {expiresIn: '24h'})
      res.send({code: 200, message: '登陆成功', token: token})
    } else {
      res.send({code: 400, message: '该用户还未注册'})
    }
  })
})

router.get('/info/:id', (req, res) => {
  DataModel.findById(req.params.id)
    .then(doc => {
      res.json(doc)
    })
    .catch(err => {
      res.json(err)
    })
})

router.put('/info/:id', (req, res) => {
  DataModel.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        StoreInfo: req.body.StoreInfo
      }
    },
    {
      new: true
    }
  )
    .then(doc => res.json(doc))
    .catch(err => res.json(err))
})

router.post('/add/StoreInfo', (req, res) => {
  DataModel.create(req.body, (err, doc) => {
    if (err) {
      res.json(err)
    } else {
      res.json(doc)
    }
  })
})

router.put('/add/StoreLogo/:id', (req, res) => {
  DataModel.StoreInfo.findOneAndUpdate(
    { _id: req.params.id },
    {
      $push: {
        'StoreInfo.LogoUrl': req.body.url
      }
    },
    {
      new: true
    }
  )
    .then(doc => res.json(doc))
    .catch(err => res.json(err))
})

module.exports = router
