// Quinn's IP Checker - src/www/app.ts
// Written by Quinn Lane - https://quinnlane.dev

// Import necessary libraries
import express from 'express'
import path from 'path'
import cookie from 'cookie-parser'
import morgan from 'morgan'

// Import routers
import indexRouter from './routes/index.js'
import staticApiRouter from './routes/api/v1/staticApi.js'
import dynamicApiRouter from './routes/api/v1/dynamicApi.js'

// Define express application
const app = express()
// ES6+ __dirname replacement
const dirname = path.dirname(new URL(import.meta.url).pathname)

// Specify Express middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookie())

// Specify static directory
app.use(express.static(path.join(dirname, '../../public')))

// Routing
app.use('/', indexRouter) // Public frontend (e.g. https://ip.id3.rest/)
app.use('/api/v1', staticApiRouter) // Static API
app.use('/api/v1', dynamicApiRouter) // Dynamic API

// API Root Redirection
// Will send users who visit the root directory to the API documentation
app.get('/api', (req, res) => {
  res.redirect('https://gitlab.com/Identithree/ip/-/wikis/api') // Sends users to a hidden wiki page that is just a landing to go to the static or dynamic API pages.
})

// Export for use in server.ts
export default app
