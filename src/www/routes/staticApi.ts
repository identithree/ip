import {Router} from 'express'
import PrettyResponse from "../../backend/pretty/createRes.js";
import {lookup} from "geoip-lite";
import {isIP} from "is-ip";

const router = Router()

// Root Redirection
// Will redirect people to the main site if they
router.get('/', (req, res) => {
  res.redirect("../")
})

// Pretty Response
// Will make the response look good
router.get('/pretty', (req, res) => {
  res.setHeader('content-type', 'text/plain')
  if (req.query.emoji === "false") {
    res.send(new PrettyResponse(req.ip, true).getGeneratedString())
  } else {
    res.send(new PrettyResponse(req.ip).getGeneratedString())
  }
})

// Just IP Response
// Self-explanatory
router.get('/just-ip', (req, res) => {
  res.setHeader('content-type', 'text/plain')
  res.send(req.ip)
})

// Location Response
// Responds with JSON data containing the location of the IP
router.get('/location', (req, res) => {
  let g = lookup(req.ip)
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

export default router
