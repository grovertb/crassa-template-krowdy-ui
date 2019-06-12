const proxy = require('http-proxy-middleware')

module.exports = function(app) {
  const port = REACT_APP_PORT_SERVER || 5000
  app.use(proxy('/api', { target: `http://localhost:${port}/` }))
}
