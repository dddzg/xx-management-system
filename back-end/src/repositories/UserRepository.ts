import 'reflect-metadata'
// import { Container } from 'typedi'
// import { Discuz } from '../libraries/Discuz'
// import { Alert } from '../interfaces/Discuz'
import { BadRequestError } from 'routing-controllers'
import { cache } from '../libraries/redis'
import { ILoginForm, IChange } from '../interfaces/Auth'
import { EntityRepository, Repository } from 'typeorm'
import { User } from '../entities'
// import * as config from 'config'
// import '../interfaces/Discuz-Profile'

// const discuzConfig = config.discuz

@EntityRepository(User)
export class UserRepository extends Repository<User> {

  constructor () {
    super()
  }
  
  async login (body: ILoginForm): Promise<{ accessToken: string }> {
    // const res = await this.discuz.login(body)
    const user = await this.findOne(body)
    if (user) {
      const accessToken = await cache.setAccessToken(String(user.uid))
      return { accessToken }
    } else {
      throw new BadRequestError('未注册')
    }
  }

  async register (body: ILoginForm) {
    const tmp = await this.findOne({ username: body.username })
    if (tmp === undefined) {
      const user = await this.save(this.create(body))
      const accessToken = await cache.setAccessToken(String(user.uid))
      return { accessToken }
    } else {
      throw new BadRequestError('已被注册')
    }
  }

  async change (body: IChange) {
    const uid = Number(body.accessToken.split('-')[0])
    const user = await this.findOne({ uid, password: body.oldPassword })
    if (user) {
      this.save(this.merge(user, { password: body.newPassword }))
      return { ok: 'ok' }
    } else {
      throw new BadRequestError('密码错误')
    }
  }
  async createOrUpdateUser (data: User): Promise<User> {
    const user = await this.findOne({ uid: data.uid })

    return user ? this.save(this.merge(user, data))
                : this.save(this.create(data))
  }
}
