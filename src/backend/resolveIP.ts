// Quinn's IP Checker - src/backend/resolveIP.ts
// Written by Quinn Lane - https://quinnlane.dev/

// Import necessary libraries
import { Request } from "express";

// Export default function
export default function (req: Request): string {
  // Grab IP from either cloudflare or the direct server
  let ip = req.headers['cf-connecting-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress || "0.0.0.0"
  // Cleanup IPv4 IPs
  ip = ip.toString().replace('::ffff:', '')

  // Return sanitized IP
  return ip
}