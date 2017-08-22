import 'reflect-metadata'
import './utils/config'
import * as Koa from 'koa'
import * as config from 'config'
import * as logger from 'koa-logger'
import { IncomingMessage, ServerResponse } from 'http'
import { useKoaServer, useContainer as useContainerForRoute } from 'routing-controllers'
import { Container } from 'typedi'
import { error } from './middlewares/error'
import { database } from './libraries/database'
import { Connection, useContainer as useContainerForOrm } from 'typeorm'
// import * as Raven from 'raven'

const port = config.port

const app = new Koa()

useContainerForRoute(Container)
useContainerForOrm(Container)

app.use(error())
app.use(logger())

useKoaServer(app, {
  cors: true,
  routePrefix: '/v1',
  controllers: [`${__dirname}/controllers/*{js,ts}`],
  defaultErrorHandler: false,
  validation: {
    skipMissingProperties: true
  }
})

export const createConnection: Promise<Connection> = database()

export const connection = createConnection.then(async c => {
  return new Promise<(req: IncomingMessage, res: ServerResponse) => void>(resolve => {
    app.listen(port, () => {
      console.log(`[APP] Listen on ${port}`)
      resolve(app.callback())
    })
  })
})

export default app.callback()

// 错误处理
// if (process.env.NODE_ENV === 'production') {
//   Raven.config('https://b0e2417d0ebe45adb7346ba06485c6c4:32c2ccecce894c98ad4eb276856e1072@sentry.io/200934').install()
//   app.on('error', (err: Error) => {
//     // tslint:disable-next-line
//     Raven.captureException(err, (err: Error, eventId) => {
//         console.log('Reported error ', eventId)
//     })
//   })
//   process.on('uncaughtException', (err: Error) => {
//     // tslint:disable-next-line
//     Raven.captureException(err, (err: Error, eventId) => {
//       console.log('Reported error ', eventId)
//       process.exit(1)
//     })
//   })
// }

// import './tasks/initialData'
