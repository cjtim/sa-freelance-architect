import 'reflect-metadata'
import express, { NextFunction, Response, Request } from 'express'
import { api } from './router'
import { connectDB } from './repository'

const app = express()

app.use(async (req, res, next) => {
  await connectDB()
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate')
  next()
})

app.use('/api', api)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

export default app

export const config = { externalResolver: true }
