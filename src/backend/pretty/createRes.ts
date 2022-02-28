import geoip from 'geoip-lite'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc.js'
import timezone from 'dayjs/plugin/timezone.js'

dayjs.extend(utc)
dayjs.extend(timezone)

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
      s.push(`Location: ${g?.city}, ${g?.region}, ${g?.country} (${g?.ll.join(', ')})`)
      s.push(`Timezone: ${g?.timezone} (${dayjs().tz(g?.timezone, true)})`)
      s.push('')
    } else {
      s.push(`🔗 IP: ${i}`)
      s.push(`🌎 Location: ${g?.city}, ${g?.region}, ${g?.country} (${g?.ll.join(', ')})`)
      s.push(`🕰️ Timezone: ${g?.timezone} (${dayjs().tz(g?.timezone, true)})`)
      s.push('')
    }
  }
}
