import { NextFunction, Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { ProjectFurniture } from '../entity'

export class ProjectFurnitureController {
  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { project_id } = req.query
      const pjFurRepo = getRepository<ProjectFurniture>('ProjectFurniture')
      if (project_id) {
        const contracts = await pjFurRepo.find({
          where: {
            project: { project_id: Number(project_id) },
          },
          relations: ['project', 'furniture'],
        })
        return res.json(contracts || [])
      }
      res.sendStatus(400)
    } catch (e) {
      next(e)
    }
  }

  static async upsert(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        furniture_ids,
        project_id,
      }: {
        furniture_ids: number[]
        project_id: number
      } = req.body
      const repo = getRepository<ProjectFurniture>('ProjectFurniture')
      // Clear all fur with project_id
      if (project_id) {
        await repo.delete({ project: { project_id } })
      }
      // insert new one
      const json = await repo.insert(
        furniture_ids.map((i) => ({
          furniture: { furniture_id: i },
          project: { project_id },
        })),
      )
      return res.json(json)
    } catch (e) {
      next(e)
    }
  }
}
