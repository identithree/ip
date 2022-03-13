(async () => {
  // Get IP
  const ipResponse = await fetch('/api/just-ip', {
    method: 'get'
  })
  document.getElementById('ip').innerHTML = await ipResponse.text()

  // Get location data
  const locResponse = await fetch('/api/location', {
    method: 'get'
  })
  document.getElementById('loc').innerHTML = JSON.parse(await locResponse.text()).municipality.humanReadable
})();