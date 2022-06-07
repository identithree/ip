# Quinn's IP Checker
A simple application that shows your (or any other that you feed into the system) IP and info about said IP.

## Demo
Demos will go here once they are created.

## Authors
- [Quinn Lane (@Identithree)](https://www.gitlab.com/Identithree)

## Contributing
Contributions are always welcome!

See [our contribution guide](CONTRIBUTING.md) for ways to get started.
Also, please make sure that you are adhering to this project's [code of conduct](CODE_OF_CONDUCT.md).

## License
This application is licensed under the [BSD 3-Clause License](LICENSE).
If you are not a legal expert, [TL;DRLegal](https://tldrlegal.com/license/bsd-3-clause-license-(revised)) has a great explaination of the license.

## Acknowledgements
 - Thank you to [MaxMind](https://www.maxmind.com/en/home) for providing the geolocation data through GeoLite2
 - This application uses multiple libraries for accomplishing its goals, many of which have differing licenses. To comply with said licenses, and to make the lawyers go away, a copy of each license has been [included](THIRD_PARTY_LIBRARIES.md) with the software.

## Environment Variables
The environment variables `GEO_ACCOUNTID` and `GEO_LICENSE`. These correspond to your MaxMind account ID and your license for GeoLite2 respectively.

## Run Locally
1. Clone the project
```bash
  git clone https://gitlab.com/Identithree/ip
  # OR if you use glab cli
  glab repo clone https://gitlab.com/Identithree/ip
```

2. Go to the project directory
```bash
  cd ip
```

3. Install dependencies
```bash
  yarn install
```

4. Rename `template.env` to `.env` and fill in your details

5. Build and start the server
```bash
  yarn run build
  yarn run start
```

## Deployment
Coming Soon™

## API Reference
We have two public APIs that are available for use. One is [static](https://gitlab.com/Identithree/ip/-/wikis/static-api) and the other is [dynamic](https://gitlab.com/Identithree/ip/-/wikis/dynamic-api). Both share most common functionality except for a few key differences discussed on the wiki in full detail.

## Documentation
We host documentation via the [integrated wiki](https://gitlab.com/Identithree/ip/-/wikis/home)

## Support
For support, email [our service desk](mailto:contact-project+identithree-ip-34059236-issue-@incoming.gitlab.com?subject=%E2%9D%93%20Support%20-%20Quinn's%20IP%20Checker) or submit an issue on our [issue tracker](https://gitlab.com/Identithree/ip/-/issues).
Both will funnel into the issue tracker.
