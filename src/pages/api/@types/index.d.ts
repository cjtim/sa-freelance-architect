// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as express from 'express'

interface IUser {
  userId: string
}
declare global {
  namespace Express {
    interface Request {
      user: IUser
    }
  }
}
