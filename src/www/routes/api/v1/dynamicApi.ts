// Quinn's IP Checker - src/www/routes/api/v1/dynamicApi.ts
// Written by Quinn Lane - https://quinnlane.dev

// Import necessary functions
import {Router} from 'express'
import PrettyResponse from "../../../../backend/pretty/createRes.js";
import {ipVersion, isIP} from 'is-ip'
import geoip from 'geoip-lite'

// Define express router
const router = Router()

// ----------------
//  API Routes
// ----------------

// Pretty Response
// Will make the response look good
// Find more information on the wiki at https://gitlab.com/Identithree/ip/-/wikis/dynamic-api#apiippretty-link
router.get('/:ip/pretty', (req, res) => {
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
      p.useEmoji(false) // Disable emoji
      res.send(p.getGeneratedString())
    } else {
      res.send(p.getGeneratedString())
    }
  }
})

// Location Response
// Responds with JSON data containing the location of the IP
// Find more information on the wiki at https://gitlab.com/Identithree/ip/-/wikis/dynamic-api#apiiplocation-link
router.get('/:ip/location', (req, res) => {
  let g = geoip.lookup(req.params.ip)

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
        city: g?.city,
        region: g?.region,
        country: g?.country,
        humanReadable: `${g?.city}, ${g?.region}, ${g?.country}`
      },
      latitude: g?.ll[0],
      longitude: g?.ll[1]
    })
  }
})

// Timezone Response
// Gets the timezone and current date and time for a location derived from an IP.
// Find more information on the wiki at https://gitlab.com/Identithree/ip/-/wikis/dynamic-api#apiiptimezone-link
router.get('/:ip/timezone', (req, res) => {
  let g = geoip.lookup(req.params.ip)

  if (!isIP(req.params.ip)) {
    // Return HTTP code 400 if invalid IP
    res.status(400)
    res.setHeader('content-type', 'text/plain')
    res.send('The IP provided is not valid! Please check the IP and try again')
  } else {
    // Send proper response containing requested data
    res.setHeader('content-type', 'text/json')
    res.send({
      timezone: g?.timezone,
      currentTime: new Date().toLocaleString('en-US', { timeZone: g?.timezone })
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
