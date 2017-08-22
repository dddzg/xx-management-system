import 'reflect-metadata'
// import { Container } from 'typedi'
// import { Discuz } from '../libraries/Discuz'
// import { Alert } from '../interfaces/Discuz'
// import { BadRequestError } from 'routing-controllers'
// import { cache } from '../libraries/redis'
// import { ILoginForm, IChange } from '../interfaces/Auth'
import { EntityRepository, Repository } from 'typeorm'
import { 评审领域 } from '../entities'

@EntityRepository(评审领域)
export class 评审领域Repository extends Repository<评审领域> {

  constructor () {
    super()
  }
  async insertOrUpdate (评审领域数组: 评审领域[], informationId: number) {
    console.log(评审领域数组)
    await this.query(`DELETE FROM 评审领域 WHERE informationId=${informationId}`)
    await 评审领域数组.map(value => {
      this.query(`insert into 评审领域 (领域名称, informationId) 
      values ('${value}',${informationId})`)
    })
  }
}
