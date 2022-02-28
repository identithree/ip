import { Router } from 'express'
import PrettyResponse from "../../backend/pretty/createRes.js";
import {isIP} from "is-ip";
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

export default router
