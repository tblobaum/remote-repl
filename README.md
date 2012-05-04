# remote-repl

super simple remote repl for node processes

## installation

`npm install remote-repl`

## example

In your application:
```js 

require('remote-repl')('tcp', { port: 3021, secret: 'beepboop' })

```

Then just use netcat to connect
  `nc localhost 3021`

## license
MIT
