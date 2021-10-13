import { NextFunction, Request, Response, Router } from 'express'
import { getRepository } from 'typeorm'
import { apiEndpoints } from '@/config'
import { BucketServices } from './services/bucket'
import { Files } from './entity/file_list'
import { Project } from './entity/project'

const api = Router()

api.get(
  apiEndpoints.projects,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.query
      const repo = getRepository<Project>('Project')
      if (id) {
        const project = await repo.findOne({
          where: { id, lineUid: req.user.userId },
        })
        return res.json(project)
      }
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
      const body = req.body as Project
      const repo = getRepository<Project>('Project')
      const insert = await repo.insert(body)
      return res.json(insert.identifiers)
    } catch (e) {
      return next(e)
    }
  },
)

api.get(
  apiEndpoints.files,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.query
      const fileRepo = getRepository<Files>('Files')
      const files = await fileRepo.find({ where: { project: Number(id) } })
      return res.json(files)
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
      const { ref, id }: { ref: string; id: string } = req.body
      const url = await BucketServices.uploadMetadata(ref, req.body.uuid)
      const fileRepo = getRepository<Files>('Files')
      await fileRepo.insert({
        url,
        name: ref.split('/').pop() || ref,
        project: Number(id),
      })
      return res.send(url)
    } catch (e) {
      return next(e)
    }
  },
)

api.delete(
  apiEndpoints.files,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id }: { id: string } = req.body
      // const url = await BucketServices.uploadMetadata(ref, req.body.uuid)
      const fileRepo = getRepository<Files>('Files')
      await fileRepo.delete({ file_id: Number(id) })
      return res.sendStatus(200)
    } catch (e) {
      return next(e)
    }
  },
)

export { api }
