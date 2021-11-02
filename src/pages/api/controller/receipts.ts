import { NextFunction, Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'
import { Receipt } from '../entity'
import { BucketServices } from '../services/bucket'

export class ReceiptController {
  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { task_id } = req.query
      const receiptRepo = getRepository<Receipt>('Receipt')
      if (task_id) {
        const Receipts = await receiptRepo.find({
          where: { deliverTask: { task_id } },
          relations: ['deliverTask'],
        })
        return res.json(Receipts)
      }

      const receipts = await receiptRepo.find()
      return res.json(receipts)
    } catch (e) {
      next(e)
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { receipt, ref } = req.body as { receipt: Receipt; ref: string }
      const ReceiptRepo = getRepository<Receipt>('Receipt')
      const uuid = uuidv4()

      receipt.receipt_img_url = await BucketServices.uploadMetadata(ref, uuid)

      return res.json(await ReceiptRepo.insert(receipt))
    } catch (e) {
      next(e)
    }
  }
}
