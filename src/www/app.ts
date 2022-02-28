import express from 'express'
import path from 'path'
import cookie from 'cookie-parser'
import morgan from 'morgan'

import indexRouter from './routes/index.js'
import staticApiRouter from './routes/staticApi.js'
import dynamicApiRouter from './routes/dynamicApi.js'

const app = express()
const dirname = path.dirname(new URL(import.meta.url).pathname)

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookie())
app.use(express.static(path.join(dirname, '../../public')))

app.use('/', indexRouter)
app.use('/api', staticApiRouter)
app.use('/api', dynamicApiRouter)

export default app
