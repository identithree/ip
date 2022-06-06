// Quinn's IP Checker - src/configuration/config.ts
// Written by Quinn Lane - https://quinnlane.dev

// Import necessary files
import {IConfiguration} from "../typescript/interfaces";
import {config} from "dotenv";

// Give process.env the environment variables from .env
config()

// Create Configuration class
export class Configuration {
  private env = process.env
  private configuration: IConfiguration = {
    geoIP: {
      accountID: 0,
      license: ""
    }
  }

  constructor() {
    this.refreshConfiguration()
  }

  public checkVariables(): void {
    // Code provided by ItsArnob - https://itsarnob.github.io/
    const requiredVariables = [
      // GeoIP Variables
      'GEO_ACCOUNTID',
      'GEO_LICENSE'
    ];
    const errors: string[] = [];
    requiredVariables.forEach((property) => {
      if (!this.env[property]?.trim()) {
        errors.push(property);
      }
    });
    if (errors.length) {
      throw new Error(`Missing the following REQUIRED environment variables: ${errors.join(", ")}`);
    }
  }

  // Refresh config with new variables
  public refreshConfiguration(): void {
    // Validate all configuration variables
    this.checkVariables()

    // Database Configuration
    this.configuration.geoIP.accountID = parseInt(<string>this.env.GEO_ACCOUNTID)
    this.configuration.geoIP.license = <string>this.env.GEO_LICENSE
  }

  public getConfiguration(): IConfiguration {
    return this.configuration
  }
}
