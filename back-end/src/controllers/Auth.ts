import { Context } from 'koa'
import { JsonController, Post, Body, Ctx } from 'routing-controllers'
import { Inject, Service } from 'typedi'
import { UserService } from '../services'
import { ILoginForm, IChange } from '../interfaces/Auth'

@Service()
@JsonController('/auth')
export class AuthController {

  @Inject() userService: UserService

  @Post('/login')
  async login (@Body() body: ILoginForm, @Ctx() ctx: Context) {
    
    const data = await this.userService.login(body)
    ctx.cookies.set('accessToken', data.accessToken)
    return { ...data, identity: body.identity }
  }

  @Post('/register')
  async register (@Body() body: ILoginForm, @Ctx() ctx: Context) {
    const data = await this.userService.register(body)
    ctx.cookies.set('accessToken', data.accessToken)
    return { ...data, identity: body.identity }
  }

  @Post('/change')
  async change (@Body() body: IChange) {
    return this.userService.change(body)
  }
}
