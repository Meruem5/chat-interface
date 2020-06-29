const main = function () {
  const socket = io('http://35.157.80.184:8080/')
  const formElement = document.getElementById('submitButton')
  const nickElement = document.getElementById('nick')
  const messageElement = document.getElementById('messageInput')

  nickElement.defaultValue = 'Guest'

  function addMessage (myMessage, message) {
    var node = document.createElement('LI')

    if (myMessage) {
      node.className = 'pullRight'
      node.innerHTML = message.message
    } else {
      node.innerHTML = `${message.user}: ${message.message}`
    }

    document.getElementById('messages').appendChild(node)
  }

  formElement.addEventListener('submit', (event) => {
    event.preventDefault()

    const message = {
      message: messageElement.value,
      user: nickElement.value
    }
    socket.emit('message', message)

    addMessage(true, message)
    messageElement.value = ''
    return false
  }, false)

  socket.on('message', (message) => {
    /**
     * Here I could add some better checks for the user name but that's just not
     * the way it should be done. In real life we want to broadcast.emit these kind of
     * messages (I think at least) or we can check for userId-s that are coming back
     * from the emit.
     *
     * I was thinking to concat some generated ID to the name and use that as a unique
     * key due to name duplication but then decided that it's ugly.
     */
    if (message.user !== nickElement.value) {
      addMessage(false, message)
      window.scrollTo(0, document.body.scrollHeight)
    }
  })
}

main()
