import { Service } from 'typedi'
import { UserRepository } from '../repositories'
import { ILoginForm, IChange } from '../interfaces/Auth'
import { getConnection } from 'typeorm'

@Service()
export class UserService {
  userRepository: UserRepository
  
  constructor () {
    this.userRepository = getConnection().getCustomRepository(UserRepository)
  }
  
  async login (body: ILoginForm): Promise<{ accessToken: string }> {
    return this.userRepository.login(body)
  }

  async register (body: ILoginForm): Promise<{ accessToken: string }> {
    return this.userRepository.register(body)
  }

  async change (body: IChange) {
    return this.userRepository.change(body)
  }
}
