// Quinn's IP Checker - src/backend/pretty/createRes.ts
// Written by Quinn Lane - https://quinnlane.dev

// Import necessary libraries
import { WebServiceClient } from "@maxmind/geoip2-node";
import {ipVersion} from "is-ip";
import {Configuration} from "../../configuration/config.js";

// Grab configuration
const config = new Configuration().getConfiguration()

// Define and export main pretty response class
export default class PrettyResponse {
  // Define arguments and necessary class-specific variables
  private readonly ip: string // Stores IP
  private readonly fromStaticAPI: boolean // Stores whether the request came from the static API or not, allows addition of user agent field
  private generatedString: string[] // Stores the string as it is being made
  private emoji: boolean // Stores whether to send emoji in the response
  private ua: string | undefined // Stores user agent if specified by this.setUA()

  // Class Constructor
  constructor(ip: string, fromStaticAPI: boolean) {
    // Define class arguments
    this.ip = ip
    this.fromStaticAPI = fromStaticAPI

    this.useEmoji(true)
  }

  // Return generated string
  public getGeneratedString() {
    return this.generatedString.join('\n')
  }

  // Set the user agent
  public async setUA(ua: string | undefined) {
    this.ua = ua

    await this.generateString() // Regenerate string with
  }

  // Whether to use emojis or not
  public async useEmoji(state: boolean) {
    this.emoji = state
    await this.generateString() // Regenerate string with or without emojis
  }

  // Generate string
  public async generateString() {
    // Cleanup any previous attempts
    this.generatedString = []

    // Define variable shortcuts
    let s = this.generatedString
    let i = this.ip

    // GeoIP Lookup specified IP
    const gClient = new WebServiceClient(config.geoIP.accountID.toString(), config.geoIP.license, { host: "geolite.info" })
    let g
    try {
      g = await gClient.city(i)
    } catch (e) {
      console.error(e)
    }

    // Create temporary objects for info lines
    let ip = []
    let version = []
    let location = []
    let timezone = []
    let userAgent = []

    // Start the string
    s.push('')
    s.push('================================')
    s.push('')
    s.push(`Viewing IP information for ${i}`)
    s.push('')

    // Add emoji if the user specifies.
    if (this.emoji) {
      ip.push('🔗')
      version.push('📦')
      location.push('🌎')
      timezone.push('🕖')
      userAgent.push('👤')
    }

    // Add information to arrays
    ip.push(`IP: ${i}`)
    version.push(`Version: IPv${ipVersion(i)?.toString()}`)
    // @ts-ignore 
    location.push(`Location: ${g?.city?.names.en}, ${g?.subdivisions[0]?.names.en}, ${g?.country?.names.en} (${g?.location?.latitude}, ${g?.location?.longitude})`)
    timezone.push(`Timezone: ${g?.location?.timeZone} (${new Date().toLocaleString('en-US', { timeZone: g?.location?.timeZone })})`)
    userAgent.push(`User Agent: ${this.ua}`)

    // Push completed strings to main string array
    s.push(ip.join(' '))
    s.push(version.join(' '))
    s.push(location.join(' '))
    s.push(timezone.join(' '))
    if (this.fromStaticAPI) s.push(userAgent.join(' '))
  }
}
