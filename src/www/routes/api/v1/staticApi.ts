// Quinn's IP Checker - src/www/routes/api/v1/staticApi.ts
// Written by Quinn Lane - https://quinnlane.dev

// Import necessary libraries
import {Router} from 'express'
import PrettyResponse from '../../../../backend/pretty/createRes.js'
import { WebServiceClient } from "@maxmind/geoip2-node";
import {ipVersion} from 'is-ip'
import resolveIP from "../../../../backend/resolveIP.js";
import {UAParser} from 'ua-parser-js'

// Create express router instance
const router = Router()
// Create instance of MaxMind's WebServiceClient
const gClient = new WebServiceClient('682804', 'G9218jtH01Z749DV', { host: "geolite.info" })

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
router.get('/pretty', async (req, res) => {
  res.setHeader('content-type', 'text/plain')
  // Generate new PrettyResponse
  let p = new PrettyResponse(resolveIP(req), true)
  await p.setUA(req.headers['user-agent']) // Set user agent

  if (req.query.emoji === "false") {
    await p.useEmoji(false) // Disable emoji
    res.send(p.getGeneratedString())
  } else {
    res.send(p.getGeneratedString())
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
router.get('/location', async (req, res) => {
  let g
  try {
    g = await gClient.city(resolveIP(req))
  } catch (e) {
    console.error(e)
  }

  res.setHeader('content-type', 'text/json')
  res.send({
    municipality: {
      city: g?.city?.names.en,
      // @ts-ignore
      region: g?.subdivisions[0]?.names.en,
      country: g?.country?.names.en,
      // @ts-ignore
      humanReadable: `${g?.city?.names.en}, ${g?.subdivisions[0]?.names.en}, ${g?.country?.names.en}`
    },
    latitude: g?.location?.latitude,
    longitude: g?.location?.longitude
  })
})

// Timezone Response
// Gets the timezone and current date and time for a location derived from an IP.
router.get('/timezone', async (req, res) => {
  let g
  try {
    g = await gClient.city(resolveIP(req))
  } catch (e) {
    console.error(e)
  }

  res.setHeader('content-type', 'text/json')
  res.send({
    timezone: g?.location?.timeZone,
    currentTime: new Date().toLocaleString('en-US', { timeZone: g?.location?.timeZone })
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
