import { NextFunction, Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { Customer } from '../entity'

export default class CustomerController {
  static async get(req: Request, res: Response, next: NextFunction) {
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
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body as Customer
      const repo = getRepository<Customer>('Customer')
      const insert = await repo.insert(body)
      return res.json(insert.identifiers)
    } catch (e) {
      return next(e)
    }
  }
}
