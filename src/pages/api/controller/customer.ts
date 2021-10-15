import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { Customer } from '../entity'

export default class CustomerController {
  static async get(req: Request, res: Response) {
    const { id }: { id: string } = req.body
    const customerRepo = getRepository<Customer>('Customer')
    if (id) {
      const customers = await customerRepo.find({
        where: { customer_id: Number(id) },
        relations: ['projects'],
      })
      return res.json(customers)
    }
    const customers = await customerRepo.find({ relations: ['projects'] })
    return res.json(customers)
  }

  static async create(req: Request, res: Response) {
    const body = req.body as Customer
    const repo = getRepository<Customer>('Customer')
    const insert = await repo.insert(body)
    return res.json(insert.identifiers)
  }
}
