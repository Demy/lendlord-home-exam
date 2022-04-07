const Users = require('../repository/users');
const users = new Users();
const Router = require('koa-router')
const mongoose = require('mongoose')

const router = new Router()
  .get('/users', async (ctx, next) => {
    ctx.body = await users.getAll()
  })

  .post('/users/add', async (ctx, next) => {
    const body = ctx.request.body;
    users.create({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      date: body.date,
      role: body.role,
      salary: body.salary,
      manager: body.manager ? mongoose.Types.ObjectId(body.manager) : null
    });
    ctx.body = ''
  })

  .post('/users/edit', async (ctx, next) => {
    const body = ctx.request.body;
    users.updateOne({
      _id: body._id
    }, {
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      date: body.date,
      role: body.role,
      salary: body.salary,
      manager: body.manager ? mongoose.Types.ObjectId(body.manager) : null
    });
    ctx.body = ''
  })

  .post('/users/delete', async (ctx, next) => {
    const body = ctx.request.body;
    if (body.id) {
      users.deleteOne({
        _id: mongoose.Types.ObjectId(body.id)
      });
      users.updateMany({
        manager: mongoose.Types.ObjectId(body.id)
      }, {
        manager: null
      })
    }
    ctx.body = ''
  })

router.allowedMethods()
module.exports = router
