// Quinn's IP Checker - src/www/routes/api/v1/staticApi.ts
// Written by Quinn Lane - https://quinnlane.dev

// Import necessary libraries
import {Router} from 'express'
import PrettyResponse from '../../../../backend/pretty/createRes.js'
import geoip from 'geoip-lite'
import {ipVersion} from 'is-ip'
import resolveIP from "../../../../backend/resolveIP.js";
import {UAParser} from 'ua-parser-js'

// Create express router instance
const router = Router()

// ----------------
//  API Routes
// ----------------

// Root Redirection
// Will redirect people to the main site if they access the root api link
// Find more information on the wiki at
router.get('/', (req, res) => {
  res.redirect("../")
})

// Pretty Response
// Will make the response look good
router.get('/pretty', (req, res) => {
  res.setHeader('content-type', 'text/plain')
  if (req.query.emoji === "false") {
    res.send(new PrettyResponse(resolveIP(req), true).getGeneratedString())
  } else {
    res.send(new PrettyResponse(resolveIP(req)).getGeneratedString())
  }
})

// Just IP Response
// Self-explanatory
router.get('/just-ip', (req, res) => {
  res.setHeader('content-type', 'text/plain')
  res.send(resolveIP(req))
})

// Location Response
// Responds with JSON data containing the location of the IP
router.get('/location', (req, res) => {
  let g = geoip.lookup(resolveIP(req))
  res.setHeader('content-type', 'text/json')
  res.send({
    municipality: {
      city: g?.city,
      region: g?.region,
      country: g?.country,
      humanReadable: `${g?.city}, ${g?.region}, ${g?.country}`
    },
    latitude: g?.ll[0],
    longitude: g?.ll[1]
  })
})

// Timezone Response
// Gets the timezone and current date and time for a location derived from an IP.
router.get('/timezone', (req, res) => {
  let g = geoip.lookup(resolveIP(req))
  res.setHeader('content-type', 'text/json')
  res.send({
    timezone: g?.timezone,
    currentTime: new Date().toLocaleString('en-US', { timeZone: g?.timezone })
  })
})

// Version Response
// Gets the current version of the IP (IPv4 or IPv6)
router.get('/version', (req, res) => {
  let i = resolveIP(req)
  res.setHeader('content-type', 'text/json')
  res.send({
    version: ipVersion(i),
    humanReadable: `IPv${ipVersion(i)}`
  })
})

// User Agent Response
// Gets the current user agent, parses it, and returns a pretty response.
router.get('/useragent', (req, res) => {
  let agent = new UAParser(req.headers['user-agent'])

  res.setHeader('content-type', 'text/json')
  res.send({
    humanReadable: {
      browser: `${agent.getBrowser().name} ${agent.getBrowser().version}`,
      engine: `${agent.getEngine().name} ${agent.getEngine().version}`,
      os: `${agent.getOS().name} ${agent.getOS().version}`,
      type: `${agent.getDevice().type}`,
      model: `${agent.getDevice().vendor} ${agent.getDevice().model}`,
      cpu: `${agent.getCPU().architecture}`
    },
    parserOutput: agent.getResult()
  })
})

// Export for use in main file
export default router
