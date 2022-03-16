import { Request } from "express";

export default function (req: Request): string {
  let ip = req.headers['cf-connecting-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress || "0.0.0.0"
  ip = ip.toString().replace('::ffff:', '')

  return ip
}