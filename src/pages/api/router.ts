import { Request, Response, Router } from 'express'
import { getRepository } from 'typeorm'
import { v4 } from 'uuid'
import multer from 'multer'
import { Photo } from './entity/photo'
import { BucketServices } from './services/bucket'

const forms = multer()

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
  return res.json(all)
})

api.post('/files', forms.any(), async (req, res, next) => {
  try {
    const file = (req?.files as Express.Multer.File[])[0]
    const url = await BucketServices.addBinary(
      req.user.userId,
      file.originalname,
      file.buffer,
    )
    return res.send(url)
  } catch (e) {
    return next(e)
  }
})
api.put('/files', async (req, res, next) => {
  try {
    const url = await BucketServices.uploadMetadata(req.body.ref, req.body.uuid)
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
