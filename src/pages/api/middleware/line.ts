import { NextFunction, Request, Response } from 'express'
import axios from 'axios'
import CONFIG from '../config'

export default class LineMiddleware {
  static async isTokenValid(accessToken: string) {
    await axios.get(CONFIG.LINE_VERIFY_LIFF_TOKEN_API + accessToken)
    return true
  }

  static async getProfile(accessToken: string) {
    const headers = {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
    const { data } = await axios.get(CONFIG.LINE_GET_PROFILE_API, headers)
    return {
      lineUserId: data.userId,
      lineDisplayName: data.displayName,
      lineImgUrl: data.pictureUrl,
    }
  }

  static async liffVerify(req: Request, res: Response, next: NextFunction) {
    try {
      const accessToken = req.headers.authorization?.split(' ')[1] || ''
      const isValid = await LineMiddleware.isTokenValid(accessToken)
      if (isValid) {
        const { lineUserId } = await LineMiddleware.getProfile(accessToken)
        req.user = { userId: lineUserId }
        next()
      }
    } catch (e) {
      res.status(403).send('Access Denied')
    }
  }
  // static webhookVerify(req: any, res: Response, next: NextFunction) {
  //     try {
  //         line.middleware(config)(req, res, next)
  //     } catch (e) {
  //         next(e)
  //     }
  // }
}
