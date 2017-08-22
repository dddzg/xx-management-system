import { Context } from 'koa'
import { ValidationError } from 'class-validator'
import { BadRequestError, InternalServerError } from 'routing-controllers'

export function error (): (ctx: Context, next: () => Promise<{}>) => Promise<void> {
  return async (ctx: Context, next: () => Promise<{}>) => {
    // Fix error caused by transform on query
    Reflect.setPrototypeOf(ctx.query, {})
    try {
      await next()
    } catch (e) {
      let message
      if (Reflect.has(e, 'errors') && e.errors[0] instanceof ValidationError) {
        message = e.errors[0]
      } else if (e instanceof BadRequestError) {
        console.log('『捕获 BadRequestError 』\n', e.message)
      } else if (e instanceof InternalServerError) {
        console.error('『捕获 InternalServerError 』\n', e)
      } else {
        // throw error to sentry
        console.error('『程序异常 o(╥﹏╥)o』\n', e)
        throw e
      }
      ctx.status = e.status || 500
      ctx.body = {
        message:  message || e.message
      }
    }
  }
}
