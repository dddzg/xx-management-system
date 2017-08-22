import 'reflect-metadata'
// import { Container } from 'typedi'
// import { Discuz } from '../libraries/Discuz'
// import { Alert } from '../interfaces/Discuz'
// import { BadRequestError } from 'routing-controllers'
// import { cache } from '../libraries/redis'
// import { ILoginForm, IChange } from '../interfaces/Auth'
import { EntityRepository, Repository } from 'typeorm'
import { 工作经历 } from '../entities'

@EntityRepository(工作经历)
export class 工作经历Repository extends Repository<工作经历> {

  constructor () {
    super()
  }

  async insertOrUpdate (工作经历数组: 工作经历[], informationId: number) {
    console.log(工作经历数组)
    await this.query(`DELETE FROM 工作经历 WHERE informationId=${informationId}`)
    await 工作经历数组.map(value => {
      this.query(`insert into 工作经历 (起始时间,终止时间,工作单位,职务,证明人, informationId) 
      values ('${value.起始时间}','${value.终止时间}','${value.工作单位}','${value.职务}','${value.证明人}',${informationId})`)
    })
  }
}
