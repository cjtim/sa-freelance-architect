import { NextFunction, Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { Architect, Project } from '../entity'

export default class ProjectController {
  static async get(req: Request, res: Response, next: NextFunction) {
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
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body as Project
      const repo = getRepository<Project>('Project')
      const arRepo = getRepository<Architect>('Architect')
      let architect = await arRepo.findOne({
        where: { lineUid: req.user.userId },
      })
      if (!architect) {
        architect = arRepo.create({
          lineUid: req.user.userId,
          name: req.user.displayName,
          phone: '0000000000',
        })
        architect = await arRepo.save(architect)
      }
      const insert = await repo.insert({ ...body, architect })
      return res.json(insert.identifiers)
    } catch (e) {
      return next(e)
    }
  }
}