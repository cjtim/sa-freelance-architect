import { Request, Response, Router } from 'express'
import { v4 } from 'uuid'

const api = Router()

api.get('/', (req: Request, res: Response) => {
  const path = `/api/item/${v4()}`
  res.setHeader('Content-Type', 'text/html')
  res.end(`Hello! Go to item: <a href="${path}">${path}</a>`)
})

api.get('/item/:slug', (req, res) => {
  const { slug } = req.params
  res.json({ item: slug })
})

export { api }
