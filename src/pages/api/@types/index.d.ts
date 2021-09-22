import 'express'

interface IUser {
  userId: string
  displayName: string
  pictureUrl: string
}
declare global {
  namespace Express {
    interface Request {
      user: IUser
    }
  }
}
