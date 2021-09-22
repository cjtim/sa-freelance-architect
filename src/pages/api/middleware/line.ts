import { NextFunction, Request, Response } from 'express'
import axios from 'axios'
import CONFIG from '../config'
import { IUser } from '../@types'

export default class LineMiddleware {
  static async isTokenValid(accessToken: string): Promise<boolean> {
    const { status } = await axios.get(
      CONFIG.LINE_VERIFY_LIFF_TOKEN_API + accessToken,
    )
    return status === 200
  }

  static async getProfile(accessToken: string): Promise<IUser> {
    const headers = {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
    const { data } = await axios.get<IUser>(
      CONFIG.LINE_GET_PROFILE_API,
      headers,
    )
    return data
  }

  static async liffVerify(req: Request, res: Response, next: NextFunction) {
    try {
      const accessToken = req.headers.authorization?.split(' ')[1] || ''
      const isValid = await LineMiddleware.isTokenValid(accessToken)
      if (isValid) {
        req.user = await LineMiddleware.getProfile(accessToken)
        return next()
      }
      throw Error('invalid token')
    } catch (e) {
      return res.status(403).send('Access Denied')
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
