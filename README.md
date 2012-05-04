# remote-repl

super simple remote repl for node processes

## Installation

`npm install remote-repl`

## Examples

The easiest way is to use stdin to inject a repl into the global context

```js 

require('remote-repl')('stdin')
```

### tcp

You can also use tcp to start a repl with any node process. In your application pass a few options where the repl will listen for connections.

```js 

require('remote-repl')('tcp', { port: 3021, secret: 'beepboop' })
```

Then you can use `netcat` to connect with `nc localhost 3021`

<img src='remote-repl/blob/master/screenshot.png' />

### unix sockets

```js

require('remote-repl')('tcp', { path: '/tmp/node-repl-sock', secret: 'beepboop' })
```

And then use `socat` to connect with `socat /tmp/node-repl-sock stdin`


## Todo

Add more commands to switch repl contexts.

## License
MIT
