// Quinn's IP Checker - src/backend/pretty/createRes.ts
// Written by Quinn Lane - https://quinnlane.dev

// Import necessary libraries
import geoip from 'geoip-lite'
import {ipVersion} from "is-ip";

// Define and export main pretty response class
export default class PrettyResponse {
  // Define arguments and necessary class-specific variables
  private readonly ip: string // Stores IP
  private readonly noEmoji: boolean | undefined // Stores whether to send emoji in the response
  private readonly generatedString: string[] // Stores the string as it is being made

  // Class Constructor
  constructor(ip: string, noEmoji?: boolean) {
    // Define class arguments
    this.ip = ip
    this.noEmoji = noEmoji

    // Define required variables
    this.generatedString = []

    // Start string generation
    this.generateString()
  }

  // Return generated string
  public getGeneratedString() {
    return this.generatedString.join('\n')
  }

  // Generate string
  private generateString() {
    // Define variable shortcuts
    let s = this.generatedString
    let i = this.ip

    // GeoIP Lookup specified IP
    let g = geoip.lookup(i)

    // Create temporary objects for info lines
    let ip = []
    let version = []
    let location = []
    let timezone = []

    // Start the string
    s.push('')
    s.push('================================')
    s.push('')
    s.push(`Viewing IP information for ${i}`)
    s.push('')

    // Add emoji if the user specifies.
    if (!this.noEmoji) {
      ip.push('🔗')
      version.push('📦')
      location.push('🌎')
      timezone.push('🕖')
    }

    // Add information to arrays
    ip.push(`IP: ${i}`)
    version.push(`Version: IPv${ipVersion(i)?.toString()}`)
    location.push(`Location: ${g?.city}, ${g?.region}, ${g?.country} (${g?.ll.join(', ')})`)
    timezone.push(`Timezone: ${g?.timezone} (${new Date().toLocaleString('en-US', { timeZone: g?.timezone })})`)

    // Push completed strings to main string array
    s.push(ip.join(' '))
    s.push(version.join(' '))
    s.push(location.join(' '))
    s.push(timezone.join(' '))
  }
}
