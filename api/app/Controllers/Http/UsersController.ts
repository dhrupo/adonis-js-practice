import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from 'App/Models/User'

export default class UsersController {

  async index({response}) {
    const allUsers = await User.all();
    response.status(200).json({
      message: 'All users details.',
      data: allUsers
    })
  }

  async store({request, response}) {
    const {username, phone} = request.post();
    const user = await User.create({username, phone});

    response.status(201).json({
      message: 'Successfully created a new user',
      data: user
    })
  }

  async show (ctx:HttpContextContract) {
    const id = ctx.params.id;
    const user = await User.find(id);
    user ? ctx.response.status(200).json({
      message: 'This is the user',
      data: user
    })
    : ctx.response.status(404).json({
      message: `No user with this id = ${id}.`
    })

  }
}
