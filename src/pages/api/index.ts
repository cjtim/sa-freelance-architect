import express from 'express'
import { api } from './router'

const app = express()

app.use((req, res, next) => {
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate')
  next()
})

app.use('/api', api)

module.exports = app
