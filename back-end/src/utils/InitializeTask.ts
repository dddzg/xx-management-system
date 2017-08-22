import { createConnection } from '../'
import * as entities from '../entities'
import * as repositories from '../repositories'
import * as mock from './mock'
import * as faker from 'faker'
import { getManager } from 'typeorm'
import * as request from 'supertest'
import app from '../../src'

export class InitializeTask {
  private static _instance: InitializeTask
  articleRepository: repositories.ArticleRepository
  commentRepository: repositories.CommentRepository
  categoryRepository: repositories.CategoryRepository
  gameRepository: repositories.GameRepository
  userRepository: repositories.UserRepository
  notificationRepository: repositories.NotificationRepository
  notificationSubscribersUserRepository: repositories.NotificationSubscribersUserRepository

  user: entities.User
  accessToken: string
  
  destroyFunc: () => Promise<void>

  private constructor () { }

  public static get Instance (): InitializeTask {
    return this._instance || (this._instance = new this())
  }

  async init (): Promise<void> {
    await this.connect()

    const users = await this.userRepository.save(this.userRepository.create([
      mock.mockUser(), mock.mockUser(), mock.mockUser()
    ]))

    const body = {
      answer: '司徒幽莲',
      password: 'DGJoy_shared',
      questionid: 1,
      username: '21830',
      loginfield: 'uid'
    }

    const res = await request(app).post('/v1/auth/login').send(body)
    this.user = await this.userRepository.findOne({ uid: 21830 }) as entities.User
    this.accessToken = res.body.accessToken
    users.unshift(this.user)

    const categories = await this.categoryRepository.save(this.categoryRepository.create([
      mock.mockCategory({ name: '文化' }), 
      mock.mockCategory({ name: '活动' }), 
      mock.mockCategory({ name: '教育' }), 
      mock.mockCategory({ name: '折扣' }),
      mock.mockCategory({ name: 'Steam' }),
      mock.mockCategory({ name: '领取心得' })
    ]))

    const games = await this.gameRepository.save(this.gameRepository.create([
      mock.mockGame(), mock.mockGame(), mock.mockGame(), mock.mockGame(), mock.mockGame(), mock.mockGame()
    ]))

    const articles: entities.Article[] = []
    for (let i = 0; i < 15; i++) {
      const data = await this.articleRepository.save(this.articleRepository.create([
        mock.mockArticle({ categoryId: categories[0].id, user: users[0] }), mock.mockArticle({ categoryId: categories[1].id }),
        mock.mockArticle({ categoryId: categories[0].id, user: users[1] }), mock.mockArticle({ categoryId: categories[1].id }),
        mock.mockArticle({ categoryId: categories[2].id, user: users[2], games: [games[2], games[3]] }), 
        mock.mockArticle({ categoryId: categories[3].id, user: users[3], games: [games[4], games[5]] }),
        mock.mockArticle({ categoryId: categories[4].id, user: users[0], headlineTime: undefined, games: [games[0], games[1]] }), 
        mock.mockArticle({ categoryId: categories[5].id, user: users[1], headlineTime: undefined, games: [games[0], games[1]] })
      ]))
      articles.push(...data)
    }

    const comments: entities.Comment[] = []
    for (let i = 0, len = articles.length; i < len; ++i) {
      for (let j = 0; j < 5; ++j) {
        const comment = await this.commentRepository.save(this.commentRepository.create(
          mock.mockComment({ 
            articleId: articles[i].id, 
            position: j,
            user: users[faker.random.number({ min: 0, max: 3 })]
          }) 
        ))
        comments.push(comment)
      }
    }

    const notifications: entities.Notification[] = []
    const notificationSubscriberUserList: entities.NotificationSubscribersUser[] = []
    for (let i = 0, len = users.length; i < len; ++i) {
      for (let j = 0; j < 10; ++j) {
        const selectUsers = users.filter(() => Math.random() > 0.5)
        const notification = await this.notificationRepository.save(this.notificationRepository.create(
          mock.mockNotification({
            publisherId: users[i].uid,
            publisher: users[i],
            subscribers: selectUsers
          })
        ))
        notifications.push(notification)
        for (const user of selectUsers) {
          const item = await this.notificationSubscribersUserRepository.save(this.notificationSubscribersUserRepository.create({
            user,
            notification,
            read: faker.random.boolean()
          }))
          notificationSubscriberUserList.push(item)
        }
      }
    }

    this.destroyFunc = async () => {
      await getManager().query('DELETE FROM `notification_subscribers_user`')
      // await this.notificationSubscribersUserRepository.remove(notificationSubscriberUserList)
      await this.commentRepository.remove(comments)
      await this.notificationRepository.remove(notifications)
      await this.articleRepository.remove(articles)
      await this.gameRepository.remove(games)
      await this.categoryRepository.remove(categories)
      await this.userRepository.remove(users)
    }
  }

  async connect (): Promise<void> {
    const db = await createConnection
    this.articleRepository = db.getCustomRepository(repositories.ArticleRepository)
    this.commentRepository = db.getCustomRepository(repositories.CommentRepository)
    this.categoryRepository = db.getCustomRepository(repositories.CategoryRepository)
    this.gameRepository = db.getCustomRepository(repositories.GameRepository)
    this.userRepository = db.getCustomRepository(repositories.UserRepository)
    this.notificationRepository = db.getCustomRepository(repositories.NotificationRepository)
    this.notificationSubscribersUserRepository = db.getCustomRepository(repositories.NotificationSubscribersUserRepository)
  }

  async destroy (): Promise<void> {
    await this.destroyFunc()
  }
}
