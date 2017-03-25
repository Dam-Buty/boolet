
const http = require('http')
const Router = require('node-simple-router')

const router = new Router()

const Scheduler = require("./classes/Scheduler")

let scheduler = new Scheduler()

router.post("/schedule/:timestamp", (req, res) => {
  const idx = scheduler.create(req.params.timestamp)
  
  res.writeHead(200)
  res.end(idx)
})

router.get("/boolet/:idx", (req, res) => {
  const idx = req.params.idx

  const boolet = scheduler.get(idx)

  if (boolet) {
    boolet.channel.addClient(req, res)
    res.writeHead(200)
    res.end(boolet.when)
  } else {
    res.writeHead(404)
    res.end()
  }
})

// Create a regular HTTP server (works with express, too)
http
.createServer(router)
.listen(7788, '0.0.0.0', () => {
    console.log('Listening on http://0.0.0.0:7788/')
})
