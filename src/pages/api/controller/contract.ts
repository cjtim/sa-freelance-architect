import { NextFunction, Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { Contract } from '../entity'

export class ContractController {
  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { project_id } = req.query
      const contractRepo = getRepository<Contract>('Contract')
      if (project_id) {
        const contract = await contractRepo.findOne({
          where: { project: { project_id } },
          relations: ['project'],
        })
        return res.json(contract || {})
        // .query(`
        //   select * from contract c
        //   INNER JOIN project p ON c.project_id = p.project_id where c.project_id = ${project_id}
        // `)
        // if (contracts[0]) {
        //   return res.json(contracts[0] || {})
        // }
      }
      const customers = await contractRepo.find()

      return res.json(customers)
    } catch (e) {
      next(e)
    }
  }

  static async upsert(req: Request, res: Response, next: NextFunction) {
    try {
      const contract: Contract = req.body
      const contractRepo = getRepository<Contract>('Contract')
      if (contract?.contract_id) {
        const json = await contractRepo.update(contract.contract_id, contract)
        return res.json(json)
      }
      // create
      const json = await contractRepo.insert(contract)
      res.json(json)
    } catch (e) {
      next(e)
    }
  }
}
