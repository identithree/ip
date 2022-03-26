// Define asynchronous function to get data from API
(async () => {
  try {
    // Get IP
    const ipResponse = await fetch('/api/v1/just-ip', {
      method: 'get'
    })
    document.getElementById('ip').innerHTML = await ipResponse.text()

    // Get location data
    const locResponse = await fetch('/api/v1/location', {
      method: 'get'
    })
    document.getElementById('loc').innerHTML = JSON.parse(await locResponse.text()).municipality.humanReadable

    // Get browser
    const browserResponse = await fetch('/api/v1/useragent', {
      method: 'get'
    })
    document.getElementById('browser').innerHTML = JSON.parse(await browserResponse.text()).humanReadable.browser
  } catch (e) {
    // Return error if cannot connect to API for whatever reason. Should not happen under normal circumstances.
    document.getElementById("ip_str").innerHTML = "<strong>Error:</strong> For whatever reason, we could not make connection to API!"
  }
})();