import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'
import { Furniture } from '../entity'
import { BucketServices } from '../services/bucket'

export default class FurnitureController {
  static async get(req: Request, res: Response) {
    const { id }: { id: string } = req.body
    const furnitureRepo = getRepository<Furniture>('Furniture')
    if (id) {
      const customers = await furnitureRepo.find({
        where: { customer_id: Number(id) },
      })
      return res.json(customers)
    }
    const furniture = await furnitureRepo.find()
    return res.json(furniture)
  }

  static async create(req: Request, res: Response) {
    const { furniture, ref }: { furniture: Furniture; ref: string } = req.body

    const uuid = uuidv4()
    furniture.img = await BucketServices.uploadMetadata(ref, uuid)

    const repo = getRepository<Furniture>('Furniture')
    const insert = await repo.insert(furniture)
    return res.json(insert.identifiers)
  }

  static async delete(req: Request, res: Response) {
    const { furniture_id }: { furniture_id: number } = req.body
    const repo = getRepository<Furniture>('Furniture')
    const furniture = await repo.findOne(furniture_id)
    if (furniture && furniture.img) {
      BucketServices.deleteFileFromUrl(furniture.img)
    }
    await repo.delete(furniture_id)
    return res.sendStatus(200)
  }
}
