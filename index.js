const app = require('express')()
const path = require('path');
const http = require('http').createServer(app)

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'))
})

http.listen(3000, () => {
  console.log('listening on *:3000')
})
