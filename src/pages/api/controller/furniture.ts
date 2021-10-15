import { NextFunction, Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { Furniture } from '../entity'

export default class FurnitureController {
  static async get(req: Request, res: Response, next: NextFunction) {
    try {
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
    } catch (e) {
      return next(e)
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body as Furniture
      const repo = getRepository<Furniture>('Furniture')
      const insert = await repo.insert(body)
      return res.json(insert.identifiers)
    } catch (e) {
      return next(e)
    }
  }
}
