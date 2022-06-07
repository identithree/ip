// Quinn's API Checker - src/www/routes/index.ts
// Written by Quinn Lane - https://quinnlane.dev

// Import necessary libraries
import { Router } from 'express'
import { dirname, join } from 'path'
import PrettyResponse from "../../backend/pretty/createRes.js";
import resolveIP from "../../backend/resolveIP.js";

// Define router
const router = Router()
// ES6+ __dirname replacement
const _dirname = dirname(new URL(import.meta.url).pathname)

// Send to public frontend
router.get('/', async (req, res) => {
  if (req.headers['user-agent']?.includes('curl') || req.headers['user-agent']?.includes('HTTPie')) {
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
  } else {
    res.setHeader('content-type', 'text/html')
    res.sendFile(join(_dirname, '../../../public/index.html'))
  }
})

// Export for use in main file
export default router
