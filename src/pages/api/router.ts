import { NextFunction, Request, Response, Router } from 'express'
import { getRepository } from 'typeorm'
import { apiEndpoints } from '@/config'
import { BucketServices } from './services/bucket'
import { Customer, FileList, Project } from './entity'

const api = Router()

api.get(
  apiEndpoints.projects,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.query
      const repo = getRepository<Project>('Project')
      if (id) {
        const project = await repo.findOne({
          where: { project_id: id },
        })
        return res.json(project)
      }
      const all = await repo.find()
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
      const fileRepo = getRepository<FileList>('FileList')
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
      const fileRepo = getRepository<FileList>('FileList')
      await fileRepo.insert({
        url,
        name: ref.split('/').pop() || ref,
        project: { project_id: Number(id) },
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
      const fileRepo = getRepository<FileList>('FileList')
      await fileRepo.delete({ file_id: Number(id) })
      return res.sendStatus(200)
    } catch (e) {
      return next(e)
    }
  },
)

api.get(
  apiEndpoints.customers,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id }: { id: string } = req.body
      const customerRepo = getRepository<Customer>('Customer')
      if (id) {
        const customers = await customerRepo.find({
          where: { customer_id: Number(id) },
        })
        return res.json(customers)
      }
      const customers = await customerRepo.find()
      return res.json(customers)
    } catch (e) {
      return next(e)
    }
  },
)
api.post(
  apiEndpoints.customers,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body as Customer
      const repo = getRepository<Customer>('Customer')
      const insert = await repo.insert(body)
      return res.json(insert.identifiers)
    } catch (e) {
      return next(e)
    }
  },
)
export { api }
