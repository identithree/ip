import {Router} from 'express'
import PrettyResponse from "../../../../backend/pretty/createRes.js";
import {ipVersion, isIP} from 'is-ip'
import geoip from 'geoip-lite'

const router = Router()

// Pretty Response
// Will make the response look good
router.get('/:ip/pretty', (req, res) => {
  if (!isIP(req.params.ip)) {
    res.status(400)
    res.setHeader('content-type', 'text/plain')
    res.send('The IP provided is not valid! Please check the IP and try again')
  } else {
    res.setHeader('content-type', 'text/plain')
    if (req.query.emoji === "false") {
      res.send(new PrettyResponse(req.params.ip, true).getGeneratedString())
    } else {
      res.send(new PrettyResponse(req.params.ip).getGeneratedString())
    }
  }
})

// Location Response
// Responds with JSON data containing the location of the IP
router.get('/:ip/location', (req, res) => {
  let g = geoip.lookup(req.params.ip)

  if (!isIP(req.params.ip)) {
    res.status(400)
    res.setHeader('content-type', 'text/plain')
    res.send('The IP provided is not valid! Please check the IP and try again')
  } else {
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
router.get('/:ip/timezone', (req, res) => {
  let g = geoip.lookup(req.params.ip)
  if (!isIP(req.params.ip)) {
    res.status(400)
    res.setHeader('content-type', 'text/plain')
    res.send('The IP provided is not valid! Please check the IP and try again')
  } else {
    res.setHeader('content-type', 'text/json')
    res.send({
      timezone: g?.timezone,
      currentTime: new Date().toLocaleString('en-US', { timeZone: g?.timezone })
    })
  }
})

// Version Response
// Gets the current version of the IP (IPv4 or IPv6)
router.get('/:ip/version', (req, res) => {
  let i = req.params.ip
  if (!isIP(i)) {
    res.status(400)
    res.setHeader('content-type', 'text/plain')
    res.send('The IP provided is not valid! Please check the IP and try again')
  } else {
    res.setHeader('content-type', 'text/json')
    res.send({
      version: ipVersion(i),
      humanReadable: `IPv${ipVersion(i)}`
    })
  }
})

export default router
