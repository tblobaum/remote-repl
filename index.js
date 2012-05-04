var repl = require('repl')
  , net = require('net')
  , readline = require('readline')
  , secret = ''

function remoteRepl (type, opts) {
  opts = opts || {}
  opts.port = opts.port || 3021
  opts.path = opts.path || '/tmp/node-repl-sock'
  secret = opts.secret || ''
  switch (type) {
  case 'stdin':
    console.log('stdin repl')
    repl.start('➜ ')
    break
  case 'tcp':
    netRepl('tcp', opts.port)
    break
  case 'unix socket':
    netRepl('unix socket', opts.path)
    break
  }
}

function netRepl (type, p) {
  net.createServer(function (socket) {
    rl = readline.createInterface(socket, socket)
    rl.question('Password: ', function (password) {
      password = password.replace(/(\r\n|\n|\r)/gm, '')
      if (secret === password) {
        socket.write('Welcome to remote-repl ('+process.title+':'+type+') -- type .help for some commands \r\n')
        repl.start('➜ ', socket)
      }
      else {
        socket.write('authentication failed \r\n')
        socket.destroy()
      }
    })
  }).listen(p)
}

module.exports = remoteRepl
