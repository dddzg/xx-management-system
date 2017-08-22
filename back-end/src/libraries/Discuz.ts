import * as request from 'request-promise'
import * as config from 'config'
import { Service } from 'typedi'
import { IRawForumDataInterface, IFavoriteForum, IPublicForums, IForumList } from '../interfaces/Discuz'
import { ILoginForm } from '../interfaces/Auth'

const discuzConfig = config.discuz

@Service()
export class Discuz {
  async get <T> (cookies: {}, urlSuffix: string, query: {} = {}): Promise<T> {
    return await request({
      uri: discuzConfig.urlPrefix + urlSuffix,
      method: 'GET',
      qs: query,
      headers: {
        Cookie: cookies,
        'X-Api-Key': discuzConfig.xApiKey
      },
      json: true,
      simple: true
    })
  }

  // tslint:disable:no-any
  async post (cookies: {}, urlSuffix: string, query: {} = {}, data: {} = {}): Promise<any> {
    return await request({
      uri: discuzConfig.urlPrefix + urlSuffix,
      method: 'POST',
      body: data,
      qs: query,
      headers: {
        Cookie: cookies,
        'X-Api-Key': discuzConfig.xApiKey
      },
      json: true,
      simple: true
    })
  }

  // tslint:disable:no-any
  async login (data: ILoginForm): Promise<any> {
    return await request({
      uri: `${discuzConfig.urlPrefix}/member.php?mod=logging&action=login&loginsubmit=1`,
      method: 'POST',
      formData: data,
      headers: {
        Cookie: discuzConfig.styleid,
        'X-Api-Key': discuzConfig.xApiKey,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      resolveWithFullResponse: true,
      json: true,
      simple: true
    })
  }

  // TODO: refactor this
  async parseTo2dForum (raw: IRawForumDataInterface): Promise<IForumList> {
    const [categoryList, forumList, favorList] = [raw.catlist, raw.forumlist, raw.forum_favlist]

    const favoriteForums: IFavoriteForum[] = Object.keys(favorList).map(favorId => {  // 收藏板块
      const forum = forumList[favorList[favorId].id]
      return {
        name: forum.name,
        displayOrder: +forum.displayorder,
        todayPosts: +forum.todayposts,
        fid: +forum.fid,
        favorId: +favorId
      }
    })

    const publicForums: IPublicForums[] = []
    // 获取一级版块列表
    Object.keys(categoryList).map(categoryId => {
      const category = categoryList[categoryId]
      if (category.status === '0') {
        return
      }

      // 获取属于该一级版块的二级版块列表
      const forums = []
      for (const forumId of category.forums) {
        const forum = forumList[forumId]
        if (forum.status !== '0') {
          forums.push({
            name: forum.name,
            fid: +forum.fid,
            displayOrder: +forum.displayorder,
            todayPosts: +forum.todayposts,
            isFavorite: !!favoriteForums.find(item => item.fid === +forum.fid)
          })
        }
      }

      // 推入包含二级版块数组的一级版块对象, 并按 displayOrder 排序
      publicForums.push({
        name: category.name,
        fid: +category.fid,
        displayOrder: +category.displayorder,
        todayPosts: forums.reduce((a, b) => a + b.todayPosts, 0),
        forums: forums.sort((a, b) => a.displayOrder - b.displayOrder)
      })
    })

    publicForums.sort((a, b) => +a.displayOrder - +b.displayOrder)
    return { favoriteForums, publicForums }
  }
}
