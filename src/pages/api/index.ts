import 'reflect-metadata'
import express, { Response, Request, NextFunction } from 'express'
import { api } from './router'
import { connectDB } from './repository'
import LineMiddleware from './middleware/line'

const app = express()
app.use(express.json({ limit: '200mb' }))
app.use(
  express.urlencoded({
    extended: true,
    limit: '200mb',
    parameterLimit: 200000,
  }),
)

app.use(async (req, res, next) => {
  await connectDB()
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate')
  next()
})

app.use(LineMiddleware.liffVerify, api)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (!res.headersSent) {
    // eslint-disable-next-line no-console
    console.error(err.stack)
    res.sendStatus(500)
    next()
  }
})

export default app

export const config = {
  api: {
    externalResolver: true,
    bodyParser: false,
  },
}
