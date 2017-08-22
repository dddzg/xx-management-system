import { Service } from 'typedi'
import { InformationRepository } from '../repositories'
import { 评审领域Repository } from '../repositories'
import { 工作经历Repository } from '../repositories'
import { 回避单位Repository } from '../repositories'
import { 评审经历Repository } from '../repositories'
// import { ILoginForm, IChange } from '../interfaces/Auth'
import { BadRequestError } from 'routing-controllers'
import { getConnection } from 'typeorm'
import { ISetInfo } from '../interfaces/Information'
import { UserRepository } from '../repositories'
// import { 评审经历 } from '../entities/评审经历'
// import { 工作经历 } from '../entities/工作经历'
// import { 回避单位 } from '../entities/回避单位'
// import { 评审领域 } from '../entities/评审领域'
import { Information } from '../entities'
const nameList = [
  '专家证书编号',
  '状态',
  '证书有效时间',
  '专家姓名',
  '专家性别',
  '出生日期',
  '政治面貌',
  '证件类型',
  '颁发机构',
  '证件编号',
  '最高学历',
  '最高学位',
  '职称',
  '证书编号',
  '职务',
  '从业时长',
  '是否退休',
  '是否兼职',
  '邮政编码',
  '电子邮件',
  '移动电话',
  '家庭电话',
  '工作单位',
  '详细通信地址',
  '毕业院校及专业',
  '资格证书名及编号',
  '业务专长',
  '工作业绩',
  '其他说明',
  '驳回理由',
  '审核结果'
]
@Service()
export class InformationService {
  informationRepository: InformationRepository
  userRepository: UserRepository
  i评审领域Repository: 评审领域Repository
  i工作经历Repository: 工作经历Repository
  i回避单位Repository: 回避单位Repository
  i评审经历Repository: 评审经历Repository
  constructor () {
    this.informationRepository = getConnection().getCustomRepository(InformationRepository)
    this.userRepository = getConnection().getCustomRepository(UserRepository)
    this.i回避单位Repository = getConnection().getCustomRepository(回避单位Repository)
    this.i评审领域Repository = getConnection().getCustomRepository(评审领域Repository)
    this.i工作经历Repository = getConnection().getCustomRepository(工作经历Repository)
    this.i评审经历Repository = getConnection().getCustomRepository(评审经历Repository)
  }
  
  async setData (body: ISetInfo) {
    try {
      let uid, user
      if (body.id) {
        // tslint:disable-next-line:no-any
        const temp: any = await this.informationRepository.query(`select userId from information where id=${body.id}`)
        // console.log(temp)
        uid = temp[0].userId
        user = await this.userRepository.findOne({ uid })
        console.log(uid)
      } else {
        uid = Number(body.accessToken.split('-')[0])
        user = await this.userRepository.findOne({ uid })
      }
      if (user) {
        // const information = await this.informationRepository
        //                               .createQueryBuilder('information')
        //                               .where(`information.userId=${uid}`)
        //                               .getOne()

        const newInformation = new Information()
        Object.entries(body).forEach(([key, value]) => {
          if (nameList.includes(key)) {
            newInformation[key] = value
          }
        })
        if (newInformation.驳回理由 === undefined) newInformation.驳回理由 = ''
        if (newInformation.审核结果 === undefined) newInformation.审核结果 = ''
        
        const infoId = await this.informationRepository.insertOrUpdate(newInformation, uid)
        // const 评审经历数组: 评审经历[] = body.评审经历.map(value => {
        //   const temp = new 评审经历()
        //   temp.任务名称 = value.任务名称
        //   temp.任务描述 = value.任务描述
        //   temp.任务类型 = value.任务类型
        //   temp.时间 = value.时间
        //   return temp
        // })
        await this.i回避单位Repository.insertOrUpdate(body.回避单位, infoId)
        await this.i工作经历Repository.insertOrUpdate(body.工作经历, infoId)
        await this.i评审经历Repository.insertOrUpdate(body.评审经历, infoId)
        await this.i评审领域Repository.insertOrUpdate(body.评审领域, infoId)
        return { ok: 'ok' }
      } else {
        throw new BadRequestError('没有登陆的账号')
      }
    } catch (error) {
      throw new BadRequestError(error)
    }
  }

  async getData (query: {accessToken: string} | {informationId: number}) {
    let informationId = 0
    if ('accessToken' in query) {
      const uid = Number((query as {accessToken: string}).accessToken.split('-')[0])
      const t = await this.informationRepository
                                .createQueryBuilder('information')
                                .where(`information.userId=${uid}`)
                                .getOne()
      if (!t) {
        throw new BadRequestError('不存在此信息')
      } else {
        informationId = t.id
      }
    }
    informationId = informationId === 0 ? (query as {informationId: number}).informationId : informationId
    return this.informationRepository.getInformationData(informationId)
  }

  async getCount () {
    return this.informationRepository.count()
  }

  async getList () {
    return await this.informationRepository.find()
  }
  // async register (body: ILoginForm): Promise<{ accessToken: string }> {
  //   return this.userRepository.register(body)
  // }

  // async change (body: IChange) {
  //   return this.userRepository.change(body)
  // }
}
