import * as Redis from 'ioredis'
import * as config from 'config'
import { v4 as uuidV4 } from 'uuid'

const cacheConfig = config.cache
const discuzConfig = config.discuz

export class Cache extends Redis {
  constructor () {
    super(cacheConfig.port, cacheConfig.host, {
      password: cacheConfig.password,
      db: cacheConfig.db
    })
  }

  async setAccessTokenByCookie (cookies: string[], uid: string): Promise<string> {
    const accessToken = uid.concat('-', uuidV4())
    const clientCookies = [...cookies.map(cookie => cookie.split(';')[0]), discuzConfig.styleid].join(';')
    await this.set(this.key('accessToken2cookies', accessToken), clientCookies)
    return accessToken
  }

  async setAccessToken (uid: string) {
    const accessToken = uid.concat('-', uuidV4())
    await this.set(this.key('accessToken', uid), accessToken)
    return accessToken
  }

  async getAccessToken (uid: string) {
    return this.get(this.key('accessToken', uid))
  }
  // async getCookieThroughAccessToken (accessToken: string): Promise<string|null> {
  //   return await this.get(this.key('accessToken2cookies', accessToken))
  // }

  key (...items: {}[]): string {
    return [...items].join(':')
  }
}

export const cache = new Cache()

cache.on('connect', () => console.log('[REDIS] Redis Connected'))
cache.on('disconnect', () => console.log('[REDIS] Redis Disconnected'))
cache.on('error', (e: Error) => console.log('[REDIS] Redis Error', e))
