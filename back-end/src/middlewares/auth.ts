import { Context } from 'koa'
import { cache } from '../libraries/redis'
import { Validator } from 'class-validator'

const validator = new Validator()

export function auth (): (ctx: Context, next: () => Promise<{}>) => Promise<void> {
  return async (ctx: Context, next: () => Promise<{}>): Promise<void> => {
    if (!ctx.headers.authorization) {
      ctx.throw(401, '非法 access-token')
    }
    if (validator.isUUID(ctx.headers.authorization.replace(/\d+-/, ''), '4')) {
      const discuzCookies = await cache.getCookieThroughAccessToken(ctx.headers.authorization)
      if (!discuzCookies) {
        ctx.throw(401, '非法 access-token')
      } else {
        // set data into ctx.state
        // ctx.state can be injected by using @State decorator in controller
        ctx.state.discuzCookies = discuzCookies
        ctx.state.uid = ctx.headers.authorization.split('-')[0]
      }
    } else {
      ctx.throw(401, '非法 access-token')
    }

    await next()
  }
}
