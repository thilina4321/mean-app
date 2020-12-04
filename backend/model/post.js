const { strict } = require('assert')
const mongoose = require('mongoose')
const { stringify } = require('querystring')

const Schema = mongoose.Schema

const Post = new Schema({
  title:{type:String, required:true},
  description:{type:String, required:true},
  imageUrl:{type:String, required:true}
})

module.exports = mongoose.model('post', Post)
