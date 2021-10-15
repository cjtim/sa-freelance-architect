import { NextFunction, Request, Response, Router } from 'express'
import { getRepository } from 'typeorm'
import { apiEndpoints } from '@/config'
import { BucketServices } from '../services/bucket'
import { FileList } from '../entity'
import ProjectController from '../controller/project'
import CustomerController from '../controller/customer'
import FurnitureController from '../controller/furniture'

const api = Router()

// Project
api.get(apiEndpoints.projects, ProjectController.get)
api.post(apiEndpoints.projects, ProjectController.create)

// Customer
api.get(apiEndpoints.customers, CustomerController.get)
api.post(apiEndpoints.customers, CustomerController.create)

// Furniture
api.get(apiEndpoints.furnitures, FurnitureController.get)
api.post(apiEndpoints.furnitures, FurnitureController.create)

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

export { api }
