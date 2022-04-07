const usersModel = require('../models/users')

module.exports = class Users {
  async create(doc) {
    return usersModel.create(doc)
  }
  async updateOne(query, doc) {
    return usersModel.updateOne(query, doc)
  }
  async updateMany(query, doc) {
    return usersModel.updateMany(query, doc)
  }

  async findOne(query, projection = {}) {
    return usersModel.findOne(query).select(projection)
  }

  async find(query, projection = {}, limit = Number.MAX_SAFE_INTEGER) {
    return usersModel.find(query).limit(limit).select(projection)
  }

  async getAll(limit = Number.MAX_SAFE_INTEGER) {
    return usersModel.find({}).limit(limit)
  }

  async deleteOne(query) {
    return usersModel.deleteOne(query)
  }
}
