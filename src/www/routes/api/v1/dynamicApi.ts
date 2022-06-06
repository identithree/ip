// Quinn's IP Checker - src/www/routes/api/v1/dynamicApi.ts
// Written by Quinn Lane - https://quinnlane.dev

// Import necessary functions
import {Router} from 'express'
import PrettyResponse from "../../../../backend/pretty/createRes.js";
import {ipVersion, isIP} from 'is-ip'
import { WebServiceClient } from "@maxmind/geoip2-node";
import resolveIP from "../../../../backend/resolveIP";

// Define express router
const router = Router()
// Create instance of MaxMind's WebServiceClient
const gClient = new WebServiceClient('682804', 'G9218jtH01Z749DV', { host: "geolite.info" })

// ----------------
//  API Routes
// ----------------

// Pretty Response
// Will make the response look good
// Find more information on the wiki at https://gitlab.com/Identithree/ip/-/wikis/dynamic-api#apiippretty-link
router.get('/:ip/pretty', async (req, res) => {
  if (!isIP(req.params.ip)) {
    // Return HTTP code 400 if invalid IP
    res.status(400)
    res.setHeader('content-type', 'text/plain')
    res.send('The IP provided is not valid! Please check the IP and try again')
  } else {
    res.setHeader('content-type', 'text/plain')
    // Create new PrettyResponse
    let p = new PrettyResponse(req.params.ip, false)

    if (req.query.emoji === "false") {
      await p.useEmoji(false) // Disable emoji
      res.send(p.getGeneratedString())
    } else {
      res.send(p.getGeneratedString())
    }
  }
})

// Location Response
// Responds with JSON data containing the location of the IP
// Find more information on the wiki at https://gitlab.com/Identithree/ip/-/wikis/dynamic-api#apiiplocation-link
router.get('/:ip/location', async (req, res) => {
  let g
  try {
    g = await gClient.city(req.params.ip)
  } catch (e) {
    console.error(e)
  }

  if (!isIP(req.params.ip)) {
    // Return HTTP code 400 if invalid IP
    res.status(400)
    res.setHeader('content-type', 'text/plain')
    res.send('The IP provided is not valid! Please check the IP and try again')
  } else {
    // Send proper response containing requested data
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
  }
})

// Timezone Response
// Gets the timezone and current date and time for a location derived from an IP.
// Find more information on the wiki at https://gitlab.com/Identithree/ip/-/wikis/dynamic-api#apiiptimezone-link
router.get('/:ip/timezone', async (req, res) => {
  let g
  try {
    g = await gClient.city(req.params.ip)
  } catch (e) {
    console.error(e)
  }

  if (!isIP(req.params.ip)) {
    // Return HTTP code 400 if invalid IP
    res.status(400)
    res.setHeader('content-type', 'text/plain')
    res.send('The IP provided is not valid! Please check the IP and try again')
  } else {
    // Send proper response containing requested data
    res.setHeader('content-type', 'text/json')
    res.send({
      timezone: g?.location?.timeZone,
      currentTime: new Date().toLocaleString('en-US', { timeZone: g?.location?.timeZone })
    })
  }
})

// Version Response
// Gets the current version of the IP (IPv4 or IPv6)
// Find more information on the wiki at https://gitlab.com/Identithree/ip/-/wikis/dynamic-api#apiipversion-link
router.get('/:ip/version', (req, res) => {
  let i = req.params.ip

  if (!isIP(i)) {
    // Return HTTP code 400 if invalid IP
    res.status(400)
    res.setHeader('content-type', 'text/plain')
    res.send('The IP provided is not valid! Please check the IP and try again')
  } else {
    // Send proper response containing requested data
    res.setHeader('content-type', 'text/json')
    res.send({
      version: ipVersion(i),
      humanReadable: `IPv${ipVersion(i)}`
    })
  }
})

// Export for use in main file
export default router
