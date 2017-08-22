import 'reflect-metadata'
// import { Container } from 'typedi'
// import { Discuz } from '../libraries/Discuz'
// import { Alert } from '../interfaces/Discuz'
// import { BadRequestError } from 'routing-controllers'
// import { cache } from '../libraries/redis'
// import { ILoginForm, IChange } from '../interfaces/Auth'
import { EntityRepository, Repository } from 'typeorm'
import { Information } from '../entities'
// import { Information } from '../entities/Information'

@EntityRepository(Information)
export class InformationRepository extends Repository<Information> {

  constructor () {
    super()
  }

  async insertOrUpdate (newInformation: Information, uid: number) {
    const information = await this.createQueryBuilder('information')
                                  .where(`information.userId=${uid}`)
                                  .getOne()
    if (information) {
      delete newInformation.user
      const str = Object.entries(newInformation).map(([key, value]) => `\`${key}\`='${value}'`).join(',')
      await this.query(
        `UPDATE \`information\` SET ${str} WHERE information.id=${information.id}`)
      return information.id
    } else {
      const { id } = await this.save(newInformation)
      return id
    }
  }
  async getInformationData (id: number) {
    return await this.findOne({ id })
  }
}
