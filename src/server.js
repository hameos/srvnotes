import Express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import NotesRouter from './notes-router'

const {ip:HOST_IP, port:HOST_PORT, www:WWW_PATH} = $CONFIG

const server = Express()
server.use(Express.static(WWW_PATH))
server.use(bodyParser.json())
server.use(cors())


NotesRouter(server)

server.get("*", (req, res, next) => {
  console.log('get *', req.url)

  const html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Notes App</title>
    <link rel="stylesheet" type="text/css" href="http://${HOST_IP}:${HOST_PORT}/assets/styles.css">
  </head>
  <body>
    <div id="app"></div>
    <script src="http://${HOST_IP}:${HOST_PORT}/main.js"></script>
  </body>
  </html>
  `
  res.send(html)
})


server.listen(HOST_PORT, () => {
  console.log("Server running - ", HOST_PORT, HOST_IP)
})
