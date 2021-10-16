import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'
import { FileList } from '../entity'
import { BucketServices } from '../services/bucket'

export default class FileListController {
  static async get(req: Request, res: Response) {
    const { project_id } = req.query
    const fileRepo = getRepository<FileList>('FileList')
    if (project_id) {
      const json = await fileRepo.find({ where: { project: { project_id } } })
      return res.json(json)
    }
    return res.json(await fileRepo.find({ where: { project: { project_id } } }))
  }

  static async create(req: Request, res: Response) {
    const { ref, fileList }: { fileList: FileList; ref: string } = req.body
    const uuid = uuidv4()
    const fileRepo = getRepository<FileList>('FileList')
    const url = await BucketServices.uploadMetadata(ref, uuid)
    const result = await fileRepo.insert({
      ...fileList,
      url,
    })
    return res.json(result)
  }

  static async delete(req: Request, res: Response) {
    const { file_id }: { file_id: number } = req.body
    const repo = getRepository<FileList>('FileList')
    await repo.delete(file_id)
    return res.sendStatus(200)
  }
}
