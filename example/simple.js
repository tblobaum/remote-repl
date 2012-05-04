
var remoteRepl = require('remote-repl')

remoteRepl('tcp', { port: 3021, secret: 'beepboop' })
