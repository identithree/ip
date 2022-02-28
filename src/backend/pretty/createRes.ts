import geoip from 'geoip-lite'
import { ipVersion } from "is-ip";

export default class PrettyResponse {
  private readonly ip: string
  private readonly noEmoji: boolean | undefined
  private readonly generatedString: string[]

  constructor(ip: string, noEmoji?: boolean) {
    this.ip = ip
    this.noEmoji = noEmoji

    this.generatedString = []

    this.generateString()
  }

  public getGeneratedString() {
    return this.generatedString.join('\n')
  }

  private generateString() {
    let s = this.generatedString
    let i = this.ip
    let g = geoip.lookup(i)

    s.push('')
    s.push('================================')
    s.push('')
    s.push(`Viewing IP information for ${i}`)
    s.push('')
    if (this.noEmoji) {
      s.push(`IP: ${i}`)
      s.push(`Version: IPv${ipVersion(i)?.toString()}`)
      s.push(`Location: ${g?.city}, ${g?.region}, ${g?.country} (${g?.ll.join(', ')})`)
      s.push(`Timezone: ${g?.timezone} (${new Date().toLocaleString('en-US', { timeZone: g?.timezone })})`)
      s.push('')
    } else {
      s.push(`🔗 IP: ${i}`)
      s.push(`📦 Version: IPv${ipVersion(i)?.toString()}`)
      s.push(`🌎 Location: ${g?.city}, ${g?.region}, ${g?.country} (${g?.ll.join(', ')})`)
      s.push(`🕖 Timezone: ${g?.timezone} (${new Date().toLocaleString('en-US', { timeZone: g?.timezone })})`)
      s.push('')
    }
  }
}
