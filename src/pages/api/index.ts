import 'reflect-metadata'
import express, { Response, Request } from 'express'
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
  return next()
})

app.use('/api', LineMiddleware.liffVerify, api)

app.use((err: Error, req: Request, res: Response) => {
  // eslint-disable-next-line no-console
  console.error(err.stack)
  return res.status(500).send('Something broke!')
})

export default app

export const config = {
  api: {
    externalResolver: true,
    bodyParser: false,
  },
}
