import { Router } from 'express'
import PrettyResponse from "../../backend/pretty/createRes.js";
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

router.get('/just-ip', (req, res) => {
  res.setHeader('content-type', 'text/plain')
  res.send(req.ip)
})

export default router
