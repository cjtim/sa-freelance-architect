import { Request, Response, Router } from 'express'
import { getRepository } from 'typeorm'
import { v4 } from 'uuid'
import { BucketServices } from './services/bucket'
import { Files } from './entity/files'

const api = Router()

api.get('/', (req: Request, res: Response) => {
  const path = `/api/item/${v4()}`
  res.setHeader('Content-Type', 'text/html')
  return res.end(`Hello! Go to item: <a href="${path}">${path}</a>`)
})

api.get('/item/:slug', (req, res) => {
  const { slug } = req.params
  return res.json({ item: slug })
})

api.get('/db', async (req, res) => {
  const repo = getRepository<Files>('Files')
  // await repo.insert({
  //   name: 'test',
  //   description: 'test',
  //   filename: 'test.txt',
  //   hasId: false,
  //   isPublished: false,
  //   views: 0,
  // })
  const all = await repo.find()
  return res.json(all)
})

api.get('/files', async (req, res, next) => {
  try {
    const fileRepo = getRepository<Files>('Files')
    const all = await fileRepo.find()
    return res.json(all)
  } catch (e) {
    return next(e)
  }
})
api.put('/files', async (req, res, next) => {
  try {
    const { ref }: { ref: string } = req.body
    const url = await BucketServices.uploadMetadata(ref, req.body.uuid)
    const fileRepo = getRepository<Files>('Files')
    await fileRepo.insert({
      lineUid: req.user.userId,
      url,
      name: ref.split('/').pop() || ref,
    })
    return res.send(url)
  } catch (e) {
    return next(e)
  }
})

export { api }
export const config = {
  api: {
    externalResolver: true,
    bodyParser: false,
  },
}
