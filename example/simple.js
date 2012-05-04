
var remoteRepl = require('../')

remoteRepl('tcp', { port: 3021, secret: 'beepboop' })
