import { NextFunction, Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { Customer } from '../entity'

export default class CustomerController {
  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { id }: { id: string } = req.body
      const customerRepo = getRepository<Customer>('Customer')
      if (id) {
        const customers = await customerRepo.query(`select * from customer c
        INNER JOIN project p ON c.customer_id = p.customer_id WHERE c.customer_id = ${Number(
          id,
        )}`)
        // .find({
        //   where: { customer_id: Number(id) },
        //   relations: ['projects'],
        // })
        return res.json(customers)
      }

      const customers = await customerRepo.find({ relations: ['projects'] })
      /**
       * select *, (select count(*) from project pj where pj.customer_id = 2) as count from customer c INNER JOIN project p ON c.customer_id = p.customer_id
       */
      return res.json(customers)
    } catch (e) {
      next(e)
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body as Customer
      const repo = getRepository<Customer>('Customer')
      const insert = await repo.insert(body)
      return res.json(insert.identifiers)
    } catch (e) {
      next(e)
    }
  }
}
