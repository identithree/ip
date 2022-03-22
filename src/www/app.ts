import express from 'express'
import path from 'path'
import cookie from 'cookie-parser'
import morgan from 'morgan'

import indexRouter from './routes/index.js'
import staticApiRouter from './routes/api/v1/staticApi.js'
import dynamicApiRouter from './routes/api/v1/dynamicApi.js'

const app = express()
const dirname = path.dirname(new URL(import.meta.url).pathname)

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookie())
app.use(express.static(path.join(dirname, '../../public')))

app.use('/', indexRouter)
app.use('/api/v1', staticApiRouter)
app.use('/api/v1', dynamicApiRouter)

export default app
