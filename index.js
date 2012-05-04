var repl = require('repl')
  , net = require('net')
  , secret = ''

function remoteRepl (type, opts) {
  opts = opts || {}
  opts.port = opts.port || 3021
  opts.path = opts.path || '/tmp/node-repl-sock'
  secret = opts.secret || ''

  switch (type) {
  case 'stdin':
    stdinRepl()
    break
  case 'tcp':
    netRepl('tcp', opts.port)
    break
  case 'unix socket':
    netRepl('unix socket', opts.path)
    break
  }
}

function stdinRepl () {
  console.log('stdin repl')
  repl.start('repl (stdin) > ')
}

function netRepl (type, p) {
  console.log(type + 'repl listening at ' + p)
  net.createServer(function (socket) {
    socket.write('Welcome to ' + process.title + ' repl (' + type + ') \r\n')
    socket.write('Password: ')
    socket.on('data', setup)
    function setup (data) {
      authenticate(data, socket, function () {
        socket.write('authenticated \r\n')
        socket.removeListener('data', setup)
        repl.start('repl (' + type + ') > ', socket)
      })
    }
  }).listen(p)
}

function authenticate (pass, socket, callback) {
  pass = pass.toString()
  if ( secret + '\n' === String(pass) )
    callback()
  else {
    var err = new Error('invalid secret')
    console.warn(err, pass)
    socket.write(err.message + '\r\n')
    socket.destroy()
  }
}

module.exports = remoteRepl