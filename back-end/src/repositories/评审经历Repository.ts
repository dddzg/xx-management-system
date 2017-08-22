import 'reflect-metadata'
// import { Container } from 'typedi'
// import { Discuz } from '../libraries/Discuz'
// import { Alert } from '../interfaces/Discuz'
// import { BadRequestError } from 'routing-controllers'
// import { cache } from '../libraries/redis'
// import { ILoginForm, IChange } from '../interfaces/Auth'
import { EntityRepository, Repository } from 'typeorm'
import { 评审经历 } from '../entities'

@EntityRepository(评审经历)
export class 评审经历Repository extends Repository<评审经历> {

  constructor () {
    super()
  }
  async insertOrUpdate (评审经历数组: 评审经历[], informationId: number) {
    console.log(评审经历数组)
    await this.query(`DELETE FROM 评审经历 WHERE informationId=${informationId}`)
    await 评审经历数组.map(value => {
      this.query(`insert into 评审经历 (时间, 任务名称, 任务描述, 任务类型, informationId) 
      values ('${value.时间}','${value.任务名称}','${value.任务描述}','${value.任务类型}',${informationId})`)
    })
  }
}
