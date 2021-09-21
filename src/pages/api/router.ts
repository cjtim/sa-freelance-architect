import { Request, Response, Router } from 'express'
import { getRepository } from 'typeorm'
import { v4 } from 'uuid'
import { Photo } from './entity/photo'

const api = Router()

api.get('/', (req: Request, res: Response) => {
  const path = `/api/item/${v4()}`
  res.setHeader('Content-Type', 'text/html')
  res.end(`Hello! Go to item: <a href="${path}">${path}</a>`)
})

api.get('/item/:slug', (req, res) => {
  const { slug } = req.params
  res.json({ item: slug })
})

api.get('/db', async (req, res) => {
  const repo = getRepository<Photo>('Photo')
  // await repo.insert({
  //   name: 'test',
  //   description: 'test',
  //   filename: 'test.txt',
  //   hasId: false,
  //   isPublished: false,
  //   views: 0,
  // })
  const all = await repo.find()
  res.json(all)
})
export { api }
