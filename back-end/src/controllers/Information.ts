// import { Context } from 'koa'
import { JsonController, Post, Body, Get, QueryParams } from 'routing-controllers'
import { Inject, Service } from 'typedi'
import { InformationService } from '../services'
// import { ILoginForm, IChange } from '../interfaces/Auth'
import { ISetInfo } from '../interfaces/Information'

@Service()
@JsonController('/information')
export class InformationController {

  @Inject() informationService: InformationService

  @Post('/set')
  async setData (@Body() body: ISetInfo) {
    // console.log(body)
    return this.informationService.setData(body)
  }

  @Get('/get')
  async getData (@QueryParams() query: {accessToken: string} | {informationId: number}) {
    return this.informationService.getData(query)
  }
  
  @Get('/getCount')
  async getCount () {
    return this.informationService.getCount()
  }

  @Get('/getList')
  async getList () {
    return this.informationService.getList()
  }
}
