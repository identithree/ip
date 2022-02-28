import { Router } from 'express'
import PrettyResponse from "../../backend/pretty/createRes.js";
const router = Router()

// Pretty Response
// Will make the response look good
router.get('/:ip/pretty', (req, res) => {
  res.setHeader('content-type', 'text/plain')
  if (req.query.emoji === "false") {
    res.send(new PrettyResponse(req.params.ip, true).getGeneratedString())
  } else {
    res.send(new PrettyResponse(req.params.ip).getGeneratedString())
  }
})

export default router
