import 'reflect-metadata'
// import { Container } from 'typedi'
// import { Discuz } from '../libraries/Discuz'
// import { Alert } from '../interfaces/Discuz'
// import { BadRequestError } from 'routing-controllers'
// import { cache } from '../libraries/redis'
// import { ILoginForm, IChange } from '../interfaces/Auth'
import { EntityRepository, Repository } from 'typeorm'
import { 回避单位 } from '../entities'

@EntityRepository(回避单位)
export class 回避单位Repository extends Repository<回避单位> {

  constructor () {
    super()
  }

  async insertOrUpdate (回避单位数组: 回避单位[], informationId: number) {
    console.log(回避单位数组)
    await this.query(`DELETE FROM 回避单位 WHERE informationId=${informationId}`)
    await 回避单位数组.map(value => {
      this.query(`insert into 回避单位 (单位名称, 是否工作单位, informationId) 
      values ('${value.单位名称}','${value.是否工作单位}',${informationId})`)
    })
  }
}
