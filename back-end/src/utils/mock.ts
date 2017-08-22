import * as faker from 'faker'
import { DeepPartial } from './DeepPartial'
import { Article, Category, Comment, Game, User, Notification } from '../entities'

export function mockArticle (item?: DeepPartial<Article>): DeepPartial<Article> {
  return {
    title: faker.lorem.sentence(),
    content: faker.lorem.paragraphs(3),
    summary: faker.lorem.sentence(),
    thumbnail: faker.image.city(200, 500),
    origin: faker.internet.url(),
    source: faker.lorem.words(3),
    sourceUrl: faker.internet.url(),
    headlineTime: faker.date.recent(),
    bonusType: faker.random.number({ min: 0, max: 3 }),
    ...item
  }
}

export function mockCategory (item?: DeepPartial<Category>): DeepPartial<Category> {
  return {
    name: faker.random.word(),
    ...item
  }
}

export function mockComment (item?: DeepPartial<Comment>): DeepPartial<Comment> {
  return {
    position: faker.random.number({ min: 1, max: 10, precision: 1 }),
    like: faker.random.number({ min: 1, max: 100 }),
    content: faker.lorem.paragraph(),
    ...item
  }
}

export function mockGame (item?: DeepPartial<Game>): DeepPartial<Game> {
  return {
    name: faker.random.words(),
    steamId: faker.random.number(),
    images: [faker.random.image()],
    ...item
  }
}

export function mockUser (item?: DeepPartial<User>): DeepPartial<User> {
  return {
    uid: faker.random.number(),
    username: faker.random.words(),
    avatar: faker.internet.avatar(),
    email: faker.internet.email(),
    rank: faker.random.number({ min: 1, max: 5 }),
    ...item
  }
}

export function mockNotification (item?: DeepPartial<Notification>): DeepPartial<Notification> {
  return {
    content: faker.lorem.sentence(),
    link: faker.internet.url(),
    remark: faker.lorem.words(),
    category: ['帖子', '系统提醒', '点评', '提到我的'][faker.random.number({ min: 0, max: 3 })],
    ...item
  }
}
