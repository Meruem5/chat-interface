const express = require('express')
const app = require('express')()
const path = require('path')
const http = require('http').createServer(app)

var io = require('socket.io')(http)

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'))
})

const HTML_DIR = path.join(__dirname, '/public/')
app.use(express.static(HTML_DIR))

io.on('connection', (socket) => {
  console.log('a user connected')
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

http.listen(3000, () => {
  console.log('listening on *:3000')
})
