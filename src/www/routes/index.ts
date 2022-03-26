// Quinn's API Checker - src/www/routes/index.ts
// Written by Quinn Lane - https://quinnlane.dev

// Import necessary libraries
import { Router } from 'express'

// Define router
const router = Router()

// Send to public frontend
router.get('/', ((req, res) => {
  res.render('index', { title: 'Express' })
}))

// Export for use in main file
export default router
