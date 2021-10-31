import { NextFunction, Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { DeliverTask } from '../entity'

export default class DeliverTaskController {
  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { project_id, task_id } = req.query
      const deliverRepo = getRepository<DeliverTask>('DeliverTask')
      if (task_id) {
        const deliverTask = await deliverRepo.findOne(Number(task_id))
        return res.json(deliverTask)
      }

      if (project_id) {
        const deliverTasks = await deliverRepo.find({
          where: { project: { project_id: Number(project_id) } },
        })
        return res.json(deliverTasks)
      }

      const deliverTasks = await deliverRepo.find()
      return res.json(deliverTasks)
    } catch (e) {
      next(e)
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body as DeliverTask
      const deliverRepo = getRepository<DeliverTask>('DeliverTask')

      // if task_id exist update
      if (body.task_id) {
        const result = await deliverRepo.update(body.task_id, body)
        return res.json(result)
      }

      // create new one
      const insert = await deliverRepo.insert(body)
      return res.json(insert.identifiers)
    } catch (e) {
      next(e)
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { task_id } = req.query
      const deliverRepo = getRepository<DeliverTask>('DeliverTask')
      const insert = await deliverRepo.delete(task_id as string)
      return res.json(insert.affected)
    } catch (e) {
      next(e)
    }
  }
}
