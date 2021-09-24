import { NextFunction, Request, Response, Router } from 'express'
import { getRepository } from 'typeorm'
import { apiEndpoints } from '@/config'
import { BucketServices } from './services/bucket'
import { Files } from './entity/files'
import { Projects } from './entity/projects'

const api = Router()

api.get(
  apiEndpoints.projects,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log('get project')
      const repo = getRepository<Projects>('Projects')
      const all = await repo.find({ where: { lineUid: req.user.userId } })
      return res.json(all)
    } catch (e) {
      return next(e)
    }
  },
)

api.post(
  apiEndpoints.projects,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body as Projects
      const repo = getRepository<Projects>('Projects')
      const insert = await repo.insert(body)
      return res.json(insert.identifiers)
    } catch (e) {
      return next(e)
    }
  },
)

// update file metadata
api.put(
  apiEndpoints.files,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { ref }: { ref: string } = req.body
      const url = await BucketServices.uploadMetadata(ref, req.body.uuid)
      const fileRepo = getRepository<Files>('Files')
      await fileRepo.insert({
        url,
        name: ref.split('/').pop() || ref,
      })
      return res.send(url)
    } catch (e) {
      return next(e)
    }
  },
)

export { api }
